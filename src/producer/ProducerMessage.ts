import Long from 'long'

export interface ProducerMessage {
  // Payload for the message
  payload: ArrayBuffer
  producerName?: string

  // // Value and payload is mutually exclusive, `Value interface{}` for schema message.
  // value?: any

  // Key sets the key of the message for routing policy
  key?: string

  // OrderingKey sets the ordering key of the message
  orderingKey?: string

  // Properties attach application defined properties on the message
  properties?: Record<string, string>

  sendAsBatch?: boolean

  // EventTime set the event time for a given message
  // By default, messages don't have an event time associated, while the publish
  // time will be be always present.
  // Set the event time to a non-zero timestamp to explicitly declare the time
  // that the event "happened", as opposed to when the message is being published.
  eventTimeMs?: Long

  // ReplicationClusters override the replication clusters for this message.
  replicationClusters?: string[]

  // DisableReplication disables the replication for this message
  disableReplication?: boolean

  // SequenceID sets the sequence id to assign to the current message
  sequenceID?: Long

  // DeliverAfter requests to deliver the message only after the specified relative delay.
  // Note: messages are only delivered with delay when a consumer is consuming
  //     through a `SubscriptionType=Shared` subscription. With other subscription
  //     types, the messages will still be delivered immediately.
  deliverAfterMs?: Long

  // DeliverAt delivers the message only at or after the specified absolute timestamp.
  // Note: messages are only delivered with delay when a consumer is consuming
  //     through a `SubscriptionType=Shared` subscription. With other subscription
  //     types, the messages will still be delivered immediately.
  deliverAtMs?: Long
}
