import { BaseCommand, BaseCommand_Type, CommandCloseConsumer, CommandCloseProducer, CommandSendReceipt } from '../proto/PulsarApi'
import { ConnectionOptions, ConnectionOptionsRaw } from './ConnectionOptions'
import os from 'os'
import { PulsarSocket } from './pulsarSocket';
import { ProducerListeners } from './producerListeners'
import { Message } from './abstractPulsarSocket';
import Long from 'long';
import { ConsumerListeners } from './consumerListeners';
import { Signal } from 'micro-signals';

const localAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => !item?.internal && item?.family === 'IPv4')
  .find(Boolean)?.address ?? '127.0.0.1';

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: ConnectionOptions
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly pendingReqs: Record<string, BaseCommand> = {}

  // https://www.npmjs.com/package/long
  // Hopefully, 2^53-1 is enough...
  private requestId = -1

  constructor(options: ConnectionOptionsRaw) {
    this.options = new ConnectionOptions(options)
    this.socket = new PulsarSocket(this)

    // register producer listener
    this.producerListeners = new ProducerListeners(this.socket)
    this.consumerLinsteners = new ConsumerListeners(this.socket)
    this.socket.dataStream.add((message: Message) => {
      switch (message.baseCommand.type) {
        case BaseCommand_Type.SUCCESS:
        case BaseCommand_Type.PRODUCER_SUCCESS:
        case BaseCommand_Type.PARTITIONED_METADATA_RESPONSE:
        case BaseCommand_Type.LOOKUP_RESPONSE:
        case BaseCommand_Type.CONSUMER_STATS_RESPONSE:
        case BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE:
        case BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE:
        case BaseCommand_Type.GET_SCHEMA_RESPONSE:
        case BaseCommand_Type.ERROR:
        case BaseCommand_Type.SEND_ERROR:
          if (this.producerListeners.handleSendError(message)) {
            this.socket.close()
          }
          break
        case BaseCommand_Type.CLOSE_PRODUCER:
          this.producerListeners.handleCloseProducer(message)
          break
        case BaseCommand_Type.CLOSE_CONSUMER:
          this.consumerLinsteners.handleCloseConsumer(message)
          break
        case BaseCommand_Type.AUTH_CHALLENGE:
          this.socket.handleAuthChallenge(message)
          break
        case BaseCommand_Type.SEND_RECEIPT:
          this.producerListeners.handleSendReceipt(message)
          break
        default:
          break
      }
    })
  }

  reconnect() {
    this.socket.reconnect()
  }
  close() {
    this.socket.close()
    Object.keys(this.pendingReqs).forEach(key => {
      delete this.pendingReqs[key]
    })
  }

  getId() {
    return `${localAddress} -> ${this.options.url}`
  }

  GetMaxMessageSize() {
    return this.options._maxMesageSize
  }

  getNextRequestId() {
    return this.requestId++
  }

  /**
   * gets read only copy of the options the connection is operating with.
   * @returns 
   */
  getOption(): Readonly<ConnectionOptions> {
    return this.options
  }

  addConsumerHandler(id: Long, signal: Signal<Message | CommandCloseConsumer>) {
    return this.consumerLinsteners.addConsumeHandler(id, signal)
  }

  deleteConsumerHandler(id: Long) {
    return this.consumerLinsteners.deleteConsumeHandler(id)
  }

  registerProducerListener(id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>) {
    return this.producerListeners.registerProducerListener(id, signal)
  }

  unregisterProducerListener(id: Long) {  
    return this.producerListeners.unregisterProducerListener(id)
  }

  sendRequest(id: number, cmd: BaseCommand): Promise<void> {
    if (this.socket.getState() === 'CLOSED') {
      // warn
      throw Error('connection closed')
    }

    this.pendingReqs[id.toString()] = cmd
    return this.socket.writeCommand(cmd)
  }
}
