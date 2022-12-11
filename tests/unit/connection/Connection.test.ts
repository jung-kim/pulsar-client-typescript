import { Socket } from 'net'
import sinon from 'sinon'
import { Connection } from '../../../src/connection/Connection'
import { expect } from 'chai'
import { _ConnectionOptions } from '../../../src/connection/ConnectionOptions'

const options = new _ConnectionOptions({ url: 'pulsar://a.b' })
const logicalAddress = new URL('pulsar://a.b')

describe('connection.Connection', () => {
  describe('Connection', () => {
    it('constructor', () => {
      const socket = sinon.stub(Socket) as unknown as Socket
      sinon.stub(options, 'getSocket')
        .callsFake(() => socket)
      const conn = new Connection(options, logicalAddress)

      expect(conn.isReady()).to.eq(false)

      conn.close()
    })
  })
})
