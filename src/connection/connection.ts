import { Auth } from 'auth'
import { Socket, createConnection } from 'net'
import { Reader, Writer } from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { URL } from 'url'
import { BaseCommand, BaseCommand_Type, ProtocolVersion } from '../proto/PulsarApi'
import AsyncRetry from 'async-retry'

const DEFAULT_TIMEOUT_MS = 10 * 1000
const DEFAULT_MAX_MESSAGEE_SIZE = 5 * 1024 * 1024

export interface ConnectionOptions {
  url: string
  auth: Auth
  timeoutMs?: number

  _hostname?: string
  _port?: number
  _protocol?: string
  _isTlsEnabled?: boolean
  _maxMesageSize?: number
}

export const initializeConnectionOption = (options: ConnectionOptions) => {
  const url = new URL(options.url)

  options._hostname = url.hostname
  options._port = parseInt(url.port)
  options._protocol = url.protocol

  switch (url.protocol) {
    case "pulsar:":
    case "http:":
      options._isTlsEnabled = false
      break
    case "pulsar+ssl:":
    case "https:":
      options._isTlsEnabled = true
      break
    default:
      throw Error('Invalid protocol was passed in')
  }

  if (options.timeoutMs) {
    options.timeoutMs = DEFAULT_TIMEOUT_MS
  }
  return options
}

export class Connection {
  private state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  private socket: Socket | TLSSocket | undefined = undefined
  private initializePromise: Promise<void> | undefined = undefined
  private readonly options: ConnectionOptions
  private readonly protocolVersion = ProtocolVersion.v13

  constructor(options: ConnectionOptions) {
    this.options = initializeConnectionOption(options)
    // set initializePromise
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

    this.initializePromise = AsyncRetry(
      async () => {
        let resolve: (v: void) => void
        let reject: (v: Error) => void
        const tcpConnectionPromise = new Promise((res, rej) => { 
          resolve = res 
          reject = rej
        })

        // initialize socket
        if (this.options._isTlsEnabled) {
          this.socket = connect({
            host: this.options._hostname,
            port: this.options._port,
            servername: this.options._hostname,
            timeout: this.options.timeoutMs
          })
        } else {
          this.socket = createConnection({
            host: this.options._hostname as string,
            port: this.options._port as number,
            timeout: this.options.timeoutMs
          })
        }
    
        this.socket.on('error', (err: Error) => {
          this.state = 'CLOSING'
          // close event will trigger automatically after this event so not destroying here.
          console.log('err', err)
        })
    
        this.socket.on('close', () => {
          this.state = 'CLOSING'
          reject(Error('socket closing'))
          console.log('close')
        })
    
        this.socket.once('ready', () => {
          // tcp socket is ready!
          resolve()
        })

        try {
          await tcpConnectionPromise
          await this.handShake()
        } catch(e) {
          this.close()
          throw e
        }
        this.state = 'READY'
      },
      {
        retries: 5,
        maxTimeout: 20000
      }
    )

    return this.initializePromise
  }

  /**
   * closes the connection. Can be reconnected via `reconnect`
   */
  close() {
    this.socket?.destroy()
    this.socket = undefined
    this.state = 'CLOSED'
    this.initializePromise = undefined
  }

  /**
   * gets read only copy of the options the connection is operating with.
   * @returns 
   */
  getOption(): Readonly<ConnectionOptions> {
    return this.options
  }

  /**
   * Send pulsar commands to the pulsar server.
   * @param command 
   * @returns 
   */
  async sendCommand(command: BaseCommand) {
    await this.ensureReady()
    return this._sendCommand(command)
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
    const { baseCommand } = this.internalReceiveCommand(response)

    if (!baseCommand.connected) {
      if (baseCommand.error) {
        console.error(`error during handshake ${baseCommand.error.message}`)
      } else {
        console.error(`unkonwn base command was received: ${baseCommand.type}`)
      }
      throw Error(`Invalid response recevived`)
    }

    if (baseCommand.connected?.maxMessageSize) {
      this.options._maxMesageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options._maxMesageSize = DEFAULT_MAX_MESSAGEE_SIZE
    }

    console.log('connected!!')
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

  private internalReceiveCommand(data: Buffer) {
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
