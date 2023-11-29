import { DEFAULT_CONNECTION_TIMEOUT_MS, DEFAULT_KEEP_ALIVE_INTERVAL_MS, DEFAULT_MAX_MESSAGE_SIZE } from '../../../src/connection'
import { _initializeOption } from '../../../src/connection/connectionOptions'
import { expect } from 'chai'
import ip from 'ip'
import { OAuth } from '../../../src/auth/oauth'

describe('connection.ConnectionOptions', () => {
  describe('_initializeOption', () => {
    it('should initialize pulsar-ssl with defaults', () => {
      const options = _initializeOption({ url: 'pulsar+ssl://a.b' })

      expect(options.connectionTimeoutMs).to.eq(DEFAULT_CONNECTION_TIMEOUT_MS)
      expect(options.keepAliveIntervalMs).to.eq(DEFAULT_KEEP_ALIVE_INTERVAL_MS)
      expect(options.maxMessageSize).to.eq(DEFAULT_MAX_MESSAGE_SIZE)
      expect(options._isTlsEnabled).to.eq(true)
      expect(options.listenerName).to.eq('')
      expect(options._urlObj.toString()).to.eq('pulsar+ssl://a.b')
      expect(options._connectionId).to.eq(`${ip.address()} -> ${options._urlObj.toString()}`)
      expect(options.auth).to.be.an('object')
      expect(options.auth.name).to.eq('noauth')
    })

    it('should initialize https with defaults', () => {
      const options = _initializeOption({ url: 'https://a.b' })

      expect(options.connectionTimeoutMs).to.eq(DEFAULT_CONNECTION_TIMEOUT_MS)
      expect(options.keepAliveIntervalMs).to.eq(DEFAULT_KEEP_ALIVE_INTERVAL_MS)
      expect(options.maxMessageSize).to.eq(DEFAULT_MAX_MESSAGE_SIZE)
      expect(options._isTlsEnabled).to.eq(true)
      expect(options.listenerName).to.eq('')
      expect(options._urlObj.toString()).to.eq('https://a.b/')
      expect(`${options._connectionId}/`).to.eq(`${ip.address()} -> ${options._urlObj.toString()}`)
      expect(options.auth).to.be.an('object')
      expect(options.auth.name).to.eq('noauth')
    })

    it('should initialize with options populated', () => {
      const options = _initializeOption({
        url: 'abc://a.b',
        connectionTimeoutMs: 1000,
        keepAliveIntervalMs: 2000,
        maxMessageSize: 3000,
        listenerName: 'hello',
        auth: new OAuth({
          clientId: 'abc',
          clientSecret: 'cde',
          baseSite: 'fgh'
        })
      })

      expect(options.connectionTimeoutMs).to.eq(1000)
      expect(options.keepAliveIntervalMs).to.eq(2000)
      expect(options.maxMessageSize).to.eq(3000)
      expect(options._isTlsEnabled).to.eq(false)
      expect(options.listenerName).to.eq('hello')
      expect(options._urlObj.toString()).to.eq('abc://a.b')
      expect(options._connectionId).to.eq(`${ip.address()} -> ${options._urlObj.toString()}`)
      expect(options.auth).to.be.an('object')
      expect(options.auth.name).to.eq('token')
    })
  })
})
