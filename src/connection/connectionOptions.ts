import { NoAuth } from '../auth/noauth'
import { Auth } from '../auth'
import { v4 } from 'uuid'
import ip from 'ip'
import { DEFAULT_CONNECTION_TIMEOUT_MS, DEFAULT_KEEP_ALIVE_INTERVAL_MS, DEFAULT_MAX_MESSAGE_SIZE, EventSignalType, Message } from './index'
import { Signal } from 'micro-signals'
import { WrappedLogger } from '../util/logger'

export interface ConnectionOptions {
  url: string
  auth?: Auth
  connectionTimeoutMs?: number
  keepAliveIntervalMs?: number
  maxMessageSize?: number
  listenerName?: string
}

export class _ConnectionOptions {
  readonly auth: Auth
  readonly connectionTimeoutMs: number
  readonly keepAliveIntervalMs: number
  maxMessageSize: number // maybe modified later after connection is established from server response
  readonly listenerName: string
  readonly urlObj: URL
  readonly connectionId: string
  readonly isTlsEnabled: boolean
  readonly uuid: string
  readonly _eventSignal = new Signal<EventSignalType>()
  readonly _dataSignal = new Signal<Message>()

  constructor (options: ConnectionOptions) {
    const urlObj = new URL(options.url)

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

  getWrappedLogger (name: string, logicalAddress: URL): WrappedLogger {
    return new WrappedLogger({
      name,
      uuid: this.uuid,
      host: logicalAddress.host
    })
  }
}
