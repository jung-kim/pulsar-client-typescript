import { NoAuth } from '../auth/noauth'
import { Auth } from '../auth'
import { v4 } from 'uuid'
import ip from 'ip'
import { createConnection, Socket } from 'net'
import { connect } from 'tls'
import { DEFAULT_CONNECTION_TIMEOUT_MS, DEFAULT_KEEP_ALIVE_INTERVAL_MS, DEFAULT_MAX_MESSAGE_SIZE, EventSignalType, Message } from './index'
import { Signal } from 'micro-signals'
import { PulsarSocket } from './pulsarSocket'
import { WrappedLogger } from '../util/logger'
import { getDeferred } from '../../src/util/deferred'

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

  async getSocket (): Promise<Socket> {
    const socket = this.isTlsEnabled
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
    const baseSocketDeferred = getDeferred<Socket>()

    const timeout = setTimeout(() => {
      baseSocketDeferred.reject()
    }, this.connectionTimeoutMs)

    socket.on('close', () => {
      clearTimeout(timeout)
      socket.destroy()
      baseSocketDeferred.reject()
    })
    socket.on('error', (err: Error) => {
      clearTimeout(timeout)
      socket.destroy()
      baseSocketDeferred.reject(err)
    })
    socket.once('ready', () => {
      clearTimeout(timeout)
      baseSocketDeferred.resolve(socket)
    })

    return await baseSocketDeferred.promise
  }

  getNewPulsarSocket (logicalAddress: URL): PulsarSocket {
    return new PulsarSocket(this, logicalAddress)
  }

  getWrappedLogger (name: string, logicalAddress: URL): WrappedLogger {
    return new WrappedLogger({
      name,
      uuid: this.uuid,
      id: `${this.connectionId}-${logicalAddress.host}`
    })
  }
}
