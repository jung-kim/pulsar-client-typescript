import { CommandSendReceipt, ServerError } from "proto/PulsarApi";
import { AbstractPulsarSocket, Message } from "./AbstractPulsarSocket";

/**
 * Digest messages for producers.
 */
export class ProducerListener {
  private pulsarSocket: AbstractPulsarSocket
  private producerListeners: Record<string, { (receipt: CommandSendReceipt): void }> = {}

  constructor(pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
  }

  public handleSendReceipt(message: Message) {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    if (producerId && sendReceipt) {
      this.producerListeners[producerId.toString()](sendReceipt)
    }
  }

  public handleCloseProducer(message: Message) {
    const producerId = message.baseCommand.closeProducer?.producerId
    if (producerId) {
      this.unregisterProducerListener(producerId)
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
    return true
  }

  public registerProducerListener(id: Long, callback: { (receipt: CommandSendReceipt): void }) {
    if (this.pulsarSocket.getState() !== 'READY') {
      // warn
    }

    this.producerListeners[id.toString()] = callback
  }

  public unregisterProducerListener(id: Long) {
    delete this.producerListeners[id.toString()]
  }
}
