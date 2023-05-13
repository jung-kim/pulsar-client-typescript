import AsyncRetry from 'async-retry'
import { EventSignalType, Message } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { _ConnectionOptions } from '../ConnectionOptions'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class Initializable {
  private state: 'INITIALIZING' | 'READY' | 'CLOSED' = 'INITIALIZING'
  protected initializePromise: Promise<void> | undefined = undefined
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

    this.eventSignal.add(event => {
      switch (event.event) {
        case 'close':
          this.onClose()
          break
        case 'pulsar_socket_ready':
          if (this.state === 'INITIALIZING') {
            this.state = 'READY'
          }
      }
    })
  }

  protected abstract _initialize (): void
  protected abstract _onClose (): void

  initialize (): void {
    if (this.initializePromise === undefined) {
      this.state = 'INITIALIZING'
      this.initializePromise = AsyncRetry(async (bail: (e: Error) => void) => {
        try {
          return this._initialize()
        } catch (e: any) {
          if (e?.code === 'ERR_SOCKET_CLOSED' || e?.code === 'ERR_STREAM_DESTROYED') {
            // closed socket, bail out of retry
            bail(e)
          }
          throw e
        }
      }, { retries: 5, maxTimeout: 5000 })
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
    this.options.getSocket().destroy()
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
