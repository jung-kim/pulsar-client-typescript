import { Auth } from 'auth'
import { Socket, createConnection } from 'net'
import { Reader, Writer } from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { URL } from 'url'
import { BaseCommand, BaseCommand_Type, ProtocolVersion } from '../proto/PulsarApi'

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
  private socket: Socket | TLSSocket
  private state: 'INITIALIZING' | 'READY' | 'CLOSING' | 'CLOSED' | 'UNKNOWN' = 'INITIALIZING'
  private readonly tcpConnectionPromise: Promise<void>
  private readonly initializePromise: Promise<void>
  private readonly options: ConnectionOptions
  private readonly protocolVersion = ProtocolVersion.v13
  private maxMesageSize: number = -1

  constructor(options: ConnectionOptions) {
    this.options = initializeConnectionOption(options)
    if (!options._hostname || !options._port) {
      throw Error('Invalid url was passed in')
    }

    let resolve: (v: void) => void
    let reject: (v: Error) => void
    this.tcpConnectionPromise = new Promise((res, rej) => { 
      resolve = res 
      reject = rej
    })

    // initializing socket
    if (!this.options._hostname || !this.options._port) {
      throw Error('Invalid url was passed in')
    }

    if (this.options._isTlsEnabled) {
      this.socket = connect({
        host: this.options._hostname,
        port: this.options._port,
        servername: this.options._hostname,
        timeout: this.options.timeoutMs
      })
    } else {
      this.socket = createConnection({
        host: this.options._hostname,
        port: this.options._port,
        timeout: this.options.timeoutMs
      })
    }

    this.socket.on('error', (err: Error) => {
      // close event will trigger automatically after this event so not destroying here.
      console.log('err', err)
    })

    this.socket.on('close', () => {
      this.state = 'CLOSING'
      reject(Error('socket closing'))
      this.destroy()
      console.log('close')
    })

    this.socket.once('ready', () => {
      console.log('ready')
      resolve()
    })

    // send connect command
    this.initializePromise = this.handShake()
  }

  destroy() {
    this.socket.destroy()
    this.state = 'CLOSED'
  }

  private async handShake() {
    await this.tcpConnectionPromise

    if (this.state !== 'INITIALIZING') {
      throw Error(`Invalid state: ${this.state}`)
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
    this.socket.once('data', (data: Buffer) => {
      handShakeResolve(data)
    })

    await this._sendCommand(payload)
    const response = await handShakePromise
    const { baseCommand } = this.internalReceiveCommand(response)

    if (!baseCommand.connected) {
      if (baseCommand.error) {
        console.log(`error during handshake ${baseCommand.error.message}`)
      } else {
        this.destroy()
        throw Error(`Invalid response recevived`)
      }
    }

    if (baseCommand.connected?.maxMessageSize) {
      this.maxMesageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.maxMesageSize = DEFAULT_MAX_MESSAGEE_SIZE
    }

    this.state = 'READY'
    console.log('connected!!')
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

    this.socket.write(payload)
  }

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
