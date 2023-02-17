import AsyncRetry from 'async-retry'
import { EventSignalType, Message } from '.'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../util/logger'
import { _ConnectionOptions } from './ConnectionOptions'

export abstract class Initializable<T> {
  private state: 'INITIALIZING' | 'READY' | 'CLOSED' = 'INITIALIZING'
  protected initializePromise: Promise<T> | undefined = undefined
  protected readonly wrappedLogger: WrappedLogger

  public readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly _dataSignal: Signal<Message>
  public readonly dataSignal: ReadableSignal<Message>
  public readonly options: _ConnectionOptions

  constructor (name: string, options: _ConnectionOptions, logicalAddress: URL) {
    this._eventSignal = options.getEventSignal()
    this.eventSignal = this._eventSignal.readOnly()
    this._dataSignal = options.getDataSignal()
    this.dataSignal = this._dataSignal.readOnly()
    this.options = options
    this.wrappedLogger = options.getWrappedLogger(name, logicalAddress)

    this.eventSignal.add(event => {
      switch (event.event) {
        case 'close':
          this.onClose()
          break
      }
    })
  }

  protected abstract _initialize (): Promise<T>
  protected abstract _onClose (): void

  initialize (): void {
    if (this.initializePromise === undefined) {
      this.state = 'INITIALIZING'
      this.initializePromise = AsyncRetry(this._initialize, { retries: 5, maxTimeout: 5000 })
        .then((v) => {
          this.state = 'READY'
          return v
        })
        .catch((e) => {
          this._eventSignal.dispatch({ event: 'close' })
          throw e
        })
    }
  }

  private onClose (): void {
    this._onClose()
    this.wrappedLogger.info('close requested')
    this.initializePromise = undefined
    this.state = 'CLOSED'
  }

  async ensureReady (): Promise<void> {
    if (this.initializePromise === undefined) {
      throw Error('Not initialized.')
    }
    await this.initializePromise
    if (this.state !== 'READY') {
      throw Error('Not initialized')
    }
  }

  getState (): 'INITIALIZING' | 'READY' | 'CLOSED' {
    return this.state
  }
}
