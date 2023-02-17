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
import { CommandTypesResponses } from 'connection'

export class Connection extends BaseConnection {
  readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.wrappedLogger = options.getWrappedLogger('BaseConnection', logicalAddress)
  }

  async reconnect (): Promise<void> {
    this.socket._eventSignal.dispatch({ event: 'reconnect' })
    return await this.socket.ensureReady()
  }

  close (): void {
    this.requestTracker.clear()
    this.socket._eventSignal.dispatch({ event: 'close' })
  }

  registerProducerListener (id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>): void {
    return this.producerListeners.registerProducerListener(id, signal)
  }

  unregisterProducerListener (id: Long): void {
    return this.producerListeners.unregisterProducerListener(id)
  }

  async sendCommand (cmd: BaseCommand): Promise<CommandTypesResponses> {
    const requestTrack = this.requestTracker.trackRequest();

    (Object(cmd) as Array<keyof BaseCommand>).forEach((key: keyof BaseCommand) => {
      if (cmd[key] !== undefined && 'requestId' in (cmd[key] as any)) {
        (cmd[key] as any).requestId = requestTrack.id
      }
    })

    this.socket.writeCommand(cmd)
      .catch(e => requestTrack.rejectRequest(e))

    return await requestTrack.prom
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

    this.socket.send(serializeBatch(sendCommand, messageMetadata, uncompressedPayload))
      .catch(e => requestTrack.rejectRequest(e))

    return await requestTrack.prom
  }

  isReady (): boolean {
    return this.socket.getState() === 'READY'
  }

  async ensureReady (): Promise<void> {
    return await this.socket.ensureReady()
  }
}
