import { NoAuth } from '../auth/noauth'
import { Auth } from '../auth'
import os from 'os'
import { v4 } from 'uuid'
import ip from 'ip'
import { createConnection, Socket } from 'net'
import { connect } from 'tls'

export const DEFAULT_CONNECTION_TIMEOUT_MS = 10 * 1000
export const DEFAULT_KEEP_ALIVE_INTERVAL_MS = 30 * 1000
export const DEFAULT_MAX_MESSAGE_SIZE = 5 * 1024 * 1024
export const localAddress = Object.values(os.networkInterfaces())

export interface ConnectionOptions {
  url: string
  auth?: Auth
  connectionTimeoutMs?: number
  keepAliveIntervalMs?: number
  maxMessageSize?: number
  listenerName?: string
}

export class _ConnectionOptions {
  readonly url: string
  readonly auth: Auth
  readonly connectionTimeoutMs: number
  readonly keepAliveIntervalMs: number
  maxMessageSize: number // maybe modified later after connection is established
  readonly listenerName: string
  readonly urlObj: URL
  readonly connectionId: string
  readonly isTlsEnabled: boolean
  readonly uuid: string

  constructor (options: ConnectionOptions) {
    const urlObj = new URL(options.url)

    this.url = options.url
    this.connectionTimeoutMs = options.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS
    this.keepAliveIntervalMs = options.keepAliveIntervalMs ?? DEFAULT_KEEP_ALIVE_INTERVAL_MS
    this.maxMessageSize = options.maxMessageSize ?? DEFAULT_MAX_MESSAGE_SIZE
    this.auth = options.auth ?? new NoAuth()
    this.listenerName = options.listenerName ?? ''
    this.urlObj = urlObj
    this.connectionId = `${ip.address()} -> ${options.url}`
    this.isTlsEnabled = urlObj.protocol === 'pulsar+ssl:' || urlObj.protocol === 'https:'
    this.uuid = v4()
  }

  getSocket (): Socket {
    return this.isTlsEnabled
      ? connect({
        host: this.urlObj.hostname,
        port: parseInt(this.urlObj.port),
        servername: this.urlObj.hostname,
        timeout: this.connectionTimeoutMs
      })
      : createConnection({
        host: this.urlObj.hostname,
        port: parseInt(this.urlObj.port),
        timeout: this.connectionTimeoutMs
      })
  }
}
