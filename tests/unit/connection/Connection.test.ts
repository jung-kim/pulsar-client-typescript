import { Connection } from '../../../src/connection/connection'
import { expect } from 'chai'
import { CommandTypesResponses, EventSignalType, Message } from '../../../src/connection'
import { Signal } from 'micro-signals'
import { BaseCommand, BaseCommand_Type, CommandCloseConsumer, CommandPing, CommandSuccess } from '../../../src/proto/PulsarApi'
import { createDummyBaseCommand, getConnection, getDefaultHandleResponseStubs, TestConnection } from './utils'
import Long from 'long'
import sinon from 'sinon'
import { RequestTracker } from '../../../src/util/requestTracker'

describe('connection.Connection', () => {
  describe('constructor', () => {
    let conn: Connection
    let eventSignal: Signal<EventSignalType>

    beforeEach(() => ({ conn, eventSignal } = getConnection()))
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message: {
            baseCommand,
            headersAndPayload: dummyBuffer
          }
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

        eventSignal.dispatch({
          event: 'message',
          message
        })

        await prom

        expect(responseStub.notCalled).to.eq(true)
        expect(errorResponseStub.calledOnceWith(message)).to.eq(true)
      })
    })
  })

  describe('sendCommand()', () => {
    let conn: TestConnection
    let rt: RequestTracker<CommandTypesResponses>
    let sendStub: sinon.SinonStub<[buffer: Uint8Array | Buffer], Promise<void>>

    beforeEach(() => {
      ({ conn, sendStub } = getConnection())
      rt = conn.getRequestTracker()
    })
    afterEach(() => conn.close())

    it('should create a request tracker if not passed in', async () => {
      await conn.ensureReady()
      const closeConsumerCommand = BaseCommand.fromJSON({
        type: BaseCommand_Type.CLOSE_CONSUMER,
        closeConsumer: CommandCloseConsumer.fromJSON({
          consumerId: Long.UONE
        })
      })

      const requestId = Long.UONE

      const closeConsumerCommandResultProm = conn.sendCommand(closeConsumerCommand)
      const interval = setInterval(() => {
        if (rt.get(requestId) === undefined) {
          return
        }
        expect(rt.get(requestId)).to.be.an('object')
        rt.get(requestId)?.resolveRequest(CommandSuccess.fromJSON({
          requestId
        }))
        clearInterval(interval)
      }, 25)
      const closeConsumerCommandResult = await closeConsumerCommandResultProm as CommandSuccess

      expect(sendStub.callCount).to.eq(1)
      expect(closeConsumerCommandResult.requestId.eq(requestId)).to.eq(true)
    })

    it('should be able to passin custom request id', async () => {
      const requestId = Long.fromNumber(5, true)
      for (let i = 0; i <= requestId.toNumber(); i++) {
        conn.getRequestTracker().trackRequest()
      }
      const closeConsumerCommand = BaseCommand.fromJSON({
        type: BaseCommand_Type.CLOSE_CONSUMER,
        closeConsumer: CommandCloseConsumer.fromJSON({
          consumerId: Long.UZERO,
          requestId
        })
      })

      const closeConsumerCommandResultProm = conn.sendCommand(closeConsumerCommand)
      const interval = setInterval(() => {
        if (rt.get(requestId) === undefined) {
          return
        }
        expect(rt.get(requestId)).to.be.an('object')
        rt.get(requestId)?.resolveRequest(CommandSuccess.fromJSON({
          requestId
        }))
        clearInterval(interval)
      }, 25)
      const closeConsumerCommandResult = await closeConsumerCommandResultProm as CommandSuccess

      expect(sendStub.callCount).to.eq(1)
      expect(closeConsumerCommandResult.requestId.eq(requestId)).to.eq(true)
    })

    it('missing request id if passed in', async () => {
      const closeConsumerCommand = BaseCommand.fromJSON({
        type: BaseCommand_Type.CLOSE_CONSUMER,
        closeConsumer: CommandCloseConsumer.fromJSON({
          consumerId: Long.UZERO,
          requestId: Long.fromNumber(55, true)
        })
      })

      try {
        await conn.sendCommand(closeConsumerCommand)
        expect.fail('should not have succeeded')
      } catch (e) {
        expect(e.message).to.eq('passed in request id is invalid')
      }
    })

    it('invalid multiple payloads', async () => {
      const invalidCommand = BaseCommand.fromJSON({
        type: BaseCommand_Type.CLOSE_CONSUMER,
        closeConsumer: CommandCloseConsumer.fromJSON({
          consumerId: Long.UZERO,
          requestId: Long.UZERO
        }),
        ping: CommandPing.fromJSON({})
      })

      try {
        await conn.sendCommand(invalidCommand)
        expect.fail('should not have succeeded')
      } catch (e) {
        expect(e.message).to.eq('invalid number of commands are passed in')
      }
    })

    it('throws error when write command errors', async () => {
      const closeConsumerCommand = BaseCommand.fromJSON({
        type: BaseCommand_Type.CLOSE_CONSUMER,
        closeConsumer: CommandCloseConsumer.fromJSON({
          consumerId: Long.UZERO
        })
      })

      sendStub.throws(new Error('some error'))

      try {
        await conn.sendCommand(closeConsumerCommand)
        expect.fail('should not have succeeded')
      } catch (e) {
        expect(e.message).to.eq('some error')
      }
    })
  })
})
