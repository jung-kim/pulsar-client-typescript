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
  if (tokenziedString.length !== 5) {
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
export const topicDetailToString = (topicDetail: TopicDetail): string => {
  const persistencyString = topicDetail.persistency ? 'persisten' : 'non-persistent'
  const partitionNumber = topicDetail.partitionNumber ?? -1
  const topicPartitionPostfix = partitionNumber > -1 ? `${topicPartitionSeprator}${partitionNumber}` : ''
  return `${persistencyString}://${topicDetail.tenant}/${topicDetail.namespace}/${topicDetail.topicName}${topicPartitionPostfix}`
}
