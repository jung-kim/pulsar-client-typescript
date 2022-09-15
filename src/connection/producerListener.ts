import { CommandSendReceipt } from "proto/PulsarApi";
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

  public handleSendRecipt(message: Message) {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    if (producerId && sendReceipt) {
      this.producerListeners[producerId.toString()](sendReceipt)
    }
  }

  public registerProducerListener(id: number, callback: { (receipt: CommandSendReceipt): void }) {
    if (this.pulsarSocket.getState() !== 'READY') {
      // warn
    }

    this.producerListeners[id] = callback
  }

  public unregisterProducerListener(id: number) {
    delete this.producerListeners[id]
  }
}
