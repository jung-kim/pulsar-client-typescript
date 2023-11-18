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
import { cloneDeep } from 'lodash'
import { commandToPayload } from './pulsarSocket/utils'

export class Connection extends BaseConnection {
  readonly wrappedLogger: WrappedLogger

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

  /**
   * Send pulsar commands to the brokers
   * @param cmd is a BaseCommand
   *  - must include the type attribute
   *  - must have and one and only one command
   *  - when requestId can be undefined or uzero, request is automatically tracked with an available request id
   *  - when requestId is set, requestTracker must have requestTrack for the requestId
   * @returns promise for the command. Awaiting for the returned value will return the respons back from the server
   */
  async sendCommand (cmd: BaseCommand): Promise<CommandTypesResponses> {
    let requestTrack: RequestTrack<CommandTypesResponses>
    let commandCount = 0
    const cmdCpy = cloneDeep(cmd)

    Object.keys(cmdCpy).forEach((key: keyof BaseCommand) => {
      if (key === 'type' || cmdCpy[key] === undefined) {
        return
      }
      commandCount++

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

    if (commandCount !== 1) {
      throw new Error('invalid number of commands are passed in')
    }

    try {
      await this.pulsarSocket.send(commandToPayload(cmdCpy))
    } catch (e) {
      requestTrack.rejectRequest(e)
    }

    return await requestTrack.prom
  }

  async sendMessages (producerId: Long, messageMetadata: MessageMetadata, uncompressedPayload: Uint8Array): Promise<CommandTypesResponses> {
    const requestTrack = this.requestTracker.trackRequest()
    if (requestTrack === undefined) {
      throw Error('request tracker is not found')
    }
    const sendCommand = CommandSend.fromJSON({
      producerId,
      sequenceId: messageMetadata.sequenceId,
      numMessages: messageMetadata.numMessagesInBatch
    })

    const seralizedBatch = serializeBatch(sendCommand, messageMetadata, uncompressedPayload)

    try {
      // for send messsages, request id is not returned on the SendReceipt object.  Command success is handled by
      // producerID and the sequenceID separately.  Therefor, we don't wait for response here.
      await this.pulsarSocket.send(seralizedBatch)
      requestTrack.resolveRequest(CommandSuccess.create({ requestId: requestTrack.id }))
    } catch (e) {
      requestTrack.rejectRequest(e)
    }

    return await requestTrack.prom
  }

  isReady (): boolean {
    return this.pulsarSocket.getState() === 'READY'
  }

  async ensureReady (): Promise<void> {
    return await this.pulsarSocket.ensureReady()
  }
}
