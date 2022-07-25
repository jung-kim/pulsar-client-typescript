import { options } from 'yargs'

// defaultSendTimeout init default timeout for ack since sent.
export const defaultSendTimeoutMs = 30 * 1000 // 30 sec

// defaultBatchingMaxPublishDelay init default for maximum delay to batch messages
export const defaultBatchingMaxPublishDelayMs = 10 * 60 * 1000 // 10 min

// defaultMaxBatchSize init default for maximum number of bytes per batch
export const defaultMaxBatchSize = 128 * 1024

// defaultMaxMessagesPerBatch init default num of entries in per batch.
export const defaultMaxMessagesPerBatch = 1000

// defaultPartitionsAutoDiscoveryInterval init default time interval for partitions auto discovery
export const defaultPartitionsAutoDiscoveryIntervalMs = 1 * 60 * 1000 // 1 min


export interface ProducerOption {
  topic: string
  name: string
  properties?: Record<string, string>
  sendTimeoutMs?: number
  disableBlockIfQueueFull?: boolean
  maxPendingMessages?: number
  // HashingScheme
  // CompressionType
  // CompressionLevel
  // MessageRouter
  disableBatching?: boolean
  batchingMaxPublishDelayMs?: number
  batchingMaxMessages?: number
  batchingMaxSize?: number
  // Interceptors
  // Schema
  maxReconnectToBroker?: number
  // BatcherBuilderType
  partitionsAutoDiscoveryIntervalMs?: number
  disableMultiSchema?: number
  // Encryption
}

export const _initializeOption = (option: ProducerOption): ProducerOption => {
  if (option.topic) {
    throw new Error('Topic name is required for producer')
  }

  if (option.sendTimeoutMs || 0 <= 0) {
    option.sendTimeoutMs = defaultSendTimeoutMs
  }

  if (option.batchingMaxMessages || 0 <= 0) {
    option.batchingMaxMessages = defaultMaxMessagesPerBatch
  }

  if (option.batchingMaxSize || 0 <= 0) {
    option.batchingMaxSize = defaultMaxBatchSize
  }

  if (option.batchingMaxPublishDelayMs || 0 <= 0) {
    option.batchingMaxPublishDelayMs = defaultBatchingMaxPublishDelayMs
  }

  if (option.partitionsAutoDiscoveryIntervalMs || 0 <= 0) {
    option.partitionsAutoDiscoveryIntervalMs = defaultPartitionsAutoDiscoveryIntervalMs
  }

  if (option.maxPendingMessages || 0 <= 0) {
    option.maxPendingMessages = 1000
  }

  return option
}