import { Producer } from "./Producer";
import { ProducerMessage } from "./ProducerMessage"
import { WrappedLogger } from "../util/logger";
import { Connection, ConnectionPool } from "../connection";
import { SendRequest } from "./sendRequest";
import { CommandCloseProducer, CommandSendReceipt } from "proto/PulsarApi";
import { Signal } from "micro-signals";
import Long from 'long'
import { BatchBuilder } from "./batchBuilder";

export class PartitionedProducer {
  readonly parent: Producer
  readonly partitionId: number
  readonly topicName: string
  readonly producerId: Long
  private cnxPool: ConnectionPool
  private cnx: Connection | undefined
  private readonly wrappedLogger: WrappedLogger
  private state: 'PRODUCER_INIT' | 'PRODUCER_READY' | 'PRODUCER_CLOSING' | 'PRODUCER_CLOSED'
  private epoch: number = 0
  private sequenceId: Long | undefined = undefined

  private producerSignal = new Signal<CommandSendReceipt | CommandCloseProducer>()
  private readonly pendingQueues: { sentAt: number }[] = []
  private failTimeoutFunc: ReturnType<typeof setTimeout> | undefined = undefined

  private batchBuilder: BatchBuilder
  private requestId: Long | undefined

  constructor(producer: Producer, partitionId: number) {
    this.parent = producer
    this.partitionId = partitionId
    this.cnxPool = producer.cnxPool
    this.topicName = `${this.parent.options.topic}-partition-${this.partitionId}`
    this.producerId = this.cnxPool.getProducerId()
    this.wrappedLogger = new WrappedLogger({
      producerName: this.parent.options.name,
      producerId: this.producerId,
      topicName: this.parent.options.topic,
      partitionId: partitionId
    })
    this.batchBuilder = new BatchBuilder(
      this.parent.options.batchingMaxMessages,
      this.parent.options.batchingMaxSize,
      this.parent.options.maxMessageSize
    )
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

    this.grabCnx()

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

  async grabCnx() {
    const { cnx, commandProducerSuccess } = await this.cnxPool.getProducerConnection(
      this.producerId,
      this.topicName,
      this.producerSignal, 
      this.epoch,
      this.parent.options._properties)
    if (this.sequenceId === undefined) {
      this.sequenceId = commandProducerSuccess.requestId.add(1)
    }
    this.cnx = cnx

    if (this.state === 'PRODUCER_INIT') {
      this.state = 'PRODUCER_READY'
    }
    this.wrappedLogger.info('producer cnx created', {
      // cnx: this.cnx.id,
      epoch: this.epoch,
      sequenceId: this.sequenceId,
      state: this.state
    })

    // pendingItems := p.pendingQueue.ReadableSlice()
    // viewSize := len(pendingItems)
    // if viewSize > 0 {
    //   p.log.Infof("Resending %d pending batches", viewSize)
    //   lastViewItem := pendingItems[viewSize-1].(*pendingItem)
  
    //   // iterate at most pending items
    //   for i := 0; i < viewSize; i++ {
    //     item := p.pendingQueue.Poll()
    //     if item == nil {
    //       continue
    //     }
    //     pi := item.(*pendingItem)
    //     // when resending pending batches, we update the sendAt timestamp and put to the back of queue
    //     // to avoid pending item been removed by failTimeoutMessages and cause race condition
    //     pi.Lock()
    //     pi.sentAt = time.Now()
    //     pi.Unlock()
    //     p.pendingQueue.Put(pi)
    //     p.cnx.WriteData(pi.batchData)
  
    //     if pi == lastViewItem {
    //       break
    //     }
    //   }
    // }
  }

  send(msg: ProducerMessage) {
    const sendRequest: SendRequest = {
      msg,
      publishTimeMs: Date.now(),
      flushImmediately: false
    }
    return this.internalSend(sendRequest)
  }

  private async internalSend(sendRequest: SendRequest) {
    if (!this.cnx || this.state !== 'PRODUCER_READY') {
      throw Error('producer connection is not ready')
    }

    this.wrappedLogger.debug('Received send request')
  
    const msg = sendRequest.msg
    // const schemaPayload: ArrayBuffer = 
    // var err error
    // if p.options.Schema != nil {
    //   schemaPayload, err = p.options.Schema.Encode(msg.Value)
    //   if err != nil {
    //     p.log.WithError(err).Errorf("Schema encode message failed %s", msg.Value)
    //     return
    //   }
    // }
  
    const payload = msg.payload // ?? schemaPaylod
    // this should be done at connection side
    // // if msg is too large
    // if len(payload) > int(p.cnx.GetMaxMessageSize()) {
    //   p.publishSemaphore.Release()
    //   request.callback(nil, request.msg, errMessageTooLarge)
    //   p.log.WithError(errMessageTooLarge).
    //     WithField("size", len(payload)).
    //     WithField("properties", msg.Properties).
    //     Errorf("MaxMessageSize %d", int(p.cnx.GetMaxMessageSize()))
    //   p.metrics.PublishErrorsMsgTooLarge.Inc()
    //   return
    // }

    if (msg.disableReplication) {
      msg.replicationClusters = ["__local__"]
    }
  
    const deliverAt = msg.deliverAtMs ? msg.deliverAtMs : Date.now() + (msg.deliverAfterMs || 0)
    const sendAsBatch = !this.parent.options.disableBatching && !msg.replicationClusters && deliverAt < 0

    this.batchBuilder.add(msg, deliverAt)

    if (sendRequest.flushImmediately || !sendAsBatch || this.batchBuilder.isFull()) {
      return this.flush()
    } else {
      // sending as batch and nothing to flush return prom
      const { id, prom } = this.cnx.getRequestTrack(this.requestId)
      if (!this.requestId) {
        this.requestId = id
      }
      return prom
    }
  }

  private flush() {
    if (!this.cnx || this.state !== 'PRODUCER_READY') {
      throw Error('producer connection is not ready')
    }
    const { messageMetadata, uncompressedPayload, numMessagesInBatch } = this.batchBuilder.flush()
    messageMetadata.producerName = this.parent.options.name
    messageMetadata.uncompressedSize = uncompressedPayload.length
    messageMetadata.numMessagesInBatch = numMessagesInBatch
    this.wrappedLogger.info('Sending msgs to broker', { uncompressedSize: uncompressedPayload.length, numMessagesInBatch })
    try {
      return this.cnx.sendMessages(this.producerId, messageMetadata, uncompressedPayload, this.requestId).prom
    } finally {
      this.requestId = undefined
    }
  }

  private setFailTimeoutFunc() {
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
