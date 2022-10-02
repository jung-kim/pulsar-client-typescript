import { BaseCommand, BaseCommand_Type, CommandCloseConsumer, CommandCloseProducer, CommandConsumerStatsResponse, CommandGetLastMessageIdResponse, CommandGetTopicsOfNamespaceResponse, CommandLookupTopicResponse, CommandPartitionedTopicMetadataResponse, CommandProducerSuccess, CommandSendReceipt, CommandSuccess } from '../proto/PulsarApi'
import { ConnectionOptions, ConnectionOptionsRaw } from './ConnectionOptions'
import os from 'os'
import { PulsarSocket } from './pulsarSocket';
import { ProducerListeners } from './producerListeners'
import { Message } from './abstractPulsarSocket';
import Long from 'long';
import { ConsumerListeners } from './consumerListeners';
import { Signal } from 'micro-signals';
import { RequestTracker } from './util/requestTracker';

const localAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => !item?.internal && item?.family === 'IPv4')
  .find(Boolean)?.address ?? '127.0.0.1';

export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: ConnectionOptions
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly requestTracker = new RequestTracker<CommandTypesResponses>()

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
    this.requestTracker.clear()
  }

  getId() {
    return `${localAddress} -> ${this.options.url}`
  }

  GetMaxMessageSize() {
    return this.options._maxMesageSize
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

  sendRequest(cmd: BaseCommand): Promise<CommandTypesResponses> {
    const requestTrack = this.requestTracker.trackRequest();

    (Object(cmd) as Array<keyof BaseCommand>).forEach((key: keyof BaseCommand) => {
      if (cmd[key] && 'requestId' in (cmd[key] as any)) {
        (cmd[key] as any).requestId = requestTrack.id
      }
    });

    this.socket.writeCommand(cmd)
      .catch(e => requestTrack.rejectRequest(e))
    
    return requestTrack.prom
  }

  handleResponseError(message: Message) {
    this.requestTracker.rejectRequest(message.baseCommand.error?.requestId, message.baseCommand.error)
  }

  handleResponse(cmd: CommandTypesResponses) {
    this.requestTracker.resolveRequest(cmd?.requestId, cmd)
  }
}
