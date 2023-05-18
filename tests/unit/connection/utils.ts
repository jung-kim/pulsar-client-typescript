import { Signal } from 'micro-signals'
import sinon from 'sinon'
import { CommandTypesResponses, Connection, EventSignalType, Message } from '../../../src/connection'
import { _ConnectionOptions } from '../../../src/connection/ConnectionOptions'
import { BaseCommand, BaseCommand_Type } from '../../../src/proto/PulsarApi'

export const getConnection = (): {
  conn: Connection
  dataSignal: Signal<Message>
  eventSignal: Signal<EventSignalType>
} => {
  const options = new _ConnectionOptions({ url: 'pulsar://a.b:6651' })
  const logicalAddress = new URL('pulsar://a.b:6651')
  const conn = new Connection(options, logicalAddress)

  return {
    conn,
    dataSignal: options._dataSignal,
    eventSignal: options._eventSignal
  }
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
