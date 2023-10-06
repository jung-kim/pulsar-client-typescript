import { BaseCommand, BaseCommand_Type, CommandGetTopicsOfNamespaceResponse, CommandGetTopicsOfNamespace_Mode, CommandLookupTopicResponse, CommandPartitionedTopicMetadataResponse } from '../proto/PulsarApi'
import { v4 } from 'uuid'
import { WrappedLogger } from '../util/logger'
import { Client } from './client'

export class LookupService {
  readonly uuid: string
  readonly logger: WrappedLogger
  readonly client: Client

  constructor (client: Client) {
    this.uuid = `lookup-${v4()}`
    this.logger = new WrappedLogger({ uuid: this.uuid })
    this.client = client
  }

  public async lookup (topic: String): Promise<CommandLookupTopicResponse> {
    const conn = this.client.getConnection()
    const command = BaseCommand.fromJSON({
      type: BaseCommand_Type.LOOKUP,
      lookupTopic: {
        topic,
        authoritative: false,
        advertisedListenerName: ''
      }
    })
    return await conn.sendCommand(command) as CommandLookupTopicResponse
  }

  public async getPartitionedTopicMetadata (topic: string): Promise<CommandPartitionedTopicMetadataResponse> {
    const conn = this.client.getConnection()
    const command = BaseCommand.fromJSON({
      type: BaseCommand_Type.PARTITIONED_METADATA,
      partitionMetadata: { topic }
    })
    return await conn.sendCommand(command) as CommandPartitionedTopicMetadataResponse
  }

  public async getTopicsOfNamespace (namespace: string, mode: CommandGetTopicsOfNamespace_Mode): Promise<CommandGetTopicsOfNamespaceResponse> {
    const conn = this.client.getConnection()
    const command = BaseCommand.fromJSON({
      type: BaseCommand_Type.GET_TOPICS_OF_NAMESPACE,
      getTopicsOfNamespace: { namespace, mode }
    })
    return await conn.sendCommand(command) as CommandGetTopicsOfNamespaceResponse
  }
}
