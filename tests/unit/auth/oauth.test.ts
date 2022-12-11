import { expect } from 'chai'
import { OAuth } from '../../../src/auth/oauth'
import sinon from 'sinon'

describe('auth.Oauth', () => {
  describe('constructor', () => {
    it('should initialize correctly with only required options', () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c'
      })

      expect(oauth.name).to.eq('token')
      expect(oauth.oauth.getAuthorizeUrl()).to.eq('c/oauth/authorize?client_id=a')
      expect(oauth.customParams).to.eql({})
      expect(oauth.tokenOverride).to.eq(undefined)
    })

    it('should initialize correctly with additional options', () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c',
        authorizePath: 'd',
        accessTokenPath: 'e',
        customHeaders: {
          f: 1,
          g: 2
        },
        customParams: {
          h: 'h',
          i: 'i'
        },
        _token: 'j'
      })

      expect(oauth.name).to.eq('token')
      expect(oauth.oauth.getAuthorizeUrl()).to.eq('cd?client_id=a')
      expect(oauth.customParams).to.eql({ h: 'h', i: 'i' })
      expect(oauth.tokenOverride).to.eq('j')
    })
  })

  describe('getToken()', () => {
    it('should return overriden value', async () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c',
        _token: 'ddd'
      })

      expect(await oauth.getToken()).to.eq('ddd')
    })

    it('should return fetched token', async () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c'
      })

      sinon.stub(oauth, '_fetchAccessToken')
        .callsFake(async (params: Record<string, string>) => {
          expect(params.grant_type).to.eq('client_credentials')
          return await new Promise(resolve => {
            resolve({
              accessToken: 'aaa',
              refreshToken: 'bbb',
              expiresIn: 60000
            })
          })
        })

      expect(await oauth.getToken()).to.eq('aaa')
    })

    it('should return cached token if valid', async () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c'
      })

      sinon.stub(oauth, '_fetchAccessToken')
        .callsFake(async (params: Record<string, string>) => {
          expect(params.grant_type).to.eq('client_credentials')
          return await new Promise(resolve => {
            resolve({
              accessToken: 'aaa',
              refreshToken: 'bbb',
              expiresIn: 60000
            })
          })
        })

      expect(await oauth.getToken()).to.eq('aaa')
      sinon.restore()
      sinon.stub(oauth, '_fetchAccessToken')
        .callsFake(async (_params: Record<string, string>) => {
          expect.fail('should not be called...')
        })
      expect(await oauth.getToken()).to.eq('aaa')
    })

    it('should refresh token if expired', async () => {
      const oauth = new OAuth({
        clientId: 'a',
        clientSecret: 'b',
        baseSite: 'c'
      })

      sinon.stub(oauth, '_fetchAccessToken')
        .callsFake(async (params: Record<string, string>) => {
          expect(params.grant_type).to.eq('client_credentials')
          return await new Promise(resolve => {
            resolve({
              accessToken: 'aaa',
              refreshToken: 'bbb',
              expiresIn: 60000
            })
          })
        })

      expect(await oauth.getToken()).to.eq('aaa')
      sinon.restore()
      sinon.stub(oauth, '_fetchAccessToken')
        .callsFake(async (params: Record<string, string>) => {
          expect(params.grant_type).to.eq('refresh_token')
          expect(params.refresh_token).to.eq('bbb')
          return await new Promise(resolve => {
            resolve({
              accessToken: 'ccc',
              refreshToken: 'ddd',
              expiresIn: 60000
            })
          })
        })
      sinon.stub(oauth, 'isTokenExpired')
        .callsFake(() => true)
      expect(await oauth.getToken()).to.eq('ccc')
    })
  })
})
