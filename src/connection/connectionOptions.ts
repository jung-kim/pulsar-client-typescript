import { Auth } from "auth"

export interface ConnectionOptionsRaw {
  url: string
  auth: Auth
  connectionTimeoutMs?: number
  keepAliveIntervalMs?: number
}

export interface ConnectionOptions {
  url: string
  auth: Auth
  connectionTimeoutMs: number
  keepAliveIntervalMs: number
  connectionId: string
  _hostname?: string
  _port?: number
  _protocol?: string
  _isTlsEnabled?: boolean
  _maxMessageSize?: number
}
