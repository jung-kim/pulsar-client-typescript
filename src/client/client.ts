import { Producer, ProducerOption } from '../producer'
import { Connection, ConnectionPool } from '../connection'
import { ClientOptions } from './clientOptions'
import { WrappedLogger } from '../util/logger'
import { LookupService } from '../connection/lookupService'
import { _initializeOption } from '../connection/connectionOptions'

export class Client {
  private readonly cp: ConnectionPool
  private readonly logger: WrappedLogger
  public readonly option: ClientOptions

  constructor (option: Partial<ClientOptions>) {
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
