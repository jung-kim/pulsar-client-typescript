import { Producer, ProducerOption } from '../producer'
import { Connection, ConnectionPool } from '../connection'
import { WrappedLogger } from '../util/logger'
import { LookupService } from '../connection/lookupService'
import { _initializeOption, ConnectionOptions } from '../connection/connectionOptions'

/**
 * Client object is a factory for producers and consumers given an client option.  A client
 * knows how to connect to a pulsar cluster and maintain a connection pools that may create
 * a single connecions per brokers.  These connections in connection pool are not shared
 * with consumers and producers and they are exclusive for administrative purpose such as
 * topic partition count lookup.
 */
export class Client {
  private readonly cp: ConnectionPool
  private readonly logger: WrappedLogger
  public readonly option: ConnectionOptions

  constructor (option: Partial<ConnectionOptions>) {
    this.option = _initializeOption(option)
    this.cp = new ConnectionPool(this.option)
    this.logger = new WrappedLogger({ name: 'client', uuid: this.option.uuid })
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

    return this.cp.getConnection(logicalAddress)
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
    option._uuid = this.option.uuid
    return new Producer(option, this.cp)
  }
}
