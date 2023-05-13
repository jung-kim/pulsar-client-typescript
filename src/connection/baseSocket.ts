import { Message } from '../connection'
import { Socket } from 'net'
import { BaseCommand } from '../proto/PulsarApi'
import { Reader } from 'protobufjs'
import { TLSSocket } from 'tls'
import { _ConnectionOptions } from './ConnectionOptions'
import { Initializable } from './initializable'

/**
 * represents raw TCP socket conenction to a destination
 */
export class BaseSocket extends Initializable<void> {
  private socket: Socket | TLSSocket | undefined = undefined
  private lastDataReceived: number = 0

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super('BaseSocket', options, logicalAddress)
    this.wrappedLogger.info('base socket created')
    this.eventSignal.add(event => {
      switch (event.event) {
        case 'reconnect':
          this.initialize()
          break
      }
    })
    this._eventSignal.dispatch({ event: 'reconnect' })
  }

  protected async _initialize (): Promise<void> {
    // initialize socket
    this.socket = this.options.getSocket()

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

    // ready for a promise that is looking for 'socket_ready', treat all other events are failures
    await this.eventSignal.filter(signal => signal.event === 'base_socket_ready')
      .promisify(this.eventSignal)
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
