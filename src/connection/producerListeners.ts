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
  }

  public handleSendReceipt(message: Message) {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    if (producerId && sendReceipt) {
      const producerSignal = this.producerListeners[producerId.toString()]
      if (producerSignal) {
        producerSignal.dispatch(sendReceipt)
      } else {
        //warn
      }
      
    }
  }

  public handleCloseProducer(message: Message) {
    const closeProducer = message.baseCommand.closeProducer
    const producerId = message.baseCommand.closeProducer?.producerId
    if (closeProducer && producerId) {
      const producerSignal = this.producerListeners[producerId.toString()]
      if (producerSignal) {
        this.unregisterProducerListener(producerId)
        producerSignal.dispatch(closeProducer)
      } else {
        //warn
      }
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

    switch(error) {
      case ServerError.NotAllowedError:
        if (producerId) {
        //   c.log.Warnf("Received unexpected error response for request %d of type %s",
        // producerID, sendError.GetError())
          this.unregisterProducerListener(producerId)
        }
        return false
      case ServerError.TopicTerminatedError:
        if (producerId) {
        //   c.log.Warnf("Received unexpected error response for request %d of type %s",
        // producerID, sendError.GetError())
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
      // warn
      return
    }

    this.producerListeners[id.toString()] = signal
  }

  public unregisterProducerListener(id: Long) {
    delete this.producerListeners[id.toString()]
  }
}
