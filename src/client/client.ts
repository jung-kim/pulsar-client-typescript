import { Connection, ConnectionPool } from '../connection'
import { ClientOptions } from './clientOptions'

export class Client {
  readonly cp: ConnectionPool

  constructor (opt: ClientOptions) {
    this.cp = new ConnectionPool(opt)
  }

  /**
   * returns a connection
   * @param logicalAddress optional, if undefined return getAnyAdminConnection()
   * @returns Connection
   */
  protected getConnection (logicalAddress?: URL): Connection {
    if (logicalAddress === undefined) {
      return this.cp.getAnyAdminConnection()
    }

    return this.getConnection(logicalAddress)
  }

  /**
   * close all connections
   */
  public clear (): void {
    this.cp.clear()
  }
}
