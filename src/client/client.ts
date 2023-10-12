import { Producer, ProducerOption } from '../producer'
import { Connection, ConnectionPool } from '../connection'
import { ClientOptions, _ClientOptions } from './clientOptions'
import { WrappedLogger } from '../util/logger'
import { v4 } from 'uuid'
import { LookupService } from '../connection/lookupService'

export class Client {
  private readonly cp: ConnectionPool
  private readonly logger: WrappedLogger
  public readonly opt: _ClientOptions

  constructor (opt: ClientOptions) {
    this.cp = new ConnectionPool(opt)
    this.opt = new _ClientOptions(opt)
    this.logger = new WrappedLogger({ uuid: `client-${v4()}` })
  }

  /**
   * returns a connection
   * @param logicalAddress optional, if undefined return getAnyAdminConnection()
   * @returns Connection
   */
  public getConnection (logicalAddress?: URL): Connection {
    if (logicalAddress === undefined) {
      return this.cp.getAnyAdminConnection()
    }

    return this.getConnection(logicalAddress)
  }

  public getLookupService (): LookupService {
    return this.cp.lookupService
  }

  /**
   * close all connections
   */
  public clear (): void {
    this.cp.clear()
  }

  public createProducer (option: Partial<ProducerOption>): Producer {
    return new Producer(option, this.cp)
  }
}
