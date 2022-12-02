import Long from "long"
import { Writer } from "protobufjs"
import { MessageMetadata, SingleMessageMetadata } from "../proto/PulsarApi"
import { ProducerMessage } from "./producer"
import { SendRequest } from "./sendRequest"

export class BatchBuilder {
  private readonly sendRequestBuffer: Array<Uint8Array>

  private totalMessageSize: number = 0

  // Current number of messages in the batch
	private numMessages: number = 0

	// Max number of message allowed in the batch
	private readonly maxBatchCount: number

	// The largest size for a batch sent from this particular producer.
	// This is used as a baseline to allocate a new buffer that can hold the entire batch
	// without needing costly re-allocations.
	private readonly maxBatchSize: number
  private readonly maxMessageSize: number
  private messageMetadata: MessageMetadata | undefined

  constructor(maxBatchCount: number, maxBatchSize: number, maxMessageSize: number) {
    this.maxBatchCount = maxBatchCount
    this.maxBatchSize = maxBatchSize
    this.maxMessageSize = maxMessageSize
    this.sendRequestBuffer = new Array(maxBatchCount)
  }

  add(msg: ProducerMessage, deliverAt: number) {
    // const schemaPayload: ArrayBuffer = 
    // var err error
    // if p.options.Schema != nil {
    //   schemaPayload, err = p.options.Schema.Encode(msg.Value)
    //   if err != nil {
    //     p.log.WithError(err).Errorf("Schema encode message failed %s", msg.Value)
    //     return
    //   }
    // }
    const payload = msg.payload

    if (payload.byteLength > this.maxMessageSize) {
      throw Error(`maxMessageSize payloadSize: ${payload.byteLength}, maxMessageSize: ${this.maxMessageSize}`)
    }

    const smm = SingleMessageMetadata.fromJSON({
      payloadSize: payload.byteLength,
      eventTime: msg.eventTimeMs,
      partitionKey: msg.key,
      orderingKey: msg.orderingKey,
      properties: Object.entries(msg.properties || {}).map(([key, value]) => {
        return { key, value }
      })
    })

    if (this.numMessages === 0) {
      this.messageMetadata = MessageMetadata.fromJSON({
        // sequenceId: requestTrack.id,
        replicateTo: msg.replicationClusters,
        partitionKey: msg.key,
        orderingKey: msg.orderingKey,
        deliverAtTime: deliverAt,
      })
    }

    this.sendRequestBuffer[this.numMessages++] = SingleMessageMetadata.encode(smm).finish()
  }

  isFull(): boolean {
    if (this.sendRequestBuffer.length >= this.maxBatchCount) {
      return true
    }

    if (this.totalMessageSize >= this.maxBatchSize) {
      return true
    }

    return false
  }

  flush() {
    try {
      if (!this.messageMetadata) {
        throw Error('message metatdata is missing')
      }

      this.messageMetadata.numMessagesInBatch = this.sendRequestBuffer.length
      this.messageMetadata.uncompressedSize = this.sendRequestBuffer.reduce((pv, msgPayload) => pv + msgPayload.length + 4, 0)
      this.messageMetadata.publishTime = Long.fromNumber(Date.now())

      const uncompressedPayload = new Uint8Array(this.messageMetadata.uncompressedSize)
      const msgPayloads = this.sendRequestBuffer.slice(0, this.sendRequestBuffer.length)

      let offSet = 0
      msgPayloads.forEach(msgPayload => {
        uncompressedPayload.set((new Writer()).uint32(msgPayload.length).finish(), offSet)
        offSet += 4
        uncompressedPayload.set(msgPayload, offSet)
        offSet += msgPayload.length
      })

      return {
        messageMetadata: this.messageMetadata,
        numMessagesInBatch: msgPayloads.length,
        uncompressedPayload
      }
    } finally {
      this.numMessages = 0
    }
  }
}
