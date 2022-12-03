import { Signal } from 'micro-signals'
import { CommandCloseConsumer } from 'proto/PulsarApi'
import { AbstractPulsarSocket, Message } from './abstractPulsarSocket'

export class ConsumerListeners {
  private readonly pulsarSocket: AbstractPulsarSocket
  private readonly consumerListeners: Map<string, Signal<Message | CommandCloseConsumer>> = new Map()

  constructor (pulsarSocket: AbstractPulsarSocket) {
    this.pulsarSocket = pulsarSocket
    this.pulsarSocket.wrappedLogger.info('created a consumer listener')
  }

  handleCloseConsumer (message: Message): void {
    const closeConsumer = message.baseCommand.closeConsumer
    const consumerId = closeConsumer?.consumerId
    const consumerSignal = this.consumerListeners.get((consumerId ?? '').toString())

    if ((closeConsumer !== undefined) && (consumerId !== undefined) && consumerSignal !== undefined) {
      this.deleteConsumeHandler(consumerId)
      consumerSignal.dispatch(closeConsumer)
    } else {
      this.pulsarSocket.wrappedLogger.warn('consumer signal is missing from the listener map', { consumerId })
    }
  }

  addConsumeHandler (id: Long, signal: Signal<Message | CommandCloseConsumer>): void {
    if (this.pulsarSocket.getState() !== 'READY') {
      this.pulsarSocket.wrappedLogger.warn('consumer add socket is not ready, abort', { id })
      return
    }
    this.consumerListeners.set(id.toString(), signal)
  }

  deleteConsumeHandler (id: Long): void {
    this.consumerListeners.delete(id.toString())
    this.pulsarSocket.wrappedLogger.info('deleting a consumer listener', { id })
  }
}
