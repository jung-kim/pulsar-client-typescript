import { Producer } from './Producer'
import { ProducerMessage } from './ProducerMessage'
import { WrappedLogger } from '../util/logger'
import { Connection, ConnectionPool } from '../connection'
import { SendRequest } from './sendRequest'
import { CommandCloseProducer, CommandSendReceipt } from 'proto/PulsarApi'
import { Signal } from 'micro-signals'
import Long from 'long'
import { BatchBuilder } from './batchBuilder'
import { CommandTypesResponses } from 'connection/Connection'

export class PartitionedProducer {
  readonly parent: Producer
  readonly partitionId: number
  readonly topicName: string
  readonly producerId: Long
  private readonly cnxPool: ConnectionPool
  private cnx: Connection | undefined
  private readonly wrappedLogger: WrappedLogger
  private state: 'PRODUCER_INIT' | 'PRODUCER_READY' | 'PRODUCER_CLOSING' | 'PRODUCER_CLOSED'
  private readonly epoch: number = 0
  private sequenceId: Long | undefined = undefined

  private readonly producerSignal = new Signal<CommandSendReceipt | CommandCloseProducer>()
  private readonly pendingQueues: Array<{ sentAt: number }> = []
  private failTimeoutFunc: ReturnType<typeof setTimeout> | undefined = undefined

  private readonly batchBuilder: BatchBuilder
  private requestId: Long = new Long(0)
  readonly isReadyProm: Promise<void>

  constructor (producer: Producer, partitionId: number) {
    this.parent = producer
    this.partitionId = partitionId
    this.cnxPool = producer.cnxPool
    this.topicName = `${this.parent.options.topic}-partition-${this.partitionId}`
    this.producerId = this.cnxPool.getProducerId()
    this.wrappedLogger = new WrappedLogger({
      producerName: this.parent.options.name,
      producerId: this.producerId,
      topicName: this.parent.options.topic,
      partitionId
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

    this.isReadyProm = this.grabCnx()

    // // Not sure if this is needed
    // if p.options.SendTimeout > 0 {
    //   go p.failTimeoutMessages()
    // }

    // // event loop probably is not needed
    // go p.runEventsLoop()
  }

  isReady (): boolean {
    return this.state === 'PRODUCER_READY'
  }

  async grabCnx (): Promise<void> {
    const { cnx, commandProducerResponse } = await this.cnxPool.getProducerConnection(
      this.producerId,
      this.topicName,
      this.producerSignal,
      this.epoch,
      this.parent.options._properties)
    if (this.sequenceId === undefined) {
      this.sequenceId = commandProducerResponse.requestId.add(1)
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

  async send (msg: ProducerMessage): Promise<CommandTypesResponses> {
    const sendRequest: SendRequest = {
      msg,
      publishTimeMs: Date.now(),
      flushImmediately: false
    }
    return await this.internalSend(sendRequest)
  }

  private async internalSend (sendRequest: SendRequest): Promise<CommandTypesResponses> {
    await this.isReadyProm
    if (this.cnx === undefined || this.state !== 'PRODUCER_READY') {
      const err = Error('connection is undefined')
      this.wrappedLogger.error('failed to acquire connection', err)
      throw err
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

    // const payload = msg.payload // ?? schemaPaylod
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

    if (msg.disableReplication ?? false) {
      msg.replicationClusters = ['__local__']
    }

    const deliverAtMs = msg.deliverAfterMs ?? 0
    const deliverAt = deliverAtMs > 0 ? deliverAtMs : Date.now() + deliverAtMs
    const sendAsBatch = !this.parent.options.disableBatching && (msg.replicationClusters === undefined) && deliverAt < 0

    this.batchBuilder.add(msg, deliverAt)

    if (sendRequest.flushImmediately || !sendAsBatch || this.batchBuilder.isFull()) {
      return await this.flush()
    } else {
      // sending as batch and nothing to flush return prom
      const requestTrack = this.cnx.getRequestTrack(this.requestId)
      if (requestTrack === undefined) {
        const err = Error('request is not found')
        this.wrappedLogger.error('request is not found', err, { requestId: this.requestId })
        throw err
      }
      return await requestTrack.prom
    }
  }

  private async flush (): Promise<CommandTypesResponses> {
    await this.isReadyProm
    if (this.cnx === undefined || this.state !== 'PRODUCER_READY') {
      const err = Error('connection is undefined')
      this.wrappedLogger.error('failed to acquire connection', err)
      throw err
    }
    const { messageMetadata, uncompressedPayload, numMessagesInBatch } = this.batchBuilder.flush()
    messageMetadata.producerName = this.parent.options.name
    messageMetadata.uncompressedSize = uncompressedPayload.length
    messageMetadata.numMessagesInBatch = numMessagesInBatch
    this.wrappedLogger.info('Sending msgs to broker', { uncompressedSize: uncompressedPayload.length, numMessagesInBatch })
    try {
      return await this.cnx.sendMessages(this.producerId, messageMetadata, uncompressedPayload, this.requestId).prom
    } finally {
      this.requestId = this.requestId.add(1)
    }
  }

  private setFailTimeoutFunc (): void {
    if ((this.failTimeoutFunc != null) || this.pendingQueues.length === 0) {
      return
    }

    this.failTimeoutFunc = setTimeout(() => {
      // if there are no messages, nothing to fail and all are processed
      if (this.pendingQueues.length === 0) {
        this.failTimeoutFunc = undefined
        return
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
    }, (this.parent.options.sendTimeoutMs + this.pendingQueues[0].sentAt - Date.now()) ?? 10)
  }
}
