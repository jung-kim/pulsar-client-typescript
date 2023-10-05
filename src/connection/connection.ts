import {
  BaseCommand,
  CommandCloseProducer,
  CommandSendReceipt,
  MessageMetadata,
  CommandSend
} from '../proto/PulsarApi'
import { _ConnectionOptions } from './connectionOptions'
import Long from 'long'
import { Signal } from 'micro-signals'
import { serializeBatch } from './Commands'
import { BaseConnection } from './baseConnection'
import { WrappedLogger } from '../util/logger'
import { CommandTypesResponses } from '../connection'
import { RequestTrack } from '../util/requestTracker'

export class Connection extends BaseConnection {
  readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.wrappedLogger = options.getWrappedLogger('BaseConnection', logicalAddress)
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

    Object.keys(cmd).forEach((key: keyof BaseCommand) => {
      if (key === 'type' || cmd[key] === undefined) {
        return
      }
      commandCount++

      if ('requestId' in (cmd[key] as any)) {
        if ((cmd[key] as any).requestId === undefined || Long.UZERO.eq((cmd[key] as any).requestId)) {
          // request id is not defined, create a new request id.
          requestTrack = this.requestTracker.trackRequest();
          (cmd[key] as any).requestId = requestTrack.id
        } else {
          // request id is defined, using passed in request id.
          requestTrack = this.requestTracker.get((cmd[key] as any).requestId as Long)
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
      await this.pulsarSocket.writeCommand(cmd)
    } catch (e) {
      if (requestTrack !== undefined) {
        requestTrack.rejectRequest(e)
      }
    }

    if (requestTrack !== undefined) {
      return await requestTrack.prom
    }
  }

  async sendMessages (producerId: Long, messageMetadata: MessageMetadata, uncompressedPayload: Uint8Array, requestId?: Long): Promise<CommandTypesResponses> {
    const requestTrack = (requestId !== undefined) ? this.requestTracker.get(requestId) : this.requestTracker.trackRequest()
    if (requestTrack === undefined) {
      throw Error('request tracker is not found')
    }
    const sendCommand = CommandSend.fromJSON({
      producerId,
      sequenceId: requestTrack.id
    })
    messageMetadata.sequenceId = requestTrack.id

    this.pulsarSocket.send(serializeBatch(sendCommand, messageMetadata, uncompressedPayload))
      .catch(e => requestTrack.rejectRequest(e))

    return await requestTrack.prom
  }

  isReady (): boolean {
    return this.pulsarSocket.getState() === 'READY'
  }

  async ensureReady (): Promise<void> {
    return await this.pulsarSocket.ensureReady()
  }
}
