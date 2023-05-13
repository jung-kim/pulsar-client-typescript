import { Connection } from '../../../src/connection/Connection'
import { expect } from 'chai'
import { Message } from '../../../src/connection'
import { Signal } from 'micro-signals'
import { BaseCommand_Type } from '../../../src/proto/PulsarApi'
import { createDummyBaseCommand, getConnection, getDefaultHandleResponseStubs } from './utils'
import Long from 'long'
import sinon from 'sinon'

describe('connection.Connection', () => {
  describe('constructor', () => {
    let conn: Connection
    let dataSignal: Signal<Message>

    beforeEach(() => ({ conn, dataSignal } = getConnection()))
    afterEach(() => conn.close())

    it('should be able to construct', () => {
      expect(conn.isReady()).to.eq(false)
    })

    describe('handle responses', () => {
      const dummyBuffer = Buffer.from('')

      it('should be able to handle SUCCESS message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.SUCCESS)
        baseCommand.success = { requestId: Long.fromInt(111), schema: undefined }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.success)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle PRODUCER_SUCCESS message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.PRODUCER_SUCCESS)
        baseCommand.producerSuccess = {
          requestId: Long.fromInt(222),
          producerName: 'abc',
          lastSequenceId: Long.fromInt(3),
          schemaVersion: new Uint8Array(),
          topicEpoch: Long.fromInt(4),
          producerReady: false
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.producerSuccess)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle PARTITIONED_METADATA_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.PARTITIONED_METADATA_RESPONSE)
        baseCommand.partitionMetadataResponse = {
          requestId: Long.fromInt(333),
          partitions: 3,
          response: 0,
          error: -1,
          message: 'aaa'
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.partitionMetadataResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle LOOKUP_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.LOOKUP_RESPONSE)
        baseCommand.lookupTopicResponse = {
          requestId: Long.fromInt(444),
          brokerServiceUrl: 'http://b.c',
          brokerServiceUrlTls: 'https://b.c',
          response: 1,
          authoritative: false,
          error: -1,
          message: 'hello',
          proxyThroughServiceUrl: false
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.lookupTopicResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle CONSUMER_STATS_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.CONSUMER_STATS_RESPONSE)
        baseCommand.consumerStatsResponse = {
          requestId: Long.fromInt(555),
          errorCode: -1,
          errorMessage: 'bb',
          msgRateOut: 1,
          msgThroughputOut: 2,
          msgRateRedeliver: 3,
          consumerName: 'name',
          availablePermits: Long.fromInt(9),
          unackedMessages: Long.fromInt(10),
          blockedConsumerOnUnackedMsgs: false,
          address: '',
          connectedSince: '',
          type: '',
          msgRateExpired: 4,
          msgBacklog: Long.fromInt(11),
          messageAckRate: 5
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.consumerStatsResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle GET_LAST_MESSAGE_ID_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE)
        baseCommand.getLastMessageIdResponse = {
          requestId: Long.fromInt(666),
          lastMessageId: undefined,
          consumerMarkDeletePosition: undefined
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.getLastMessageIdResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle GET_TOPICS_OF_NAMESPACE_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE)
        baseCommand.getTopicsOfNamespaceResponse = {
          requestId: Long.fromInt(777),
          topics: [],
          filtered: false,
          topicsHash: 'hash',
          changed: true
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.getTopicsOfNamespaceResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle GET_SCHEMA_RESPONSE message', async () => {
        const { prom, responseStub, errorResponseStub } = getDefaultHandleResponseStubs(conn)

        const baseCommand = createDummyBaseCommand(BaseCommand_Type.GET_SCHEMA_RESPONSE)
        baseCommand.getSchemaResponse = {
          requestId: Long.fromInt(777),
          errorCode: -1,
          errorMessage: 'erro',
          schema: undefined,
          schemaVersion: new Uint8Array()
        }

        dataSignal.dispatch({
          baseCommand,
          headersAndPayload: dummyBuffer
        })

        await prom

        expect(responseStub.calledOnceWith(baseCommand.getSchemaResponse)).to.eq(true)
        expect(errorResponseStub.notCalled).to.eq(true)
      })

      it('should be able to handle ERROR message', async () => {
        const baseCommand = createDummyBaseCommand(BaseCommand_Type.ERROR)
        let res: () => void
        const prom = new Promise<void>(resolve => { res = resolve })
        const originalhandleResponseError = conn.handleResponseError.bind(conn)
        const responseStub = sinon.stub(conn, 'handleResponse')
        const errorResponseStub = sinon.stub(conn, 'handleResponseError').callsFake((message: Message) => {
          originalhandleResponseError(message)
          res()
        })

        const message = {
          baseCommand,
          headersAndPayload: Buffer.from('error')
        }
        dataSignal.dispatch(message)

        await prom

        expect(responseStub.notCalled).to.eq(true)
        expect(errorResponseStub.calledOnceWith(message)).to.eq(true)
      })
    })
  })
})
