import { BaseCommand } from 'proto/PulsarApi'

export { Connection } from './Connection'
export { ConnectionPool } from './ConnectionPool'
export { ConnectionOptions } from './ConnectionOptions'
export interface Message {
  baseCommand: BaseCommand
  headersAndPayload: Buffer
}
