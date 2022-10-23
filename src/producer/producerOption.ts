import { newDefaultRouter } from "./defaultRouter"
import { ProducerMessage, TopicMetadata } from "./producer"
import murmurHash3 from 'murmurhash3js'
import { KeyValue } from "proto/PulsarApi"

// defaultSendTimeout init default timeout for ack since sent.
export const DEFAULT_SEND_TIMEOUT_MS = 30 * 1000 // 30 sec

// defaultBatchingMaxPublishDelay init default for maximum delay to batch messages
export const DEFAULT_BATCHING_MAX_PUBLISH_DELAY_MS = 10 * 60 * 1000 // 10 min

// defaultMaxBatchSize init default for maximum number of bytes per batch
export const DEFAULT_MAX_BATCH_SIZE = 128 * 1024

// defaultMaxMessagesPerBatch init default num of entries in per batch.
export const DEFAULT_MAX_MESSAGES_PER_BATCH = 1000

// defaultPartitionsAutoDiscoveryInterval init default time interval for partitions auto discovery
export const DEFAULT_PARTITIONS_AUT_DISCOVERY_INTERVAL_MS = 1 * 60 * 1000 // 1 min

export const DEFAULT_MAX_PENDING_MESSAGES = 1000

export const DEFAULT_MAX_RECONNECT_TO_BROKER = 0

// hashing types
export const JAVA_STRING_HASH = 0
export const MURMUR3_32HASH = 1

// compression types
export const IOTA_COMPRESSION = 0
export const LZ4_COMPRESSION = 1
export const ZLIB_COMPRESSION = 2
export const ZSTD_COMPRESSION = 3

// compression levels
export const DEFAULT_COMPRESSION_LEVEL = 0
export const FASTER_COMPRESSION_LEVEL = 1
export const BETTER_COMPRESSION_LEVEL = 2

export interface ProducerOptions {
  // Topic specify the topic this producer will be publishing on.
  // This argument is required when constructing the producer.
  topic: string

  // Name specify a name for the producer
  // If not assigned, the system will generate a globally unique name which can be access with
  // Producer.ProducerName().
  // When specifying a name, it is up to the user to ensure that, for a given topic, the producer name is unique
  // across all Pulsar's clusters. Brokers will enforce that only a single producer a given name can be publishing on
  // a topic.
  name: string

  // Properties attach a set of application defined properties to the producer
  // This properties will be visible in the topic stats
  properties: Record<string, string>

  // SendTimeout set the timeout for a message that not be acknowledged by server since sent.
  // Send and SendAsync returns an error after timeout.
  // Default is 30 seconds, negative such as -1 to disable.
  sendTimeoutMs: number

  // DisableBlockIfQueueFull control whether Send and SendAsync block if producer's message queue is full.
  // Default is false, if set to true then Send and SendAsync return error when queue is full.
  disableBlockIfQueueFull: boolean

  // MaxPendingMessages set the max size of the queue holding the messages pending to receive an
  // acknowledgment from the broker.
  maxPendingMessages: number

  // HashingScheme change the `HashingScheme` used to chose the partition on where to publish a particular message.
  // Standard hashing functions available are:
  //
  //  - `JavaStringHash` : Java String.hashCode() equivalent
  //  - `Murmur3_32Hash` : Use Murmur3 hashing function.
  // 		https://en.wikipedia.org/wiki/MurmurHash">https://en.wikipedia.org/wiki/MurmurHash
  //
  // Default is `JavaStringHash`.
  hashingScheme: 0 | 1

  // CompressionType set the compression type for the producer.
  // By default, message payloads are not compressed. Supported compression types are:
  //  - LZ4
  //  - ZLIB
  //  - ZSTD
  //
  // Note: ZSTD is supported since Pulsar 2.3. Consumers will need to be at least at that
  // release in order to be able to receive messages compressed with ZSTD.
  compressionType: 0 | 1 | 2 | 3

  // Define the desired compression level. Options:
  // - Default
  // - Faster
  // - Better
  compressionLevel: 0 | 1 | 2

  // MessageRouter set a custom message routing policy by passing an implementation of MessageRouter
  // The router is a function that given a particular message and the topic metadata, returns the
  // partition index where the message should be routed to
  messageRouter: (message: ProducerMessage, metadata: TopicMetadata) => number

  // DisableBatching control whether automatic batching of messages is enabled for the producer. By default batching
  // is enabled.
  // When batching is enabled, multiple calls to Producer.sendAsync can result in a single batch to be sent to the
  // broker, leading to better throughput, especially when publishing small messages. If compression is enabled,
  // messages will be compressed at the batch level, leading to a much better compression ratio for similar headers or
  // contents.
  // When enabled default batch delay is set to 1 ms and default batch size is 1000 messages
  // Setting `DisableBatching: true` will make the producer to send messages individually
  disableBatching: boolean

