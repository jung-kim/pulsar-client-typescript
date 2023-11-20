import {
  BaseCommand,
  CommandCloseProducer,
  CommandSendReceipt,
  MessageMetadata,
  CommandSend,
  CommandSuccess
} from '../proto/PulsarApi'
import { _ConnectionOptions } from './connectionOptions'
import Long from 'long'
import { Signal } from 'micro-signals'
import { serializeBatch } from './commands'
import { BaseConnection } from './baseConnection'
import { WrappedLogger } from '../util/logger'
import { CommandTypesResponses } from '../connection'
import { RequestTrack } from '../util/requestTracker'
import lodash from 'lodash'
import { commandToPayload } from './pulsarSocket/utils'
import PQueue from 'p-queue'

export class Connection extends BaseConnection {
  readonly wrappedLogger: WrappedLogger

  // pulsar broker process commands with highest request id at a time.  this means if a command with
  // sequence ID of 7 is received before 6 is done processing, command 6 will be cancelled and not
  // returned.  to ensure all commands are processed in order one at a time, this queue is used
  private readonly workQueue = new PQueue({ concurrency: 1, throwOnTimeout: true })

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.wrappedLogger = options.getWrappedLogger('connection', logicalAddress)
  }

  close (): void {
    this.requestTracker.clear()
    this.pulsarSocket.close()
  }

  registerProducerListener (id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>): void {
    return this.producerListeners.registerProducerListener(id, signal)
  }

  unregisterProducerListener (id: Long): void {
    return this.producerListeners.unregisterProducerListener(id)
  }

  private getCommandBytesTosend (cmd: BaseCommand): {
    requestTrack: RequestTrack<CommandTypesResponses>
    payload: Uint8Array
  } {
    let requestTrack: RequestTrack<CommandTypesResponses>
    const cmdCpy = lodash.cloneDeep(cmd)

    Object.keys(cmdCpy).forEach((key: keyof BaseCommand) => {
      if (key === 'type' || cmdCpy[key] === undefined) {
        return
      }

      if (requestTrack !== undefined) {
        throw new Error('invalid number of commands are passed in')
      }

      if ('requestId' in (cmdCpy[key] as any)) {
        if ((cmdCpy[key] as any).requestId === undefined || Long.UZERO.eq((cmdCpy[key] as any).requestId)) {
          // request id is not defined, create a new request id.
          requestTrack = this.requestTracker.trackRequest();
          (cmdCpy[key] as any).requestId = requestTrack.id
        } else {
          // request id is defined, using passed in request id.
          requestTrack = this.requestTracker.get((cmdCpy[key] as any).requestId as Long)
          if (requestTrack === undefined) {
            throw new Error('passed in request id is invalid')
          }
        }
      }
    })

    return {
      requestTrack,
      payload: commandToPayload(cmdCpy)
    }
  }

  /**
   * Send pulsar commands to the brokers.
   * @param cmd is a BaseCommand
   *  - must include the type attribute
   *  - must have and one and only one command
   *  - when requestId can be undefined or uzero, request is automatically tracked with an available request id
   *  - when requestId is set, requestTracker must have requestTrack for the requestId
   * @returns response back from the broker
   */
  async sendCommand (cmd: BaseCommand): Promise<CommandTypesResponses> {
    const result = await this.workQueue.add(async () => {
      const { requestTrack, payload } = this.getCommandBytesTosend(cmd)
      await this.pulsarSocket.send(payload).catch(requestTrack.rejectRequest)
      return await requestTrack.prom
    })
    if (result instanceof Object) {
      return result
    }
    this.wrappedLogger.error('workQueue add returned invalid object for command', { cmd })
    throw Error('workQueue add returned invalid object for command')
  }

  /**
   * Send messages the brokers.
   * @param producerId
   * @param messageMetadata
   * @param uncompressedPayload
   * @returns a promise that includes  recipt.
   */
  async sendMessages (producerId: Long, messageMetadata: MessageMetadata, uncompressedPayload: Uint8Array): Promise<CommandSendReceipt> {
    const result = await this.workQueue.add(async () => {
      const requestTrack = this.requestTracker.trackRequest()
      const sendCommand = CommandSend.fromJSON({
        producerId,
        sequenceId: messageMetadata.sequenceId,
        numMessages: messageMetadata.numMessagesInBatch
      })

      const seralizedBatch = serializeBatch(sendCommand, messageMetadata, uncompressedPayload)

      // for send messsages, request id is not returned on the SendReceipt object.  Command success is handled by
      // producerID and the sequenceID separately.  Therefor, we don't wait for response here.
      await this.pulsarSocket.send(seralizedBatch).catch(requestTrack.rejectRequest)
      requestTrack.resolveRequest(CommandSuccess.create({ requestId: requestTrack.id }))
      return (await requestTrack.prom) as CommandSendReceipt
    })
    if (result instanceof Object) {
      return result
    }
    this.wrappedLogger.error('workQueue add returned invalid object for message send', { messageCount: messageMetadata.numMessagesInBatch })
    throw Error('workQueue add returned invalid object for message send')
  }

  isReady (): boolean {
    return this.pulsarSocket.getState() === 'READY'
  }

  async ensureReady (): Promise<void> {
    return await this.pulsarSocket.ensureReady()
  }
}
