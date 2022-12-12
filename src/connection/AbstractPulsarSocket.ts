import { ReadableSignal, Signal } from 'micro-signals'
import { BaseCommand } from 'proto/PulsarApi'
import { BaseSocket } from './baseSocket'
import { Connection } from './Connection'

/**
 * Type of object we receive from the server
 */
export interface Message {
  baseCommand: BaseCommand
  headersAndPayload: Buffer
}

/**
 * Pulsar socket interface, this is what gets exported
 */
export abstract class AbstractPulsarSocket extends BaseSocket {
  protected readonly _dataStream: Signal<Message>
  public readonly dataStream: ReadableSignal<Message>

  constructor (connection: Connection) {
    super(connection)
    this._dataStream = connection.getOption().getDataStream()
    this.dataStream = this._dataStream.readOnly()
  }

  public abstract getId (): string
  public abstract writeCommand (command: BaseCommand): void
  protected abstract _parseReceived (data: Buffer): Message
}
