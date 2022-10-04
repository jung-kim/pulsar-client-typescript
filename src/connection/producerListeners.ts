import { Signal } from "micro-signals";
import { CommandCloseProducer, CommandSendReceipt, ServerError } from "proto/PulsarApi";
import { logger } from "util/logger";
import { AbstractPulsarSocket, Message } from "./abstractPulsarSocket";

/**
 * Digest messages for producers.
 */
export class ProducerListeners {
  private pulsarSocket: AbstractPulsarSocket
  private producerListeners: Record<string, Signal<CommandSendReceipt | CommandCloseProducer>> = {}
  private readonly loggerMetadata: any

  constructor(pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
    this.loggerMetadata = { socketId: this.pulsarSocket.getId() }
    logger.debug('producer listeners created', this.loggerMetadata)
  }

  public handleSendReceipt(message: Message) {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    const producerSignal = this.producerListeners[(producerId ?? '').toString()]
    if (producerId && sendReceipt && producerSignal) {
      logger.info('handle send receipt', { ...this.loggerMetadata, producerId })
      producerSignal.dispatch(sendReceipt)
    } else {
      logger.warn('handle send receipt failed', { ...this.loggerMetadata, producerId })
    }
  }

  public handleCloseProducer(message: Message) {
    const closeProducer = message.baseCommand.closeProducer
    const producerId = message.baseCommand.closeProducer?.producerId
    const producerSignal = this.producerListeners[(producerId ?? '').toString()]

    if (closeProducer && producerId && producerSignal) {
      this.unregisterProducerListener(producerId)
      producerSignal.dispatch(closeProducer)
    } else {
      logger.warn('handle close producer listener failed', { ...this.loggerMetadata, producerId })
    }
  }

  /**
   * handle send error
   * @param message 
   * @returns wether or not to close the socket
   */
  public handleSendError(message: Message): Boolean {
    const producerId = message.baseCommand.sendError?.producerId
    const error = message.baseCommand.sendError?.error
    logger.warn('send error, received unexpected error response for', { ...this.loggerMetadata, producerId, error })

    switch(error) {
      case ServerError.NotAllowedError:
        if (producerId) {
          this.unregisterProducerListener(producerId)
        }
        return false
      case ServerError.TopicTerminatedError:
        if (producerId) {
          this.unregisterProducerListener(producerId)
        }
        return false
    }
		// By default, for transient error, let the reconnection logic
		// to take place and re-establish the produce again
    return true
  }

  public registerProducerListener(id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>) {
    if (this.pulsarSocket.getState() !== 'READY') {
      logger.warn('producer listetner register failed, socket is not ready', { ...this.loggerMetadata, id })
      return
    }

    this.producerListeners[id.toString()] = signal
  }

  public unregisterProducerListener(id: Long) {
    logger.info('unregistered producer listener', { ...this.loggerMetadata, id })
    delete this.producerListeners[id.toString()]
  }
}
