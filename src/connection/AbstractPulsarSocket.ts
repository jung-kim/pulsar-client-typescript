import { Signal } from "micro-signals"
import { BaseCommand } from "proto/PulsarApi"
import { BaseSocket } from "./baseSocket"

/**
 * Type of object we receive from the server
 */
export interface Message {
  baseCommand: BaseCommand,
  headersAndPayload: Buffer,
}

/**
 * Pulsar socket interface, this is what gets exported
 */
export abstract class AbstractPulsarSocket extends BaseSocket {
  protected _dataStream = new Signal<Message>()
  public dataStream = this._dataStream.readOnly()

  public abstract sendCommand(command: BaseCommand): void
  protected abstract _parseReceived(data: Buffer): any
}
