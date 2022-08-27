import { Auth } from 'auth'
import { Socket, createConnection } from 'net'
import { Writer } from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { URL } from 'url'
import { BaseCommand, BaseCommand_Type, ProtocolVersion } from '../proto/PulsarApi'

const DEFAULT_TIMEOUT_MS = 10 * 1000

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
  private options: ConnectionOptions
  private readonly protocolVersion = ProtocolVersion.v13

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

    this.socket.once('error', (err: Error) => {
      if (this.socket.readyState === 'opening') {
        this.state = 'CLOSING'
        this.destroy()
      }
      console.log('err', err)
      reject(err)
    })

    this.socket.once('close', () => {
      this.state = 'CLOSING'
      this.destroy()
      console.log('close')
      reject(Error('socket closing'))
    })

    this.socket.once('ready', () => {
      console.log('ready')
      resolve()
    })

    // send connect command
    this.initializePromise = this.connect()
  }

  destroy() {
    this.socket.destroy()
    this.state = 'CLOSED'
  }

  private async connect() {
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

    await this._sendCommand(payload)
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

    this.socket.once('data', (data: Buffer) => {
      console.log(388482, data)
      const test = BaseCommand.decode(data)
      console.log(838842, test)
    })
    
    this.socket.write(payload)
  }

  private async ensureReady() {
    await this.initializePromise
    if (this.state !== 'READY') {
      throw Error('Unable to connect')
    }
  }
}
