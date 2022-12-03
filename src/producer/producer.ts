import { ConnectionPool } from "../connection"
import _ from "lodash"
import { WrappedLogger } from "util/logger"
import { ProducerOption, _initializeOption } from "./ProducerOption"
import { PartitionedProducer } from "./partitionedProducer"
import { BaseCommand, BaseCommand_Type, CommandPartitionedTopicMetadataResponse } from "proto/PulsarApi"
import { ProducerMessage } from "./ProducerMessage"

export class Producer {
  public readonly cnxPool: ConnectionPool
  readonly options: ProducerOption
  private readonly partitionedProducers: Array<PartitionedProducer> = []
  private readonly wrappedLogger: WrappedLogger
  private readonly runBackgroundPartitionDiscovery: ReturnType<typeof setInterval>
  private readyPromise

  constructor(option: Partial<ProducerOption>, cnxPool: ConnectionPool) {
    this.cnxPool = cnxPool
    this.options = _initializeOption(_.cloneDeep(option))
    this.wrappedLogger = new WrappedLogger({ topic: this.options.topic })

    this.readyPromise = this.internalCreatePartitionsProducers()
    this.runBackgroundPartitionDiscovery = setInterval(
      () => { this.readyPromise = this.internalCreatePartitionsProducers() },
      this.options.partitionsAutoDiscoveryIntervalMs
    )
  }

  private internalCreatePartitionsProducers = async () => {
    const partitionResponse = (await this.cnxPool.getAnyAdminConnection().sendCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PARTITIONED_METADATA
      })
    )) as CommandPartitionedTopicMetadataResponse
    const partitionCount = partitionResponse.partitions

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

    for (let i = this.partitionedProducers.length; i < partitionCount; i++) {
      this.partitionedProducers[i] = new PartitionedProducer(this, i)
    }
  }

  close() {
    clearInterval(this.runBackgroundPartitionDiscovery)
  }

  async getPartitionIndex(msg: ProducerMessage): Promise<number> {
    await this.readyPromise
    // @todo: implement
    return this.options.messageRouter(msg, this.partitionedProducers.length)
  }

  async getPartitionedProducer(msg: ProducerMessage): Promise<PartitionedProducer> {
    const partitionIndex = await this.getPartitionIndex(msg)

    if (!this.partitionedProducers[partitionIndex]) {
      this.partitionedProducers[partitionIndex] = new PartitionedProducer(this, partitionIndex)
    }

    return this.partitionedProducers[partitionIndex]
  }

  async send(msg: ProducerMessage | ArrayBuffer) {
    if (msg instanceof ArrayBuffer) {
      msg = { payload: msg } as ProducerMessage
    }

    return (await this.getPartitionedProducer(msg)).send(msg)
  }
}