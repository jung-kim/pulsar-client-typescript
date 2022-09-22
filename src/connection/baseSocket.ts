import { Socket, createConnection } from 'net'
import { connect, TLSSocket } from 'tls'
import AsyncRetry from 'async-retry'
import { Connection } from './Connection'
import { ProtocolVersion } from '../proto/PulsarApi'
import { ConnectionOptions } from './ConnectionOptions'

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

  constructor(connection: Connection) {
    this.parent = connection
    this.options = this.parent.getOption()
    this.reconnect()
  }

  /**
   * Either returns ongoing initialization attempt, or return new initialization attempt.
   * This function is the only one that modifies `state` variable, except for the `close`
   * function.
   * @returns initializePromise
   */
  reconnect() {
    if (this.initializePromise) {
      return this.initializePromise
    }

    this.initializePromise = new Promise((resolve, reject) => {
      this.initializePromiseRes = resolve
      this.initializePromiseRej = reject
    })

    AsyncRetry(
      async () => {
        // initialize tcp socket and wait for it
        await new Promise((res, rej) => {
          // initialize socket
          if (this.options._isTlsEnabled) {
            this.socket = connect({
              host: this.options._hostname,
              port: this.options._port,
              servername: this.options._hostname,
              timeout: this.options.connectionTimeoutMs
            })
          } else {
            this.socket = createConnection({
              host: this.options._hostname as string,
              port: this.options._port as number,
              timeout: this.options.connectionTimeoutMs
            })
          }

          this.socket.on('error', (err: Error) => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            // close event will trigger automatically after this event so not destroying here.
            console.log('err', err)
          })

          this.socket.on('close', () => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            rej(Error('socket closing'))
            console.log('close')
          })

          this.socket.once('ready', () => {
            // tcp socket is ready!
            res(undefined)
          })
        })

        // after tcp socket is established, wait for handshake to be finished
        await this.handshake(this.socket)

        // no errors, socket is ready
        if (this.state === 'INITIALIZING') {
          this.state = 'READY'
        }

        this.socket?.on('data', this.handleData)
        if (this.initializePromiseRes) {
          this.initializePromiseRes()
        }
      },
      {
        retries: 5,
        maxTimeout: 20000
      }
    ).catch((e) => {
      this.parent.close()
      if (this.initializePromiseRej) {
        this.initializePromiseRej(e)
      }
    })

    return this.initializePromise
  }

  /**
   * closes the connection. Can be reconnected via `reconnect`
   */
  close() {
    if (this.state === 'CLOSED') {
      return
    }
    if (this.initializePromiseRej) {
      this.initializePromiseRej(undefined)
    }
    this.socket?.destroy()
    this.socket = undefined
    this.state = 'CLOSED'
    this.initializePromise = undefined
    this.initializePromiseRes = undefined
    this.initializePromiseRej = undefined
  }

  getState() {
    return this.state
  }

  protected getInitializePromise() {
    return this.initializePromise
  }

  protected send(buffer: Uint8Array | Buffer) {
    this.socket?.write(buffer)
  }
  protected abstract handshake(socket: Socket | TLSSocket | undefined): void
  protected abstract handleData(buffer: Buffer): void
}
