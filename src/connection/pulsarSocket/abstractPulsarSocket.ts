import { EventSignalType, Message, STATE } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { _ConnectionOptions } from '../ConnectionOptions'
import { getDeferred } from '../../util/deferred'
import { BaseCommand } from '../../../src/proto/PulsarApi'
import { commandToPayload } from './utils'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class AbstractPulsarSocket {
  private state: STATE = 'INITIALIZING'
  private readonly initializeDeferrred = getDeferred<undefined>()
  private readonly id: string
  protected readonly wrappedLogger: WrappedLogger

  protected readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  protected readonly _dataSignal: Signal<Message>
  public readonly dataSignal: ReadableSignal<Message>
  public readonly options: _ConnectionOptions
  public readonly logicalAddress: URL

  constructor (name: string, options: _ConnectionOptions, logicalAddress: URL) {
    this._eventSignal = options._eventSignal
    this.eventSignal = this._eventSignal.readOnly()
    this._dataSignal = options._dataSignal
    this.dataSignal = this._dataSignal.readOnly()
    this.options = options
    this.logicalAddress = logicalAddress
    this.wrappedLogger = options.getWrappedLogger(name, logicalAddress)
    this.id = `${options.connectionId}-${logicalAddress.host}`

    this.eventSignal.add(payload => {
      switch (payload.event) {
        case 'close':
          this.onClose()
          break
        case 'handshake_success':
          this.onReady()
          break
      }
    })
  }

  private onClose (): void {
    this.initializeDeferrred.resolve(undefined)
    this.state = 'CLOSED'
    this.wrappedLogger.info('closed abstract pulsar socket')
  }

  private onReady (): void {
    this.initializeDeferrred.resolve(undefined)
    this.state = 'READY'
    this._eventSignal.dispatch({ event: 'ready' })
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

  public close (): void {
    this._eventSignal.dispatch({ event: 'close' })
  }
}
