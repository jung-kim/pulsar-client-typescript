import { SingleMessageMetadata, KeyValue } from "proto/PulsarApi";
import { ProducerMessage } from "./producer";

const enc = new TextEncoder();

export const getSingleMessageMetadata = (msg: ProducerMessage) => {
  const smm = SingleMessageMetadata.fromPartial({
    payloadSize: msg.payload.byteLength
  })

  if (msg.eventTimeMs) {
    smm.eventTime = msg.eventTimeMs
  }

  if (msg.key) {
    smm.partitionKey = msg.key
  }

  if (msg.orderingKey) {
    smm.orderingKey = enc.encode(msg.orderingKey)
  }

  if (msg.properties) {
    smm.properties = Object.entries(msg.properties).map(([key, value]) => {
      return { key, value }
    })
  }

  if (msg.sequenceID) {
    smm.sequenceId = msg.sequenceID
  }
  return smm
}
