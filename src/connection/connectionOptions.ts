import { NoAuth } from "../auth/noauth"
import { Auth } from "../auth"
import os from 'os'

export const DEFAULT_CONNECTION_TIMEOUT_MS = 10 * 1000
export const DEFAULT_KEEP_ALIVE_INTERVAL_MS = 30 * 1000
export const DEFAULT_MAX_MESSAGE_SIZE = 5 * 1024 * 1024
export const localAddress = Object.values(os.networkInterfaces())

export interface ConnectionOptions {
  url: string
  auth: Auth
  connectionTimeoutMs: number
  keepAliveIntervalMs: number
  _connectionId: string
  _hostname: string
  _port: number
  _protocol: string
  _isTlsEnabled: boolean
  maxMessageSize: number
}

export const _initializeOption = (options: Partial<ConnectionOptions>) =>{
  if (!options.url) {
    throw Error('invalid url')
  }
  const url = new URL(options.url)
  if (!options.auth) {
    options.auth = new NoAuth()
  }
  options.connectionTimeoutMs = options.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS
  options.keepAliveIntervalMs = options.keepAliveIntervalMs ?? DEFAULT_KEEP_ALIVE_INTERVAL_MS
  options._connectionId = `${localAddress} -> ${options.url}`
  options._hostname = url.hostname,
  options._port = parseInt(url.port),
  options._protocol = url.protocol,
  options._isTlsEnabled = url.protocol === 'pulsar+ssl' || url.protocol === 'https'

  return options as ConnectionOptions
}
