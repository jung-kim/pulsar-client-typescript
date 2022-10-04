import { Signal } from "micro-signals"
import { CommandCloseConsumer } from "proto/PulsarApi"
import { logger } from "util/logger"
import { AbstractPulsarSocket, Message } from "./abstractPulsarSocket"

export class ConsumerListeners {
  private readonly pulsarSocket: AbstractPulsarSocket
  private readonly consumerListeners: Record<string, Signal<Message | CommandCloseConsumer>> = {}
  private readonly loggerMetadata: any
  
  constructor(pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
    this.loggerMetadata = { socketId: this.pulsarSocket.getId() }
    logger.info('created a consumer listener', this.loggerMetadata)
  }

  handleCloseConsumer(message: Message) {
    const closeConsumer = message.baseCommand.closeConsumer
    const consumerId = closeConsumer?.consumerId
    const consumerSignal = this.consumerListeners[(consumerId ?? '').toString()]

    if (closeConsumer && consumerId && consumerSignal) {
        this.deleteConsumeHandler(consumerId)
        consumerSignal.dispatch(closeConsumer)
    } else {
      logger.warn('consumer signal is missing from the listener map', { ...this.loggerMetadata, consumerId })
    }
  }

  addConsumeHandler(id: Long, signal: Signal<Message | CommandCloseConsumer>) {
    if (this.pulsarSocket.getState() !== 'READY') {
      logger.warn('consumer add socket is not ready, abort', { ...this.loggerMetadata, id })
      return
    }
    this.consumerListeners[id.toString()] = signal
  }

  deleteConsumeHandler(id: Long) {
    delete this.consumerListeners[id.toString()]
    logger.info('deleting a consumer listener', { ...this.loggerMetadata, id })
  }
}