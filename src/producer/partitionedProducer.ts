import { Producer } from './producer'
import { ProducerMessage } from './producerMessage'
import { WrappedLogger } from '../util/logger'
import { Connection } from '../connection'
import { CommandCloseProducer, CommandSendReceipt } from '../proto/PulsarApi'
import { Signal } from 'micro-signals'
import Long from 'long'
import { BatchBuilder } from './batchBuilder'
import { Deferred, getDeferred } from '../util/deferred'
import { LookupService } from '../lookupService'

export interface SendRequest {
  msg: ProducerMessage
  publishTimeMs: number
  flushImmediately: boolean
}

export class PartitionedProducer {
  readonly parent: Producer
  readonly partitionId: number
  readonly topicName: string
  readonly producerId: Long
  private cnx: Connection | undefined
  private readonly wrappedLogger: WrappedLogger
  private state: 'PRODUCER_INIT' | 'PRODUCER_READY' | 'PRODUCER_CLOSING' | 'PRODUCER_CLOSED'
  private readonly epoch: Long = Long.UZERO

  private readonly deferredMap: Map<string, Deferred<CommandSendReceipt>> = new Map()

  private sequenceId: Long = Long.fromNumber(1, true)
  private producerName: string = ''
  private readonly producerSignal = new Signal<CommandSendReceipt | CommandCloseProducer>()
  private readonly pendingQueues: Array<{ sentAt: number }> = []
  private failTimeoutFunc: ReturnType<typeof setTimeout> | undefined = undefined
  private readonly batchBuilder: BatchBuilder
  private readonly batchFlushTicker: NodeJS.Timer
  private readonly lookupService: LookupService
  readonly isReadyProm: Promise<void>

  constructor (producer: Producer, partitionId: number, lookupService: LookupService) {
    this.parent = producer
    this.partitionId = partitionId
    this.lookupService = lookupService
    this.topicName = partitionId === -1 ? this.parent.options.topic : `${this.parent.options.topic}-partition-${this.partitionId}`
    this.producerId = producer.options._producerIdGenerator.getAndIncrement()
    this.wrappedLogger = new WrappedLogger({
      name: 'partitioned-producer',
      producerName: 'uninitialized',
      producerId: this.producerId,
      topicName: this.parent.options.topic,
      uuid: producer.options._connectionOptions.uuid,
      partitionId
    })
    this.batchBuilder = new BatchBuilder(this.parent.options)
    this.state = 'PRODUCER_INIT'

    this.producerSignal.add((payload: CommandSendReceipt | CommandCloseProducer) => {
      if ('sequenceId' in payload) {
        this.wrappedLogger.debug('CommandSendReceipt received', { sequenceId: payload.sequenceId.toString() })
        this.deferredMap.get(payload.sequenceId.toString()).resolve(payload)
      } else {
        this.wrappedLogger.info('CommandCloseProducer received, closing')
        this.close()
      }
    })

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

    if (producer.options.sendTimeoutMs > 0) {
      this.setFailTimeoutFunc()
    }

    // // event loop probably is not needed
    // go p.runEventsLoop()

    this.batchFlushTicker = setInterval(() => {
      this.flush().catch((e: Error) => {
        this.wrappedLogger.error(`interval flush failed: ${e.toString()}`)
      })
    }, this.parent.options.batchingMaxPublishDelayMs)
  }

  close (): void {
    this.cnx.close()
    clearInterval(this.batchFlushTicker)
  }

  isReady (): boolean {
    return this.state === 'PRODUCER_READY'
  }

  async grabCnx (): Promise<void> {
    const { cnx, commandProducerResponse } = await this.lookupService.getProducerConnection(
      this.producerId,
      this.topicName,
      this.producerSignal,
      this.epoch,
      this.parent.options._properties)
    this.cnx = cnx
    this.producerName = commandProducerResponse.producerName
    this.wrappedLogger.updateMetadata('producerName', this.producerName)

    if (this.state === 'PRODUCER_INIT') {
      this.state = 'PRODUCER_READY'
    }
    this.wrappedLogger.info('producer cnx created', {
      // cnx: this.cnx.id,
      epoch: this.epoch,
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

  async send (msg: ProducerMessage): Promise<CommandSendReceipt> {
    const sendRequest: SendRequest = {
      msg,
      publishTimeMs: Date.now(),
      flushImmediately: false
    }

    if (msg.sendAsBatch === undefined) {
      if (this.parent.options.disableBatching) {
        msg.sendAsBatch = false
      } else if (msg.replicationClusters !== undefined) {
        msg.sendAsBatch = false
      } else if (msg.deliverAtMs !== undefined) {
        msg.sendAsBatch = false
      } else {
        msg.sendAsBatch = true
      }
    }
    if (msg.deliverAfterMs !== undefined) {
      msg.deliverAtMs = msg.deliverAfterMs.add(Date.now())
    }
    return await this.internalSend(sendRequest)
  }

  private async internalSend (sendRequest: SendRequest): Promise<CommandSendReceipt> {
    await this.isReadyProm
    if (this.cnx === undefined || this.state !== 'PRODUCER_READY') {
      const err = Error('connection is undefined')
      this.wrappedLogger.error('failed to acquire connection', err)
      throw err
    }

    this.wrappedLogger.debug('Received send request')

    const msg = sendRequest.msg
    msg.sequenceID = Long.fromValue(this.sequenceId)
    // var schemaPayload []byte
    // var err error
    // if p.options.Schema != nil {
    //   schemaPayload, err = p.options.Schema.Encode(msg.Value)
    //   if err != nil {
    //     p.log.WithError(err).Errorf("Schema encode message failed %s", msg.Value)
    //     return
    //   }
    // }

    // if payload == nil {
    //   payload = schemaPayload
    // }

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

    this.batchBuilder.add(msg)

    if (this.deferredMap.get(this.sequenceId.toString()) === undefined) {
      this.deferredMap.set(this.sequenceId.toString(), getDeferred())
    }

    if (sendRequest.flushImmediately || msg.sendAsBatch === false || this.batchBuilder.isFull()) {
      return await this.flush()
    } else {
      return await this.deferredMap.get(this.sequenceId.toString()).promise
    }
  }

  private async flush (): Promise<CommandSendReceipt> {
    await this.isReadyProm

    const currentSequenceId = this.sequenceId
    this.sequenceId = this.sequenceId.add(1)

    try {
      if (this.cnx === undefined || this.state !== 'PRODUCER_READY') {
        const err = Error('connection is undefined')
        this.wrappedLogger.error('failed to acquire connection', err)
        throw err
      }
      const { messageMetadata, uncompressedPayload, numMessagesInBatch } = this.batchBuilder.flush()
      if (numMessagesInBatch === 0) {
        return
      }
      messageMetadata.uncompressedSize = uncompressedPayload.length
      messageMetadata.numMessagesInBatch = numMessagesInBatch
      messageMetadata.sequenceId = currentSequenceId
      messageMetadata.producerName = this.producerName

      this.wrappedLogger.info('Sending msgs to broker', { uncompressedSize: uncompressedPayload.length, numMessagesInBatch })

      await this.cnx.sendMessages(this.producerId, messageMetadata, uncompressedPayload)

      return await this.deferredMap.get(currentSequenceId.toString()).promise
    } catch (e) {
      this.deferredMap.get(currentSequenceId.toString()).reject(e)
    } finally {
      this.deferredMap.delete(currentSequenceId.toString())
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

      // message have processed since setFailTimeoutFunc but other messages hasn't been
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
