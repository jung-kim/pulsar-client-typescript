import { Signal } from "micro-signals"
import { CommandCloseConsumer } from "proto/PulsarApi"
import { AbstractPulsarSocket, Message } from "./abstractPulsarSocket"

export class ConsumerListeners {
  private readonly pulsarSocket: AbstractPulsarSocket
  private readonly consumerListeners: Record<string, Signal<Message | CommandCloseConsumer>> = {}
  
  constructor(pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
  }

  handleCloseConsumer(message: Message) {
    const closeConsumer = message.baseCommand.closeConsumer
    const consumerId = closeConsumer?.consumerId

    if (closeConsumer && consumerId) {
      const consumerSignal = this.consumerListeners[consumerId.toString()]
      if (consumerSignal) {
        this.deleteConsumeHandler(consumerId)
        consumerSignal.dispatch(closeConsumer)
      } else {
        //warn
      }
    }
  }

  addConsumeHandler(id: Long, signal: Signal<Message | CommandCloseConsumer>) {
    if (this.pulsarSocket.getState() !== 'READY') {
      // warn
      return
    }
    this.consumerListeners[id.toString()] = signal
  }

  deleteConsumeHandler(id: Long) {
    delete this.consumerListeners[id.toString()]
  }
}