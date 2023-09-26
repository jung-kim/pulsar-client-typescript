import Long from 'long'
import { Signal } from 'micro-signals'
import { CommandCloseConsumer } from '../proto/PulsarApi'
import { WrappedLogger } from '../util/logger'
import { Message } from './index'

export class ConsumerListeners {
  private readonly wrappedLogger: WrappedLogger
  private readonly consumerListeners: Map<string, Signal<Message | CommandCloseConsumer>> = new Map()

  constructor (uuid: string) {
    this.wrappedLogger = new WrappedLogger({ name: 'ConsumerListeners', uuid })
    this.wrappedLogger.info('created a consumer listener')
  }

  handleCloseConsumer (message: Message): void {
    const closeConsumer = message.baseCommand.closeConsumer
    const consumerId = closeConsumer?.consumerId
    const consumerSignal = this.consumerListeners.get((consumerId ?? '').toString())

    if (closeConsumer !== undefined && consumerId !== undefined && consumerSignal !== undefined) {
      this.unregisterConsumeHandler(consumerId)
      consumerSignal.dispatch(closeConsumer)
    } else {
      this.wrappedLogger.warn('consumer signal is missing from the listener map', { consumerId })
    }
  }

  registerConsumeHandler (id: Long, signal: Signal<Message | CommandCloseConsumer>): void {
    this.consumerListeners.set(id.toString(), signal)
  }

  unregisterConsumeHandler (id: Long): void {
    this.consumerListeners.delete(id.toString())
    this.wrappedLogger.info('deleting a consumer listener', { id })
  }
}
