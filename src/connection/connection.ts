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
  SingleMessageMetadata,
  MessageMetadata,
  CommandLookupTopic,
  CommandLookupTopicResponse_LookupType
} from '../proto/PulsarApi'
import { ConnectionOptions, _initializeOption } from './ConnectionOptions'
import { PulsarSocket } from './pulsarSocket';
import { ProducerListeners } from './producerListeners'
import { Message } from './abstractPulsarSocket';
import Long from 'long';
import { ConsumerListeners } from './consumerListeners';
import { Signal } from 'micro-signals';
import { RequestTracker } from '../util/requestTracker';
import _ from 'lodash';
import { ProducerMessage } from 'producer/producer';
import { Writer } from 'protobufjs';

export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse
const lookupResultMaxRedirect = 20

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: ConnectionOptions
  private readonly producerListeners: ProducerListeners
  private readonly consumerLinsteners: ConsumerListeners
  private readonly requestTracker = new RequestTracker<CommandTypesResponses>()
  private producerId = 0

  constructor(options: ConnectionOptions, logicalAddress: URL) {
    this.options = options
    this.socket = new PulsarSocket(this, logicalAddress)

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

  getMaxMessageSize() {
    return this.options.maxMessageSize
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

  sendCommand(cmd: BaseCommand): Promise<CommandTypesResponses> {
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

  sendMessages(messages: ProducerMessage[]) {
    const smms = messages.map(msg => {
      return SingleMessageMetadata.fromJSON({
        payloadSize: msg.payload.byteLength,
        eventTime: msg.eventTimeMs,
        partitionKey: msg.key,
        orderingKey: msg.orderingKey,
        properties: Object.entries(msg.properties || {}).map(([key, value]) => {
          return { key, value }
        })
      })
    })
    const payloads = smms.map(smm => {
      const encodedSmm = SingleMessageMetadata.encode(smm).finish()

      return new Uint8Array([
        // This is where custom "frame" attributes comes in, which is fixed 32 bit numeric command and frame
        // size is inserted before the command
        ...(new Writer()).uint32(encodedSmm.length).finish(),
        ...encodedSmm
      ])
    })

    const requestTrack = this.requestTracker.trackRequest();
    const messageMetadata = MessageMetadata.fromJSON({
      sequenceId: requestTrack.id,
      publishTime: Date.now(),
      producerName: '',
      replicateTo: messages[0].replicationClusters,
      partitionKey: smms[0].partitionKey,
      deliverAtTime: messages[0].deliverAtMs,
      numMessagesInBatch: payloads.length,
      uncompressedSize: payloads.reduce((pv, cv) => pv + cv.length, 0)
    })

    this.socket.send(serializeBatch(messageMetadata, payloads))
      .catch(e => requestTrack.rejectRequest(e))

    return requestTrack.prom
  }

  handleResponseError(message: Message) {
    this.requestTracker.rejectRequest(message.baseCommand.error?.requestId, message.baseCommand.error)
  }

  handleResponse(cmd: CommandTypesResponses) {
    this.requestTracker.resolveRequest(cmd?.requestId, cmd)
  }

  getNewProducerId() {
    return this.producerId++
  }

  isReady() {
    return this.socket.getState() === 'READY'
  }
}
