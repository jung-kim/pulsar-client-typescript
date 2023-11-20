import { _ConnectionOptions } from '../connection/connectionOptions'
import { ConnectionOptions } from '../connection'

const defaultOperationTimeoutMs = 30 * 1000
const defaultMaxConnectionsPerHost = 1

export interface ClientOptions extends ConnectionOptions {
  operationTimeoutMs?: number
  maxConnectionsPerHost?: number
  maxWorkQueueSize?: number
}

export class _ClientOptions extends _ConnectionOptions {
  readonly operationTimeoutMs: number
  readonly maxConnectionsPerHost: number

  constructor (opt: ClientOptions) {
    super(opt)
    this.operationTimeoutMs = opt.operationTimeoutMs ?? defaultOperationTimeoutMs
    this.maxConnectionsPerHost = opt.maxConnectionsPerHost ?? defaultMaxConnectionsPerHost
  }
}
