import { NoAuth } from "../auth/noauth"
import { Auth } from "../auth"
import os from 'os'
import { v4 } from 'uuid'

export const DEFAULT_CONNECTION_TIMEOUT_MS = 10 * 1000
export const DEFAULT_KEEP_ALIVE_INTERVAL_MS = 30 * 1000
export const DEFAULT_MAX_MESSAGE_SIZE = 5 * 1024 * 1024
export const localAddress = Object.values(os.networkInterfaces())

export interface ConnectionOptions {
  url: string
  auth: Auth
  connectionTimeoutMs: number
  keepAliveIntervalMs: number
  maxMessageSize: number

  _url: URL
  _connectionId: string
  _isTlsEnabled: boolean
  _uuid: string
}

export const _initializeOption = (options: Partial<ConnectionOptions>) =>{
  if (!options.url) {
    throw Error('invalid url')
  }
  options._url = new URL(options.url)
  if (!options.auth) {
    options.auth = new NoAuth()
  }
  options.connectionTimeoutMs = options.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS
  options.keepAliveIntervalMs = options.keepAliveIntervalMs ?? DEFAULT_KEEP_ALIVE_INTERVAL_MS
  options._connectionId = `${localAddress} -> ${options.url}`
  options._isTlsEnabled = options._url.protocol === 'pulsar+ssl' || options._url.protocol === 'https'
  options._uuid = v4()

  return options as ConnectionOptions
}
