import { BaseCommand, BaseCommand_Type } from '../proto/PulsarApi'
import { v4 } from 'uuid'
import { WrappedLogger } from '../util/logger'
import { Client } from './client'
import { _ClientOptions } from './clientOptions'

// type getTopicsOfNamespaceMode = 'PERSISTENT' | 'NON_PERSISTENT' | 'ALL'

export class LookupService {
  readonly uuid: string
  readonly logger: WrappedLogger
  readonly client: Client
  readonly opt: _ClientOptions

  constructor (client: Client) {
    this.uuid = `lookup-${v4()}`
    this.logger = new WrappedLogger({ uuid: this.uuid })
    this.client = client
    this.opt = client.opt
  }

  public async lookup (topic: String): Promise<void> {
    const conn = this.client.getConnection()

    // export interface CommandLookupTopic {
    //   topic: string;
    //   requestId: Long;
    //   authoritative: boolean;
    //   /**
    //    * TODO - Remove original_principal, original_auth_data, original_auth_method
    //    * Original principal that was verified by
    //    * a Pulsar proxy.
    //    */
    //   originalPrincipal: string;
    //   /**
    //    * Original auth role and auth Method that was passed
    //    * to the proxy.
    //    */
    //   originalAuthData: string;
    //   originalAuthMethod: string;
    //   /**  */
    //   advertisedListenerName: string;
    // }

    const lookupCommand = BaseCommand.fromJSON({
      type: BaseCommand_Type.LOOKUP,
      lookupTopic: {
        topic,
        authoritative: false,
        advertisedListenerName: this.uuid
      }
    })

    const lookupCommandResp = await conn.sendCommand(lookupCommand)
    console.log(888342, lookupCommandResp)
  }

  // public getPartitionedTopicMetadata (topic: string) {
  // }

  // public getTopicsOfNamespace (namespace: string, mode: getTopicsOfNamespaceMode) {
  // }
}
