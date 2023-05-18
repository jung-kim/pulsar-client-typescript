import { Message } from '..'
import { createConnection, Socket } from 'net'
import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import { Reader } from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { _ConnectionOptions } from '../ConnectionOptions'
import { Initializable } from './initializable'

/**
 * Has raw TCP socket conenction and raw functions for raw sockets
 */
export abstract class BaseSocket extends Initializable {
  protected socket: Socket | TLSSocket | undefined = undefined
  private lastDataReceived: number = 0

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super('BaseSocket', options, logicalAddress)
    this.wrappedLogger.info('base socket created')

    this._eventSignal.add((payload) => {
      switch (payload.event) {
        case 'close':
          this.closeRawSocket()
          break
        case 'connect':
          this.initialize()
          break
      }
    })
  }

  protected abstract receiveHandshake (baseCommand: BaseCommand): void

  protected initialize = (): void => {
    this.socket?.destroy()
    this.socket = this.options.isTlsEnabled
      ? connect({
        host: this.options.urlObj.hostname,
        port: parseInt(this.options.urlObj.port),
        servername: this.options.urlObj.hostname,
        timeout: this.options.connectionTimeoutMs
      })
      : createConnection({
        host: this.options.urlObj.hostname,
        port: parseInt(this.options.urlObj.port),
        timeout: this.options.connectionTimeoutMs
      })

    const timeout = setTimeout(() => {
      this._eventSignal.dispatch({ event: 'close' })
      this.wrappedLogger.error('raw socket connection timeout')
    }, this.options.connectionTimeoutMs)

    this.socket.on('close', () => {
      clearTimeout(timeout)
      this._eventSignal.dispatch({ event: 'close' })
      this.wrappedLogger.info('raw socket close requested by server')
    })

    this.socket.on('error', (err: Error) => {
      clearTimeout(timeout)
      this._eventSignal.dispatch({ event: 'close', err })
      this.wrappedLogger.info('raw socket error')
    })

    this.socket.on('data', (data: Buffer) => {
      const message = this.parseReceived(data)

      switch (message.baseCommand.type) {
        case BaseCommand_Type.PING:
          this._eventSignal.dispatch({ event: 'ping' })
          break
        case BaseCommand_Type.PONG:
          this._eventSignal.dispatch({ event: 'pong' })
          break
        case BaseCommand_Type.CONNECTED:
          this._eventSignal.dispatch({ event: 'handshake_response', command: message.baseCommand })
          break
        default:
          this._dataSignal.dispatch(message)
          break
      }
    })

    this.socket.once('ready', () => {
      clearTimeout(timeout)
      this._eventSignal.dispatch({ event: 'handshake_start' })
    })
  }

  /**
   * closes the connection.
   */
  private closeRawSocket (): void {
    this.socket?.destroy()
    this.socket = undefined
    this.wrappedLogger.info('closed raw socket')
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
