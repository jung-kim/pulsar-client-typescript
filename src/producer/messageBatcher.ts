import { SingleMessageMetadata } from "../proto/PulsarApi"
import { ProducerMessage } from "./producer"


export const getSingleMessageMetadata = (msg: ProducerMessage) => {
  return SingleMessageMetadata.fromJSON({
    payloadSize: msg.payload.byteLength,
    eventTime: msg.eventTimeMs,
    partitionKey: msg.key,
    orderingKey: msg.orderingKey,
    properties: Object.entries(msg.properties || {}).map(([key, value]) => {
      return { key, value }
    }),
    sequenceID: msg.sequenceID
  })
}

export const getPayload = (messages: SingleMessageMetadata[]) => {

}
