import { Producer, ProducerMessage, PRODUCER_STATES } from "./producer";
import { getSingleMessageMetadata } from "./helper";
import { WrappedLogger } from "../util/logger";
import { Connection } from "../connection";
import { ProducerOptions } from "./producerOption";

export class PartitionedProducer {
  readonly parent: Producer
  readonly partitionId: number
  readonly producerId: number
  private readonly cnx: Connection
  private readonly wrappedLogger: WrappedLogger
  private state: 'PRODUCER_INIT' | 'PRODUCER_READY' | 'PRODUCER_CLOSING' | 'PRODUCER_CLOSED'

  private readonly pendingQueues: { sentAt: number }[] = []
  private failTimeoutFunc: ReturnType<typeof setTimeout> | undefined = undefined


  constructor(producer: Producer, cnx: Connection, partitionId: number) {
    this.parent = producer
    this.partitionId = partitionId
    this.producerId = cnx.getNewProducerId()
    this.cnx = cnx
    this.wrappedLogger = new WrappedLogger({
      producerName: this.parent.options.name,
      producerId: this.producerId,
      topic: this.parent.options.topic,
      partitionId: partitionId
    })
    this.state = 'PRODUCER_INIT'

    // if options.Schema != nil && options.Schema.GetSchemaInfo() != nil {
    //   p.schemaInfo = options.Schema.GetSchemaInfo()
    // } else {
    //   p.schemaInfo = nil
    // }

    // // Don't see a point of setting this...
    // if options.Name != "" {
    //   p.producerName = options.Name
    //   p.userProvidedProducerName = true
    // } else {
    //   p.userProvidedProducerName = false
    // }

    // encryption := options.Encryption
    // // add default message crypto if not provided
    // if encryption != nil && len(encryption.Keys) > 0 {
    //   if encryption.KeyReader == nil {
    //     return nil, fmt.Errorf("encryption is enabled, KeyReader can not be nil")
    //   }
    //   if encryption.MessageCrypto == nil {
    //     logCtx := fmt.Sprintf("[%v] [%v] [%v]", p.topic, p.producerName, p.producerID)
    //     messageCrypto, err := crypto.NewDefaultMessageCrypto(logCtx, true, logger)
    //     if err != nil {
    //       logger.WithError(err).Error("Unable to get MessageCrypto instance. Producer creation is abandoned")
    //       return nil, err
    //     }
    //     p.options.Encryption.MessageCrypto = messageCrypto
    //   }
    // }

    // // @todo connection pooling is not implemented
    // err := p.grabCnx()
    // if err != nil {
    //   logger.WithError(err).Error("Failed to create producer")
    //   return nil, err
    // }

    this.wrappedLogger.info('Created producer')
    this.state = 'PRODUCER_READY'

    // // Not sure if this is needed
    // if p.options.SendTimeout > 0 {
    //   go p.failTimeoutMessages()
    // }
  
    // // event loop probably is not needed
    // go p.runEventsLoop()
  }
  
  isReady() {
    return this.state === "PRODUCER_READY"
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

  setFailTimeoutFunc () {
    if (this.failTimeoutFunc || this.pendingQueues.length === 0) {
      return
    }

    this.failTimeoutFunc = setTimeout(() => {
      // if there are no messages, nothing to fail and all are processed
      if (this.pendingQueues.length === 0) {
        return this.failTimeoutFunc = undefined
      }

      const now = Date.now()

      // message have processed sicne setFailTimeoutFunc but other messages hasn't been
      // around long enough to trigger timeout.
      if (now - this.pendingQueues[0].sentAt < this.parent.options.sendTimeoutMs) {
        this.failTimeoutFunc = undefined
        return this.setFailTimeoutFunc()
      }

      // timeout is triggered...
      // @todo add message id
      let lastFailedMessageIndex: number = 0
      for (let i = 1; i < this.pendingQueues.length; i++) {
        if (now - this.pendingQueues[i].sentAt >= this.parent.options.sendTimeoutMs) {
          lastFailedMessageIndex = i
        } else {
          break
        }
      }

      const timeedOutMessages = this.pendingQueues.splice(0, lastFailedMessageIndex + 1)
      this.wrappedLogger.info('Producer message timeout is triggered', { numMessagesToTimeout: timeedOutMessages.length })
      // @todo
      // timeedOutMessages.forEach((m) => m.reject(Error('timeout')))

      this.failTimeoutFunc = undefined
      this.setFailTimeoutFunc()
    }, (this.parent.options.sendTimeoutMs + this.pendingQueues[0].sentAt - Date.now()) || 10)
  }
}
