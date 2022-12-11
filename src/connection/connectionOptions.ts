import { NoAuth } from '../auth/noauth'
import { Auth } from '../auth'
import os from 'os'
import { v4 } from 'uuid'
import ip from 'ip'

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

export interface _ConnectionOptions {
  url: string
  auth: Auth
  connectionTimeoutMs: number
  keepAliveIntervalMs: number
  maxMessageSize: number
  listenerName: string

  urlObj: URL
  connectionId: string
  isTlsEnabled: boolean
  uuid: string
}

export const _initializeOption = (options: ConnectionOptions): _ConnectionOptions => {
  const urlObj = new URL(options.url)
  return {
    url: options.url,
    connectionTimeoutMs: options.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS,
    keepAliveIntervalMs: options.keepAliveIntervalMs ?? DEFAULT_KEEP_ALIVE_INTERVAL_MS,
    maxMessageSize: options.maxMessageSize ?? DEFAULT_MAX_MESSAGE_SIZE,
    auth: options.auth ?? new NoAuth(),
    listenerName: options.listenerName ?? '',
    urlObj,
    connectionId: `${ip.address()} -> ${options.url}`,
    isTlsEnabled: urlObj.protocol === 'pulsar+ssl:' || urlObj.protocol === 'https:',
    uuid: v4()
  }
}
