import { CommandTypesResponses, ConnectionPool } from '../connection'
import _ from 'lodash'
import { WrappedLogger } from '../util/logger'
import { ProducerOption, _initializeOption } from './producerOption'
import { PartitionedProducer } from './partitionedProducer'
import { ProducerMessage } from './ProducerMessage'

const encoder = new TextEncoder()

export class Producer {
  public readonly cnxPool: ConnectionPool
  readonly options: ProducerOption
  private readonly partitionedProducers: PartitionedProducer[] = []
  private readonly wrappedLogger: WrappedLogger
  private readonly runBackgroundPartitionDiscovery: ReturnType<typeof setInterval>
  private readyPromise

  constructor (option: Partial<ProducerOption>, cnxPool: ConnectionPool) {
    this.cnxPool = cnxPool
    this.options = _initializeOption(_.cloneDeep(option))
    this.wrappedLogger = new WrappedLogger({ topic: this.options.topic })

    this.readyPromise = this.internalCreatePartitionsProducers()
    this.runBackgroundPartitionDiscovery = setInterval(
      () => { this.readyPromise = this.internalCreatePartitionsProducers() },
      this.options.partitionsAutoDiscoveryIntervalMs
    )
  }

  private readonly internalCreatePartitionsProducers = async (): Promise<void> => {
    const partitionResponse = await this.cnxPool.lookupService.getPartitionedTopicMetadata(this.options.topic)
    const partitionCount = partitionResponse.partitions
    console.log(88824, partitionCount)

    if (this.partitionedProducers.length === partitionResponse.partitions) {
      this.wrappedLogger.debug('Number of partitions in topic has not changed', { partitionCount })
      return
    }
    this.wrappedLogger.debug('Number of partitions in topic has changed', {
      partitionCount: partitionResponse.partitions,
      oldPartitionCount: this.partitionedProducers.length
    })

    if ((partitionCount - this.partitionedProducers.length) < 0) {
      this.partitionedProducers.length = 0
    }

    if (partitionCount === 0) {
      this.partitionedProducers.push(new PartitionedProducer(this, 0))
    }

    for (let i = this.partitionedProducers.length; i < partitionCount; i++) {
      this.partitionedProducers[i] = new PartitionedProducer(this, i)
    }
  }

  close (): void {
    clearInterval(this.runBackgroundPartitionDiscovery)
  }

  async getPartitionIndex (msg: ProducerMessage): Promise<number> {
    await this.readyPromise
    // @todo: implement
    return this.options.messageRouter(msg, this.partitionedProducers.length + 1)
  }

  async getPartitionedProducer (msg: ProducerMessage): Promise<PartitionedProducer> {
    const partitionIndex = await this.getPartitionIndex(msg)

    if (this.partitionedProducers[partitionIndex] === undefined) {
      console.log(8888131, partitionIndex)
      this.partitionedProducers[partitionIndex] = new PartitionedProducer(this, partitionIndex)
    }

    return this.partitionedProducers[partitionIndex]
  }

  async send (msg: ProducerMessage | ArrayBuffer | String): Promise<CommandTypesResponses> {
    if (typeof msg === 'string') {
      msg = { payload: encoder.encode(msg).buffer }
    } else if (msg instanceof ArrayBuffer) {
      msg = { payload: msg }
    }

    const producerMessage = msg as ProducerMessage
    return await (await this.getPartitionedProducer(producerMessage)).send(producerMessage)
  }
}
