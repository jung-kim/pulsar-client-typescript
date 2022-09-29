import { BaseCommand, BaseCommand_Type, CommandCloseConsumer, CommandCloseProducer, CommandConsumerStatsResponse, CommandGetLastMessageIdResponse, CommandGetTopicsOfNamespaceResponse, CommandLookupTopicResponse, CommandPartitionedTopicMetadataResponse, CommandProducerSuccess, CommandSendReceipt, CommandSuccess } from '../proto/PulsarApi'
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

export interface PendingReq {
  cmd: BaseCommand
  res: (response: CommandTypesResponses) => void
  rej: (e: any) => void
}

export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: ConnectionOptions
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly pendingReqs: Record<string, PendingReq> = {}

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
          this.handleResponse(message.baseCommand.success!)
          break
        case BaseCommand_Type.PRODUCER_SUCCESS:
          this.handleResponse(message.baseCommand.producerSuccess!)
          break
        case BaseCommand_Type.PARTITIONED_METADATA_RESPONSE:
          this.handleResponse(message.baseCommand.partitionMetadataResponse!)
          break
        case BaseCommand_Type.LOOKUP_RESPONSE:
          this.handleResponse(message.baseCommand.lookupTopicResponse!)
          break
        case BaseCommand_Type.CONSUMER_STATS_RESPONSE:
          this.handleResponse(message.baseCommand.consumerStatsResponse!)
          break
        case BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE:
          this.handleResponse(message.baseCommand.getLastMessageIdResponse!)
          break
        case BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE:
          this.handleResponse(message.baseCommand.getTopicsOfNamespaceResponse!)
          break
        case BaseCommand_Type.GET_SCHEMA_RESPONSE:
          this.handleResponse(message.baseCommand.getSchemaResponse!)
          break
        case BaseCommand_Type.ERROR:
          this.handleResponseError(message)
          break
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

  sendRequest(id: Long, cmd: BaseCommand): Promise<CommandTypesResponses> {
    return new Promise<CommandTypesResponses>((res, rej) => {
      if (this.socket.getState() !== 'READY') {
        // warn
        rej(Error('socket is not ready'))
        return
      }

      this.pendingReqs[id.toString()] = { cmd, res, rej }
      this.socket.writeCommand(cmd)
        .catch(rej)
    })
  }

  handleResponseError(message: Message) {
    const errorCmd = message.baseCommand.error
    const requestId = errorCmd?.requestId
    const pendingReq = requestId ? this.pendingReqs[requestId.toString()] : undefined
    if (!requestId || !pendingReq) {
      // warn
      return
    }

    delete this.pendingReqs[requestId.toString()]
    pendingReq.rej(errorCmd)
  }

  handleResponse(cmd: CommandTypesResponses) {
    const requestId = cmd?.requestId
    const pendingReq = requestId ? this.pendingReqs[requestId.toString()] : undefined
    if (!cmd || !requestId || !pendingReq) {
      // warn
      return 
    }

    delete this.pendingReqs[requestId.toString()]
    pendingReq.res(cmd)
  }
}
