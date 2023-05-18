import { EventSignalType, Message } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { _ConnectionOptions } from '../ConnectionOptions'
import { getDeferred } from '../../../src/util/deferred'
import { STATE } from '../'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class Initializable {
  private state: STATE = 'INITIALIZING'
  private readonly initializeDeferrred = getDeferred<undefined>()
  protected readonly wrappedLogger: WrappedLogger

  public readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly _dataSignal: Signal<Message>
  public readonly dataSignal: ReadableSignal<Message>
  public readonly options: _ConnectionOptions

  constructor (name: string, options: _ConnectionOptions, logicalAddress: URL) {
    this._eventSignal = options._eventSignal
    this.eventSignal = this._eventSignal.readOnly()
    this._dataSignal = options._dataSignal
    this.dataSignal = this._dataSignal.readOnly()
    this.options = options
    this.wrappedLogger = options.getWrappedLogger(name, logicalAddress)

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
    this.wrappedLogger.info('closed initializable')
  }

  private onReady (): void {
    this.initializeDeferrred.resolve(undefined)
    this.state = 'READY'
    this._eventSignal.dispatch({ event: 'ready' })
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
