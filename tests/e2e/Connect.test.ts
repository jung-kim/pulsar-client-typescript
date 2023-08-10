import { convertFromSNOauth2KeyFile, OAuth } from '../../src/auth/oauth'
import { configs } from './configs'
import { readFileSync } from 'fs'

describe('e2e connect tests', () => {
  describe('oauth', () => {
    it('can get token', async () => {
      const sn2Oauth2KeyFile = JSON.parse(readFileSync(configs.snOauth2KeyFile).toString())
      const oauthOption = convertFromSNOauth2KeyFile(configs.audience, sn2Oauth2KeyFile)

      const auth = new OAuth(oauthOption)

      await auth.getToken()
    }).timeout(5000)
  })

  it('can establish a connection', async () => {
    // const cp = new ConnectionPool({
    //   url: 'pulsar+ssl://dixie-14f4fc12-3962-4be7-b0bb-2936a9f53e83.aws-use2-dixie-snc.streamnative.test.aws.sn2.dev:6651',
    //   auth: new OAuth({
    //     clientId: 'ncoSzdum3xYgcQIoHOS6B3toeFgWzUZS',
    //     clientSecret: '_TC2I5h8gP6z1Wo3d5svgT0T_y3Rhkm03bsxI-LzATfBs5Cl4H30yrQculH00q52',
    //     baseSite: 'https://auth.test.cloud.gcp.streamnative.dev/'
    //   })
    // })

    // const cnx = cp.getConnection(new URL('pulsar+ssl://dixie-14f4fc12-3962-4be7-b0bb-2936a9f53e83.aws-use2-dixie-snc.streamnative.test.aws.sn2.dev:6651'))

    // await cnx.ensureReady()
  })
})
