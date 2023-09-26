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
    it('can get token', async () => {
      const oauthOption = convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile)

      const auth = new OAuth(oauthOption)

      await auth.getToken()
    }).timeout(5000)
  })

  it('can establish a connection', async () => {
    const cnx = client.getConnection()
    await cnx.ensureReady()
  })
})
