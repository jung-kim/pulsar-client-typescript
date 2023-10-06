import { BaseCommand, BaseCommand_Type, CommandLookupTopicResponse } from '../proto/PulsarApi'
import { v4 } from 'uuid'
import { WrappedLogger } from '../util/logger'
import { Client } from './client'

// type getTopicsOfNamespaceMode = 'PERSISTENT' | 'NON_PERSISTENT' | 'ALL'

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

    const lookupCommand = BaseCommand.fromJSON({
      type: BaseCommand_Type.LOOKUP,
      lookupTopic: {
        topic,
        authoritative: false,
        advertisedListenerName: ''
      }
    })
    return await conn.sendCommand(lookupCommand) as CommandLookupTopicResponse
  }

  // public getPartitionedTopicMetadata (topic: string) {
  // }

  // public getTopicsOfNamespace (namespace: string, mode: getTopicsOfNamespaceMode) {
  // }
}
