import * as cloud from '@streamnative/pulsar-admin-client-typescript'
import { Auth } from 'auth'
import axios from 'axios'

const topicPartitionSeprator = '-partition-'

/**
 * Akin to lookup service in go client
 */
export interface TopicDetail {
  persistency: boolean
  tenant: string
  namespace: string
  topicName: string
  partitionNumber: number | undefined
}

/**
 * takes topic string in the format of "persistent://public/default/TestGetTopicPartitions-nopartitions"
 * and return topic detail object
 * @param topicString 
 * @returns 
 */
export const topicStringToDetail = (topicString: string): TopicDetail => {
  const tokenziedString = topicString.split('/')
  if (tokenziedString.length != 5) {
    throw Error(`Invalid topic string is passed in: ${topicString}`)
  }
  const topicName = tokenziedString[4]
  const tokenziedTopicName = topicName.split(topicPartitionSeprator)
  const partitionNumber = parseInt(tokenziedTopicName[1])
  return {
    persistency: tokenziedString[0] === 'persistent:',
    tenant: tokenziedString[2],
    namespace: tokenziedString[3],
    topicName: tokenziedTopicName[0],
    partitionNumber: isNaN(partitionNumber) ? undefined : partitionNumber
  }
}

/**
 * takes topic detail object to a topic string int the format of 
 * "persistent://public/default/TestGetTopicPartitions-nopartitions"
 * @param topicDetail
 * @returns 
 */
export const topicDetailToString = (topicDetail: TopicDetail, ): string => {
  const persistencyString = topicDetail.persistency ? 'persisten' : 'non-persistent'
  const topicPartitionPostfix = (topicDetail.partitionNumber || -1) > -1 ? `${topicPartitionSeprator}${topicDetail.partitionNumber}` : ''
  return `${persistencyString}://${topicDetail.tenant}/${topicDetail.namespace}/${topicDetail.topicName}${topicPartitionPostfix}`
}

export class TopicLookupService {
  readonly axiosInstance = axios.create({ timeout: 60000 })
  readonly persistent: cloud.PersistentTopicApi
  readonly nonPersistent: cloud.NonPersistentTopicApi

  constructor(brokerBaseUrl: string) {
    this.persistent = new cloud.PersistentTopicApi(undefined, brokerBaseUrl, this.axiosInstance)
    this.nonPersistent = new cloud.NonPersistentTopicApi(undefined, brokerBaseUrl, this.axiosInstance)
  }

  lookup(auth: Auth, topic: string | TopicDetail) {
    const topicDetail = typeof topic === 'string' ? topicStringToDetail(topic) : topic
    const lookupApi = (topicDetail.persistency ? this.persistent : this.nonPersistent).getTopicBroker

    return lookupApi(topicDetail.tenant, topicDetail.namespace, topicDetail.topicName, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }
}