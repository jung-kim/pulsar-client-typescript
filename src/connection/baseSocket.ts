import { Socket, createConnection } from 'net'
import { connect, TLSSocket } from 'tls'
import AsyncRetry from 'async-retry'
import { Connection } from './Connection'
import { BaseCommand, BaseCommand_Type, ProtocolVersion } from '../proto/PulsarApi'
import { Reader, Writer } from 'protobufjs'
import { ConnectionOptions } from './ConnectionOptions'
import { Signal } from 'micro-signals';

export interface Message {
  baseCommand: BaseCommand,
  headersAndPayload: Buffer,
}

/**
 * represents raw socket conenction to pulsar.
 * This object is to be used by Connection
 */
export class BaseSocket {
  private state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  protected socket: Socket | TLSSocket | undefined = undefined
  private initializePromise: Promise<void> | undefined = undefined
  private initializePromiseRes: (() => void) | undefined = undefined
  private initializePromiseRej: ((e: any) => void) | undefined = undefined
  private _dataStream = new Signal<Message>()
  protected readonly parent: Connection
  protected readonly options: ConnectionOptions
  protected readonly protocolVersion = ProtocolVersion.v13
  public dataStream = this._dataStream.readOnly()

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
        await this.handShake()

        // no errors, socket is ready
        if (this.state === 'INITIALIZING') {
          this.state = 'READY'
        }

        this.socket?.on('data', (data: Buffer) => {
          try {
            const message = this.parseReceived(data)
            this._dataStream.dispatch(message)
          } catch(e) {
            console.error('error received while parsing received message', e)
          }
        })
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

  async sendCommand(command: BaseCommand) {
    await this.ensureReady()
    return this._sendCommand(command)
  }

  private async _sendCommand(command: BaseCommand) {
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

    this.socket?.write(payload)
  }

  /**
   * Wait for existing or non existing initialization attempt to finish,
   * and throws error if state is not ready, if ready, proceeds.
   * 
   * Await on this function before send anything to pulsar cluster.
   */
  private async ensureReady() {
    await this.initializePromise
    if (this.state !== 'READY') {
      throw Error('Socket not connected')
    }
  }

  /**
   * Attempts handshake with pulsar server with established tcp socket.
   * Assumes tcp connection is established
   */
  private async handShake() {
    if (this.state !== 'INITIALIZING') {
      throw Error(`Invalid state: ${this.state}`)
    }

    if (!this.socket || this.socket.readyState !== 'open') {
      throw Error(`socket is not defined or not ready`)
    }

    const authType = this.options.auth.name
    const authData = await this.options.auth.getAuthData()
    const payload = BaseCommand.fromJSON({
      type: BaseCommand_Type.CONNECT,
      connect: {
        protocolVersion: this.protocolVersion,
        clientVersion: "Pulsar TS 0.1",
        authMethodName: authType,
        authData: Buffer.from(authData).toString('base64'),
        featureFlags: {
          supportsAuthRefresh: true
        }
      }
    })

    let handShakeResolve: (v: Buffer) => void
    const handShakePromise = new Promise<Buffer>((res, rej) => {
      handShakeResolve = res
    })
    this.socket?.once('data', (data: Buffer) => {
      handShakeResolve(data)
    })

    await this._sendCommand(payload)
    const response = await handShakePromise
    const { baseCommand } = this.parseReceived(response)

    if (!baseCommand.connected) {
      if (baseCommand.error) {
        console.error(`error during handshake ${baseCommand.error.message}`)
      } else {
        console.error(`unkonwn base command was received: ${baseCommand.type}`)
      }
      throw Error(`Invalid response recevived`)
    }

    this.options.setMaxMessageSize(baseCommand.connected?.maxMessageSize)

    console.log('connected!!')
  }

  protected parseReceived(data: Buffer): Message {
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