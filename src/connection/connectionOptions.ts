import { Auth } from "auth"

const DEFAULT_TIMEOUT_MS = 10 * 1000
const DEFAULT_MAX_MESSAGEE_SIZE = 5 * 1024 * 1024

export interface ConnectionOptionsRaw {
  url: string
  auth: Auth
  timeoutMs?: number
}

export class ConnectionOptions {
  public readonly url: string
  public readonly auth: Auth
  public readonly timeoutMs?: number

  public readonly _hostname?: string
  public readonly _port?: number
  public readonly _protocol?: string
  public readonly _isTlsEnabled?: boolean
  public _maxMesageSize?: number

  constructor(options: ConnectionOptionsRaw) {
    const url = new URL(options.url)

    this.url = options.url
    this.auth = options.auth

    this._hostname = url.hostname
    this._port = parseInt(url.port)
    this._protocol = url.protocol

    switch (url.protocol) {
      case "pulsar:":
      case "http:":
        this._isTlsEnabled = false
        break
      case "pulsar+ssl:":
      case "https:":
        this._isTlsEnabled = true
        break
      default:
        throw Error('Invalid protocol was passed in')
    }

    if (options.timeoutMs) {
      options.timeoutMs = DEFAULT_TIMEOUT_MS
    }
  }


  setMaxMessageSize(value: number | undefined) {
    this._maxMesageSize = value ?? DEFAULT_MAX_MESSAGEE_SIZE
  }
}