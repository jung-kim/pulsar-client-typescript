import { Message, PROTOCOL_VERSION, PULSAR_CLIENT_VERSION, CommandTypesResponses, EventSignalType } from '.'
import { BaseCommand, BaseCommand_Type, CommandCloseConsumer } from '../proto/PulsarApi'
import { WrappedLogger } from '../util/logger'
import { RequestTracker } from '../util/requestTracker'
import { ConnectionOptions } from './connectionOptions'
import { ConsumerListeners } from './consumerListeners'
import { ProducerListeners } from './producerListeners'
import { PulsarSocket } from './pulsarSocket/pulsarSocket'
import { Signal } from 'micro-signals'
import Long from 'long'

export abstract class BaseConnection {
  protected readonly pulsarSocket: PulsarSocket
  protected readonly producerListeners: ProducerListeners
  protected readonly consumerLinsteners: ConsumerListeners
  protected readonly requestTracker = new RequestTracker<CommandTypesResponses>()
  protected readonly _eventSignal = new Signal<EventSignalType>()

  public readonly options: ConnectionOptions
  abstract readonly wrappedLogger: WrappedLogger

  constructor (options: ConnectionOptions, logicalAddress: URL) {
    this.options = options
    this.pulsarSocket = new PulsarSocket(options, logicalAddress, this._eventSignal)

    // register producer listener
    this.producerListeners = new ProducerListeners(options.uuid)
    this.consumerLinsteners = new ConsumerListeners(options.uuid)

    this.pulsarSocket.eventSignal.add(({ event, message }) => {
      if (event !== 'message') {
        return
      }
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

  abstract close (): void

  registerConsumeHandler (id: Long, signal: Signal<Message | CommandCloseConsumer>): void {
    this.consumerLinsteners.registerConsumeHandler(id, signal)
  }

  unregisterConsumeHandler (id: Long): void {
    return this.consumerLinsteners.unregisterConsumeHandler(id)
  }

  handleResponseError (message: Message): void {
    this.requestTracker.rejectRequest(message.baseCommand.error?.requestId, message.baseCommand.error)
  }

  handleResponse (cmd: CommandTypesResponses): void {
    if ('requestId' in cmd) {
      this.requestTracker.resolveRequest(cmd?.requestId, cmd)
    }
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
      return await this.pulsarSocket.writeCommand(payload)
    } catch (e) {
      this.wrappedLogger.error('auth challeng failed', e)
    }
  }
}
