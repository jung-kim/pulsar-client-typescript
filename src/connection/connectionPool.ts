import { WrappedLogger } from '../util/logger'
import { BaseCommand, BaseCommand_Type, CommandCloseProducer, CommandLookupTopic, CommandLookupTopicResponse, CommandLookupTopicResponse_LookupType, CommandProducer, CommandSendReceipt, KeyValue } from '../proto/PulsarApi'
import { Connection } from './connection'
import { ConnectionOptions, _ConnectionOptions } from './connectionOptions'
import { Signal } from 'micro-signals'
import Long from 'long'
import { CommandTypesResponses, LOOKUP_RESULT_MAX_REDIRECT } from '.'
import { LookupService } from './lookupService'

export class ConnectionPool {
  // These connections are not used for topic message traffics.  Rather
  // they are use for look ups and other administrative tasks.
  private readonly connections: Map<string, Connection> = new Map()
  private readonly options: _ConnectionOptions
  private readonly wrappedLogger: WrappedLogger
  private producerId = new Long(0, undefined, true)
  public readonly lookupService: LookupService

  constructor (options: ConnectionOptions) {
    this.options = new _ConnectionOptions(options)
    this.wrappedLogger = new WrappedLogger({
      name: 'ConnectionPool',
      uuid: this.options.uuid,
      id: `${this.options.connectionId}`
    })
    this.lookupService = new LookupService(this)
  }

  clear (): void {
    Object.values(this.connections).forEach(c => c.close())
  }

  getAnyAdminConnection (): Connection {
    const cnx = Object.values(this.connections).find(cnx => cnx.isReady())
    if (cnx !== undefined) {
      return cnx
    }
    return this.getConnection(this.options.urlObj)
  }

  getConnection (logicalAddress: URL): Connection {
    let cnx = this.connections.get(logicalAddress.href)
    if (cnx !== undefined) {
      if (cnx.isReady()) {
        this.wrappedLogger.debug('connection is found in cache', { logicalAddress })
        return cnx
      }

      // ensure it's closed
      this.wrappedLogger.debug('connection is found but not ready', { logicalAddress })
      cnx.close()
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
    let res = (await this.getAnyAdminConnection().sendCommand(lookupCommand)) as CommandLookupTopicResponse

    for (let i = 0; i < LOOKUP_RESULT_MAX_REDIRECT; i++) {
      const logicalAddress = this.options.isTlsEnabled
        ? res.brokerServiceUrlTls
        : res.brokerServiceUrl
      const logicalAddrUrl = new URL(logicalAddress)
      const cnx = this.getConnection(logicalAddrUrl)
      switch (res.response) {
        case CommandLookupTopicResponse_LookupType.Redirect:
          this.wrappedLogger.debug('lookup is redirected', { topic, listenerName })
          res = (await cnx.sendCommand(lookupCommand)) as CommandLookupTopicResponse
          break
        case CommandLookupTopicResponse_LookupType.Connect:
          this.wrappedLogger.debug('lookup is found', { topic, listenerName })
          return logicalAddrUrl
        default:
          // increase counter so we can fail out
          i = LOOKUP_RESULT_MAX_REDIRECT
      }
    }

    this.wrappedLogger.debug('lookup is failed', { topic, listenerName })
    throw Error(`Failed to lookup.  topic: [${topic}] listenerName [${listenerName}]`)
  }

  getProducerId (): Long {
    const producerId = this.producerId
    this.producerId = this.producerId.add(1)
    return producerId
  }

  /**
   *
   * @param topicName
   * @param epoch
   * @param metadata
   * @returns newly created connection for a partitioned producer.  A partitoned producer may
   *   want to close and discard old producer connection.
   */
  async getProducerConnection (
    producerId: Long,
    topicName: string,
    producerSignal: Signal<CommandSendReceipt | CommandCloseProducer>,
    epoch: number,
    metadata: KeyValue[]
  ): Promise<{ cnx: Connection, commandProducerResponse: CommandTypesResponses }> {
    // PartitionedProducer.grabCnx()

    // pbSchema := new(pb.Schema)
    // if p.schemaInfo != nil {
    //   tmpSchemaType := pb.Schema_Type(int32(p.schemaInfo.Type))
    //   pbSchema = &pb.Schema{
    //     Name:       proto.String(p.schemaInfo.Name),
    //     Type:       &tmpSchemaType,
    //     SchemaData: []byte(p.schemaInfo.Schema),
    //     Properties: internal.ConvertFromStringMap(p.schemaInfo.Properties),
    //   }
    //   p.log.Debugf("The partition consumer schema name is: %s", pbSchema.Name)
    // } else {
    //   pbSchema = nil
    //   p.log.Debug("The partition consumer schema is nil")
    // }

    const logicalAddr = await this.lookupTopic(topicName)
    const cnx = this.getConnection(logicalAddr)

    const cmdProducer = BaseCommand.fromJSON({
      type: BaseCommand_Type.PRODUCER,
      producer: CommandProducer.fromJSON({
        topic: topicName,
        encrypted: undefined,
        producerId,
        // schema: pbSchema,
        epoch,
        userProvidedProducerName: false,
        // producerName:
        metadata
      })
    })

    // if p.producerName != "" {
    //   cmdProducer.ProducerName = proto.String(p.producerName)
    // }

    // var encryptor internalcrypto.Encryptor
    // if p.options.Encryption != nil {
    //   encryptor = internalcrypto.NewProducerEncryptor(p.options.Encryption.Keys,
    //     p.options.Encryption.KeyReader,
    //     p.options.Encryption.MessageCrypto,
    //     p.options.Encryption.ProducerCryptoFailureAction, p.log)
    // } else {
    //   encryptor = internalcrypto.NewNoopEncryptor()
    // }

    const commandProducerResponse = await cnx.sendCommand(cmdProducer)
    cnx.registerProducerListener(producerId, producerSignal)

    return {
      cnx: new Connection(this.options, logicalAddr),
      commandProducerResponse
    }

    // // probably don't need this as batchings are handled differently
    // if p.options.DisableBatching {
    //   provider, _ := GetBatcherBuilderProvider(DefaultBatchBuilder)
    //   p.batchBuilder, err = provider(p.options.BatchingMaxMessages, p.options.BatchingMaxSize,
    //     p.producerName, p.producerID, pb.CompressionType(p.options.CompressionType),
    //     compression.Level(p.options.CompressionLevel),
    //     p,
    //     p.log,
    //     encryptor)
    //   if err != nil {
    //     return err
    //   }
    // } else if p.batchBuilder == nil {
    //   provider, err := GetBatcherBuilderProvider(p.options.BatcherBuilderType)
    //   if err != nil {
    //     provider, _ = GetBatcherBuilderProvider(DefaultBatchBuilder)
    //   }

    //   p.batchBuilder, err = provider(p.options.BatchingMaxMessages, p.options.BatchingMaxSize,
    //     p.producerName, p.producerID, pb.CompressionType(p.options.CompressionType),
    //     compression.Level(p.options.CompressionLevel),
    //     p,
    //     p.log,
    //     encryptor)
    //   if err != nil {
    //     return err
    //   }
    // }
  }
}
