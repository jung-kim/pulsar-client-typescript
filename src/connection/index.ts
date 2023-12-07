import {
  CommandConsumerStatsResponse,
  CommandGetLastMessageIdResponse,
  CommandGetTopicsOfNamespaceResponse,
  CommandLookupTopicResponse,
  CommandPartitionedTopicMetadataResponse,
  CommandProducerSuccess,
  CommandSuccess,
  BaseCommand,
  ProtocolVersion,
  CommandSendReceipt
} from '../proto/PulsarApi'

export { Connection } from './connection'
export { ConnectionOptions } from './connectionOptions'
export interface Message {
  baseCommand: BaseCommand
  headersAndPayload: Buffer
}

export const DEFAULT_CONNECTION_TIMEOUT_MS = 10 * 1000
export const DEFAULT_KEEP_ALIVE_INTERVAL_MS = 30 * 1000
export const DEFAULT_MAX_MESSAGE_SIZE = 5 * 1024 * 1024
export const DEFAULT_MAX_WORK_QUEUE_SIZE = 25
export const PROTOCOL_VERSION = ProtocolVersion.v13
export const PULSAR_CLIENT_VERSION = 'Pulsar TS 0.1'
export type EVENT_SIGNALS = 'handshake_start' | 'handshake_response' | 'ping' | 'pong' | 'message' | 'socket-closed' | 'socket-initializing' | 'socket-ready'
export interface EventSignalType { event: EVENT_SIGNALS, err?: Error, message?: Message }
export type CommandTypesResponses =
  CommandSuccess | CommandProducerSuccess | CommandPartitionedTopicMetadataResponse | CommandLookupTopicResponse
  | CommandConsumerStatsResponse | CommandGetLastMessageIdResponse | CommandGetTopicsOfNamespaceResponse | CommandSendReceipt
export type STATE = 'INITIALIZING' | 'READY' | 'CLOSED'
