import { EventSignalType, STATE } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { ConnectionOptions } from '../connectionOptions'
import { BaseCommand } from '../../../src/proto/PulsarApi'
import { commandToPayload } from './utils'
import type { Defered } from '../../util/deferred'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class AbstractPulsarSocket {
  private state: STATE = 'INITIALIZING'
  protected initializeDeferrred: Defered<void> | undefined = undefined
  protected readonly wrappedLogger: WrappedLogger

  protected readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly options: ConnectionOptions
  public readonly logicalAddress: URL

  constructor (options: ConnectionOptions, logicalAddress: URL, _eventSignal: Signal<EventSignalType>) {
    this._eventSignal = _eventSignal
    this.eventSignal = this._eventSignal.readOnly()
    this.options = options
    this.logicalAddress = logicalAddress
    this.wrappedLogger = new WrappedLogger({
      name: 'pulsar-socket',
      uuid: this.options.uuid,
      host: logicalAddress.host
    })
  }

  protected close (): void {
    this.initializeDeferrred?.resolve(undefined)
    this.state = 'CLOSED'
  }

  protected setReady (): void {
    this.initializeDeferrred?.resolve(undefined)
    this.state = 'READY'
  }

  public abstract send (buffer: Uint8Array | Buffer): Promise<void>

  public async writeCommand (command: BaseCommand): Promise<void> {
    return await this.send(commandToPayload(command))
  }

  public async ensureReady (): Promise<void> {
    await this.initializeDeferrred.promise
    if (this.state !== 'READY') {
      throw Error('Not initialized')
    }
  }

  public getState (): STATE {
    return this.state
  }
}
