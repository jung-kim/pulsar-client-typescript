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
import { PROTOCOL_VERSION, PULSAR_CLIENT_VERSION, _ConnectionOptions } from './ConnectionOptions'
import { PulsarSocket } from './pulsarSocket'
import { ProducerListeners } from './producerListeners'
import { Message } from './index'
import Long from 'long'
import { ConsumerListeners } from './consumerListeners'
import { Signal } from 'micro-signals'
import { RequestTracker } from '../util/requestTracker'
import { serializeBatch } from './Commands'
import { WrappedLogger } from 'util/logger'

export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse

export class Connection {
  private readonly socket: PulsarSocket
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly requestTracker = new RequestTracker<CommandTypesResponses>()

  public readonly options: _ConnectionOptions
  private readonly wrappedLogger: WrappedLogger

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    this.options = options
    this.socket = new PulsarSocket(options, logicalAddress)
    this.wrappedLogger = options.getWrappedLogger('Connection', logicalAddress)

    // register producer listener
    this.producerListeners = new ProducerListeners(this.socket.getId())
    this.consumerLinsteners = new ConsumerListeners(this.socket.getId())
    this.socket.eventSignal.add((event: string) => {
      switch (event) {
        case 'close':
          this.close()
      }
    })
    this.socket.dataSignal.add((message: Message) => {
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
            this.close()
          }
          break
        case BaseCommand_Type.CLOSE_PRODUCER:
          this.producerListeners.handleCloseProducer(message)
          break
        case BaseCommand_Type.CLOSE_CONSUMER:
          this.consumerLinsteners.handleCloseConsumer(message)
          break
        case BaseCommand_Type.AUTH_CHALLENGE:
          this.handleAuthChallenge(message)
            .catch((err) => {
              this.wrappedLogger.error('auth challenge error', err)
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
    this.socket._eventSignal.dispatch('reconnect')
    return await this.socket.ensureReady()
  }

  close (): void {
    this.requestTracker.clear()
    this.socket._eventSignal.dispatch('close')
  }

  registerConsumeHandler (id: Long, signal: Signal<Message | CommandCloseConsumer>): void {
    this.consumerLinsteners.registerConsumeHandler(id, signal)
  }

  unregisterConsumeHandler (id: Long): void {
    return this.consumerLinsteners.unregisterConsumeHandler(id)
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
      throw Error('Failed to find requestTrack')
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

  async ensureReady (): Promise<void> {
    return await this.socket.ensureReady()
  }

  public async handleAuthChallenge (_: Message): Promise<void> {
    try {
      const authData = await this.options.auth.getToken()
      const payload = BaseCommand.fromJSON({
        type: BaseCommand_Type.AUTH_RESPONSE,
        connect: {
          protocolVersion: PROTOCOL_VERSION,
          clientVersion: PULSAR_CLIENT_VERSION,
          authMethodName: this.options.auth.name,
          authData: Buffer.from(authData).toString('base64'),
          featureFlags: {
            supportsAuthRefresh: true
          }
        }
      })
      return await this.socket.writeCommand(payload)
    } catch (e) {
      this.wrappedLogger.error('auth challeng failed', e)
    }
  }
}
