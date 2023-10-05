import { convertFromSNOauth2KeyFile, OAuth } from '../../src/auth/oauth'
import { configs } from './configs'
import { readFileSync } from 'fs'
import { TestClient } from '../utils'

describe('e2e connect tests', () => {
  const sn2Oauth2KeyFile = JSON.parse(readFileSync(configs.snOauth2KeyFile).toString())
  const client = new TestClient({
    url: configs.brokerUrl,
    auth: new OAuth(convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile))
  })

  describe('oauth', () => {
    it('should be able to get token', async () => {
      const oauthOption = convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile)
      const auth = new OAuth(oauthOption)

      await auth.getToken()
    }).timeout(5000)
  })

  it('should be able to establish a connection', async () => {
    const cnx = client.getConnection()
    await cnx.ensureReady()
  })

  describe('lookups', () => {
    it('should return lookup response', async () => {
      await client.lookupService.lookup('non-persistent://public/default/npers-0-0')
    })
  })
})
