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
export const defaultPartitionsAutoDiscoveryInterval = 1 * 60 * 1000 // 1 min


export interface ProducerOption {
  topic: string
  sendTimeoutMs?: number
  batchingMaxPublishDelayMs?: number
  maxBatchSize?: number
  maxMessagesPerBatch?: number // BatchingMaxMessages
  partitionsAutoDiscoveryInterval?: number
}

export const _initializeOption = (option: ProducerOption): ProducerOption => {
  if (option.topic) {
    throw new Error('Topic name is required for producer')
  }

  if (option.sendTimeoutMs || 0 <= 0) {
    option.sendTimeoutMs = defaultSendTimeoutMs
  }

  if (option.maxMessagesPerBatch || 0 <= 0) {
    option.maxMessagesPerBatch = defaultMaxMessagesPerBatch
  }

  if (option.maxBatchSize || 0 <= 0) {
    option.maxBatchSize = defaultMaxBatchSize
  }

  if (option.batchingMaxPublishDelayMs || 0 <= 0) {
    option.batchingMaxPublishDelayMs = defaultBatchingMaxPublishDelayMs
  }

  if (option.partitionsAutoDiscoveryInterval || 0 <= 0) {
    option.partitionsAutoDiscoveryInterval = defaultPartitionsAutoDiscoveryInterval
  }

  return option
}