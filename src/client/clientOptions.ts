import { ConnectionOptions } from '../connection'

const defaultOperationTimeoutMs = 30 * 1000
const defaultMaxConnectionsPerHost = 1

export interface ClientOptions extends ConnectionOptions {
  operationTimeoutMs: number
  maxConnectionsPerHost: number
}

export class _ClientOptions {
  readonly operationTimeoutMs: number
  readonly maxConnectionsPerHost: number

  constructor (opt: ClientOptions) {
    this.operationTimeoutMs = opt.operationTimeoutMs ?? defaultOperationTimeoutMs
    this.maxConnectionsPerHost = opt.maxConnectionsPerHost ?? defaultMaxConnectionsPerHost
  }
}
