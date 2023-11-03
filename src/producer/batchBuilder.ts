import Long from 'long'
import { Writer } from 'protobufjs'
import { MessageMetadata, SingleMessageMetadata } from '../proto/PulsarApi'
import { ProducerMessage } from './ProducerMessage'

export class BatchBuilder {
  private readonly producerId: Long
  private readonly sendRequestBuffer: Uint8Array[]

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

  constructor (producerId: Long, maxBatchCount: number, maxBatchSize: number, maxMessageSize: number) {
    this.producerId = Long.fromString(producerId.toString())
    this.maxBatchCount = maxBatchCount
    this.maxBatchSize = maxBatchSize
    this.maxMessageSize = maxMessageSize
    this.sendRequestBuffer = new Array(maxBatchCount)
  }

  add (msg: ProducerMessage): void {
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
      properties: Object.entries((msg.properties != null) || {}).map(([key, value]) => {
        return { key, value }
      })
    })

    if (this.numMessages === 0) {
      this.messageMetadata = MessageMetadata.fromJSON({
        sequenceId: msg.sequenceID,
        publishTime: Long.fromNumber(Date.now(), true),
        producerName: msg.producerName ?? '',
        replicateTo: msg.replicationClusters,
        partitionKey: msg.key,
        deliverAtTime: msg.deliverAtMs
      })
    }

    this.pushSmm(smm)
  }

  pushSmm (smm: SingleMessageMetadata): void {
    const bytes = SingleMessageMetadata.encode(smm).finish()
    const size = (new Writer()).uint32(bytes.length).finish()

    this.sendRequestBuffer.push(size)
    this.sendRequestBuffer.push(bytes)

    this.totalMessageSize += bytes.length + 4
    this.numMessages++
  }

  isFull (): boolean {
    if (this.numMessages >= this.maxBatchCount) {
      return true
    }

    if (this.totalMessageSize >= this.maxBatchSize) {
      return true
    }

    return false
  }

  reset (): void {
    this.sendRequestBuffer.length = 0
    this.messageMetadata = undefined
    this.totalMessageSize = 0
    this.numMessages = 0
  }

  flush (): {
    messageMetadata?: MessageMetadata
    numMessagesInBatch: number
    uncompressedPayload?: Uint8Array
  } {
    if (this.numMessages <= 0) {
      return { numMessagesInBatch: 0 }
    }
    try {
      if (this.messageMetadata == null) {
        throw Error('message metatdata is missing')
      }

      this.messageMetadata.numMessagesInBatch = this.numMessages
      this.messageMetadata.uncompressedSize = this.sendRequestBuffer.reduce((pv, msgPayload) => pv + msgPayload.length + 4, 0)
      this.messageMetadata.publishTime = Long.fromNumber(Date.now(), true)

      const uncompressedPayload = new Uint8Array(this.messageMetadata.uncompressedSize)
      const msgPayloads = this.sendRequestBuffer.slice(0, this.numMessages)

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
      this.reset()
    }
  }
}
