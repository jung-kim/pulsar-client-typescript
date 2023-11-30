import Long from 'long'
import { MessageMetadata, SingleMessageMetadata } from '../proto/PulsarApi'
import { ProducerMessage } from './producerMessage'
import { getFixed32BigEndian } from '../util/proto'
import { ProducerOption } from './producerOption'

/**
 * Handles message batching per each partitioned producers.  As messages are sent, they
 * are temporarily held in a queue and flushed at an interval defined by
 * `batchingMaxPublishDelayMs`, unless explicitly requested to be flushed right away.
 */
export class BatchBuilder {
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

  constructor (option: ProducerOption) {
    this.maxBatchCount = option.batchingMaxMessages
    this.maxBatchSize = option.batchingMaxSize
    this.maxMessageSize = option.maxMessageSize
    this.sendRequestBuffer = new Array(0)
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
      eventTime: msg.eventTimeMs ?? Long.fromNumber(Date.now(), true),
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

    this.addSingleMessageToBatch(smm, payload)
  }

  addSingleMessageToBatch (smm: SingleMessageMetadata, payload: ArrayBuffer): void {
    const bytes = SingleMessageMetadata.encode(smm).finish()
    const size = getFixed32BigEndian(bytes.length)

    this.sendRequestBuffer.push(size)
    this.sendRequestBuffer.push(bytes)
    this.sendRequestBuffer.push(new Uint8Array(payload))

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
      this.messageMetadata.uncompressedSize = this.sendRequestBuffer.reduce((pv, msgPayload) => pv + msgPayload.length, 0)

      const uncompressedPayload = new Uint8Array(this.messageMetadata.uncompressedSize)

      let offSet = 0
      this.sendRequestBuffer.forEach(msgPayload => {
        uncompressedPayload.set(msgPayload, offSet)
        offSet += msgPayload.length
      })

      return {
        messageMetadata: this.messageMetadata,
        numMessagesInBatch: this.messageMetadata.numMessagesInBatch,
        uncompressedPayload
      }
    } finally {
      this.reset()
    }
  }
}
