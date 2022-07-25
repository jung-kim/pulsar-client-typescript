import { Producer, ProducerMessage, PRODUCER_STATES } from "./producer";
import { getSingleMessageMetadata } from "./helper";

export class PartitionedProducer {
  readonly producer: Producer
  readonly partitionIndex: number
  readonly state: number

  constructor(producer: Producer, partitionIndex: number) {
    this.producer = producer
    this.partitionIndex = partitionIndex
    this.state = PRODUCER_STATES.INIT

    // batchingMaxPublishDelay
    // ptions.DisableBatching {
    // 	if options.Schema != nil && options.Schema.GetSchemaInfo() != nil {
  }

  grabCnx() {
    const userProvidedProducerName = !!this.producer.option.name

  }
  
  isReady() {
    return this.state === PRODUCER_STATES.READY
  }

  async send(msg: ProducerMessage) {
    if (!this.isReady()) {
      throw Error('Producer is not ready.')
    }

    // internal send
    if (msg.value && msg.key) {
      throw Error('Can not set Value and Payload both')
    }

    const deliverAt = Date.now() + (msg.deliverAfterMs || 0)
    // const sendAsBatch = this.producer.option.

    const smm = getSingleMessageMetadata(msg)

    // @todo
    //  p.options.DisableMultiSchema
    //  sendAsBatch
    //  msg.DisableReplication
  }
}
