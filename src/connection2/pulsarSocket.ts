import { BaseCommand, BaseCommand_Type } from '../proto/PulsarApi'
import { Reader, Writer } from 'protobufjs'
import { Message } from './index'
import { DEFAULT_MAX_MESSAGE_SIZE, PROTOCOL_VERSION, PULSAR_CLIENT_VERSION, _ConnectionOptions } from './ConnectionOptions'
import { BaseSocket } from './baseSocket'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from 'util/logger'
import { Initializable } from './initializable'

export class PulsarSocket extends Initializable<void> {
  private readonly logicalAddress: URL
  private readonly options: _ConnectionOptions
  protected lastDataReceived: number = 0
  protected readonly _dataStream: Signal<Message>
  public readonly dataStream: ReadableSignal<Message>
  public readonly baseSocket: BaseSocket
  public readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options)
    this.options = options
    this.baseSocket = new BaseSocket(options)
    this.logicalAddress = logicalAddress
    this._dataStream = options.getDataStream()
    this.dataStream = this._dataStream.readOnly()
    this.wrappedLogger = new WrappedLogger({
      name: 'PulsarSocket',
      url: this.options.url,
      uuid: this.options.uuid
    })

    this.options.eventStream.add(event => {
      switch (event) {
        case 'close':
          this.onClose()
          break
        case 'base_socket_ready':
          this.initialize()
          break
      }
    })
  }

  public async writeCommand (command: BaseCommand): Promise<void> {
    await this.ensureReady()

    const marshalledCommand = BaseCommand.encode(command).finish()
    const payload = new Uint8Array(4 + 4 + marshalledCommand.length)
    payload.set((new Writer()).fixed32(4 + marshalledCommand.length).finish().reverse())
    payload.set((new Writer()).fixed32(marshalledCommand.length).finish().reverse())
    payload.set(marshalledCommand)

    return await this.baseSocket.send(payload)
  }

  public async handleAuthChallenge (_: Message): Promise<void> {
    try {
      const authData = await this.options.auth.getToken()
      const payload = BaseCommand.fromJSON({
        type: BaseCommand_Type.AUTH_RESPONSE,
        connect: {
          protocolVersion: PROTOCOL_VERSION,
          clientVersion: PULSAR_CLIENT_VERSION,
          authMethodName: this.options.auth.name,
          authData: Buffer.from(authData).toString('base64'),
          featureFlags: {
            supportsAuthRefresh: true
          }
        }
      })
      return await this.writeCommand(payload)
    } catch (e) {
      this.wrappedLogger.error('auth challeng failed', e)
    }
  }

  protected handleData (data: Buffer): void {
    try {
      const message = this.parseReceived(data)
      this._dataStream.dispatch(message)
    } catch (e) {
      this.wrappedLogger.error('error received while parsing received message', e)
    }
  }

  protected async _initialize (): Promise<void> {
    return await this.handshake()
  }

  /**
   * Attempts handshake with pulsar server with established tcp socket.
   * Assumes tcp connection is established
   */
  protected async handshake (): Promise<void> {
    await this.ensureReady()
    const socket = this.baseSocket.getSocket()
    if ((socket === undefined) || socket.readyState !== 'open') {
      throw Error('socket is not defined or not ready')
    }

    const authData = await this.options.auth.getToken()
    const payload = BaseCommand.fromJSON({
      type: BaseCommand_Type.CONNECT,
      connect: {
        protocolVersion: PROTOCOL_VERSION,
        clientVersion: PULSAR_CLIENT_VERSION,
        authMethodName: this.options.auth.name,
        authData: Buffer.from(authData).toString('base64'),
        featureFlags: {
          supportsAuthRefresh: true
        },
        proxyToBrokerUrl: this.logicalAddress.href === this.options.urlObj.href ? undefined : this.logicalAddress.host
      }
    })

    let handShakeResolve: (v: Buffer) => void
    const handShakePromise = new Promise<Buffer>((resolve) => {
      handShakeResolve = resolve
    })
    socket?.once('data', (data: Buffer) => {
      handShakeResolve(data)
    })

    await this.writeCommand(payload)
    const response = await handShakePromise
    const { baseCommand } = this.parseReceived(response)

    if (baseCommand.connected === undefined) {
      if (baseCommand.error !== undefined) {
        this.wrappedLogger.error('error during handshake', baseCommand.error)
      } else {
        this.wrappedLogger.error(
          'unkonwn base command was received',
          undefined,
          { baseCommandType: baseCommand.type }
        )
      }
      throw Error('Invalid response recevived')
    }

    if ((baseCommand.connected?.maxMessageSize ?? 0) > 0 && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.wrappedLogger.info('connected!!')
  }

  protected parseReceived (data: Buffer): Message {
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
}
