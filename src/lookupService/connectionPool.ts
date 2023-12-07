import { WrappedLogger } from '../util/logger'
import { BaseCommand, BaseCommand_Type, CommandLookupTopic, CommandLookupTopicResponse, CommandLookupTopicResponse_LookupType } from '../proto/PulsarApi'
import { Connection, ConnectionOptions } from '../connection'

export const LOOKUP_RESULT_MAX_REDIRECT = 20

/**
 * Connection pool is a collection of connections to an instance of pulsar brokers.  A connection pool
 * at most have a number of connections equal to the number of brokers within a pulsar cluster.
 *
 * Connection pool is used by a client object.
 */
export class ConnectionPool {
  // These connections are not used for topic message traffics.  Rather
  // they are use for look ups and other administrative tasks.
  private readonly connections: Map<string, Connection> = new Map()
  private readonly options: ConnectionOptions
  private readonly wrappedLogger: WrappedLogger

  constructor (options: ConnectionOptions) {
    this.options = options
    this.wrappedLogger = new WrappedLogger({
      name: 'connection-pool',
      uuid: this.options.uuid,
      host: this.options._urlObj.host
    })
  }

  close (): void {
    Object.values(this.connections).forEach(c => c.close())
  }

  public async getAnyAdminConnection (): Promise<Connection> {
    const cnx: Connection = Object.values(this.connections).find(cnx => cnx.isReady()) ?? this.getConnection(this.options._urlObj)
    await cnx.ensureReady()
    return cnx
  }

  /**
   * returns a persistant connection to a pulsar broker's logical address.  previously created connection
   * is returned if same logical addresss is requested.
   */
  private getConnection (logicalAddress: URL): Connection {
    let cnx = this.connections.get(logicalAddress.href)
    if (cnx !== undefined) {
      this.wrappedLogger.debug('connection is found in cache', { logicalAddress })
      return cnx
    }

    cnx = new Connection(this.options, logicalAddress)
    this.connections.set(logicalAddress.href, cnx)
    this.wrappedLogger.debug('connection is created', { logicalAddress })
    return cnx
  }

  async lookupTopic (topic: string, listenerName: string = this.options.listenerName): Promise<URL> {
    this.wrappedLogger.debug('looking up', { topic, listenerName })
    const lookupCommand = BaseCommand.fromJSON({
      type: BaseCommand_Type.LOOKUP,
      lookupTopic: CommandLookupTopic.fromJSON({
        topic,
        authoritative: false,
        advertisedListenerName: listenerName
      })
    })

    const cnx = await this.getAnyAdminConnection()
    let res = await cnx.sendCommand(lookupCommand) as CommandLookupTopicResponse

    for (let i = 0; i < LOOKUP_RESULT_MAX_REDIRECT; i++) {
      const logicalAddress = this.options._isTlsEnabled
        ? res.brokerServiceUrlTls
        : res.brokerServiceUrl
      const logicalAddrUrl = new URL(logicalAddress)

      if (res.response === CommandLookupTopicResponse_LookupType.Connect) {
        this.wrappedLogger.debug('lookup success', { topic, listenerName, logicalAddress })
        return logicalAddrUrl
      } else if (res.response === CommandLookupTopicResponse_LookupType.Failed) {
        this.wrappedLogger.error('lookup failed', { topic, listenerName, res })
        throw Error(`Failed to lookup.  topic: [${topic}] listenerName [${listenerName}] error: [${res.error}]`)
      }

      lookupCommand.lookupTopic.authoritative = res.authoritative

      // handle redirects
      this.wrappedLogger.debug('lookup is redirected', { topic, listenerName })
      const cnx = this.getConnection(logicalAddrUrl)
      res = (await cnx.sendCommand(lookupCommand)) as CommandLookupTopicResponse
    }

    this.wrappedLogger.error('lookup is failed', { topic, listenerName, res: res.response })
    throw Error(`Failed to lookup.  topic: [${topic}] listenerName [${listenerName}]`)
  }
}
