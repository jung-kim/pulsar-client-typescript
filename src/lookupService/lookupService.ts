import * as PulsarApi from '../proto/PulsarApi'
import { WrappedLogger } from '../util/logger'
import { ConnectionPool } from './connectionPool'
import { Connection, ConnectionOptions } from '../connection'
import { Signal } from 'micro-signals'
import Long from 'long'

export class LookupService {
  readonly uuid: string
  readonly logger: WrappedLogger
  readonly cnxPool: ConnectionPool
  private readonly options: ConnectionOptions

  constructor (options: ConnectionOptions) {
    this.logger = new WrappedLogger({ name: 'lookup-service', uuid: options.uuid })
    this.options = options
    this.cnxPool = new ConnectionPool(options)
  }

  public async lookup (topic: String): Promise<PulsarApi.CommandLookupTopicResponse> {
    const conn = await this.cnxPool.getAnyAdminConnection()
    const command = PulsarApi.BaseCommand.fromJSON({
      type: PulsarApi.BaseCommand_Type.LOOKUP,
      lookupTopic: {
        topic,
        authoritative: false,
        advertisedListenerName: ''
      }
    })
    return await conn.sendCommand(command) as PulsarApi.CommandLookupTopicResponse
  }

  public close (): void {
    this.cnxPool.close()
  }

  public async getPartitionedTopicMetadata (topic: string): Promise<PulsarApi.CommandPartitionedTopicMetadataResponse> {
    const conn = await this.cnxPool.getAnyAdminConnection()
    const command = PulsarApi.BaseCommand.fromJSON({
      type: PulsarApi.BaseCommand_Type.PARTITIONED_METADATA,
      partitionMetadata: { topic }
    })
    return await conn.sendCommand(command) as PulsarApi.CommandPartitionedTopicMetadataResponse
  }

  public async getTopicsOfNamespace (namespace: string, mode: PulsarApi.CommandGetTopicsOfNamespace_Mode): Promise<PulsarApi.CommandGetTopicsOfNamespaceResponse> {
    const conn = await this.cnxPool.getAnyAdminConnection()
    const command = PulsarApi.BaseCommand.fromJSON({
      type: PulsarApi.BaseCommand_Type.GET_TOPICS_OF_NAMESPACE,
      getTopicsOfNamespace: { namespace, mode }
    })
    return await conn.sendCommand(command) as PulsarApi.CommandGetTopicsOfNamespaceResponse
  }

  public async lookupTopic (topic: string, listenerName: string = this.options.listenerName): Promise<URL> {
    return await this.cnxPool.lookupTopic(topic, listenerName)
  }

  /**
   * @param topicName
   * @param epoch
   * @param metadata
   * @returns newly created connection for a partitioned producer.  A partitoned producer may
   *   want to close and discard old producer connection.
   */
  public async getProducerConnection (
    producerId: Long,
    topicName: string,
    producerSignal: Signal<PulsarApi.CommandSendReceipt | PulsarApi.CommandCloseProducer>,
    epoch: Long,
    metadata: PulsarApi.KeyValue[]
  ): Promise<{ cnx: Connection, commandProducerResponse: PulsarApi.CommandProducerSuccess }> {
    const logicalAddr = await this.lookupTopic(topicName)

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
    const cnx = new Connection(this.options, logicalAddr)

    await cnx.ensureReady()

    const cmdProducer = PulsarApi.BaseCommand.fromJSON({
      type: PulsarApi.BaseCommand_Type.PRODUCER,
      producer: PulsarApi.CommandProducer.fromJSON({
        topic: topicName,
        encrypted: false,
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

    const commandProducerResponse = await cnx.sendCommand(cmdProducer) as PulsarApi.CommandProducerSuccess
    cnx.registerProducerListener(producerId, producerSignal)

    return {
      cnx,
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
