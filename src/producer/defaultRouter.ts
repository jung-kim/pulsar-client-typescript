import { ProducerMessage } from "./ProducerMessage"

export const newDefaultRouter = (
  hashFunc: (key: string) => number,
  maxBatchingMessages: number,
  maxBatchingSize: number,
  maxBatchingDelayMs: number,
  disableBatching: boolean
): ((message: ProducerMessage, numPartitions: number) => number) => {
  let currentPartitionCursor: number = 0

  const readClockAfterNumMessages = maxBatchingMessages / 10

  if (disableBatching) {
    // If there's no key, we do round-robin across partition. If no batching go to next partition.
    return (message: ProducerMessage, numPartitions: number): number => {
      const p = currentPartitionCursor % numPartitions
      currentPartitionCursor += (currentPartitionCursor + 1)
      if (currentPartitionCursor >= numPartitions) {
        currentPartitionCursor = 0
      }
      return p
    }
  }

  let lastChangeTimestamp: number = 0
  let msgCounter: number = 0
  let cumulativeBatchSize: number = 0

  return (message: ProducerMessage, numPartitions: number): number => {
    if (numPartitions === 1) {
      // When there are no partitions, don't even bother
      return 0
    }

    if (message.orderingKey && message.orderingKey !== '') {
      // When an OrderingKey is specified, use the hash of that key
      return hashFunc(message.orderingKey) % numPartitions
    }

    // If there's no key, we do round-robin across partition, sticking with a given
    // partition for a certain amount of messages or volume buffered or the max delay to batch is reached so that
    // we ensure having a decent amount of batching of the messages.
    // Note that it is possible that we skip more than one partition if multiple goroutines increment
    // currentPartitionCursor at the same time. If that happens it shouldn't be a problem because we only want to
    // spread the data on different partitions but not necessarily in a specific sequence.
    let now: number = 0
    const size = message.payload.byteLength
    const previousMessageCount = msgCounter
    const previousBatchingMaxSize = cumulativeBatchSize
    const previousLastChange = lastChangeTimestamp

    const messageCountReached = previousMessageCount >= (maxBatchingMessages - 1)
    const sizeReached = size >= (maxBatchingSize - previousBatchingMaxSize)
    let durationReached = false
    if (readClockAfterNumMessages === 0 || previousMessageCount % readClockAfterNumMessages === 0) {
      now = Date.now()
      durationReached = now - previousLastChange >= maxBatchingDelayMs
    }
    if (messageCountReached || sizeReached || durationReached) {
      currentPartitionCursor += 1
      msgCounter = 0
      cumulativeBatchSize = 0
      if (now !== 0) {
        lastChangeTimestamp = 0
      }
      return currentPartitionCursor % numPartitions
    }

    msgCounter += 1
    cumulativeBatchSize += size
    if (now !== 0) {
      lastChangeTimestamp = now
    }
    return currentPartitionCursor % numPartitions
  }
}
