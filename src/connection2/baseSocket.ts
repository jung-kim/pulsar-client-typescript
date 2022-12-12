import { Socket } from 'net'
import { TLSSocket } from 'tls'
import { _ConnectionOptions } from './ConnectionOptions'
import { WrappedLogger } from '../util/logger'
import { Initializable } from './initializable'

/**
 * represents raw TCP socket conenction to a destination
 */
export class BaseSocket extends Initializable<void> {
  private socket: Socket | TLSSocket | undefined = undefined
  protected readonly options: _ConnectionOptions
  public readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions) {
    super(options)
    this.options = options
    this.wrappedLogger = new WrappedLogger({
      name: 'BaseSocket',
      url: this.options.url,
      uuid: this.options.uuid
    })
    this.wrappedLogger.info('base socket created')

    this.eventStream.add(event => {
      switch (event) {
        case 'close':
          this.onClose()
          break
        case 'reconnect':
          this.initialize()
          break
      }
    })
    this._eventStream.dispatch('reconnect')
  }

  async _initialize (): Promise<void> {
    // initialize socket
    this.socket = this.options.getSocket()

    this.socket.on('error', (err: Error) => {
      // close event will trigger automatically after this event so not destroying here.
      this.wrappedLogger.error('socket error', err)
      this._eventStream.dispatch('close')
    })

    this.socket.on('close', () => {
      this.wrappedLogger.info('socket close requested by server')
      this._eventStream.dispatch('close')
    })

    this.socket.once('ready', () => {
      this.wrappedLogger.info('socket ready')
      this._eventStream.dispatch('base_socket_ready')
    })

    // ready for a promise that is looking for 'socket_ready', treat all other events are failures
    await this.eventStream.filter(signal => signal === 'base_socket_ready')
      .promisify(this.eventStream)
  }

  /**
   * closes the connection. Can be reconnected via `reconnect`
   */
  onClose (): void {
    this.wrappedLogger.info('socket closed')
    this.socket?.destroy()
    this.socket = undefined
    super.onClose()
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

  getSocket (): Socket | undefined {
    return this.socket
  }
}
