import { Signal } from "micro-signals";
import { CommandCloseProducer, CommandSendReceipt, ServerError } from "proto/PulsarApi";
import { AbstractPulsarSocket, Message } from "./abstractPulsarSocket";

/**
 * Digest messages for producers.
 */
export class ProducerListeners {
  private pulsarSocket: AbstractPulsarSocket
  private producerListeners: Record<string, Signal<CommandSendReceipt | CommandCloseProducer>> = {}

  constructor(pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
    this.pulsarSocket.wrappedLogger.debug('producer listeners created')
  }

  public handleSendReceipt(message: Message) {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    const producerSignal = this.producerListeners[(producerId ?? '').toString()]
    if (producerId && sendReceipt && producerSignal) {
      this.pulsarSocket.wrappedLogger.info('handle send receipt', { producerId })
      producerSignal.dispatch(sendReceipt)
    } else {
      this.pulsarSocket.wrappedLogger.warn('handle send receipt failed', { producerId })
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
      this.pulsarSocket.wrappedLogger.warn('handle close producer listener failed', { producerId })
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
    this.pulsarSocket.wrappedLogger.warn('send error, received unexpected error response for', { producerId, error })

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
      this.pulsarSocket.wrappedLogger.warn('producer listetner register failed, socket is not ready', { id })
      return
    }

    this.producerListeners[id.toString()] = signal
  }

  public unregisterProducerListener(id: Long) {
    this.pulsarSocket.wrappedLogger.info('unregistered producer listener', { id })
    delete this.producerListeners[id.toString()]
  }
}