  // BatchingMaxPublishDelay set the time period within which the messages sent will be batched (default: 10ms)
  // if batch messages are enabled. If set to a non zero value, messages will be queued until this time
  // interval or until
  batchingMaxPublishDelayMs: number

  // BatchingMaxMessages set the maximum number of messages permitted in a batch. (default: 1000)
  // If set to a value greater than 1, messages will be queued until this threshold is reached or
  // BatchingMaxSize (see below) has been reached or the batch interval has elapsed.
  batchingMaxMessages: number

  // BatchingMaxSize sets the maximum number of bytes permitted in a batch. (default 128 KB)
  // If set to a value greater than 1, messages will be queued until this threshold is reached or
  // BatchingMaxMessages (see above) has been reached or the batch interval has elapsed.
  batchingMaxSize: number

  // A chain of interceptors, These interceptors will be called at some points defined in ProducerInterceptor interface
  // Interceptors ProducerInterceptors
  // Schema Schema

  // MaxReconnectToBroker set the maximum retry number of reconnectToBroker. (default: ultimate)
  maxReconnectToBroker: number

  // BatcherBuilderType sets the batch builder type (default DefaultBatchBuilder)
  // This will be used to create batch container when batching is enabled.
  // Options:
  // - DefaultBatchBuilder
  // - KeyBasedBatchBuilder
  batcherBuilderType: number

  // PartitionsAutoDiscoveryInterval is the time interval for the background process to discover new partitions
  // Default is 1 minute
  partitionsAutoDiscoveryIntervalMs: number

  // Encryption necessary fields to perform encryption of message
  // Encryption *ProducerEncryptionInfo

  _properties: KeyValue[]
}

export const _initializeOption = (option: Partial<ProducerOptions>): ProducerOptions => {
  if (option.topic) {
    throw new Error('Topic name is required for producer')
  }

  if (!option.name) {

  }

  if (option.properties) {
    option._properties = Object.entries(option.properties).map(([key, value]) => {
      return { key, value }
    })
  } else {
    option._properties = []
  }

  if (option.sendTimeoutMs || 0 <= 0) {
    option.sendTimeoutMs = DEFAULT_SEND_TIMEOUT_MS
  }

  if (option.disableBlockIfQueueFull === undefined) {
    option.disableBlockIfQueueFull = false
  }

  if (option.maxPendingMessages === undefined) {
    option.maxPendingMessages = DEFAULT_MAX_PENDING_MESSAGES
  }

  if (option.hashingScheme === undefined) {
    option.hashingScheme = JAVA_STRING_HASH
  }

  if (option.compressionType === undefined) {
    option.compressionType = IOTA_COMPRESSION
  }

  if (option.compressionLevel === undefined) {
    option.compressionLevel = DEFAULT_COMPRESSION_LEVEL
  }

  if (option.disableBatching === undefined) {
    option.disableBatching = false
  }

  if (option.batchingMaxPublishDelayMs || 0 <= 0) {
    option.batchingMaxPublishDelayMs = DEFAULT_BATCHING_MAX_PUBLISH_DELAY_MS
  }

  if (option.batchingMaxMessages || 0 <= 0) {
    option.batchingMaxMessages = DEFAULT_MAX_MESSAGES_PER_BATCH
  }

  if (option.batchingMaxSize || 0 <= 0) {
    option.batchingMaxSize = DEFAULT_MAX_BATCH_SIZE
  }

  // if (option.inteceptors) {

  // }

  // if (option.schema) {

  // }

  if (option.maxReconnectToBroker || 0 <= 0) {
    option.maxReconnectToBroker = DEFAULT_MAX_RECONNECT_TO_BROKER
  }

  if (option.partitionsAutoDiscoveryIntervalMs || 0 <= 0) {
    option.partitionsAutoDiscoveryIntervalMs = DEFAULT_PARTITIONS_AUT_DISCOVERY_INTERVAL_MS
  }

  if (option.messageRouter === undefined) {
    const hashFunc = option.hashingScheme === MURMUR3_32HASH
      ? murmurHash3.x86.hash32
      : javaHashCode

    const defaultRouter = newDefaultRouter(
			hashFunc,
			option.batchingMaxMessages!,
			option.batchingMaxSize!,
			option.batchingMaxPublishDelayMs!,
			option.disableBatching!)
    option.messageRouter = (message: ProducerMessage, metadata: TopicMetadata) => {
      return defaultRouter(message, metadata.numPartitions())
    }
  }

  return option as ProducerOptions
}

// source: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
// no idea if this works...
const javaHashCode = (s: string): number => {
  let h = 0, l = s.length, i = 0
  if ( l > 0 ) {
    while (i < l) {
      h = (h << 5) - h + s.charCodeAt(i++) | 0
    }
  }
  return h
}
