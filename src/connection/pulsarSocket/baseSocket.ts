import { Message } from '..'
import { Socket } from 'net'
import { BaseCommand } from '../../proto/PulsarApi'
import { Reader } from 'protobufjs'
import { TLSSocket } from 'tls'
import { _ConnectionOptions } from '../ConnectionOptions'
import { Initializable } from './initializable'

/**
 * Has raw TCP socket conenction and raw functions for raw sockets
 */
export class BaseSocket extends Initializable {
  public socket: Socket | TLSSocket | undefined = undefined
  private lastDataReceived: number = 0

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super('BaseSocket', options, logicalAddress)
    this.wrappedLogger.info('base socket created')

    this._initialize()
  }

  protected _initialize = (): void => {
    if (this.getState() !== 'INITIALIZING') {
      this.wrappedLogger.info('abort initialization due to wrong state')
      return
    }
    if (this.socket !== undefined) {
      this.socket.destroy()
    }
    this.socket = this.options.getSocket()

    // initialize socket
    this.socket.on('error', (err: Error) => {
      // close event will trigger automatically after this event so not destroying here.
      this.wrappedLogger.error('socket error', err)
      this._eventSignal.dispatch({ event: 'close' })
    })

    this.socket.on('close', () => {
      this.wrappedLogger.info('socket close requested by server')
      this._eventSignal.dispatch({ event: 'close' })
    })

    this.socket.once('ready', () => {
      this.wrappedLogger.info('socket ready')
      this._eventSignal.dispatch({ event: 'base_socket_ready' })
    })

    this.socket.on('data', (data: Buffer) => {
      this._dataSignal.dispatch(this.parseReceived(data))
    })
  }

  /**
   * closes the connection. Can be reconnected via `reconnect`
   */
  protected _onClose (): void {
    this.socket?.destroy()
    this.socket = undefined
  }

  async send (buffer: Uint8Array | Buffer): Promise<void> {
    await this.ensureReady()
    this.wrappedLogger.debug('sending data')
    return await this.sendUnsafe(buffer)
  }

  protected async sendUnsafe (buffer: Uint8Array | Buffer): Promise<void> {
    this.wrappedLogger.debug('sending data')
    return await new Promise((_resolve, reject) => {
      this.socket?.write(buffer, (err) => {
        if (err !== undefined) {
          this.wrappedLogger.error('socket write error', err)
          return reject(err)
        }
        this.wrappedLogger.debug('written data')
        _resolve()
      })
    })
  }

  async ensureReady (): Promise<void> {
    await super.ensureReady()
    if (this.socket === undefined) {
      throw Error('socket is not defined')
    }
  }

  parseReceived (data: Buffer): Message {
    this.lastDataReceived = (new Date()).getMilliseconds()
    const frameSize = (new Reader(data.subarray(0, 4))).fixed32()
    const commandSize = (new Reader(data.subarray(4, 8))).fixed32()
    const headersAndPayloadSize = frameSize - (commandSize + 4)

    const command = data.subarray(8, commandSize + 8)
    const headersAndPayload = data.subarray(commandSize + 8, commandSize + headersAndPayloadSize + 8)
    return {
      baseCommand: BaseCommand.decode(command),
      headersAndPayload
    }
  }

  getLastDataReceived (): number {
    return this.lastDataReceived
  }
}
