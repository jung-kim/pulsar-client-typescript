import { Client } from "client/client"
import _ from "lodash"
import { ProducerOption, _initializeOption } from "./option"
import { PartitionedProducer } from "./partitionedProducer"

export enum PRODUCER_STATES {
  INIT = 0,
  READY = 1,
  CLOSING = 2,
  CLOSED = 3,
}

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

	//Schema assign to the current message
	//Note: messages may have a different schema from producer schema, use it instead of producer schema when assigned
	// Schema?: Schema
}

export class Producer {
  readonly client: Client
  readonly option: ProducerOption
  readonly partitionedProducers: Array<PartitionedProducer>
  state: PRODUCER_STATES

  constructor(option: ProducerOption, client: Client) {
    this.client = client
    this.option = _initializeOption(_.cloneDeep(option))

    this.partitionedProducers = []
    this.state = PRODUCER_STATES.INIT

		// @todo
		// 	if options.Interceptors == nil {
		// 	if options.MessageRouter == nil {
		// 	if options.Schema != nil && options.Schema.GetSchemaInfo() != nil {
		// 	encryption := options.Encryption
		// if encryption != nil && len(encryption.Keys) > 0 {
		// err := p.internalCreatePartitionsProducers()
		// 	p.stopDiscovery = p.runBackgroundPartitionDiscovery(options.PartitionsAutoDiscoveryInterval)
		// 	p.metrics.ProducersOpened.Inc()
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