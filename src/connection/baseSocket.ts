import { Socket } from 'net'
import { TLSSocket } from 'tls'
import AsyncRetry from 'async-retry'
import { ProtocolVersion } from '../proto/PulsarApi'
import { _ConnectionOptions } from './ConnectionOptions'
import { WrappedLogger } from '../util/logger'
import { ReadableSignal, Signal } from 'micro-signals'

/**
 * represents raw socket conenction to a destination
 */
export abstract class BaseSocket {
  protected state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  private socket: Socket | TLSSocket | undefined = undefined
  private initializePromise: Promise<void> | undefined = undefined
  private initializePromiseRes: (() => void) | undefined = undefined
  private initializePromiseRej: ((e: any) => void) | undefined = undefined
  protected readonly options: _ConnectionOptions
  protected readonly protocolVersion = ProtocolVersion.v13
  protected readonly _eventStream: Signal<string>
  public readonly eventStream: ReadableSignal<string>
  public readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions) {
    this.options = options
    this.wrappedLogger = new WrappedLogger({
      name: 'BaseSocket',
      url: this.options.url,
      uuid: this.options.uuid
    })
    this._eventStream = options.getEventStream()
    this.eventStream = this._eventStream.readOnly()
    this.reconnect()
      .catch((err) => { this.wrappedLogger.error('error while connecting', err) })
    this.wrappedLogger.info('base socket created')
  }

  /**
   * Either returns ongoing initialization attempt, or return new initialization attempt.
   * This function is the only one that modifies `state` variable, except for the `close`
   * function.
   * @returns initializePromise
   */
  async reconnect (): Promise<void> {
    if (this.initializePromise !== undefined) {
      return await this.initializePromise
    }

    this.initializePromise = new Promise((resolve, reject) => {
      this.initializePromiseRes = resolve
      this.initializePromiseRej = reject
    })

    AsyncRetry(
      async () => {
        // initialize tcp socket and wait for it
        await new Promise((resolve, reject) => {
          // initialize socket
          this.socket = this.options.getSocket()

          this.socket.on('error', (err: Error) => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            this._eventStream.dispatch('close')
            // close event will trigger automatically after this event so not destroying here.
            this.wrappedLogger.error('socket error', err)
          })

          this.socket.on('close', () => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            this._eventStream.dispatch('close')
            reject(Error('socket closing'))
            this.wrappedLogger.info('socket close')
          })

          this.socket.once('ready', () => {
            // tcp socket is ready!
            resolve(undefined)
            this.wrappedLogger.info('socket ready')
          })
        })

        // after tcp socket is established, wait for handshake to be finished
        await this.handshake(this.socket)

        // no errors, socket is ready
        if (this.state === 'INITIALIZING') {
          this.state = 'READY'
        }

        this.socket?.on('data', this.handleData)
        if (this.initializePromiseRes !== undefined) {
          this.initializePromiseRes()
        }
      },
      {
        retries: 5,
        maxTimeout: 20000
      }
    ).catch((e) => {
      this.wrappedLogger.error('socket creation error', e)
      this._eventStream.dispatch('close')
      if (this.initializePromiseRej !== undefined) {
        this.initializePromiseRej(e)
      }
    })

    return await this.initializePromise
  }

  /**
   * closes the connection. Can be reconnected via `reconnect`
   */
  close (): void {
    this.wrappedLogger.info('socket closed')
    if (this.state === 'CLOSED') {
      return
    }
    if (this.initializePromiseRej !== undefined) {
      this.initializePromiseRej(undefined)
    }
    this.socket?.destroy()
    this.socket = undefined
    this.state = 'CLOSED'
    this.initializePromise = undefined
    this.initializePromiseRes = undefined
    this.initializePromiseRej = undefined
  }

  getState (): string {
    return this.state
  }

  protected getInitializePromise (): Promise<void> | undefined {
    return this.initializePromise
  }

  async send (buffer: Uint8Array | Buffer): Promise<void> {
    this.wrappedLogger.debug('sending data')
    return await new Promise((_resolve, reject) => {
      if ((this.socket === undefined) || this.state !== 'READY') {
        this.wrappedLogger.warn('socket is closed, send is rejected')
        return reject(Error('socket is closed'))
      }
      this.socket.write(buffer, (err) => {
        if (err !== undefined) {
          this.wrappedLogger.error('socket write error', err)
          return reject(err)
        }
        this.wrappedLogger.debug('written data')
      })
    })
  }
  protected abstract handshake (socket: Socket | TLSSocket | undefined): Promise<void>
  protected abstract handleData (buffer: Buffer): void
}
