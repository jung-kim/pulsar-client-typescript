import * as net from 'net'
import { Writer } from 'protobufjs'
import { connect, TLSSocket } from 'tls'
import { URL } from 'url'
import { BaseCommand } from '../proto/PulsarApi'

const DEFAULT_TIMEOUT_MS = 10 * 1000

export interface ConnectionOptions {
  url: string
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
  private socket: net.Socket | TLSSocket
  private isReady: Promise<boolean>
  private options: ConnectionOptions

  constructor(options: ConnectionOptions) {
    this.options = initializeConnectionOption(options)
    if (!options._hostname || !options._port) {
      throw Error('Invalid url was passed in')
    }

    let resolve: (v: boolean) => void
    this.isReady = new Promise((res) => { resolve = res })

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
      this.socket = net.createConnection({
        host: this.options._hostname,
        port: this.options._port,
        timeout: this.options.timeoutMs
      })
    }

    this.socket.on('error', (err) => {
      if (this.socket.readyState === 'opening') {
        this.destroy()
      }
      console.log('err', err)
    })

    this.socket.once('close', () => {
      this.destroy()
      console.log('close')
    })

    this.socket.once('ready', () => {
      console.log('ready')
    })
  }

  destroy() {
    this.socket.destroy()
    this.isReady = Promise.reject(new Error('Socket is destroyed'))
  }
  
  async sendCommand(command: BaseCommand) {
    if (!(await this.isReady)) {
      throw Error('Unable to connect')
    }

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
    })
    
    this.socket.write(payload, () => {
      console.log(1881818, arguments)
    })
  }
}
