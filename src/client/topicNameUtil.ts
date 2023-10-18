export const persistent = 'persistent'
export const nonPersistent = 'non-persistent'
export const publicTenant = 'public'
export const defaultNamespace = 'default'
export const partitionedTopicSuffix = '-partition-'

// TopicName abstract a struct contained in a Topic
export interface TopicName {
  domain: string
  tenant: string
  namespace: string
  topic: string
  name: string
  partition: number
}

// ParseTopicName parse the given topic name and return TopicName.
export const parseTopicName = (topic: string): TopicName => {
  // The topic name can be in two different forms, one is fully qualified topic name,
  // the other one is short topic name
  if (!topic.includes('://')) {
    const parts = topic.split('/')
    if (parts.length === 3 || parts.length === 4) {
      topic = `persistent://${topic}`
    } else if (parts.length === 1) {
      topic = `persistent://${publicTenant}/${defaultNamespace}/${parts[0]}`
    } else {
      throw Error(`invalid short topic name: ${topic}`)
    }
  }

  const tn: Partial<TopicName> = {}
  const i = topic.indexOf('://')
  // The fully qualified topic name can be in two different forms:
  // new:    persistent://tenant/namespace/topic
  // legacy: persistent://tenant/cluster/namespace/topic
  const domain = topic.slice(0, i)
  if (domain !== persistent && domain !== nonPersistent) {
    throw Error(`invalid topic domain: ${domain}`)
  }
  tn.domain = domain
  const rest = topic.slice(i + 2 + 1)

  // The rest of the name can be in different forms:
  // new:    tenant/namespace/<localName>
  // legacy: tenant/cluster/namespace/<localName>
  // Examples of localName:
  // 1. some/name/xyz//
  // 2. /xyz-123/feeder-2
  const parts = rest.split('/')
  tn.tenant = parts[0]
  if (parts.length === 3) {
    // New topic name without cluster name
    tn.namespace = parts[0] + '/' + parts[1]
    tn.topic = parts.slice(2).join('/')
  } else if (parts.length >= 4) {
    // Legacy topic name that includes cluster name
    tn.namespace = `${parts[0]}/${parts[1]}/${parts[2]}`
    tn.topic = parts.slice(3).join('/')
  } else {
    throw Error(`invalid topic name: ${topic}`)
  }

  tn.name = topic
  tn.partition = getPartitionIndex(topic)

  return tn as TopicName
}

const getPartitionIndex = (topic: string): number => {
  if (topic.includes(partitionedTopicSuffix)) {
    const partitionNumber = topic.split(partitionedTopicSuffix).slice(1).join(partitionedTopicSuffix)
    if (/^\d+$/.test(partitionNumber)) {
      return parseInt(partitionNumber)
    }
    throw Error(`invalid partition number: ${partitionNumber}`)
  }
  return -1
}
