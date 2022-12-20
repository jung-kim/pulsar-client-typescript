import os from 'os'
import { BaseCommand, ProtocolVersion } from 'proto/PulsarApi'
import {
  CommandConsumerStatsResponse,
  CommandGetLastMessageIdResponse,
  CommandGetTopicsOfNamespaceResponse,
  CommandLookupTopicResponse,
  CommandPartitionedTopicMetadataResponse,
  CommandProducerSuccess,
  CommandSuccess
} from '../proto/PulsarApi'

export { Connection } from './Connection'
export { ConnectionPool } from './ConnectionPool'
export { ConnectionOptions } from './ConnectionOptions'
export interface Message {
  baseCommand: BaseCommand
  headersAndPayload: Buffer
}

export const DEFAULT_CONNECTION_TIMEOUT_MS = 10 * 1000
export const DEFAULT_KEEP_ALIVE_INTERVAL_MS = 30 * 1000
export const DEFAULT_MAX_MESSAGE_SIZE = 5 * 1024 * 1024
export const PROTOCOL_VERSION = ProtocolVersion.v13
export const PULSAR_CLIENT_VERSION = 'Pulsar TS 0.1'
export const localAddress = Object.values(os.networkInterfaces())
export type EVENT_SIGNALS = 'close' | 'base_socket_ready' | 'pulsar_socket_ready' | 'pingpon_socket_ready' | 'reconnect' | 'pulsar_socket_error'
export interface EventSignalType { event: EVENT_SIGNALS, err?: Error }
export type CommandTypesResponses = CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse
export const LOOKUP_RESULT_MAX_REDIRECT = 20
