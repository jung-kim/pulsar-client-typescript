import { Message } from './index'
import { Signal } from 'micro-signals'
import { CommandCloseProducer, CommandSendReceipt, ServerError } from '../proto/PulsarApi'
import { WrappedLogger } from '../util/logger'
import Long from 'long'

/**
 * Digest messages for producers.
 */
export class ProducerListeners {
  private readonly wrappedLogger: WrappedLogger
  private readonly producerListeners: Map<string, Signal<CommandSendReceipt | CommandCloseProducer>> = new Map()

  constructor (uuid: string) {
    this.wrappedLogger = new WrappedLogger({ name: ProducerListeners, uuid })
    this.wrappedLogger.debug('created producer listeners')
  }

  public handleSendReceipt (message: Message): void {
    const producerId = message.baseCommand.sendReceipt?.producerId
    const sendReceipt = message.baseCommand.sendReceipt
    const producerSignal = this.producerListeners.get((producerId ?? '').toString())
    if ((producerId !== undefined) && (sendReceipt !== undefined) && producerSignal !== undefined) {
      this.wrappedLogger.info('handle send receipt', { producerId })
      producerSignal.dispatch(sendReceipt)
    } else {
      this.wrappedLogger.warn('handle send receipt failed', { producerId })
    }
  }

  public handleCloseProducer (message: Message): void {
    const closeProducer = message.baseCommand.closeProducer
    const producerId = message.baseCommand.closeProducer?.producerId
    const producerSignal = this.producerListeners.get((producerId ?? '').toString())

    if ((closeProducer !== undefined) && (producerId !== undefined) && producerSignal !== undefined) {
      this.unregisterProducerListener(producerId)
      producerSignal.dispatch(closeProducer)
    } else {
      this.wrappedLogger.warn('handle close producer listener failed', { producerId })
    }
  }

  /**
   * handle send error
   * @param message
   * @returns wether or not to close the socket
   */
  public handleSendError (message: Message): boolean {
    const producerId = message.baseCommand.sendError?.producerId
    const error = message.baseCommand.sendError?.error
    this.wrappedLogger.warn('send error, received unexpected error response for', { producerId, error })

    switch (error) {
      case ServerError.NotAllowedError:
        if (producerId !== undefined) {
          this.unregisterProducerListener(producerId)
        }
        return false
      case ServerError.TopicTerminatedError:
        if (producerId !== undefined) {
          this.unregisterProducerListener(producerId)
        }
        return false
    }
    // By default, for transient error, let the reconnection logic
    // to take place and re-establish the produce again
    return true
  }

  public registerProducerListener (id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>): void {
    this.wrappedLogger.warn('producer listetner register failed, socket is not ready', { id })
    this.producerListeners.set(id.toString(), signal)
  }

  public unregisterProducerListener (id: Long): void {
    this.wrappedLogger.info('unregistered producer listener', { id })
    this.producerListeners.delete(id.toString())
  }
}
