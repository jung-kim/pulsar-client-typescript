import {
  BaseCommand,
  CommandCloseProducer,
  CommandSendReceipt,
  MessageMetadata,
  CommandSend
} from '../proto/PulsarApi'
import { _ConnectionOptions } from './ConnectionOptions'
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

  async reconnect (): Promise<void> {
    throw Error('not implemented')
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

  async sendCommand (cmd: BaseCommand): Promise<CommandTypesResponses | undefined> {
    let requestTrack: RequestTrack<CommandTypesResponses>

    Object.keys(cmd).forEach((key: keyof BaseCommand) => {
      if (key !== 'type' && cmd[key] !== undefined && 'sequenceId' in (cmd[key] as any)) {
        if (requestTrack !== undefined) {
          throw new Error('multiple commands are passed in')
        } else if ((cmd[key] as any).sequenceId === undefined || Long.UZERO.eq((cmd[key] as any).sequenceId)) {
          // request id is not defined, create a new request id.
          requestTrack = this.requestTracker.trackRequest();
          (cmd[key] as any).sequenceId = requestTrack.id
        } else {
          // request id is defined, using passed in request id.
          requestTrack = this.requestTracker.get((cmd[key] as any).sequenceId as Long)
          if (requestTrack === undefined) {
            throw new Error('passed in request id is invalid')
          }
        }
      }
    })

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
    const requestTrack = (requestId != null) ? this.requestTracker.get(requestId) : this.requestTracker.trackRequest()
    if (requestTrack == null) {
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
