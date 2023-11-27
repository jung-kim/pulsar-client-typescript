import { EventSignalType, STATE } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { _ConnectionOptions } from '../connectionOptions'
import { BaseCommand } from '../../../src/proto/PulsarApi'
import { commandToPayload } from './utils'
import type { Defered } from '../../util/deferred'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class AbstractPulsarSocket {
  private state: STATE = 'INITIALIZING'
  protected initializeDeferrred: Defered<void> | undefined = undefined
  private readonly id: string
  protected readonly wrappedLogger: WrappedLogger

  protected readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly options: _ConnectionOptions
  public readonly logicalAddress: URL

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    this._eventSignal = options.getNewEventSignal()
    this.eventSignal = this._eventSignal.readOnly()
    this.options = options
    this.logicalAddress = logicalAddress
    this.wrappedLogger = options.getWrappedLogger('pulasr-socket', logicalAddress)
    this.id = `${options.connectionId}-${logicalAddress.host}`
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

  public getId (): string {
    return this.id
  }

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
