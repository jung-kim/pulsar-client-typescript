import { convertFromSNOauth2KeyFile, OAuth } from '../../src/auth/oauth'
import { configs } from './configs'
import { readFileSync } from 'fs'
import { TestClient } from '../utils'
import { expect } from 'chai'
import { ServerError } from '../../src/proto/PulsarApi'

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
    })
  })

  it('should be able to establish a connection', async () => {
    const cnx = client.getConnection()
    await cnx.ensureReady()
  })

  describe('lookupService', () => {
    it('should return lookup response', async () => {
      const lookupResp = await client.lookupService.lookup('non-persistent://public/default/np-0')
      expect(lookupResp.error).eq(ServerError.UnknownError)
      expect(lookupResp.brokerServiceUrl === '' ? lookupResp.brokerServiceUrlTls : lookupResp.brokerServiceUrl).not.eq('')
    })

    describe('getPartitionedTopicMetadata', () => {
      it('should return for none persistent none partitioned topic', async () => {
        const topicMetdataResp = await client.lookupService.getPartitionedTopicMetadata('non-persistent://public/default/np0')
        expect(topicMetdataResp.partitions).eq(0)
      })
      it('should return for persistent none partitioned topic', async () => {
        const topicMetdataResp = await client.lookupService.getPartitionedTopicMetadata('persistent://public/default/p3')
        expect(topicMetdataResp.partitions).eq(3)
      })
      it('should return for none persistent partitioned topic', async () => {
        const topicMetdataResp = await client.lookupService.getPartitionedTopicMetadata('non-persistent://public/default/np5')
        expect(topicMetdataResp.partitions).eq(5)
      })
      it('should return for persistent partitioned topic', async () => {
        const topicMetdataResp = await client.lookupService.getPartitionedTopicMetadata('persistent://public/default/p0')
        expect(topicMetdataResp.partitions).eq(0)
      })
    })
  })
})
