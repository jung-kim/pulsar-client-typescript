import { ConnectionPool } from '../connection'
import { WrappedLogger } from '../util/logger'
import { ProducerOption, _initializeOption } from './producerOption'
import { PartitionedProducer } from './partitionedProducer'
import { ProducerMessage } from './ProducerMessage'
import { RouterArg } from './defaultRouter'
import lodash from 'lodash'
import { CommandSendReceipt } from '../../src/proto/PulsarApi'

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
    this.options = _initializeOption(lodash.cloneDeep(option))
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

    if (partitionCount === 0 && this.partitionedProducers.length !== 1) {
      // handle none partitioned topics case separately
      this.partitionedProducers.forEach(pp => pp.close())
      this.partitionedProducers.length = 1
      this.partitionedProducers[0] = new PartitionedProducer(this, -1)
      return
    }

    if (this.partitionedProducers.length === partitionCount) {
      this.wrappedLogger.debug('Number of partitions in topic has not changed', { partitionCount })
      return
    }
    this.wrappedLogger.debug('Number of partitions in topic has changed', {
      partitionCount: partitionResponse.partitions,
      oldPartitionCount: this.partitionedProducers.length
    })

    this.partitionedProducers.length = partitionCount
    for (let i = 0; i < this.partitionedProducers.length; i++) {
      const partitionedProducer = this.partitionedProducers[i]
      if (partitionedProducer === undefined) {
        this.partitionedProducers[i] = new PartitionedProducer(this, i)
      }

      await this.partitionedProducers[i].isReadyProm
    }
  }

  close (): void {
    clearInterval(this.runBackgroundPartitionDiscovery)
  }

  async getPartitionIndex (msg: RouterArg): Promise<number> {
    await this.readyPromise
    return this.options.messageRouter(msg, this.partitionedProducers.length) % this.partitionedProducers.length
  }

  async getPartitionedProducer (msg: RouterArg): Promise<PartitionedProducer> {
    const partitionIndex = await this.getPartitionIndex(msg)

    if (this.partitionedProducers[partitionIndex] === undefined) {
      this.wrappedLogger.error('partitioned producer is undefined', { options: this.options, partitionIndex })
      throw Error('partitioned producer is undefined')
    }

    return this.partitionedProducers[partitionIndex]
  }

  private getProducerMessage (msg: ProducerMessage | ArrayBuffer | string): ProducerMessage {
    if (typeof msg === 'string') {
      return { payload: encoder.encode(msg).buffer }
    } else if (msg instanceof ArrayBuffer) {
      return { payload: msg }
    } else {
      return msg
    }
  }

  async send (msg: ProducerMessage | ArrayBuffer | string): Promise<CommandSendReceipt> {
    const producerMessage = this.getProducerMessage(msg)
    return await (await this.getPartitionedProducer(producerMessage)).send(producerMessage)
  }
}
