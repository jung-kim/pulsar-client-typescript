import { convertFromSNOauth2KeyFile, OAuth } from '../../src/auth/oauth'
import { configs } from './configs'
import { readFileSync } from 'fs'
import { ConnectionPool } from '../../src/connection'

describe('e2e connect tests', () => {
  const sn2Oauth2KeyFile = JSON.parse(readFileSync(configs.snOauth2KeyFile).toString())

  describe('oauth', () => {
    it('can get token', async () => {
      const oauthOption = convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile)

      const auth = new OAuth(oauthOption)

      await auth.getToken()
    }).timeout(5000)
  })

  it('can establish a connection', async () => {
    const cp = new ConnectionPool({
      url: configs.brokerUrl,
      auth: new OAuth(convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile))
    })

    const cnx = cp.getConnection(new URL(configs.brokerUrl))
    await cnx.ensureReady()
  })
})
