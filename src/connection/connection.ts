import {
  BaseCommand,
  CommandCloseProducer,
  CommandSendReceipt,
  MessageMetadata,
  CommandSend,
  CommandSuccess
} from '../proto/PulsarApi'
import { ConnectionOptions } from './connectionOptions'
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

/**
 * Connection object holds a persistent TCP socket connection to a pulsar broker and is able to
 * send and receive payloads based on the pulsar protobuf specifications.  A single connection is
 * connected to a single pulsar broker and is dedicated to a single producer, consumer, or client.
 * Although each producer, consumer, and client may have multiple connections.
 */
export class Connection extends BaseConnection {
  readonly wrappedLogger: WrappedLogger

  // pulsar broker process commands with highest request id at a time.  this means if a command with
  // sequence ID of 7 is received before 6 is done processing, command 6 will be cancelled and not
  // returned.  to ensure all commands are processed in order one at a time, this queue is used
  private readonly workQueue = new PQueue({ concurrency: 1, throwOnTimeout: true })

  constructor (options: ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.wrappedLogger = new WrappedLogger({
      name: 'connections',
      uuid: this.options.uuid,
      host: this.options._urlObj.host
    })
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

  private async addToWorkQueue<T> (workFn: () => Promise<T>): Promise<T> {
    if (this.workQueue.size >= this.options.maxWorkQueueSize) {
      this.wrappedLogger.error('workQueue is overloaded and too many outstanding requests, broker is possibly behind in processing. please retry again later.')
      throw Error('workQueue reached max capacity')
    }

    const result = await this.workQueue.add(workFn)

    if (result instanceof Object) {
      return result as T
    }
    this.wrappedLogger.error('workQueue add returned invalid object for command')
    throw Error('workQueue add returned invalid object for command')
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
    return await this.addToWorkQueue(async () => {
      const { requestTrack, payload } = this.getCommandBytesTosend(cmd)
      await this.pulsarSocket.send(payload).catch(requestTrack.rejectRequest)
      return await requestTrack.prom
    })
  }

  /**
   * Send messages the brokers.
   * @param producerId
   * @param messageMetadata
   * @param uncompressedPayload
   * @returns a promise that includes  recipt.
   */
  async sendMessages (producerId: Long, messageMetadata: MessageMetadata, uncompressedPayload: Uint8Array): Promise<CommandSendReceipt> {
    return await this.addToWorkQueue(async () => {
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
  }

  isReady (): boolean {
    return this.pulsarSocket.getState() === 'READY'
  }

  async ensureReady (): Promise<void> {
    await this.pulsarSocket.ensureReady()
  }
}
