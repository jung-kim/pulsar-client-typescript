import { Message } from '..'
import { createConnection, Socket } from 'net'
import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import proto from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { _ConnectionOptions } from '../connectionOptions'
import { AbstractPulsarSocket } from './abstractPulsarSocket'
import { getDeferred } from '../../util/deferred'

/**
 * Has raw TCP socket conenction and raw functions for raw sockets
 */
export class RawSocket extends AbstractPulsarSocket {
  protected socket: Socket | TLSSocket | undefined = undefined
  private lastDataReceived: number = 0

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.wrappedLogger.info('base socket created')
  }

  protected initializeRawSocket = async (): Promise<void> => {
    if (this.initializeDeferrred !== undefined) {
      return await this.ensureReady()
    }

    this.initializeDeferrred = getDeferred()

    this.socket = this.options.isTlsEnabled
      ? connect({
        host: this.logicalAddress.hostname,
        port: parseInt(this.logicalAddress.port),
        servername: this.logicalAddress.hostname,
        timeout: this.options.connectionTimeoutMs
      })
      : createConnection({
        host: this.logicalAddress.hostname,
        port: parseInt(this.logicalAddress.port),
        timeout: this.options.connectionTimeoutMs
      })
    this.socket.setKeepAlive(true, 100000)

    const timeout = setTimeout(() => {
      this.wrappedLogger.error('raw socket connection timeout')
      this._eventSignal.dispatch({ event: 'close' })
    }, this.options.connectionTimeoutMs)

    this.socket.on('close', () => {
      clearTimeout(timeout)
      this.wrappedLogger.info('raw socket close requested by server')
      this._eventSignal.dispatch({ event: 'close' })
    })

    this.socket.on('error', (err: Error) => {
      clearTimeout(timeout)
      this.wrappedLogger.info('raw socket error')
      this._eventSignal.dispatch({ event: 'close', err })
    })

    this.socket.on('data', (data: Buffer) => {
      const message = this.parseReceived(data)
      clearTimeout(timeout)

      switch (message.baseCommand.type) {
        case BaseCommand_Type.PING:
          this._eventSignal.dispatch({ event: 'ping' })
          break
        case BaseCommand_Type.PONG:
          this._eventSignal.dispatch({ event: 'pong' })
          break
        case BaseCommand_Type.CONNECTED:
          this._eventSignal.dispatch({ event: 'handshake_response', message })
          break
        default:
          this._eventSignal.dispatch({ event: 'message', message })
          break
      }
    })

    this.socket.once('connect', () => {
      this._eventSignal.dispatch({ event: 'handshake_start' })
    })
    return await this.ensureReady()
  }

  /**
   * closes the connection.
   */
  public close (): void {
    super.close()
    this.socket?.destroy()
    this.socket = undefined
  }

  public async send (buffer: Uint8Array | Buffer): Promise<void> {
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

  protected parseReceived (data: Buffer): Message {
    this.lastDataReceived = (new Date()).getMilliseconds()
    const frameSize = (new proto.Reader(data.subarray(0, 4))).fixed32()
    const commandSize = (new proto.Reader(data.subarray(4, 8))).fixed32()
    const headersAndPayloadSize = frameSize - (commandSize + 4)

    const command = data.subarray(8, commandSize + 8)
    const headersAndPayload = data.subarray(commandSize + 8, commandSize + headersAndPayloadSize + 8)
    return {
      baseCommand: BaseCommand.decode(command),
      headersAndPayload
    }
  }

  public getLastDataReceived (): number {
    return this.lastDataReceived
  }
}
