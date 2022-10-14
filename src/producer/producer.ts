import { Connection } from "connection"
import _ from "lodash"
import { WrappedLogger } from "util/logger"
import { ProducerOptions, _initializeOption } from "./producerOption"
import { PartitionedProducer } from "./partitionedProducer"
import { BaseCommand, BaseCommand_Type, CommandPartitionedTopicMetadataResponse } from "proto/PulsarApi"

export enum PRODUCER_STATES {
  INIT = 0,
  READY = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export type Router = (message: ProducerMessage, metaadata: TopicMetadata) => number

export interface ProducerMessage {
  // Payload for the message
  payload: ArrayBuffer

  // // Value and payload is mutually exclusive, `Value interface{}` for schema message.
  value?: any

  // Key sets the key of the message for routing policy
  key?: string

  // OrderingKey sets the ordering key of the message
  orderingKey?: string

  // Properties attach application defined properties on the message
  properties?: Record<string, string>

  // EventTime set the event time for a given message
  // By default, messages don't have an event time associated, while the publish
  // time will be be always present.
  // Set the event time to a non-zero timestamp to explicitly declare the time
  // that the event "happened", as opposed to when the message is being published.
  eventTimeMs?: number

  // ReplicationClusters override the replication clusters for this message.
  replicationClusters?: Array<string>

  // DisableReplication disables the replication for this message
  disableReplication?: boolean

  // SequenceID sets the sequence id to assign to the current message
  sequenceID?: number

  // DeliverAfter requests to deliver the message only after the specified relative delay.
  // Note: messages are only delivered with delay when a consumer is consuming
  //     through a `SubscriptionType=Shared` subscription. With other subscription
  //     types, the messages will still be delivered immediately.
  deliverAfterMs?: number

  // DeliverAt delivers the message only at or after the specified absolute timestamp.
  // Note: messages are only delivered with delay when a consumer is consuming
  //     through a `SubscriptionType=Shared` subscription. With other subscription
  //     types, the messages will still be delivered immediately.
  deliverAtMs?: number
}

export interface TopicMetadata {
  numPartitions(): number
}

export class Producer {
  private readonly cnx: Connection
  private readonly options: ProducerOptions
  private readonly partitionedProducers: Array<PartitionedProducer> = []
  private readonly wrappedLogger: WrappedLogger
  private readonly runBackgroundPartitionDiscovery: ReturnType<typeof setInterval>

  constructor(option: Partial<ProducerOptions>, cnx: Connection) {
    this.cnx = cnx
    this.options = _initializeOption(_.cloneDeep(option), this.cnx.getNewProducerId())
    this.wrappedLogger = new WrappedLogger({ option: option })

    this.internalCreatePartitionsProducers()
    this.runBackgroundPartitionDiscovery = setInterval(
      this.internalCreatePartitionsProducers,
      this.options.partitionsAutoDiscoveryIntervalMs
    )
  }

  private internalCreatePartitionsProducers = async () => {
    const partitionResponse = (await this.cnx.sendRequest(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PARTITIONED_METADATA
      })
    )) as CommandPartitionedTopicMetadataResponse
    const partitionCount = partitionResponse.partitions

    if (this.partitionedProducers.length === partitionResponse.partitions) {
      this.wrappedLogger.debug('Number of partitions in topic has not changed', { partitionCount })
      return
    }
    this.wrappedLogger.debug('Number of partitions in topic has changed', { 
      partitionCount: partitionResponse.partitions, 
      oldPartitionCount: this.partitionedProducers.length 
    })

    if ((partitionCount - this.partitionedProducers.length) < 0) {
      this.partitionedProducers.length = 0
    }

    for (let i = this.partitionedProducers.length; i < partitionCount; i++) {
      this.partitionedProducers[i] = new PartitionedProducer(this, i)
    }
  }

  close() {
    clearInterval(this.runBackgroundPartitionDiscovery)
  }

  getPartitionIndex(msg: ProducerMessage): number {
    // @todo: implement
    return 0
  }

  getPartitionedProducer(msg: ProducerMessage): PartitionedProducer {
    const partitionIndex = this.getPartitionIndex(msg)

    if (!this.partitionedProducers[partitionIndex]) {
      this.partitionedProducers[partitionIndex] = new PartitionedProducer(this, partitionIndex)
    }

    return this.partitionedProducers[partitionIndex]
  }

  async send(msg: ProducerMessage) {
    return this.getPartitionedProducer(msg).send(msg)
  }

  isReady() {
    return this.state === PRODUCER_STATES.READY
  }
}