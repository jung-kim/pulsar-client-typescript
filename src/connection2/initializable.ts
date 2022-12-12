import AsyncRetry from 'async-retry'
import { ReadableSignal, Signal } from 'micro-signals'
import { EVENT_SIGNALS, _ConnectionOptions } from './ConnectionOptions'

export abstract class Initializable<T> {
  public state: 'INITIALIZING' | 'READY' | 'CLOSED' = 'INITIALIZING'
  protected initializePromise: Promise<T> | undefined = undefined

  public readonly _eventStream: Signal<EVENT_SIGNALS>
  public readonly eventStream: ReadableSignal<EVENT_SIGNALS>

  constructor (options: _ConnectionOptions) {
    this._eventStream = options.eventStream
    this.eventStream = this._eventStream.readOnly()
  }

  protected abstract _initialize (): Promise<T>

  initialize (): void {
    if (this.initializePromise === undefined) {
      this.state = 'INITIALIZING'
      this.initializePromise = AsyncRetry(this._initialize, { retries: 5, maxTimeout: 5000 })
    }
    this.initializePromise
      .then(() => { this.state = 'READY' })
      .catch(() => { this._eventStream.dispatch('close') })
  }

  onClose (): void {
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
}
