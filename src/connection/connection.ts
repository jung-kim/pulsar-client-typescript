import {
  BaseCommand,
  BaseCommand_Type,
  CommandCloseConsumer,
  CommandCloseProducer,
  CommandConsumerStatsResponse,
  CommandGetLastMessageIdResponse,
  CommandGetTopicsOfNamespaceResponse,
  CommandLookupTopicResponse,
  CommandPartitionedTopicMetadataResponse,
  CommandProducerSuccess,
  CommandSendReceipt,
  CommandSuccess,
  MessageMetadata,
  CommandSend
} from '../proto/PulsarApi'
import { _ConnectionOptions } from './ConnectionOptions'
import { PulsarSocket } from './pulsarSocket'
import { ProducerListeners } from './producerListeners'
import { Message } from './abstractPulsarSocket'
import Long from 'long'
import { ConsumerListeners } from './consumerListeners'
import { Signal } from 'micro-signals'
import { RequestTracker } from '../util/requestTracker'
import { serializeBatch } from './Commands'

export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: _ConnectionOptions
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly requestTracker = new RequestTracker<CommandTypesResponses>()

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    this.options = options
    this.socket = new PulsarSocket(this, logicalAddress)

    // register producer listener
    this.producerListeners = new ProducerListeners(this.socket)
    this.consumerLinsteners = new ConsumerListeners(this.socket)
    this.socket.dataStream.add((message: Message) => {
      switch (message.baseCommand.type) {
        case BaseCommand_Type.SUCCESS:
          if (message.baseCommand.success !== undefined) {
            this.handleResponse(message.baseCommand.success)
          }
          break
        case BaseCommand_Type.PRODUCER_SUCCESS:
          if (message.baseCommand.producerSuccess !== undefined) {
            this.handleResponse(message.baseCommand.producerSuccess)
          }
          break
        case BaseCommand_Type.PARTITIONED_METADATA_RESPONSE:
          if (message.baseCommand.partitionMetadataResponse !== undefined) {
            this.handleResponse(message.baseCommand.partitionMetadataResponse)
          }
          break
        case BaseCommand_Type.LOOKUP_RESPONSE:
          if (message.baseCommand.lookupTopicResponse !== undefined) {
            this.handleResponse(message.baseCommand.lookupTopicResponse)
          }
          break
        case BaseCommand_Type.CONSUMER_STATS_RESPONSE:
          if (message.baseCommand.consumerStatsResponse !== undefined) {
            this.handleResponse(message.baseCommand.consumerStatsResponse)
          }
          break
        case BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE:
          if (message.baseCommand.getLastMessageIdResponse !== undefined) {
            this.handleResponse(message.baseCommand.getLastMessageIdResponse)
          }
          break
        case BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE:
          if (message.baseCommand.getTopicsOfNamespaceResponse !== undefined) {
            this.handleResponse(message.baseCommand.getTopicsOfNamespaceResponse)
          }
          break
        case BaseCommand_Type.GET_SCHEMA_RESPONSE:
          if (message.baseCommand.getSchemaResponse !== undefined) {
            this.handleResponse(message.baseCommand.getSchemaResponse)
          }
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
            .catch((err) => {
              this.socket.wrappedLogger.error('auth challenge error', err)
            })
          break
        case BaseCommand_Type.SEND_RECEIPT:
          this.producerListeners.handleSendReceipt(message)
          break
        default:
          break
      }
    })
  }

  async reconnect (): Promise<void> {
    return await this.socket.reconnect()
  }

  close (): void {
    this.socket.close()
    this.requestTracker.clear()
  }

  getMaxMessageSize (): number {
    return this.options.maxMessageSize
  }

  /**
   * gets read only copy of the options the connection is operating with.
   * @returns
   */
  getOption (): Readonly<_ConnectionOptions> {
    return this.options
  }

  addConsumerHandler (id: Long, signal: Signal<Message | CommandCloseConsumer>): void {
    this.consumerLinsteners.addConsumeHandler(id, signal)
  }

  deleteConsumerHandler (id: Long): void {
    return this.consumerLinsteners.deleteConsumeHandler(id)
  }

  registerProducerListener (id: Long, signal: Signal<CommandSendReceipt | CommandCloseProducer>): void {
    return this.producerListeners.registerProducerListener(id, signal)
  }

  unregisterProducerListener (id: Long): void {
    return this.producerListeners.unregisterProducerListener(id)
  }

  async sendCommand (cmd: BaseCommand): Promise<CommandTypesResponses> {
    const requestTrack = this.requestTracker.trackRequest();

    (Object(cmd) as Array<keyof BaseCommand>).forEach((key: keyof BaseCommand) => {
      if (cmd[key] !== undefined && 'requestId' in (cmd[key] as any)) {
        (cmd[key] as any).requestId = requestTrack.id
      }
    })

    this.socket.writeCommand(cmd)
      .catch(e => requestTrack.rejectRequest(e))

    return await requestTrack.prom
  }

  sendMessages (producerId: Long, messageMetadata: MessageMetadata, uncompressedPayload: Uint8Array, requestId?: Long): {
    id: Long
    prom: Promise<CommandTypesResponses>
  } {
    const requestTrack = (requestId !== undefined) ? this.requestTracker.get(requestId) : this.requestTracker.trackRequest()
    if (requestTrack === undefined) {
      throw Error('wtf')
    }
    const sendCommand = CommandSend.fromJSON({
      producerId,
      sequenceId: requestTrack.id
    })

    messageMetadata.sequenceId = requestTrack.id

    this.socket.send(serializeBatch(sendCommand, messageMetadata, uncompressedPayload))
      .catch(e => requestTrack.rejectRequest(e))

    return {
      id: requestTrack.id,
      prom: requestTrack.prom
    }
  }

  getRequestTrack (requestId?: Long): {
    id: Long
    prom: Promise<CommandTypesResponses>
  } | undefined {
    const requestTrack = (requestId !== undefined) ? this.requestTracker.get(requestId) : this.requestTracker.trackRequest()
    if (requestTrack !== undefined) {
      return {
        id: requestTrack.id,
        prom: requestTrack.prom
      }
    }
  }

  handleResponseError (message: Message): void {
    this.requestTracker.rejectRequest(message.baseCommand.error?.requestId, message.baseCommand.error)
  }

  handleResponse (cmd: CommandTypesResponses): void {
    this.requestTracker.resolveRequest(cmd?.requestId, cmd)
  }

  isReady (): boolean {
    return this.socket.getState() === 'READY'
  }
}
