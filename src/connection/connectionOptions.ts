import { NoAuth } from '../auth/noauth'
import { Auth } from '../auth'
import ip from 'ip'
import { DEFAULT_CONNECTION_TIMEOUT_MS, DEFAULT_KEEP_ALIVE_INTERVAL_MS, DEFAULT_MAX_MESSAGE_SIZE, DEFAULT_MAX_WORK_QUEUE_SIZE } from './index'
import { v4 } from 'uuid'
import { Socket, createConnection } from 'net'
import { TLSSocket, connect } from 'tls'

export interface ConnectionOptions {
  url: string
  uuid: string
  auth: Auth
  connectionTimeoutMs: number
  keepAliveIntervalMs: number
  maxMessageSize: number
  listenerName: string
  maxWorkQueueSize: number

  _urlObj: URL
  _connectionId: string
  _isTlsEnabled: boolean
  getTcpSocket: (logicalAddress: URL) => Socket | TLSSocket
}

export const _initializeOption = (option: Partial<ConnectionOptions>): ConnectionOptions => {
  if (option.url === undefined) {
    throw Error('url is required')
  }

  const urlObj = new URL(option.url)

  if (option.maxWorkQueueSize !== undefined && option.maxWorkQueueSize < 0) {
    throw Error('maxWorkQueueSize cannot be less than 0')
  }

  const connectionTimeoutMs = option.connectionTimeoutMs ?? DEFAULT_CONNECTION_TIMEOUT_MS
  const isTlsEnabled = urlObj.protocol === 'pulsar+ssl:' || urlObj.protocol === 'https:'

  return {
    url: option.url,
    uuid: v4(),
    auth: option.auth ?? new NoAuth(),
    connectionTimeoutMs,
    keepAliveIntervalMs: option.keepAliveIntervalMs ?? DEFAULT_KEEP_ALIVE_INTERVAL_MS,
    maxMessageSize: option.maxMessageSize ?? DEFAULT_MAX_MESSAGE_SIZE,
    listenerName: option.listenerName ?? '',
    maxWorkQueueSize: option.maxWorkQueueSize ?? DEFAULT_MAX_WORK_QUEUE_SIZE,

    _urlObj: urlObj,
    _connectionId: `${ip.address()} -> ${option.url}`,
    _isTlsEnabled: isTlsEnabled,

    getTcpSocket: (logicalAddress: URL): Socket | TLSSocket => {
      return isTlsEnabled
        ? connect({
          host: logicalAddress.hostname,
          port: parseInt(logicalAddress.port),
          servername: logicalAddress.hostname,
          timeout: connectionTimeoutMs
        })
        : createConnection({
          host: logicalAddress.hostname,
          port: parseInt(logicalAddress.port),
          timeout: connectionTimeoutMs
        })
    }
  }
}
