import { Socket, createConnection } from 'net'
import { connect, TLSSocket } from 'tls'
import AsyncRetry from 'async-retry'
import { Connection } from './Connection'
import { ProtocolVersion } from '../proto/PulsarApi'
import { ConnectionOptions } from './ConnectionOptions'
import { WrappedLogger } from '../util/logger'

/**
 * represents raw socket conenction to a destination
 */
export abstract class BaseSocket {
  protected state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  private socket: Socket | TLSSocket | undefined = undefined
  private initializePromise: Promise<void> | undefined = undefined
  private initializePromiseRes: (() => void) | undefined = undefined
  private initializePromiseRej: ((e: any) => void) | undefined = undefined
  protected readonly parent: Connection
  protected readonly options: ConnectionOptions
  protected readonly protocolVersion = ProtocolVersion.v13
  public readonly wrappedLogger: WrappedLogger

  constructor (connection: Connection) {
    this.parent = connection
    this.options = this.parent.getOption()
    this.wrappedLogger = new WrappedLogger({
      name: 'BaseSocket',
      url: this.options.url,
      uuid: this.options._uuid
    })
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
          if (this.options._isTlsEnabled) {
            this.socket = connect({
              host: this.options._url.hostname,
              port: parseInt(this.options._url.port),
              servername: this.options._url.hostname,
              timeout: this.options.connectionTimeoutMs
            })
          } else {
            this.socket = createConnection({
              host: this.options._url.hostname,
              port: parseInt(this.options._url.port),
              timeout: this.options.connectionTimeoutMs
            })
          }

          this.socket.on('error', (err: Error) => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            // close event will trigger automatically after this event so not destroying here.
            this.wrappedLogger.error('socket error', err)
          })

          this.socket.on('close', () => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
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
      this.parent.close()
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
