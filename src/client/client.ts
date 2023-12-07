import { Producer, ProducerOptions } from '../producer'
import { _initializeOption, ConnectionOptions } from '../connection/connectionOptions'
import { LookupService } from '../lookupService'
import { IncrementalIdGenerator } from '../util/idGenerator'
import { CommandLookupTopicResponse, CommandPartitionedTopicMetadataResponse } from '../proto/PulsarApi'

/**
 * Client object is a factory for producers and consumers given an client option.  A client
 * knows how to connect to a pulsar cluster and maintain a connection pools that may create
 * a single connecions per brokers.  These connections in connection pool are not shared
 * with consumers and producers and they are exclusive for administrative purpose such as
 * topic partition count lookup.
 */
export class Client {
  private readonly lookupService: LookupService
  public readonly connectionOptions: ConnectionOptions
  public readonly producers: Producer[] = []
  public readonly producerIdGenerator = new IncrementalIdGenerator()

  constructor (connectionOptions: Partial<ConnectionOptions>) {
    this.connectionOptions = _initializeOption(connectionOptions)
    this.lookupService = new LookupService(this.connectionOptions)
  }

  /**
   * close all connections
   */
  public close (): void {
    this.lookupService.close()
    this.producers.forEach(p => p.close())
  }

  public createProducer (producerOptions: Partial<ProducerOptions>): Producer {
    producerOptions._connectionOptions = this.connectionOptions
    producerOptions._producerIdGenerator = this.producerIdGenerator
    const producer = new Producer(producerOptions, this.lookupService)
    this.producers.push(producer)
    return producer
  }

  public async lookup (topic: String): Promise<CommandLookupTopicResponse> {
    return await this.lookupService.lookup(topic)
  }

  public async lookupTopic (topic: string, listenerName?: string): Promise<URL> {
    return await this.lookupService.lookupTopic(topic, listenerName)
  }

  public async getPartitionedTopicMetadata (topic: string): Promise<CommandPartitionedTopicMetadataResponse> {
    return await this.lookupService.getPartitionedTopicMetadata(topic)
  }
}
