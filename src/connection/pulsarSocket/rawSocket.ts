import { EventSignalType, Message } from '..'
import { Socket } from 'net'
import { TLSSocket } from 'tls'
import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import proto from 'protobufjs'
import { ConnectionOptions } from '../connectionOptions'
import { AbstractPulsarSocket } from './abstractPulsarSocket'
import { Signal } from 'micro-signals'
import _ from 'lodash'

/**
 * Has raw TCP socket conenction and raw functions for raw sockets
 */
export class RawSocket extends AbstractPulsarSocket {
  protected socket: Socket | TLSSocket | undefined = undefined
  private lastDataReceived: number = 0

  constructor (options: ConnectionOptions, logicalAddress: URL, _eventSignal: Signal<EventSignalType>) {
    super(options, logicalAddress, _eventSignal)
    this.wrappedLogger.info('base socket created')
  }

  public initializeRawSocket = _.debounce(async (): Promise<void> => {
    if (this.getState() === 'CLOSED') {
      this.setInitializing()
    } else {
      return
    }

    this.socket = this.options.getTcpSocket(this.logicalAddress)
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
      this.wrappedLogger.error('raw socket error', err)
      this._eventSignal.dispatch({ event: 'close' })
    })

    this.socket.on('data', (data: Buffer) => {
      clearTimeout(timeout)
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
  }, this.options.connectionTimeoutMs, { leading: true, trailing: false })

  /**
   * closes the connection.
   */
  public close (): void {
    super.setClosed()
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
