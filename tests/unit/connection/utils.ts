import { Signal } from 'micro-signals'
import sinon from 'sinon'
import { CommandTypesResponses, Connection, EventSignalType, Message } from '../../../src/connection'
import { _initializeOption } from '../../../src/connection/connectionOptions'
import { ConsumerListeners } from '../../../src/connection/consumerListeners'
import { ProducerListeners } from '../../../src/connection/producerListeners'
import { PulsarSocket } from '../../../src/connection/pulsarSocket/pulsarSocket'
import { BaseCommand, BaseCommand_Type } from '../../../src/proto/PulsarApi'
import { RequestTracker } from '../../../src/util/requestTracker'
import { Socket } from 'net'

export class TestConnection extends Connection {
  getPulsarSocket (): PulsarSocket { return this.pulsarSocket }
  getProducerListeners (): ProducerListeners { return this.producerListeners }
  getConsumerListeners (): ConsumerListeners { return this.consumerLinsteners }
  getRequestTracker (): RequestTracker<CommandTypesResponses> { return this.requestTracker }
  getEventSignal (): Signal<EventSignalType> { return this._eventSignal }
}

export const getConnection = (): {
  conn: TestConnection
  eventSignal: Signal<EventSignalType>
  sendStub: sinon.SinonStub<[buffer: Uint8Array | Buffer], Promise<void>>
  ensureReadyStub: sinon.SinonStub<[], Promise<void>>
} => {
  const options = _initializeOption({ url: 'pulsar://a.b:6651' })
  sinon.stub(options, 'getTcpSocket')
    .callsFake((logicalAddress: URL) => {
      return sinon.createStubInstance(Socket)
    })
  const logicalAddress = new URL('pulsar://a.b:6651')
  const conn = new TestConnection(options, logicalAddress)

  const sendStub = sinon.stub(conn.getPulsarSocket(), 'send')
    .returns(Promise.resolve())
  const ensureReadyStub = sinon.stub(conn, 'ensureReady').returns(Promise.resolve())

  return { conn, eventSignal: conn.getEventSignal(), sendStub, ensureReadyStub }
}

export const getDefaultHandleResponseStubs = (conn: Connection): {
  prom: Promise<void>
  responseStub: sinon.SinonStub<[cmd: CommandTypesResponses], void>
  errorResponseStub: sinon.SinonStub<[message: Message], void>
} => {
  let res: () => void
  const prom = new Promise<void>(resolve => { res = resolve })
  const originalHandleResponse = conn.handleResponse.bind(conn)

  return {
    prom,
    responseStub: sinon.stub(conn, 'handleResponse').callsFake(cmd => {
      originalHandleResponse(cmd)
      res()
    }),
    errorResponseStub: sinon.stub(conn, 'handleResponseError')
  }
}

export const createDummyBaseCommand = (type: BaseCommand_Type): BaseCommand => {
  return {
    type,
    connect: undefined,
    connected: undefined,
    subscribe: undefined,
    producer: undefined,
    send: undefined,
    sendReceipt: undefined,
    sendError: undefined,
    message: undefined,
    ack: undefined,
    flow: undefined,
    unsubscribe: undefined,
    success: undefined,
    error: undefined,
    closeProducer: undefined,
    closeConsumer: undefined,
    producerSuccess: undefined,
    ping: undefined,
    pong: undefined,
    redeliverUnacknowledgedMessages: undefined,
    partitionMetadata: undefined,
    partitionMetadataResponse: undefined,
    lookupTopic: undefined,
    lookupTopicResponse: undefined,
    consumerStats: undefined,
    consumerStatsResponse: undefined,
    reachedEndOfTopic: undefined,
    seek: undefined,
    getLastMessageId: undefined,
    getLastMessageIdResponse: undefined,
    activeConsumerChange: undefined,
    getTopicsOfNamespace: undefined,
    getTopicsOfNamespaceResponse: undefined,
    getSchema: undefined,
    getSchemaResponse: undefined,
    authChallenge: undefined,
    authResponse: undefined,
    ackResponse: undefined,
    getOrCreateSchema: undefined,
    getOrCreateSchemaResponse: undefined,
    /** transaction related */
    newTxn: undefined,
    newTxnResponse: undefined,
    addPartitionToTxn: undefined,
    addPartitionToTxnResponse: undefined,
    addSubscriptionToTxn: undefined,
    addSubscriptionToTxnResponse: undefined,
    endTxn: undefined,
    endTxnResponse: undefined,
    endTxnOnPartition: undefined,
    endTxnOnPartitionResponse: undefined,
    endTxnOnSubscription: undefined,
    endTxnOnSubscriptionResponse: undefined,
    tcClientConnectRequest: undefined,
    tcClientConnectResponse: undefined,
    watchTopicList: undefined,
    watchTopicListSuccess: undefined,
    watchTopicUpdate: undefined,
    watchTopicListClose: undefined
  }
}
