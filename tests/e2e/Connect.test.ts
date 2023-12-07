import { convertFromSNOauth2KeyFile, OAuth } from '../../src/auth/oauth'
import { configs } from './configs'
import { readFileSync } from 'fs'
import { expect } from 'chai'
import { CommandSendReceipt, ServerError } from '../../src/proto/PulsarApi'
import { RouterArg } from '../../src/producer/defaultRouter'
import { Client } from '../../src/client'

describe('e2e connect tests', () => {
  const sn2Oauth2KeyFile = JSON.parse(readFileSync(configs.snOauth2KeyFile).toString())
  const client = new Client({
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

  describe('lookupService', () => {
    it('should return lookup response', async () => {
      const lookupResp = await client.lookup('non-persistent://public/default/np-0')
      expect(lookupResp.error).eq(ServerError.UnknownError)
      expect(lookupResp.brokerServiceUrl === '' ? lookupResp.brokerServiceUrlTls : lookupResp.brokerServiceUrl).not.eq('')
    })

    describe('getPartitionedTopicMetadata', () => {
      it.skip('should return for none persistent none partitioned topic', async () => {
        const topicMetdataResp = await client.getPartitionedTopicMetadata('non-persistent://public/default/np0')
        expect(topicMetdataResp.partitions).eq(0)
      })
      it('should return for persistent none partitioned topic', async () => {
        const topicMetdataResp = await client.getPartitionedTopicMetadata('persistent://public/default/p3')
        expect(topicMetdataResp.partitions).eq(3)
      })
      it('should return for none persistent partitioned topic', async () => {
        const topicMetdataResp = await client.getPartitionedTopicMetadata('non-persistent://public/default/np5')
        expect(topicMetdataResp.partitions).eq(5)
      })
      it('should return for persistent partitioned topic', async () => {
        const topicMetdataResp = await client.getPartitionedTopicMetadata('persistent://public/default/p0')
        expect(topicMetdataResp.partitions).eq(0)
      })
    })
  })

  describe('producer', () => {
    it('throw on missing topic on blank object', () => {
      expect(() => { client.createProducer({}) }).throw()
    })
    it('throw on missing topic on undefined topic', () => {
      expect(() => { client.createProducer({ topic: undefined }) }).throw()
    })
    it('throw on missing topic on blank topic', () => {
      expect(() => { client.createProducer({ topic: '' }) }).throw()
    })

    describe('with valid producer', () => {
      it('should be able to send a message with non partitioned topics', async () => {
        const producer = client.createProducer({ topic: 'persistent://public/default/p0' })

        await producer.send('hello')
      })

      it('should be able to send a message with partitioned topic', async () => {
        const partitionCount = 3
        let i = 0
        const producer = client.createProducer({
          topic: 'persistent://public/default/p3',
          messageRouter: (message: RouterArg, numPartitions: number): number => {
            return i++ % numPartitions
          }
        })

        const promises = Array(partitionCount).fill(0).map(async (v: number, i: number): Promise<CommandSendReceipt> => {
          return await producer.send(`hello-${i}`)
        })
        await Promise.all(promises)
      })
    })
  })
})
