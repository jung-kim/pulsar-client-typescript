import { Socket } from "net"
import { BaseCommand, BaseCommand_Type } from "proto/PulsarApi";
import { Reader, Writer } from "protobufjs";
import { TLSSocket } from "tls";
import { Message } from "./abstractPulsarSocket";
import { Connection } from "./Connection";
import { PingPongSocket } from "./pingPongSocket";
import { DEFAULT_MAX_MESSAGE_SIZE } from './ConnectionOptions'

const pulsarClientVersion = 'Pulsar TS 0.1'

export class PulsarSocket extends PingPongSocket {
  private readonly logicalAddress: URL
  constructor(connection: Connection, logicalAddress: URL) {
    super(connection)
    this.logicalAddress = logicalAddress
  }

  getId() {
    return this.options._connectionId
  }

  public async writeCommand(command: BaseCommand): Promise<void> {
    await this.ensureReady()

    const marshalledCommand = BaseCommand.encode(command).finish()
    const commandSize = marshalledCommand.length
    const frameSize = commandSize + 4

    const payload = new Uint8Array([
      // This is where custom "frame" attributes comes in, which is fixed 32 bit numeric command and frame
      // size is inserted before the command
      ...(new Writer()).fixed32(frameSize).finish().reverse(),
      ...(new Writer()).fixed32(commandSize).finish().reverse(),
      ...marshalledCommand
    ])
    return this.send(payload)
  }

  public async handleAuthChallenge(_: Message) {
    try {
      const authData = await this.options.auth.getAuthData()
      const payload = BaseCommand.fromJSON({
        type: BaseCommand_Type.AUTH_RESPONSE,
        connect: {
          protocolVersion: this.protocolVersion,
          clientVersion: pulsarClientVersion,
          authMethodName: this.options.auth.name,
          authData: Buffer.from(authData).toString('base64'),
          featureFlags: {
            supportsAuthRefresh: true
          }
        }
      })
      this.writeCommand(payload)
    } catch (e) {
      this.wrappedLogger.error('auth challeng failed', e)
    }
  }

  protected handleData(data: Buffer) {
    try {
      this.wrappedLogger.debug('handling data')
      const message = this.parseReceived(data)
      this._dataStream.dispatch(message)
    } catch (e) {
      this.wrappedLogger.error('error received while parsing received message', e)
    }
  }

  /**
   * Wait for existing or non existing initialization attempt to finish,
   * and throws error if state is not ready, if ready, proceeds.
   * 
   * Await on this function before send anything to pulsar cluster.
   */
  private async ensureReady() {
    await this.getInitializePromise()
    if (this.state !== 'READY') {
      throw Error('Socket not connected')
    }
  }

  /**
   * Attempts handshake with pulsar server with established tcp socket.
   * Assumes tcp connection is established
   */
  protected async handshake(socket: Socket | TLSSocket | undefined) {
    if (this.state !== 'INITIALIZING') {
      throw Error(`Invalid state: ${this.state}`)
    }

    if (!socket || socket.readyState !== 'open') {
      throw Error(`socket is not defined or not ready`)
    }

    const authType = this.options.auth.name
    const authData = await this.options.auth.getAuthData()
    const payload = BaseCommand.fromJSON({
      type: BaseCommand_Type.CONNECT,
      connect: {
        protocolVersion: this.protocolVersion,
        clientVersion: pulsarClientVersion,
        authMethodName: authType,
        authData: Buffer.from(authData).toString('base64'),
        featureFlags: {
          supportsAuthRefresh: true
        },
        proxyToBrokerUrl: this.logicalAddress.href === this.options._url.href ? undefined : this.logicalAddress.host
      }
    })

    let handShakeResolve: (v: Buffer) => void
    const handShakePromise = new Promise<Buffer>((res, rej) => {
      handShakeResolve = res
    })
    socket?.once('data', (data: Buffer) => {
      handShakeResolve(data)
    })

    await this.writeCommand(payload)
    const response = await handShakePromise
    const { baseCommand } = this.parseReceived(response)

    if (!baseCommand.connected) {
      if (baseCommand.error) {
        this.wrappedLogger.error(`error during handshake`, baseCommand.error)
      } else {
        this.wrappedLogger.error(
          `unkonwn base command was received`,
          undefined,
          { baseCommandType: baseCommand.type }
        )
      }
      throw Error(`Invalid response recevived`)
    }

    if (baseCommand.connected?.maxMessageSize && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.wrappedLogger.info('connected!!')
  }

  protected _parseReceived(data: Buffer): Message {
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
