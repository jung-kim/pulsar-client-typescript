import { Socket, createConnection } from 'net'
import { connect, TLSSocket } from 'tls'
import AsyncRetry from 'async-retry'
import { Connection } from './Connection'
import { BaseCommand, ProtocolVersion } from '../proto/PulsarApi'
import { ConnectionOptions } from './ConnectionOptions'
import { RequestTracker } from '../util/requestTracker'
import { logger } from 'util/logger'

/**
 * represents raw socket conenction to a destination
 */
export abstract class BaseSocket {
  protected state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  private socket: Socket | TLSSocket | undefined = undefined
  private initializePromise: Promise<void> | undefined = undefined
  private initializePromiseRes: (() => void) | undefined = undefined
  private initializePromiseRej: ((e: any) => void) | undefined = undefined
  private readonly requestTracker = new RequestTracker<BaseCommand>()
  protected readonly parent: Connection
  protected readonly options: ConnectionOptions
  protected readonly protocolVersion = ProtocolVersion.v13

  constructor(connection: Connection) {
    this.parent = connection
    this.options = this.parent.getOption()
    this.reconnect()
    logger.info('base socket created', this.options)
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
            logger.error('socket error', this.options, err)
          })

          this.socket.on('close', () => {
            this.state = 'CLOSING'
            this.socket?.removeAllListeners()
            rej(Error('socket closing'))
            logger.info('socket close', this.options)
          })

          this.socket.once('ready', () => {
            // tcp socket is ready!
            res(undefined)
            logger.info('socket ready', this.options)
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
      logger.error('socket creation error', e, this.options)
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
    logger.info('socket closed', this.options)
  }

  getState() {
    return this.state
  }

  protected getInitializePromise() {
    return this.initializePromise
  }

  protected send(buffer: Uint8Array | Buffer): Promise<void> {
    return new Promise((_, rej) => {
      if (!this.socket || this.state !== 'READY') {
        logger.debug('socket is closed, send is rejected', this.options)
        return rej(Error('socket is closed'))
      }
      this.socket.write(buffer, (err) => {
        if (err) {
          logger.error('socket write error', this.options)
          return rej(err)
        }
        logger.debug('socket written', this.options)
      })
    })
  }
  protected abstract handshake(socket: Socket | TLSSocket | undefined): void
  protected abstract handleData(buffer: Buffer): void
}
