/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "pulsar.proto";

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export enum CompressionType {
  NONE = 0,
  LZ4 = 1,
  ZLIB = 2,
  ZSTD = 3,
  SNAPPY = 4,
  UNRECOGNIZED = -1,
}

export function compressionTypeFromJSON(object: any): CompressionType {
  switch (object) {
    case 0:
    case "NONE":
      return CompressionType.NONE;
    case 1:
    case "LZ4":
      return CompressionType.LZ4;
    case 2:
    case "ZLIB":
      return CompressionType.ZLIB;
    case 3:
    case "ZSTD":
      return CompressionType.ZSTD;
    case 4:
    case "SNAPPY":
      return CompressionType.SNAPPY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CompressionType.UNRECOGNIZED;
  }
}

export function compressionTypeToJSON(object: CompressionType): string {
  switch (object) {
    case CompressionType.NONE:
      return "NONE";
    case CompressionType.LZ4:
      return "LZ4";
    case CompressionType.ZLIB:
      return "ZLIB";
    case CompressionType.ZSTD:
      return "ZSTD";
    case CompressionType.SNAPPY:
      return "SNAPPY";
    case CompressionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ProducerAccessMode {
  /** Shared - By default multiple producers can publish on a topic */
  Shared = 0,
  /** Exclusive - Require exclusive access for producer. Fail immediately if there's already a producer connected. */
  Exclusive = 1,
  /** WaitForExclusive - Producer creation is pending until it can acquire exclusive access */
  WaitForExclusive = 2,
  /** ExclusiveWithFencing - Require exclusive access for producer. Fence out old producer. */
  ExclusiveWithFencing = 3,
  UNRECOGNIZED = -1,
}

export function producerAccessModeFromJSON(object: any): ProducerAccessMode {
  switch (object) {
    case 0:
    case "Shared":
      return ProducerAccessMode.Shared;
    case 1:
    case "Exclusive":
      return ProducerAccessMode.Exclusive;
    case 2:
    case "WaitForExclusive":
      return ProducerAccessMode.WaitForExclusive;
    case 3:
    case "ExclusiveWithFencing":
      return ProducerAccessMode.ExclusiveWithFencing;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProducerAccessMode.UNRECOGNIZED;
  }
}

export function producerAccessModeToJSON(object: ProducerAccessMode): string {
  switch (object) {
    case ProducerAccessMode.Shared:
      return "Shared";
    case ProducerAccessMode.Exclusive:
      return "Exclusive";
    case ProducerAccessMode.WaitForExclusive:
      return "WaitForExclusive";
    case ProducerAccessMode.ExclusiveWithFencing:
      return "ExclusiveWithFencing";
    case ProducerAccessMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ServerError {
  UnknownError = 0,
  /** MetadataError - Error with ZK/metadata */
  MetadataError = 1,
  /** PersistenceError - Error writing reading from BK */
  PersistenceError = 2,
  /** AuthenticationError - Non valid authentication */
  AuthenticationError = 3,
  /** AuthorizationError - Not authorized to use resource */
  AuthorizationError = 4,
  /** ConsumerBusy - Unable to subscribe/unsubscribe because */
  ConsumerBusy = 5,
  /** ServiceNotReady - other consumers are connected */
  ServiceNotReady = 6,
  /** ProducerBlockedQuotaExceededError - Unable to create producer because backlog quota exceeded */
  ProducerBlockedQuotaExceededError = 7,
  /** ProducerBlockedQuotaExceededException - Exception while creating producer because quota exceeded */
  ProducerBlockedQuotaExceededException = 8,
  /** ChecksumError - Error while verifying message checksum */
  ChecksumError = 9,
  /** UnsupportedVersionError - Error when an older client/version doesn't support a required feature */
  UnsupportedVersionError = 10,
  /** TopicNotFound - Topic not found */
  TopicNotFound = 11,
  /** SubscriptionNotFound - Subscription not found */
  SubscriptionNotFound = 12,
  /** ConsumerNotFound - Consumer not found */
  ConsumerNotFound = 13,
  /** TooManyRequests - Error with too many simultaneously request */
  TooManyRequests = 14,
  /** TopicTerminatedError - The topic has been terminated */
  TopicTerminatedError = 15,
  /** ProducerBusy - Producer with same name is already connected */
  ProducerBusy = 16,
  /** InvalidTopicName - The topic name is not valid */
  InvalidTopicName = 17,
  /** IncompatibleSchema - Specified schema was incompatible with topic schema */
  IncompatibleSchema = 18,
  /** ConsumerAssignError - Dispatcher assign consumer error */
  ConsumerAssignError = 19,
  /** TransactionCoordinatorNotFound - Transaction coordinator not found error */
  TransactionCoordinatorNotFound = 20,
  /** InvalidTxnStatus - Invalid txn status error */
  InvalidTxnStatus = 21,
  /** NotAllowedError - Not allowed error */
  NotAllowedError = 22,
  /** TransactionConflict - Ack with transaction conflict */
  TransactionConflict = 23,
  /** TransactionNotFound - Transaction not found */
  TransactionNotFound = 24,
  /** ProducerFenced - When a producer asks and fail to get exclusive producer access, */
  ProducerFenced = 25,
  UNRECOGNIZED = -1,
}

export function serverErrorFromJSON(object: any): ServerError {
  switch (object) {
    case 0:
    case "UnknownError":
      return ServerError.UnknownError;
    case 1:
    case "MetadataError":
      return ServerError.MetadataError;
    case 2:
    case "PersistenceError":
      return ServerError.PersistenceError;
    case 3:
    case "AuthenticationError":
      return ServerError.AuthenticationError;
    case 4:
    case "AuthorizationError":
      return ServerError.AuthorizationError;
    case 5:
    case "ConsumerBusy":
      return ServerError.ConsumerBusy;
    case 6:
    case "ServiceNotReady":
      return ServerError.ServiceNotReady;
    case 7:
    case "ProducerBlockedQuotaExceededError":
      return ServerError.ProducerBlockedQuotaExceededError;
    case 8:
    case "ProducerBlockedQuotaExceededException":
      return ServerError.ProducerBlockedQuotaExceededException;
    case 9:
    case "ChecksumError":
      return ServerError.ChecksumError;
    case 10:
    case "UnsupportedVersionError":
      return ServerError.UnsupportedVersionError;
    case 11:
    case "TopicNotFound":
      return ServerError.TopicNotFound;
    case 12:
    case "SubscriptionNotFound":
      return ServerError.SubscriptionNotFound;
    case 13:
    case "ConsumerNotFound":
      return ServerError.ConsumerNotFound;
    case 14:
    case "TooManyRequests":
      return ServerError.TooManyRequests;
    case 15:
    case "TopicTerminatedError":
      return ServerError.TopicTerminatedError;
    case 16:
    case "ProducerBusy":
      return ServerError.ProducerBusy;
    case 17:
    case "InvalidTopicName":
      return ServerError.InvalidTopicName;
    case 18:
    case "IncompatibleSchema":
      return ServerError.IncompatibleSchema;
    case 19:
    case "ConsumerAssignError":
      return ServerError.ConsumerAssignError;
    case 20:
    case "TransactionCoordinatorNotFound":
      return ServerError.TransactionCoordinatorNotFound;
    case 21:
    case "InvalidTxnStatus":
      return ServerError.InvalidTxnStatus;
    case 22:
    case "NotAllowedError":
      return ServerError.NotAllowedError;
    case 23:
    case "TransactionConflict":
      return ServerError.TransactionConflict;
    case 24:
    case "TransactionNotFound":
      return ServerError.TransactionNotFound;
    case 25:
    case "ProducerFenced":
      return ServerError.ProducerFenced;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServerError.UNRECOGNIZED;
  }
}

export function serverErrorToJSON(object: ServerError): string {
  switch (object) {
    case ServerError.UnknownError:
      return "UnknownError";
    case ServerError.MetadataError:
      return "MetadataError";
    case ServerError.PersistenceError:
      return "PersistenceError";
    case ServerError.AuthenticationError:
      return "AuthenticationError";
    case ServerError.AuthorizationError:
      return "AuthorizationError";
    case ServerError.ConsumerBusy:
      return "ConsumerBusy";
    case ServerError.ServiceNotReady:
      return "ServiceNotReady";
    case ServerError.ProducerBlockedQuotaExceededError:
      return "ProducerBlockedQuotaExceededError";
    case ServerError.ProducerBlockedQuotaExceededException:
      return "ProducerBlockedQuotaExceededException";
    case ServerError.ChecksumError:
      return "ChecksumError";
    case ServerError.UnsupportedVersionError:
      return "UnsupportedVersionError";
    case ServerError.TopicNotFound:
      return "TopicNotFound";
    case ServerError.SubscriptionNotFound:
      return "SubscriptionNotFound";
    case ServerError.ConsumerNotFound:
      return "ConsumerNotFound";
    case ServerError.TooManyRequests:
      return "TooManyRequests";
    case ServerError.TopicTerminatedError:
      return "TopicTerminatedError";
    case ServerError.ProducerBusy:
      return "ProducerBusy";
    case ServerError.InvalidTopicName:
      return "InvalidTopicName";
    case ServerError.IncompatibleSchema:
      return "IncompatibleSchema";
    case ServerError.ConsumerAssignError:
      return "ConsumerAssignError";
    case ServerError.TransactionCoordinatorNotFound:
      return "TransactionCoordinatorNotFound";
    case ServerError.InvalidTxnStatus:
      return "InvalidTxnStatus";
    case ServerError.NotAllowedError:
      return "NotAllowedError";
    case ServerError.TransactionConflict:
      return "TransactionConflict";
    case ServerError.TransactionNotFound:
      return "TransactionNotFound";
    case ServerError.ProducerFenced:
      return "ProducerFenced";
    case ServerError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum AuthMethod {
  AuthMethodNone = 0,
  AuthMethodYcaV1 = 1,
  AuthMethodAthens = 2,
  UNRECOGNIZED = -1,
}

export function authMethodFromJSON(object: any): AuthMethod {
  switch (object) {
    case 0:
    case "AuthMethodNone":
      return AuthMethod.AuthMethodNone;
    case 1:
    case "AuthMethodYcaV1":
      return AuthMethod.AuthMethodYcaV1;
    case 2:
    case "AuthMethodAthens":
      return AuthMethod.AuthMethodAthens;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthMethod.UNRECOGNIZED;
  }
}

export function authMethodToJSON(object: AuthMethod): string {
  switch (object) {
    case AuthMethod.AuthMethodNone:
      return "AuthMethodNone";
    case AuthMethod.AuthMethodYcaV1:
      return "AuthMethodYcaV1";
    case AuthMethod.AuthMethodAthens:
      return "AuthMethodAthens";
    case AuthMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Each protocol version identify new features that are
 * incrementally added to the protocol
 */
export enum ProtocolVersion {
  /** v0 - Initial versioning */
  v0 = 0,
  /** v1 - Added application keep-alive */
  v1 = 1,
  /** v2 - Added RedeliverUnacknowledgedMessages Command */
  v2 = 2,
  /** v3 - Added compression with LZ4 and ZLib */
  v3 = 3,
  /** v4 - Added batch message support */
  v4 = 4,
  /** v5 - Added disconnect client w/o closing connection */
  v5 = 5,
  /** v6 - Added checksum computation for metadata + payload */
  v6 = 6,
  /** v7 - Added CommandLookupTopic - Binary Lookup */
  v7 = 7,
  /** v8 - Added CommandConsumerStats - Client fetches broker side consumer stats */
  v8 = 8,
  /** v9 - Added end of topic notification */
  v9 = 9,
  /** v10 - Added proxy to broker */
  v10 = 10,
  /** v11 - C++ consumers before this version are not correctly handling the checksum field */
  v11 = 11,
  /** v12 - Added get topic's last messageId from broker */
  v12 = 12,
  /**
   * v13 - Added CommandActiveConsumerChange
   * Added CommandGetTopicsOfNamespace
   */
  v13 = 13,
  /** v14 - Add CommandAuthChallenge and CommandAuthResponse for mutual auth */
  v14 = 14,
  /** v15 - Added Key_Shared subscription */
  v15 = 15,
  /** v16 - Add support for broker entry metadata */
  v16 = 16,
  /** v17 - Added support ack receipt */
  v17 = 17,
  /** v18 - Add client support for broker entry metadata */
  v18 = 18,
  /** v19 - Add CommandTcClientConnectRequest and CommandTcClientConnectResponse */
  v19 = 19,
  UNRECOGNIZED = -1,
}

export function protocolVersionFromJSON(object: any): ProtocolVersion {
  switch (object) {
    case 0:
    case "v0":
      return ProtocolVersion.v0;
    case 1:
    case "v1":
      return ProtocolVersion.v1;
    case 2:
    case "v2":
      return ProtocolVersion.v2;
    case 3:
    case "v3":
      return ProtocolVersion.v3;
    case 4:
    case "v4":
      return ProtocolVersion.v4;
    case 5:
    case "v5":
      return ProtocolVersion.v5;
    case 6:
    case "v6":
      return ProtocolVersion.v6;
    case 7:
    case "v7":
      return ProtocolVersion.v7;
    case 8:
    case "v8":
      return ProtocolVersion.v8;
    case 9:
    case "v9":
      return ProtocolVersion.v9;
    case 10:
    case "v10":
      return ProtocolVersion.v10;
    case 11:
    case "v11":
      return ProtocolVersion.v11;
    case 12:
    case "v12":
      return ProtocolVersion.v12;
    case 13:
    case "v13":
      return ProtocolVersion.v13;
    case 14:
    case "v14":
      return ProtocolVersion.v14;
    case 15:
    case "v15":
      return ProtocolVersion.v15;
    case 16:
    case "v16":
      return ProtocolVersion.v16;
    case 17:
    case "v17":
      return ProtocolVersion.v17;
    case 18:
    case "v18":
      return ProtocolVersion.v18;
    case 19:
    case "v19":
      return ProtocolVersion.v19;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProtocolVersion.UNRECOGNIZED;
  }
}

export function protocolVersionToJSON(object: ProtocolVersion): string {
  switch (object) {
    case ProtocolVersion.v0:
      return "v0";
    case ProtocolVersion.v1:
      return "v1";
    case ProtocolVersion.v2:
      return "v2";
    case ProtocolVersion.v3:
      return "v3";
    case ProtocolVersion.v4:
      return "v4";
    case ProtocolVersion.v5:
      return "v5";
    case ProtocolVersion.v6:
      return "v6";
    case ProtocolVersion.v7:
      return "v7";
    case ProtocolVersion.v8:
      return "v8";
    case ProtocolVersion.v9:
      return "v9";
    case ProtocolVersion.v10:
      return "v10";
    case ProtocolVersion.v11:
      return "v11";
    case ProtocolVersion.v12:
      return "v12";
    case ProtocolVersion.v13:
      return "v13";
    case ProtocolVersion.v14:
      return "v14";
    case ProtocolVersion.v15:
      return "v15";
    case ProtocolVersion.v16:
      return "v16";
    case ProtocolVersion.v17:
      return "v17";
    case ProtocolVersion.v18:
      return "v18";
    case ProtocolVersion.v19:
      return "v19";
    case ProtocolVersion.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum KeySharedMode {
  AUTO_SPLIT = 0,
  STICKY = 1,
  UNRECOGNIZED = -1,
}

export function keySharedModeFromJSON(object: any): KeySharedMode {
  switch (object) {
    case 0:
    case "AUTO_SPLIT":
      return KeySharedMode.AUTO_SPLIT;
    case 1:
    case "STICKY":
      return KeySharedMode.STICKY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return KeySharedMode.UNRECOGNIZED;
  }
}

export function keySharedModeToJSON(object: KeySharedMode): string {
  switch (object) {
    case KeySharedMode.AUTO_SPLIT:
      return "AUTO_SPLIT";
    case KeySharedMode.STICKY:
      return "STICKY";
    case KeySharedMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum TxnAction {
  COMMIT = 0,
  ABORT = 1,
  UNRECOGNIZED = -1,
}

export function txnActionFromJSON(object: any): TxnAction {
  switch (object) {
    case 0:
    case "COMMIT":
      return TxnAction.COMMIT;
    case 1:
    case "ABORT":
      return TxnAction.ABORT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TxnAction.UNRECOGNIZED;
  }
}

export function txnActionToJSON(object: TxnAction): string {
  switch (object) {
    case TxnAction.COMMIT:
      return "COMMIT";
    case TxnAction.ABORT:
      return "ABORT";
    case TxnAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Schema {
  name: string;
  schemaData: Uint8Array;
  type: Schema_Type;
  properties: KeyValue[];
}

export enum Schema_Type {
  None = 0,
  String = 1,
  Json = 2,
  Protobuf = 3,
  Avro = 4,
  Bool = 5,
  Int8 = 6,
  Int16 = 7,
  Int32 = 8,
  Int64 = 9,
  Float = 10,
  Double = 11,
  Date = 12,
  Time = 13,
  Timestamp = 14,
  KeyValue = 15,
  Instant = 16,
  LocalDate = 17,
  LocalTime = 18,
  LocalDateTime = 19,
  ProtobufNative = 20,
  UNRECOGNIZED = -1,
}

export function schema_TypeFromJSON(object: any): Schema_Type {
  switch (object) {
    case 0:
    case "None":
      return Schema_Type.None;
    case 1:
    case "String":
      return Schema_Type.String;
    case 2:
    case "Json":
      return Schema_Type.Json;
    case 3:
    case "Protobuf":
      return Schema_Type.Protobuf;
    case 4:
    case "Avro":
      return Schema_Type.Avro;
    case 5:
    case "Bool":
      return Schema_Type.Bool;
    case 6:
    case "Int8":
      return Schema_Type.Int8;
    case 7:
    case "Int16":
      return Schema_Type.Int16;
    case 8:
    case "Int32":
      return Schema_Type.Int32;
    case 9:
    case "Int64":
      return Schema_Type.Int64;
    case 10:
    case "Float":
      return Schema_Type.Float;
    case 11:
    case "Double":
      return Schema_Type.Double;
    case 12:
    case "Date":
      return Schema_Type.Date;
    case 13:
    case "Time":
      return Schema_Type.Time;
    case 14:
    case "Timestamp":
      return Schema_Type.Timestamp;
    case 15:
    case "KeyValue":
      return Schema_Type.KeyValue;
    case 16:
    case "Instant":
      return Schema_Type.Instant;
    case 17:
    case "LocalDate":
      return Schema_Type.LocalDate;
    case 18:
    case "LocalTime":
      return Schema_Type.LocalTime;
    case 19:
    case "LocalDateTime":
      return Schema_Type.LocalDateTime;
    case 20:
    case "ProtobufNative":
      return Schema_Type.ProtobufNative;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Schema_Type.UNRECOGNIZED;
  }
}

export function schema_TypeToJSON(object: Schema_Type): string {
  switch (object) {
    case Schema_Type.None:
      return "None";
    case Schema_Type.String:
      return "String";
    case Schema_Type.Json:
      return "Json";
    case Schema_Type.Protobuf:
      return "Protobuf";
    case Schema_Type.Avro:
      return "Avro";
    case Schema_Type.Bool:
      return "Bool";
    case Schema_Type.Int8:
      return "Int8";
    case Schema_Type.Int16:
      return "Int16";
    case Schema_Type.Int32:
      return "Int32";
    case Schema_Type.Int64:
      return "Int64";
    case Schema_Type.Float:
      return "Float";
    case Schema_Type.Double:
      return "Double";
    case Schema_Type.Date:
      return "Date";
    case Schema_Type.Time:
      return "Time";
    case Schema_Type.Timestamp:
      return "Timestamp";
    case Schema_Type.KeyValue:
      return "KeyValue";
    case Schema_Type.Instant:
      return "Instant";
    case Schema_Type.LocalDate:
      return "LocalDate";
    case Schema_Type.LocalTime:
      return "LocalTime";
    case Schema_Type.LocalDateTime:
      return "LocalDateTime";
    case Schema_Type.ProtobufNative:
      return "ProtobufNative";
    case Schema_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MessageIdData {
  ledgerId: Long;
  entryId: Long;
  partition: number;
  batchIndex: number;
  ackSet: Long[];
  batchSize: number;
  /** For the chunk message id, we need to specify the first chunk message id. */
  firstChunkMessageId: MessageIdData | undefined;
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface KeyLongValue {
  key: string;
  value: Long;
}

export interface IntRange {
  start: number;
  end: number;
}

export interface EncryptionKeys {
  key: string;
  value: Uint8Array;
  metadata: KeyValue[];
}

export interface MessageMetadata {
  producerName: string;
  sequenceId: Long;
  publishTime: Long;
  properties: KeyValue[];
  /**
   * Property set on replicated message,
   * includes the source cluster name
   */
  replicatedFrom: string;
  /** key to decide partition for the msg */
  partitionKey: string;
  /** Override namespace's replication */
  replicateTo: string[];
  compression: CompressionType;
  uncompressedSize: number;
  /**
   * Removed below checksum field from Metadata as
   * it should be part of send-command which keeps checksum of header + payload
   * optional sfixed64 checksum = 10;
   * differentiate single and batch message metadata
   */
  numMessagesInBatch: number;
  /**
   * the timestamp that this event occurs. it is typically set by applications.
   * if this field is omitted, `publish_time` can be used for the purpose of `event_time`.
   */
  eventTime: Long;
  /** Contains encryption key name, encrypted key and metadata to describe the key */
  encryptionKeys: EncryptionKeys[];
  /** Algorithm used to encrypt data key */
  encryptionAlgo: string;
  /** Additional parameters required by encryption */
  encryptionParam: Uint8Array;
  schemaVersion: Uint8Array;
  partitionKeyB64Encoded: boolean;
  /** Specific a key to overwrite the message key which used for ordering dispatch in Key_Shared mode. */
  orderingKey: Uint8Array;
  /** Mark the message to be delivered at or after the specified timestamp */
  deliverAtTime: Long;
  /**
   * Identify whether a message is a "marker" message used for
   * internal metadata instead of application published data.
   * Markers will generally not be propagated back to clients
   */
  markerType: number;
  /** transaction related message info */
  txnidLeastBits: Long;
  txnidMostBits: Long;
  /** / Add highest sequence id to support batch message with external sequence id */
  highestSequenceId: Long;
  /** Indicate if the message payload value is set */
  nullValue: boolean;
  uuid: string;
  numChunksFromMsg: number;
  totalChunkMsgSize: number;
  chunkId: number;
  /** Indicate if the message partition key is set */
  nullPartitionKey: boolean;
}

export interface SingleMessageMetadata {
  properties: KeyValue[];
  partitionKey: string;
  payloadSize: number;
  compactedOut: boolean;
  /**
   * the timestamp that this event occurs. it is typically set by applications.
   * if this field is omitted, `publish_time` can be used for the purpose of `event_time`.
   */
  eventTime: Long;
  partitionKeyB64Encoded: boolean;
  /** Specific a key to overwrite the message key which used for ordering dispatch in Key_Shared mode. */
  orderingKey: Uint8Array;
  /** Allows consumer retrieve the sequence id that the producer set. */
  sequenceId: Long;
  /** Indicate if the message payload value is set */
  nullValue: boolean;
  /** Indicate if the message partition key is set */
  nullPartitionKey: boolean;
}

/** metadata added for entry from broker */
export interface BrokerEntryMetadata {
  brokerTimestamp: Long;
  index: Long;
}

export interface CommandConnect {
  clientVersion: string;
  /** Deprecated. Use "auth_method_name" instead. */
  authMethod: AuthMethod;
  authData: Uint8Array;
  protocolVersion: number;
  authMethodName: string;
  /**
   * Client can ask to be proxyied to a specific broker
   * This is only honored by a Pulsar proxy
   */
  proxyToBrokerUrl: string;
  /**
   * Original principal that was verified by
   * a Pulsar proxy. In this case the auth info above
   * will be the auth of the proxy itself
   */
  originalPrincipal: string;
  /**
   * Original auth role and auth Method that was passed
   * to the proxy. In this case the auth info above
   * will be the auth of the proxy itself
   */
  originalAuthData: string;
  originalAuthMethod: string;
  /** Feature flags */
  featureFlags: FeatureFlags | undefined;
}

export interface FeatureFlags {
  supportsAuthRefresh: boolean;
  supportsBrokerEntryMetadata: boolean;
  supportsPartialProducer: boolean;
  supportsTopicWatchers: boolean;
}

export interface CommandConnected {
  serverVersion: string;
  protocolVersion: number;
  maxMessageSize: number;
  featureFlags: FeatureFlags | undefined;
}

export interface CommandAuthResponse {
  clientVersion: string;
  response: AuthData | undefined;
  protocolVersion: number;
}

export interface CommandAuthChallenge {
  serverVersion: string;
  challenge: AuthData | undefined;
  protocolVersion: number;
}

/** To support mutual authentication type, such as Sasl, reuse this command to mutual auth. */
export interface AuthData {
  authMethodName: string;
  authData: Uint8Array;
}

export interface KeySharedMeta {
  keySharedMode: KeySharedMode;
  hashRanges: IntRange[];
  allowOutOfOrderDelivery: boolean;
}

export interface CommandSubscribe {
  topic: string;
  subscription: string;
  subType: CommandSubscribe_SubType;
  consumerId: Long;
  requestId: Long;
  consumerName: string;
  priorityLevel: number;
  /**
   * Signal wether the subscription should be backed by a
   * durable cursor or not
   */
  durable: boolean;
  /**
   * If specified, the subscription will position the cursor
   * markd-delete position  on the particular message id and
   * will send messages from that point
   */
  startMessageId:
    | MessageIdData
    | undefined;
  /** / Add optional metadata key=value to this consumer */
  metadata: KeyValue[];
  readCompacted: boolean;
  schema:
    | Schema
    | undefined;
  /**
   * Signal whether the subscription will initialize on latest
   * or not -- earliest
   */
  initialPosition: CommandSubscribe_InitialPosition;
  /**
   * Mark the subscription as "replicated". Pulsar will make sure
   * to periodically sync the state of replicated subscriptions
   * across different clusters (when using geo-replication).
   */
  replicateSubscriptionState: boolean;
  /**
   * If true, the subscribe operation will cause a topic to be
   * created if it does not exist already (and if topic auto-creation
   * is allowed by broker.
   * If false, the subscribe operation will fail if the topic
   * does not exist.
   */
  forceTopicCreation: boolean;
  /**
   * If specified, the subscription will reset cursor's position back
   * to specified seconds and  will send messages from that point
   */
  startMessageRollbackDurationSec: Long;
  keySharedMeta: KeySharedMeta | undefined;
  subscriptionProperties: KeyValue[];
  /** The consumer epoch, when exclusive and failover consumer redeliver unack message will increase the epoch */
  consumerEpoch: Long;
}

export enum CommandSubscribe_SubType {
  Exclusive = 0,
  Shared = 1,
  Failover = 2,
  Key_Shared = 3,
  UNRECOGNIZED = -1,
}

export function commandSubscribe_SubTypeFromJSON(object: any): CommandSubscribe_SubType {
  switch (object) {
    case 0:
    case "Exclusive":
      return CommandSubscribe_SubType.Exclusive;
    case 1:
    case "Shared":
      return CommandSubscribe_SubType.Shared;
    case 2:
    case "Failover":
      return CommandSubscribe_SubType.Failover;
    case 3:
    case "Key_Shared":
      return CommandSubscribe_SubType.Key_Shared;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandSubscribe_SubType.UNRECOGNIZED;
  }
}

export function commandSubscribe_SubTypeToJSON(object: CommandSubscribe_SubType): string {
  switch (object) {
    case CommandSubscribe_SubType.Exclusive:
      return "Exclusive";
    case CommandSubscribe_SubType.Shared:
      return "Shared";
    case CommandSubscribe_SubType.Failover:
      return "Failover";
    case CommandSubscribe_SubType.Key_Shared:
      return "Key_Shared";
    case CommandSubscribe_SubType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum CommandSubscribe_InitialPosition {
  Latest = 0,
  Earliest = 1,
  UNRECOGNIZED = -1,
}

export function commandSubscribe_InitialPositionFromJSON(object: any): CommandSubscribe_InitialPosition {
  switch (object) {
    case 0:
    case "Latest":
      return CommandSubscribe_InitialPosition.Latest;
    case 1:
    case "Earliest":
      return CommandSubscribe_InitialPosition.Earliest;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandSubscribe_InitialPosition.UNRECOGNIZED;
  }
}

export function commandSubscribe_InitialPositionToJSON(object: CommandSubscribe_InitialPosition): string {
  switch (object) {
    case CommandSubscribe_InitialPosition.Latest:
      return "Latest";
    case CommandSubscribe_InitialPosition.Earliest:
      return "Earliest";
    case CommandSubscribe_InitialPosition.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CommandPartitionedTopicMetadata {
  topic: string;
  requestId: Long;
  /**
   * TODO - Remove original_principal, original_auth_data, original_auth_method
   * Original principal that was verified by
   * a Pulsar proxy.
   */
  originalPrincipal: string;
  /**
   * Original auth role and auth Method that was passed
   * to the proxy.
   */
  originalAuthData: string;
  originalAuthMethod: string;
}

export interface CommandPartitionedTopicMetadataResponse {
  /** Optional in case of error */
  partitions: number;
  requestId: Long;
  response: CommandPartitionedTopicMetadataResponse_LookupType;
  error: ServerError;
  message: string;
}

export enum CommandPartitionedTopicMetadataResponse_LookupType {
  Success = 0,
  Failed = 1,
  UNRECOGNIZED = -1,
}

export function commandPartitionedTopicMetadataResponse_LookupTypeFromJSON(
  object: any,
): CommandPartitionedTopicMetadataResponse_LookupType {
  switch (object) {
    case 0:
    case "Success":
      return CommandPartitionedTopicMetadataResponse_LookupType.Success;
    case 1:
    case "Failed":
      return CommandPartitionedTopicMetadataResponse_LookupType.Failed;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandPartitionedTopicMetadataResponse_LookupType.UNRECOGNIZED;
  }
}

export function commandPartitionedTopicMetadataResponse_LookupTypeToJSON(
  object: CommandPartitionedTopicMetadataResponse_LookupType,
): string {
  switch (object) {
    case CommandPartitionedTopicMetadataResponse_LookupType.Success:
      return "Success";
    case CommandPartitionedTopicMetadataResponse_LookupType.Failed:
      return "Failed";
    case CommandPartitionedTopicMetadataResponse_LookupType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CommandLookupTopic {
  topic: string;
  requestId: Long;
  authoritative: boolean;
  /**
   * TODO - Remove original_principal, original_auth_data, original_auth_method
   * Original principal that was verified by
   * a Pulsar proxy.
   */
  originalPrincipal: string;
  /**
   * Original auth role and auth Method that was passed
   * to the proxy.
   */
  originalAuthData: string;
  originalAuthMethod: string;
  /**  */
  advertisedListenerName: string;
}

export interface CommandLookupTopicResponse {
  /** Optional in case of error */
  brokerServiceUrl: string;
  brokerServiceUrlTls: string;
  response: CommandLookupTopicResponse_LookupType;
  requestId: Long;
  authoritative: boolean;
  error: ServerError;
  message: string;
  /**
   * If it's true, indicates to the client that it must
   * always connect through the service url after the
   * lookup has been completed.
   */
  proxyThroughServiceUrl: boolean;
}

export enum CommandLookupTopicResponse_LookupType {
  Redirect = 0,
  Connect = 1,
  Failed = 2,
  UNRECOGNIZED = -1,
}

export function commandLookupTopicResponse_LookupTypeFromJSON(object: any): CommandLookupTopicResponse_LookupType {
  switch (object) {
    case 0:
    case "Redirect":
      return CommandLookupTopicResponse_LookupType.Redirect;
    case 1:
    case "Connect":
      return CommandLookupTopicResponse_LookupType.Connect;
    case 2:
    case "Failed":
      return CommandLookupTopicResponse_LookupType.Failed;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandLookupTopicResponse_LookupType.UNRECOGNIZED;
  }
}

export function commandLookupTopicResponse_LookupTypeToJSON(object: CommandLookupTopicResponse_LookupType): string {
  switch (object) {
    case CommandLookupTopicResponse_LookupType.Redirect:
      return "Redirect";
    case CommandLookupTopicResponse_LookupType.Connect:
      return "Connect";
    case CommandLookupTopicResponse_LookupType.Failed:
      return "Failed";
    case CommandLookupTopicResponse_LookupType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * / Create a new Producer on a topic, assigning the given producer_id,
 * / all messages sent with this producer_id will be persisted on the topic
 */
export interface CommandProducer {
  topic: string;
  producerId: Long;
  requestId: Long;
  /**
   * / If a producer name is specified, the name will be used,
   * / otherwise the broker will generate a unique name
   */
  producerName: string;
  encrypted: boolean;
  /** / Add optional metadata key=value to this producer */
  metadata: KeyValue[];
  schema:
    | Schema
    | undefined;
  /** If producer reconnect to broker, the epoch of this producer will +1 */
  epoch: Long;
  /**
   * Indicate the name of the producer is generated or user provided
   * Use default true here is in order to be forward compatible with the client
   */
  userProvidedProducerName: boolean;
  /** Require that this producers will be the only producer allowed on the topic */
  producerAccessMode: ProducerAccessMode;
  /**
   * Topic epoch is used to fence off producers that reconnects after a new
   * exclusive producer has already taken over. This id is assigned by the
   * broker on the CommandProducerSuccess. The first time, the client will
   * leave it empty and then it will always carry the same epoch number on
   * the subsequent reconnections.
   */
  topicEpoch: Long;
  txnEnabled: boolean;
  /**
   * Name of the initial subscription of the topic.
   * If this field is not set, the initial subscription will not be created.
   * If this field is set but the broker's `allowAutoSubscriptionCreation`
   * is disabled, the producer will fail to be created.
   */
  initialSubscriptionName: string;
}

export interface CommandSend {
  producerId: Long;
  sequenceId: Long;
  numMessages: number;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  /** / Add highest sequence id to support batch message with external sequence id */
  highestSequenceId: Long;
  isChunk: boolean;
  /** Specify if the message being published is a Pulsar marker or not */
  marker: boolean;
}

export interface CommandSendReceipt {
  producerId: Long;
  sequenceId: Long;
  messageId: MessageIdData | undefined;
  highestSequenceId: Long;
}

export interface CommandSendError {
  producerId: Long;
  sequenceId: Long;
  error: ServerError;
  message: string;
}

export interface CommandMessage {
  consumerId: Long;
  messageId: MessageIdData | undefined;
  redeliveryCount: number;
  ackSet: Long[];
  consumerEpoch: Long;
}

export interface CommandAck {
  consumerId: Long;
  ackType: CommandAck_AckType;
  /** In case of individual acks, the client can pass a list of message ids */
  messageId: MessageIdData[];
  validationError: CommandAck_ValidationError;
  properties: KeyLongValue[];
  txnidLeastBits: Long;
  txnidMostBits: Long;
  requestId: Long;
}

export enum CommandAck_AckType {
  Individual = 0,
  Cumulative = 1,
  UNRECOGNIZED = -1,
}

export function commandAck_AckTypeFromJSON(object: any): CommandAck_AckType {
  switch (object) {
    case 0:
    case "Individual":
      return CommandAck_AckType.Individual;
    case 1:
    case "Cumulative":
      return CommandAck_AckType.Cumulative;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandAck_AckType.UNRECOGNIZED;
  }
}

export function commandAck_AckTypeToJSON(object: CommandAck_AckType): string {
  switch (object) {
    case CommandAck_AckType.Individual:
      return "Individual";
    case CommandAck_AckType.Cumulative:
      return "Cumulative";
    case CommandAck_AckType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Acks can contain a flag to indicate the consumer
 * received an invalid message that got discarded
 * before being passed on to the application.
 */
export enum CommandAck_ValidationError {
  UncompressedSizeCorruption = 0,
  DecompressionError = 1,
  ChecksumMismatch = 2,
  BatchDeSerializeError = 3,
  DecryptionError = 4,
  UNRECOGNIZED = -1,
}

export function commandAck_ValidationErrorFromJSON(object: any): CommandAck_ValidationError {
  switch (object) {
    case 0:
    case "UncompressedSizeCorruption":
      return CommandAck_ValidationError.UncompressedSizeCorruption;
    case 1:
    case "DecompressionError":
      return CommandAck_ValidationError.DecompressionError;
    case 2:
    case "ChecksumMismatch":
      return CommandAck_ValidationError.ChecksumMismatch;
    case 3:
    case "BatchDeSerializeError":
      return CommandAck_ValidationError.BatchDeSerializeError;
    case 4:
    case "DecryptionError":
      return CommandAck_ValidationError.DecryptionError;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandAck_ValidationError.UNRECOGNIZED;
  }
}

export function commandAck_ValidationErrorToJSON(object: CommandAck_ValidationError): string {
  switch (object) {
    case CommandAck_ValidationError.UncompressedSizeCorruption:
      return "UncompressedSizeCorruption";
    case CommandAck_ValidationError.DecompressionError:
      return "DecompressionError";
    case CommandAck_ValidationError.ChecksumMismatch:
      return "ChecksumMismatch";
    case CommandAck_ValidationError.BatchDeSerializeError:
      return "BatchDeSerializeError";
    case CommandAck_ValidationError.DecryptionError:
      return "DecryptionError";
    case CommandAck_ValidationError.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CommandAckResponse {
  consumerId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
  requestId: Long;
}

/** changes on active consumer */
export interface CommandActiveConsumerChange {
  consumerId: Long;
  isActive: boolean;
}

export interface CommandFlow {
  consumerId: Long;
  /**
   * Max number of messages to prefetch, in addition
   * of any number previously specified
   */
  messagePermits: number;
}

export interface CommandUnsubscribe {
  consumerId: Long;
  requestId: Long;
}

/** Reset an existing consumer to a particular message id */
export interface CommandSeek {
  consumerId: Long;
  requestId: Long;
  messageId: MessageIdData | undefined;
  messagePublishTime: Long;
}

/**
 * Message sent by broker to client when a topic
 * has been forcefully terminated and there are no more
 * messages left to consume
 */
export interface CommandReachedEndOfTopic {
  consumerId: Long;
}

export interface CommandCloseProducer {
  producerId: Long;
  requestId: Long;
}

export interface CommandCloseConsumer {
  consumerId: Long;
  requestId: Long;
}

export interface CommandRedeliverUnacknowledgedMessages {
  consumerId: Long;
  messageIds: MessageIdData[];
  consumerEpoch: Long;
}

export interface CommandSuccess {
  requestId: Long;
  schema: Schema | undefined;
}

/** / Response from CommandProducer */
export interface CommandProducerSuccess {
  requestId: Long;
  producerName: string;
  /**
   * The last sequence id that was stored by this producer in the previous session
   * This will only be meaningful if deduplication has been enabled.
   */
  lastSequenceId: Long;
  schemaVersion: Uint8Array;
  /**
   * The topic epoch assigned by the broker. This field will only be set if we
   * were requiring exclusive access when creating the producer.
   */
  topicEpoch: Long;
  /**
   * If producer is not "ready", the client will avoid to timeout the request
   * for creating the producer. Instead it will wait indefinitely until it gets
   * a subsequent  `CommandProducerSuccess` with `producer_ready==true`.
   */
  producerReady: boolean;
}

export interface CommandError {
  requestId: Long;
  error: ServerError;
  message: string;
}

/**
 * Commands to probe the state of connection.
 * When either client or broker doesn't receive commands for certain
 * amount of time, they will send a Ping probe.
 */
export interface CommandPing {
}

export interface CommandPong {
}

export interface CommandConsumerStats {
  requestId: Long;
  /**
   * required string topic_name         = 2;
   * required string subscription_name  = 3;
   */
  consumerId: Long;
}

export interface CommandConsumerStatsResponse {
  requestId: Long;
  errorCode: ServerError;
  errorMessage: string;
  /** / Total rate of messages delivered to the consumer. msg/s */
  msgRateOut: number;
  /** / Total throughput delivered to the consumer. bytes/s */
  msgThroughputOut: number;
  /** / Total rate of messages redelivered by this consumer. msg/s */
  msgRateRedeliver: number;
  /** / Name of the consumer */
  consumerName: string;
  /** / Number of available message permits for the consumer */
  availablePermits: Long;
  /** / Number of unacknowledged messages for the consumer */
  unackedMessages: Long;
  /** / Flag to verify if consumer is blocked due to reaching threshold of unacked messages */
  blockedConsumerOnUnackedMsgs: boolean;
  /** / Address of this consumer */
  address: string;
  /** / Timestamp of connection */
  connectedSince: string;
  /** / Whether this subscription is Exclusive or Shared or Failover */
  type: string;
  /** / Total rate of messages expired on this subscription. msg/s */
  msgRateExpired: number;
  /** / Number of messages in the subscription backlog */
  msgBacklog: Long;
  /** / Total rate of messages ack. msg/s */
  messageAckRate: number;
}

export interface CommandGetLastMessageId {
  consumerId: Long;
  requestId: Long;
}

export interface CommandGetLastMessageIdResponse {
  lastMessageId: MessageIdData | undefined;
  requestId: Long;
  consumerMarkDeletePosition: MessageIdData | undefined;
}

export interface CommandGetTopicsOfNamespace {
  requestId: Long;
  namespace: string;
  mode: CommandGetTopicsOfNamespace_Mode;
  topicsPattern: string;
  topicsHash: string;
}

export enum CommandGetTopicsOfNamespace_Mode {
  PERSISTENT = 0,
  NON_PERSISTENT = 1,
  ALL = 2,
  UNRECOGNIZED = -1,
}

export function commandGetTopicsOfNamespace_ModeFromJSON(object: any): CommandGetTopicsOfNamespace_Mode {
  switch (object) {
    case 0:
    case "PERSISTENT":
      return CommandGetTopicsOfNamespace_Mode.PERSISTENT;
    case 1:
    case "NON_PERSISTENT":
      return CommandGetTopicsOfNamespace_Mode.NON_PERSISTENT;
    case 2:
    case "ALL":
      return CommandGetTopicsOfNamespace_Mode.ALL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommandGetTopicsOfNamespace_Mode.UNRECOGNIZED;
  }
}

export function commandGetTopicsOfNamespace_ModeToJSON(object: CommandGetTopicsOfNamespace_Mode): string {
  switch (object) {
    case CommandGetTopicsOfNamespace_Mode.PERSISTENT:
      return "PERSISTENT";
    case CommandGetTopicsOfNamespace_Mode.NON_PERSISTENT:
      return "NON_PERSISTENT";
    case CommandGetTopicsOfNamespace_Mode.ALL:
      return "ALL";
    case CommandGetTopicsOfNamespace_Mode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CommandGetTopicsOfNamespaceResponse {
  requestId: Long;
  topics: string[];
  /** true iff the topic list was filtered by the pattern supplied by the client */
  filtered: boolean;
  /** hash computed from the names of matching topics */
  topicsHash: string;
  /** if false, topics is empty and the list of matching topics has not changed */
  changed: boolean;
}

export interface CommandWatchTopicList {
  requestId: Long;
  watcherId: Long;
  namespace: string;
  topicsPattern: string;
  /** Only present when the client reconnects: */
  topicsHash: string;
}

export interface CommandWatchTopicListSuccess {
  requestId: Long;
  watcherId: Long;
  topic: string[];
  topicsHash: string;
}

export interface CommandWatchTopicUpdate {
  watcherId: Long;
  newTopics: string[];
  deletedTopics: string[];
  topicsHash: string;
}

export interface CommandWatchTopicListClose {
  requestId: Long;
  watcherId: Long;
}

export interface CommandGetSchema {
  requestId: Long;
  topic: string;
  schemaVersion: Uint8Array;
}

export interface CommandGetSchemaResponse {
  requestId: Long;
  errorCode: ServerError;
  errorMessage: string;
  schema: Schema | undefined;
  schemaVersion: Uint8Array;
}

export interface CommandGetOrCreateSchema {
  requestId: Long;
  topic: string;
  schema: Schema | undefined;
}

export interface CommandGetOrCreateSchemaResponse {
  requestId: Long;
  errorCode: ServerError;
  errorMessage: string;
  schemaVersion: Uint8Array;
}

export interface CommandTcClientConnectRequest {
  requestId: Long;
  tcId: Long;
}

export interface CommandTcClientConnectResponse {
  requestId: Long;
  error: ServerError;
  message: string;
}

export interface CommandNewTxn {
  requestId: Long;
  txnTtlSeconds: Long;
  tcId: Long;
}

export interface CommandNewTxnResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface CommandAddPartitionToTxn {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  partitions: string[];
}

export interface CommandAddPartitionToTxnResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface Subscription {
  topic: string;
  subscription: string;
}

export interface CommandAddSubscriptionToTxn {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  subscription: Subscription[];
}

export interface CommandAddSubscriptionToTxnResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface CommandEndTxn {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  txnAction: TxnAction;
}

export interface CommandEndTxnResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface CommandEndTxnOnPartition {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  topic: string;
  txnAction: TxnAction;
  txnidLeastBitsOfLowWatermark: Long;
}

export interface CommandEndTxnOnPartitionResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface CommandEndTxnOnSubscription {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  subscription: Subscription | undefined;
  txnAction: TxnAction;
  txnidLeastBitsOfLowWatermark: Long;
}

export interface CommandEndTxnOnSubscriptionResponse {
  requestId: Long;
  txnidLeastBits: Long;
  txnidMostBits: Long;
  error: ServerError;
  message: string;
}

export interface BaseCommand {
  type: BaseCommand_Type;
  connect: CommandConnect | undefined;
  connected: CommandConnected | undefined;
  subscribe: CommandSubscribe | undefined;
  producer: CommandProducer | undefined;
  send: CommandSend | undefined;
  sendReceipt: CommandSendReceipt | undefined;
  sendError: CommandSendError | undefined;
  message: CommandMessage | undefined;
  ack: CommandAck | undefined;
  flow: CommandFlow | undefined;
  unsubscribe: CommandUnsubscribe | undefined;
  success: CommandSuccess | undefined;
  error: CommandError | undefined;
  closeProducer: CommandCloseProducer | undefined;
  closeConsumer: CommandCloseConsumer | undefined;
  producerSuccess: CommandProducerSuccess | undefined;
  ping: CommandPing | undefined;
  pong: CommandPong | undefined;
  redeliverUnacknowledgedMessages: CommandRedeliverUnacknowledgedMessages | undefined;
  partitionMetadata: CommandPartitionedTopicMetadata | undefined;
  partitionMetadataResponse: CommandPartitionedTopicMetadataResponse | undefined;
  lookupTopic: CommandLookupTopic | undefined;
  lookupTopicResponse: CommandLookupTopicResponse | undefined;
  consumerStats: CommandConsumerStats | undefined;
  consumerStatsResponse: CommandConsumerStatsResponse | undefined;
  reachedEndOfTopic: CommandReachedEndOfTopic | undefined;
  seek: CommandSeek | undefined;
  getLastMessageId: CommandGetLastMessageId | undefined;
  getLastMessageIdResponse: CommandGetLastMessageIdResponse | undefined;
  activeConsumerChange: CommandActiveConsumerChange | undefined;
  getTopicsOfNamespace: CommandGetTopicsOfNamespace | undefined;
  getTopicsOfNamespaceResponse: CommandGetTopicsOfNamespaceResponse | undefined;
  getSchema: CommandGetSchema | undefined;
  getSchemaResponse: CommandGetSchemaResponse | undefined;
  authChallenge: CommandAuthChallenge | undefined;
  authResponse: CommandAuthResponse | undefined;
  ackResponse: CommandAckResponse | undefined;
  getOrCreateSchema: CommandGetOrCreateSchema | undefined;
  getOrCreateSchemaResponse:
    | CommandGetOrCreateSchemaResponse
    | undefined;
  /** transaction related */
  newTxn: CommandNewTxn | undefined;
  newTxnResponse: CommandNewTxnResponse | undefined;
  addPartitionToTxn: CommandAddPartitionToTxn | undefined;
  addPartitionToTxnResponse: CommandAddPartitionToTxnResponse | undefined;
  addSubscriptionToTxn: CommandAddSubscriptionToTxn | undefined;
  addSubscriptionToTxnResponse: CommandAddSubscriptionToTxnResponse | undefined;
  endTxn: CommandEndTxn | undefined;
  endTxnResponse: CommandEndTxnResponse | undefined;
  endTxnOnPartition: CommandEndTxnOnPartition | undefined;
  endTxnOnPartitionResponse: CommandEndTxnOnPartitionResponse | undefined;
  endTxnOnSubscription: CommandEndTxnOnSubscription | undefined;
  endTxnOnSubscriptionResponse: CommandEndTxnOnSubscriptionResponse | undefined;
  tcClientConnectRequest: CommandTcClientConnectRequest | undefined;
  tcClientConnectResponse: CommandTcClientConnectResponse | undefined;
  watchTopicList: CommandWatchTopicList | undefined;
  watchTopicListSuccess: CommandWatchTopicListSuccess | undefined;
  watchTopicUpdate: CommandWatchTopicUpdate | undefined;
  watchTopicListClose: CommandWatchTopicListClose | undefined;
}

export enum BaseCommand_Type {
  CONNECT = 2,
  CONNECTED = 3,
  SUBSCRIBE = 4,
  PRODUCER = 5,
  SEND = 6,
  SEND_RECEIPT = 7,
  SEND_ERROR = 8,
  MESSAGE = 9,
  ACK = 10,
  FLOW = 11,
  UNSUBSCRIBE = 12,
  SUCCESS = 13,
  ERROR = 14,
  CLOSE_PRODUCER = 15,
  CLOSE_CONSUMER = 16,
  PRODUCER_SUCCESS = 17,
  PING = 18,
  PONG = 19,
  REDELIVER_UNACKNOWLEDGED_MESSAGES = 20,
  PARTITIONED_METADATA = 21,
  PARTITIONED_METADATA_RESPONSE = 22,
  LOOKUP = 23,
  LOOKUP_RESPONSE = 24,
  CONSUMER_STATS = 25,
  CONSUMER_STATS_RESPONSE = 26,
  REACHED_END_OF_TOPIC = 27,
  SEEK = 28,
  GET_LAST_MESSAGE_ID = 29,
  GET_LAST_MESSAGE_ID_RESPONSE = 30,
  ACTIVE_CONSUMER_CHANGE = 31,
  GET_TOPICS_OF_NAMESPACE = 32,
  GET_TOPICS_OF_NAMESPACE_RESPONSE = 33,
  GET_SCHEMA = 34,
  GET_SCHEMA_RESPONSE = 35,
  AUTH_CHALLENGE = 36,
  AUTH_RESPONSE = 37,
  ACK_RESPONSE = 38,
  GET_OR_CREATE_SCHEMA = 39,
  GET_OR_CREATE_SCHEMA_RESPONSE = 40,
  /** NEW_TXN - transaction related */
  NEW_TXN = 50,
  NEW_TXN_RESPONSE = 51,
  ADD_PARTITION_TO_TXN = 52,
  ADD_PARTITION_TO_TXN_RESPONSE = 53,
  ADD_SUBSCRIPTION_TO_TXN = 54,
  ADD_SUBSCRIPTION_TO_TXN_RESPONSE = 55,
  END_TXN = 56,
  END_TXN_RESPONSE = 57,
  END_TXN_ON_PARTITION = 58,
  END_TXN_ON_PARTITION_RESPONSE = 59,
  END_TXN_ON_SUBSCRIPTION = 60,
  END_TXN_ON_SUBSCRIPTION_RESPONSE = 61,
  TC_CLIENT_CONNECT_REQUEST = 62,
  TC_CLIENT_CONNECT_RESPONSE = 63,
  WATCH_TOPIC_LIST = 64,
  WATCH_TOPIC_LIST_SUCCESS = 65,
  WATCH_TOPIC_UPDATE = 66,
  WATCH_TOPIC_LIST_CLOSE = 67,
  UNRECOGNIZED = -1,
}

export function baseCommand_TypeFromJSON(object: any): BaseCommand_Type {
  switch (object) {
    case 2:
    case "CONNECT":
      return BaseCommand_Type.CONNECT;
    case 3:
    case "CONNECTED":
      return BaseCommand_Type.CONNECTED;
    case 4:
    case "SUBSCRIBE":
      return BaseCommand_Type.SUBSCRIBE;
    case 5:
    case "PRODUCER":
      return BaseCommand_Type.PRODUCER;
    case 6:
    case "SEND":
      return BaseCommand_Type.SEND;
    case 7:
    case "SEND_RECEIPT":
      return BaseCommand_Type.SEND_RECEIPT;
    case 8:
    case "SEND_ERROR":
      return BaseCommand_Type.SEND_ERROR;
    case 9:
    case "MESSAGE":
      return BaseCommand_Type.MESSAGE;
    case 10:
    case "ACK":
      return BaseCommand_Type.ACK;
    case 11:
    case "FLOW":
      return BaseCommand_Type.FLOW;
    case 12:
    case "UNSUBSCRIBE":
      return BaseCommand_Type.UNSUBSCRIBE;
    case 13:
    case "SUCCESS":
      return BaseCommand_Type.SUCCESS;
    case 14:
    case "ERROR":
      return BaseCommand_Type.ERROR;
    case 15:
    case "CLOSE_PRODUCER":
      return BaseCommand_Type.CLOSE_PRODUCER;
    case 16:
    case "CLOSE_CONSUMER":
      return BaseCommand_Type.CLOSE_CONSUMER;
    case 17:
    case "PRODUCER_SUCCESS":
      return BaseCommand_Type.PRODUCER_SUCCESS;
    case 18:
    case "PING":
      return BaseCommand_Type.PING;
    case 19:
    case "PONG":
      return BaseCommand_Type.PONG;
    case 20:
    case "REDELIVER_UNACKNOWLEDGED_MESSAGES":
      return BaseCommand_Type.REDELIVER_UNACKNOWLEDGED_MESSAGES;
    case 21:
    case "PARTITIONED_METADATA":
      return BaseCommand_Type.PARTITIONED_METADATA;
    case 22:
    case "PARTITIONED_METADATA_RESPONSE":
      return BaseCommand_Type.PARTITIONED_METADATA_RESPONSE;
    case 23:
    case "LOOKUP":
      return BaseCommand_Type.LOOKUP;
    case 24:
    case "LOOKUP_RESPONSE":
      return BaseCommand_Type.LOOKUP_RESPONSE;
    case 25:
    case "CONSUMER_STATS":
      return BaseCommand_Type.CONSUMER_STATS;
    case 26:
    case "CONSUMER_STATS_RESPONSE":
      return BaseCommand_Type.CONSUMER_STATS_RESPONSE;
    case 27:
    case "REACHED_END_OF_TOPIC":
      return BaseCommand_Type.REACHED_END_OF_TOPIC;
    case 28:
    case "SEEK":
      return BaseCommand_Type.SEEK;
    case 29:
    case "GET_LAST_MESSAGE_ID":
      return BaseCommand_Type.GET_LAST_MESSAGE_ID;
    case 30:
    case "GET_LAST_MESSAGE_ID_RESPONSE":
      return BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE;
    case 31:
    case "ACTIVE_CONSUMER_CHANGE":
      return BaseCommand_Type.ACTIVE_CONSUMER_CHANGE;
    case 32:
    case "GET_TOPICS_OF_NAMESPACE":
      return BaseCommand_Type.GET_TOPICS_OF_NAMESPACE;
    case 33:
    case "GET_TOPICS_OF_NAMESPACE_RESPONSE":
      return BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE;
    case 34:
    case "GET_SCHEMA":
      return BaseCommand_Type.GET_SCHEMA;
    case 35:
    case "GET_SCHEMA_RESPONSE":
      return BaseCommand_Type.GET_SCHEMA_RESPONSE;
    case 36:
    case "AUTH_CHALLENGE":
      return BaseCommand_Type.AUTH_CHALLENGE;
    case 37:
    case "AUTH_RESPONSE":
      return BaseCommand_Type.AUTH_RESPONSE;
    case 38:
    case "ACK_RESPONSE":
      return BaseCommand_Type.ACK_RESPONSE;
    case 39:
    case "GET_OR_CREATE_SCHEMA":
      return BaseCommand_Type.GET_OR_CREATE_SCHEMA;
    case 40:
    case "GET_OR_CREATE_SCHEMA_RESPONSE":
      return BaseCommand_Type.GET_OR_CREATE_SCHEMA_RESPONSE;
    case 50:
    case "NEW_TXN":
      return BaseCommand_Type.NEW_TXN;
    case 51:
    case "NEW_TXN_RESPONSE":
      return BaseCommand_Type.NEW_TXN_RESPONSE;
    case 52:
    case "ADD_PARTITION_TO_TXN":
      return BaseCommand_Type.ADD_PARTITION_TO_TXN;
    case 53:
    case "ADD_PARTITION_TO_TXN_RESPONSE":
      return BaseCommand_Type.ADD_PARTITION_TO_TXN_RESPONSE;
    case 54:
    case "ADD_SUBSCRIPTION_TO_TXN":
      return BaseCommand_Type.ADD_SUBSCRIPTION_TO_TXN;
    case 55:
    case "ADD_SUBSCRIPTION_TO_TXN_RESPONSE":
      return BaseCommand_Type.ADD_SUBSCRIPTION_TO_TXN_RESPONSE;
    case 56:
    case "END_TXN":
      return BaseCommand_Type.END_TXN;
    case 57:
    case "END_TXN_RESPONSE":
      return BaseCommand_Type.END_TXN_RESPONSE;
    case 58:
    case "END_TXN_ON_PARTITION":
      return BaseCommand_Type.END_TXN_ON_PARTITION;
    case 59:
    case "END_TXN_ON_PARTITION_RESPONSE":
      return BaseCommand_Type.END_TXN_ON_PARTITION_RESPONSE;
    case 60:
    case "END_TXN_ON_SUBSCRIPTION":
      return BaseCommand_Type.END_TXN_ON_SUBSCRIPTION;
    case 61:
    case "END_TXN_ON_SUBSCRIPTION_RESPONSE":
      return BaseCommand_Type.END_TXN_ON_SUBSCRIPTION_RESPONSE;
    case 62:
    case "TC_CLIENT_CONNECT_REQUEST":
      return BaseCommand_Type.TC_CLIENT_CONNECT_REQUEST;
    case 63:
    case "TC_CLIENT_CONNECT_RESPONSE":
      return BaseCommand_Type.TC_CLIENT_CONNECT_RESPONSE;
    case 64:
    case "WATCH_TOPIC_LIST":
      return BaseCommand_Type.WATCH_TOPIC_LIST;
    case 65:
    case "WATCH_TOPIC_LIST_SUCCESS":
      return BaseCommand_Type.WATCH_TOPIC_LIST_SUCCESS;
    case 66:
    case "WATCH_TOPIC_UPDATE":
      return BaseCommand_Type.WATCH_TOPIC_UPDATE;
    case 67:
    case "WATCH_TOPIC_LIST_CLOSE":
      return BaseCommand_Type.WATCH_TOPIC_LIST_CLOSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BaseCommand_Type.UNRECOGNIZED;
  }
}

export function baseCommand_TypeToJSON(object: BaseCommand_Type): string {
  switch (object) {
    case BaseCommand_Type.CONNECT:
      return "CONNECT";
    case BaseCommand_Type.CONNECTED:
      return "CONNECTED";
    case BaseCommand_Type.SUBSCRIBE:
      return "SUBSCRIBE";
    case BaseCommand_Type.PRODUCER:
      return "PRODUCER";
    case BaseCommand_Type.SEND:
      return "SEND";
    case BaseCommand_Type.SEND_RECEIPT:
      return "SEND_RECEIPT";
    case BaseCommand_Type.SEND_ERROR:
      return "SEND_ERROR";
    case BaseCommand_Type.MESSAGE:
      return "MESSAGE";
    case BaseCommand_Type.ACK:
      return "ACK";
    case BaseCommand_Type.FLOW:
      return "FLOW";
    case BaseCommand_Type.UNSUBSCRIBE:
      return "UNSUBSCRIBE";
    case BaseCommand_Type.SUCCESS:
      return "SUCCESS";
    case BaseCommand_Type.ERROR:
      return "ERROR";
    case BaseCommand_Type.CLOSE_PRODUCER:
      return "CLOSE_PRODUCER";
    case BaseCommand_Type.CLOSE_CONSUMER:
      return "CLOSE_CONSUMER";
    case BaseCommand_Type.PRODUCER_SUCCESS:
      return "PRODUCER_SUCCESS";
    case BaseCommand_Type.PING:
      return "PING";
    case BaseCommand_Type.PONG:
      return "PONG";
    case BaseCommand_Type.REDELIVER_UNACKNOWLEDGED_MESSAGES:
      return "REDELIVER_UNACKNOWLEDGED_MESSAGES";
    case BaseCommand_Type.PARTITIONED_METADATA:
      return "PARTITIONED_METADATA";
    case BaseCommand_Type.PARTITIONED_METADATA_RESPONSE:
      return "PARTITIONED_METADATA_RESPONSE";
    case BaseCommand_Type.LOOKUP:
      return "LOOKUP";
    case BaseCommand_Type.LOOKUP_RESPONSE:
      return "LOOKUP_RESPONSE";
    case BaseCommand_Type.CONSUMER_STATS:
      return "CONSUMER_STATS";
    case BaseCommand_Type.CONSUMER_STATS_RESPONSE:
      return "CONSUMER_STATS_RESPONSE";
    case BaseCommand_Type.REACHED_END_OF_TOPIC:
      return "REACHED_END_OF_TOPIC";
    case BaseCommand_Type.SEEK:
      return "SEEK";
    case BaseCommand_Type.GET_LAST_MESSAGE_ID:
      return "GET_LAST_MESSAGE_ID";
    case BaseCommand_Type.GET_LAST_MESSAGE_ID_RESPONSE:
      return "GET_LAST_MESSAGE_ID_RESPONSE";
    case BaseCommand_Type.ACTIVE_CONSUMER_CHANGE:
      return "ACTIVE_CONSUMER_CHANGE";
    case BaseCommand_Type.GET_TOPICS_OF_NAMESPACE:
      return "GET_TOPICS_OF_NAMESPACE";
    case BaseCommand_Type.GET_TOPICS_OF_NAMESPACE_RESPONSE:
      return "GET_TOPICS_OF_NAMESPACE_RESPONSE";
    case BaseCommand_Type.GET_SCHEMA:
      return "GET_SCHEMA";
    case BaseCommand_Type.GET_SCHEMA_RESPONSE:
      return "GET_SCHEMA_RESPONSE";
    case BaseCommand_Type.AUTH_CHALLENGE:
      return "AUTH_CHALLENGE";
    case BaseCommand_Type.AUTH_RESPONSE:
      return "AUTH_RESPONSE";
    case BaseCommand_Type.ACK_RESPONSE:
      return "ACK_RESPONSE";
    case BaseCommand_Type.GET_OR_CREATE_SCHEMA:
      return "GET_OR_CREATE_SCHEMA";
    case BaseCommand_Type.GET_OR_CREATE_SCHEMA_RESPONSE:
      return "GET_OR_CREATE_SCHEMA_RESPONSE";
    case BaseCommand_Type.NEW_TXN:
      return "NEW_TXN";
    case BaseCommand_Type.NEW_TXN_RESPONSE:
      return "NEW_TXN_RESPONSE";
    case BaseCommand_Type.ADD_PARTITION_TO_TXN:
      return "ADD_PARTITION_TO_TXN";
    case BaseCommand_Type.ADD_PARTITION_TO_TXN_RESPONSE:
      return "ADD_PARTITION_TO_TXN_RESPONSE";
    case BaseCommand_Type.ADD_SUBSCRIPTION_TO_TXN:
      return "ADD_SUBSCRIPTION_TO_TXN";
    case BaseCommand_Type.ADD_SUBSCRIPTION_TO_TXN_RESPONSE:
      return "ADD_SUBSCRIPTION_TO_TXN_RESPONSE";
    case BaseCommand_Type.END_TXN:
      return "END_TXN";
    case BaseCommand_Type.END_TXN_RESPONSE:
      return "END_TXN_RESPONSE";
    case BaseCommand_Type.END_TXN_ON_PARTITION:
      return "END_TXN_ON_PARTITION";
    case BaseCommand_Type.END_TXN_ON_PARTITION_RESPONSE:
      return "END_TXN_ON_PARTITION_RESPONSE";
    case BaseCommand_Type.END_TXN_ON_SUBSCRIPTION:
      return "END_TXN_ON_SUBSCRIPTION";
    case BaseCommand_Type.END_TXN_ON_SUBSCRIPTION_RESPONSE:
      return "END_TXN_ON_SUBSCRIPTION_RESPONSE";
    case BaseCommand_Type.TC_CLIENT_CONNECT_REQUEST:
      return "TC_CLIENT_CONNECT_REQUEST";
    case BaseCommand_Type.TC_CLIENT_CONNECT_RESPONSE:
      return "TC_CLIENT_CONNECT_RESPONSE";
    case BaseCommand_Type.WATCH_TOPIC_LIST:
      return "WATCH_TOPIC_LIST";
    case BaseCommand_Type.WATCH_TOPIC_LIST_SUCCESS:
      return "WATCH_TOPIC_LIST_SUCCESS";
    case BaseCommand_Type.WATCH_TOPIC_UPDATE:
      return "WATCH_TOPIC_UPDATE";
    case BaseCommand_Type.WATCH_TOPIC_LIST_CLOSE:
      return "WATCH_TOPIC_LIST_CLOSE";
    case BaseCommand_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseSchema(): Schema {
  return { name: "", schemaData: new Uint8Array(0), type: 0, properties: [] };
}

export const Schema = {
  encode(message: Schema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.schemaData.length !== 0) {
      writer.uint32(26).bytes(message.schemaData);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    for (const v of message.properties) {
      KeyValue.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.schemaData = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      schemaData: isSet(object.schemaData) ? bytesFromBase64(object.schemaData) : new Uint8Array(0),
      type: isSet(object.type) ? schema_TypeFromJSON(object.type) : 0,
      properties: Array.isArray(object?.properties) ? object.properties.map((e: any) => KeyValue.fromJSON(e)) : [],
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.schemaData.length !== 0) {
      obj.schemaData = base64FromBytes(message.schemaData);
    }
    if (message.type !== 0) {
      obj.type = schema_TypeToJSON(message.type);
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => KeyValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Schema>, I>>(base?: I): Schema {
    return Schema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.name = object.name ?? "";
    message.schemaData = object.schemaData ?? new Uint8Array(0);
    message.type = object.type ?? 0;
    message.properties = object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageIdData(): MessageIdData {
  return {
    ledgerId: Long.UZERO,
    entryId: Long.UZERO,
    partition: 0,
    batchIndex: 0,
    ackSet: [],
    batchSize: 0,
    firstChunkMessageId: undefined,
  };
}

export const MessageIdData = {
  encode(message: MessageIdData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ledgerId.isZero()) {
      writer.uint32(8).uint64(message.ledgerId);
    }
    if (!message.entryId.isZero()) {
      writer.uint32(16).uint64(message.entryId);
    }
    if (message.partition !== 0) {
      writer.uint32(24).int32(message.partition);
    }
    if (message.batchIndex !== 0) {
      writer.uint32(32).int32(message.batchIndex);
    }
    writer.uint32(42).fork();
    for (const v of message.ackSet) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.batchSize !== 0) {
      writer.uint32(48).int32(message.batchSize);
    }
    if (message.firstChunkMessageId !== undefined) {
      MessageIdData.encode(message.firstChunkMessageId, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageIdData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageIdData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ledgerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.entryId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.partition = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.batchIndex = reader.int32();
          continue;
        case 5:
          if (tag === 40) {
            message.ackSet.push(reader.int64() as Long);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ackSet.push(reader.int64() as Long);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.batchSize = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.firstChunkMessageId = MessageIdData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageIdData {
    return {
      ledgerId: isSet(object.ledgerId) ? Long.fromValue(object.ledgerId) : Long.UZERO,
      entryId: isSet(object.entryId) ? Long.fromValue(object.entryId) : Long.UZERO,
      partition: isSet(object.partition) ? Number(object.partition) : 0,
      batchIndex: isSet(object.batchIndex) ? Number(object.batchIndex) : 0,
      ackSet: Array.isArray(object?.ackSet) ? object.ackSet.map((e: any) => Long.fromValue(e)) : [],
      batchSize: isSet(object.batchSize) ? Number(object.batchSize) : 0,
      firstChunkMessageId: isSet(object.firstChunkMessageId)
        ? MessageIdData.fromJSON(object.firstChunkMessageId)
        : undefined,
    };
  },

  toJSON(message: MessageIdData): unknown {
    const obj: any = {};
    if (!message.ledgerId.isZero()) {
      obj.ledgerId = (message.ledgerId || Long.UZERO).toString();
    }
    if (!message.entryId.isZero()) {
      obj.entryId = (message.entryId || Long.UZERO).toString();
    }
    if (message.partition !== 0) {
      obj.partition = Math.round(message.partition);
    }
    if (message.batchIndex !== 0) {
      obj.batchIndex = Math.round(message.batchIndex);
    }
    if (message.ackSet?.length) {
      obj.ackSet = message.ackSet.map((e) => (e || Long.ZERO).toString());
    }
    if (message.batchSize !== 0) {
      obj.batchSize = Math.round(message.batchSize);
    }
    if (message.firstChunkMessageId !== undefined) {
      obj.firstChunkMessageId = MessageIdData.toJSON(message.firstChunkMessageId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageIdData>, I>>(base?: I): MessageIdData {
    return MessageIdData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageIdData>, I>>(object: I): MessageIdData {
    const message = createBaseMessageIdData();
    message.ledgerId = (object.ledgerId !== undefined && object.ledgerId !== null)
      ? Long.fromValue(object.ledgerId)
      : Long.UZERO;
    message.entryId = (object.entryId !== undefined && object.entryId !== null)
      ? Long.fromValue(object.entryId)
      : Long.UZERO;
    message.partition = object.partition ?? 0;
    message.batchIndex = object.batchIndex ?? 0;
    message.ackSet = object.ackSet?.map((e) => Long.fromValue(e)) || [];
    message.batchSize = object.batchSize ?? 0;
    message.firstChunkMessageId = (object.firstChunkMessageId !== undefined && object.firstChunkMessageId !== null)
      ? MessageIdData.fromPartial(object.firstChunkMessageId)
      : undefined;
    return message;
  },
};

function createBaseKeyValue(): KeyValue {
  return { key: "", value: "" };
}

export const KeyValue = {
  encode(message: KeyValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyValue {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: KeyValue): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyValue>, I>>(base?: I): KeyValue {
    return KeyValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeyValue>, I>>(object: I): KeyValue {
    const message = createBaseKeyValue();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseKeyLongValue(): KeyLongValue {
  return { key: "", value: Long.UZERO };
}

export const KeyLongValue = {
  encode(message: KeyLongValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (!message.value.isZero()) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyLongValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyLongValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeyLongValue {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Long.fromValue(object.value) : Long.UZERO,
    };
  },

  toJSON(message: KeyLongValue): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (!message.value.isZero()) {
      obj.value = (message.value || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeyLongValue>, I>>(base?: I): KeyLongValue {
    return KeyLongValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeyLongValue>, I>>(object: I): KeyLongValue {
    const message = createBaseKeyLongValue();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Long.fromValue(object.value) : Long.UZERO;
    return message;
  },
};

function createBaseIntRange(): IntRange {
  return { start: 0, end: 0 };
}

export const IntRange = {
  encode(message: IntRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntRange {
    return { start: isSet(object.start) ? Number(object.start) : 0, end: isSet(object.end) ? Number(object.end) : 0 };
  },

  toJSON(message: IntRange): unknown {
    const obj: any = {};
    if (message.start !== 0) {
      obj.start = Math.round(message.start);
    }
    if (message.end !== 0) {
      obj.end = Math.round(message.end);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntRange>, I>>(base?: I): IntRange {
    return IntRange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntRange>, I>>(object: I): IntRange {
    const message = createBaseIntRange();
    message.start = object.start ?? 0;
    message.end = object.end ?? 0;
    return message;
  },
};

function createBaseEncryptionKeys(): EncryptionKeys {
  return { key: "", value: new Uint8Array(0), metadata: [] };
}

export const EncryptionKeys = {
  encode(message: EncryptionKeys, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    for (const v of message.metadata) {
      KeyValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptionKeys {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionKeys();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EncryptionKeys {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      metadata: Array.isArray(object?.metadata) ? object.metadata.map((e: any) => KeyValue.fromJSON(e)) : [],
    };
  },

  toJSON(message: EncryptionKeys): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => KeyValue.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptionKeys>, I>>(base?: I): EncryptionKeys {
    return EncryptionKeys.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EncryptionKeys>, I>>(object: I): EncryptionKeys {
    const message = createBaseEncryptionKeys();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    message.metadata = object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageMetadata(): MessageMetadata {
  return {
    producerName: "",
    sequenceId: Long.UZERO,
    publishTime: Long.UZERO,
    properties: [],
    replicatedFrom: "",
    partitionKey: "",
    replicateTo: [],
    compression: 0,
    uncompressedSize: 0,
    numMessagesInBatch: 0,
    eventTime: Long.UZERO,
    encryptionKeys: [],
    encryptionAlgo: "",
    encryptionParam: new Uint8Array(0),
    schemaVersion: new Uint8Array(0),
    partitionKeyB64Encoded: false,
    orderingKey: new Uint8Array(0),
    deliverAtTime: Long.ZERO,
    markerType: 0,
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    highestSequenceId: Long.UZERO,
    nullValue: false,
    uuid: "",
    numChunksFromMsg: 0,
    totalChunkMsgSize: 0,
    chunkId: 0,
    nullPartitionKey: false,
  };
}

export const MessageMetadata = {
  encode(message: MessageMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    // if (message.producerName !== "") {
      writer.uint32(10).string(message.producerName);
    // }
    // if (!message.sequenceId.isZero()) {
      writer.uint32(16).uint64(message.sequenceId);
    // }
    if (!message.publishTime.isZero()) {
      writer.uint32(24).uint64(message.publishTime);
    }
    for (const v of message.properties) {
      KeyValue.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.replicatedFrom !== "") {
      writer.uint32(42).string(message.replicatedFrom);
    }
    if (message.partitionKey !== "") {
      writer.uint32(50).string(message.partitionKey);
    }
    for (const v of message.replicateTo) {
      writer.uint32(58).string(v!);
    }
    if (message.compression !== 0) {
      writer.uint32(64).int32(message.compression);
    }
    if (message.uncompressedSize !== 0) {
      writer.uint32(72).uint32(message.uncompressedSize);
    }
    if (message.numMessagesInBatch !== 0) {
      writer.uint32(88).int32(message.numMessagesInBatch);
    }
    if (!message.eventTime.isZero()) {
      writer.uint32(96).uint64(message.eventTime);
    }
    for (const v of message.encryptionKeys) {
      EncryptionKeys.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.encryptionAlgo !== "") {
      writer.uint32(114).string(message.encryptionAlgo);
    }
    if (message.encryptionParam.length !== 0) {
      writer.uint32(122).bytes(message.encryptionParam);
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(130).bytes(message.schemaVersion);
    }
    if (message.partitionKeyB64Encoded === true) {
      writer.uint32(136).bool(message.partitionKeyB64Encoded);
    }
    if (message.orderingKey.length !== 0) {
      writer.uint32(146).bytes(message.orderingKey);
    }
    if (!message.deliverAtTime.isZero()) {
      writer.uint32(152).int64(message.deliverAtTime);
    }
    if (message.markerType !== 0) {
      writer.uint32(160).int32(message.markerType);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(176).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(184).uint64(message.txnidMostBits);
    }
    if (!message.highestSequenceId.isZero()) {
      writer.uint32(192).uint64(message.highestSequenceId);
    }
    if (message.nullValue === true) {
      writer.uint32(200).bool(message.nullValue);
    }
    if (message.uuid !== "") {
      writer.uint32(210).string(message.uuid);
    }
    if (message.numChunksFromMsg !== 0) {
      writer.uint32(216).int32(message.numChunksFromMsg);
    }
    if (message.totalChunkMsgSize !== 0) {
      writer.uint32(224).int32(message.totalChunkMsgSize);
    }
    if (message.chunkId !== 0) {
      writer.uint32(232).int32(message.chunkId);
    }
    if (message.nullPartitionKey === true) {
      writer.uint32(240).bool(message.nullPartitionKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.producerName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequenceId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.publishTime = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.replicatedFrom = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.partitionKey = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.replicateTo.push(reader.string());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.compression = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.uncompressedSize = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.numMessagesInBatch = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.eventTime = reader.uint64() as Long;
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.encryptionKeys.push(EncryptionKeys.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.encryptionAlgo = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.encryptionParam = reader.bytes();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.schemaVersion = reader.bytes();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.partitionKeyB64Encoded = reader.bool();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.orderingKey = reader.bytes();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.deliverAtTime = reader.int64() as Long;
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.markerType = reader.int32();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.highestSequenceId = reader.uint64() as Long;
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.nullValue = reader.bool();
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.uuid = reader.string();
          continue;
        case 27:
          if (tag !== 216) {
            break;
          }

          message.numChunksFromMsg = reader.int32();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.totalChunkMsgSize = reader.int32();
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.chunkId = reader.int32();
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.nullPartitionKey = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageMetadata {
    return {
      producerName: isSet(object.producerName) ? String(object.producerName) : "",
      sequenceId: isSet(object.sequenceId) ? Long.fromValue(object.sequenceId) : Long.UZERO,
      publishTime: isSet(object.publishTime) ? Long.fromValue(object.publishTime) : Long.UZERO,
      properties: Array.isArray(object?.properties) ? object.properties.map((e: any) => KeyValue.fromJSON(e)) : [],
      replicatedFrom: isSet(object.replicatedFrom) ? String(object.replicatedFrom) : "",
      partitionKey: isSet(object.partitionKey) ? String(object.partitionKey) : "",
      replicateTo: Array.isArray(object?.replicateTo) ? object.replicateTo.map((e: any) => String(e)) : [],
      compression: isSet(object.compression) ? compressionTypeFromJSON(object.compression) : 0,
      uncompressedSize: isSet(object.uncompressedSize) ? Number(object.uncompressedSize) : 0,
      numMessagesInBatch: isSet(object.numMessagesInBatch) ? Number(object.numMessagesInBatch) : 0,
      eventTime: isSet(object.eventTime) ? Long.fromValue(object.eventTime) : Long.UZERO,
      encryptionKeys: Array.isArray(object?.encryptionKeys)
        ? object.encryptionKeys.map((e: any) => EncryptionKeys.fromJSON(e))
        : [],
      encryptionAlgo: isSet(object.encryptionAlgo) ? String(object.encryptionAlgo) : "",
      encryptionParam: isSet(object.encryptionParam) ? bytesFromBase64(object.encryptionParam) : new Uint8Array(0),
      schemaVersion: isSet(object.schemaVersion) ? bytesFromBase64(object.schemaVersion) : new Uint8Array(0),
      partitionKeyB64Encoded: isSet(object.partitionKeyB64Encoded) ? Boolean(object.partitionKeyB64Encoded) : false,
      orderingKey: isSet(object.orderingKey) ? bytesFromBase64(object.orderingKey) : new Uint8Array(0),
      deliverAtTime: isSet(object.deliverAtTime) ? Long.fromValue(object.deliverAtTime) : Long.ZERO,
      markerType: isSet(object.markerType) ? Number(object.markerType) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      highestSequenceId: isSet(object.highestSequenceId) ? Long.fromValue(object.highestSequenceId) : Long.UZERO,
      nullValue: isSet(object.nullValue) ? Boolean(object.nullValue) : false,
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      numChunksFromMsg: isSet(object.numChunksFromMsg) ? Number(object.numChunksFromMsg) : 0,
      totalChunkMsgSize: isSet(object.totalChunkMsgSize) ? Number(object.totalChunkMsgSize) : 0,
      chunkId: isSet(object.chunkId) ? Number(object.chunkId) : 0,
      nullPartitionKey: isSet(object.nullPartitionKey) ? Boolean(object.nullPartitionKey) : false,
    };
  },

  toJSON(message: MessageMetadata): unknown {
    const obj: any = {};
    if (message.producerName !== "") {
      obj.producerName = message.producerName;
    }
    if (!message.sequenceId.isZero()) {
      obj.sequenceId = (message.sequenceId || Long.UZERO).toString();
    }
    if (!message.publishTime.isZero()) {
      obj.publishTime = (message.publishTime || Long.UZERO).toString();
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => KeyValue.toJSON(e));
    }
    if (message.replicatedFrom !== "") {
      obj.replicatedFrom = message.replicatedFrom;
    }
    if (message.partitionKey !== "") {
      obj.partitionKey = message.partitionKey;
    }
    if (message.replicateTo?.length) {
      obj.replicateTo = message.replicateTo;
    }
    if (message.compression !== 0) {
      obj.compression = compressionTypeToJSON(message.compression);
    }
    if (message.uncompressedSize !== 0) {
      obj.uncompressedSize = Math.round(message.uncompressedSize);
    }
    if (message.numMessagesInBatch !== 0) {
      obj.numMessagesInBatch = Math.round(message.numMessagesInBatch);
    }
    if (!message.eventTime.isZero()) {
      obj.eventTime = (message.eventTime || Long.UZERO).toString();
    }
    if (message.encryptionKeys?.length) {
      obj.encryptionKeys = message.encryptionKeys.map((e) => EncryptionKeys.toJSON(e));
    }
    if (message.encryptionAlgo !== "") {
      obj.encryptionAlgo = message.encryptionAlgo;
    }
    if (message.encryptionParam.length !== 0) {
      obj.encryptionParam = base64FromBytes(message.encryptionParam);
    }
    if (message.schemaVersion.length !== 0) {
      obj.schemaVersion = base64FromBytes(message.schemaVersion);
    }
    if (message.partitionKeyB64Encoded === true) {
      obj.partitionKeyB64Encoded = message.partitionKeyB64Encoded;
    }
    if (message.orderingKey.length !== 0) {
      obj.orderingKey = base64FromBytes(message.orderingKey);
    }
    if (!message.deliverAtTime.isZero()) {
      obj.deliverAtTime = (message.deliverAtTime || Long.ZERO).toString();
    }
    if (message.markerType !== 0) {
      obj.markerType = Math.round(message.markerType);
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (!message.highestSequenceId.isZero()) {
      obj.highestSequenceId = (message.highestSequenceId || Long.UZERO).toString();
    }
    if (message.nullValue === true) {
      obj.nullValue = message.nullValue;
    }
    if (message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.numChunksFromMsg !== 0) {
      obj.numChunksFromMsg = Math.round(message.numChunksFromMsg);
    }
    if (message.totalChunkMsgSize !== 0) {
      obj.totalChunkMsgSize = Math.round(message.totalChunkMsgSize);
    }
    if (message.chunkId !== 0) {
      obj.chunkId = Math.round(message.chunkId);
    }
    if (message.nullPartitionKey === true) {
      obj.nullPartitionKey = message.nullPartitionKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageMetadata>, I>>(base?: I): MessageMetadata {
    return MessageMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageMetadata>, I>>(object: I): MessageMetadata {
    const message = createBaseMessageMetadata();
    message.producerName = object.producerName ?? "";
    message.sequenceId = (object.sequenceId !== undefined && object.sequenceId !== null)
      ? Long.fromValue(object.sequenceId)
      : Long.UZERO;
    message.publishTime = (object.publishTime !== undefined && object.publishTime !== null)
      ? Long.fromValue(object.publishTime)
      : Long.UZERO;
    message.properties = object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.replicatedFrom = object.replicatedFrom ?? "";
    message.partitionKey = object.partitionKey ?? "";
    message.replicateTo = object.replicateTo?.map((e) => e) || [];
    message.compression = object.compression ?? 0;
    message.uncompressedSize = object.uncompressedSize ?? 0;
    message.numMessagesInBatch = object.numMessagesInBatch ?? 0;
    message.eventTime = (object.eventTime !== undefined && object.eventTime !== null)
      ? Long.fromValue(object.eventTime)
      : Long.UZERO;
    message.encryptionKeys = object.encryptionKeys?.map((e) => EncryptionKeys.fromPartial(e)) || [];
    message.encryptionAlgo = object.encryptionAlgo ?? "";
    message.encryptionParam = object.encryptionParam ?? new Uint8Array(0);
    message.schemaVersion = object.schemaVersion ?? new Uint8Array(0);
    message.partitionKeyB64Encoded = object.partitionKeyB64Encoded ?? false;
    message.orderingKey = object.orderingKey ?? new Uint8Array(0);
    message.deliverAtTime = (object.deliverAtTime !== undefined && object.deliverAtTime !== null)
      ? Long.fromValue(object.deliverAtTime)
      : Long.ZERO;
    message.markerType = object.markerType ?? 0;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.highestSequenceId = (object.highestSequenceId !== undefined && object.highestSequenceId !== null)
      ? Long.fromValue(object.highestSequenceId)
      : Long.UZERO;
    message.nullValue = object.nullValue ?? false;
    message.uuid = object.uuid ?? "";
    message.numChunksFromMsg = object.numChunksFromMsg ?? 0;
    message.totalChunkMsgSize = object.totalChunkMsgSize ?? 0;
    message.chunkId = object.chunkId ?? 0;
    message.nullPartitionKey = object.nullPartitionKey ?? false;
    return message;
  },
};

function createBaseSingleMessageMetadata(): SingleMessageMetadata {
  return {
    properties: [],
    partitionKey: "",
    payloadSize: 0,
    compactedOut: false,
    eventTime: Long.UZERO,
    partitionKeyB64Encoded: false,
    orderingKey: new Uint8Array(0),
    sequenceId: Long.UZERO,
    nullValue: false,
    nullPartitionKey: false,
  };
}

export const SingleMessageMetadata = {
  encode(message: SingleMessageMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.properties) {
      KeyValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.partitionKey !== "") {
      writer.uint32(18).string(message.partitionKey);
    }
    if (message.payloadSize !== 0) {
      writer.uint32(24).int32(message.payloadSize);
    }
    if (message.compactedOut === true) {
      writer.uint32(32).bool(message.compactedOut);
    }
    if (!message.eventTime.isZero()) {
      writer.uint32(40).uint64(message.eventTime);
    }
    if (message.partitionKeyB64Encoded === true) {
      writer.uint32(48).bool(message.partitionKeyB64Encoded);
    }
    if (message.orderingKey.length !== 0) {
      writer.uint32(58).bytes(message.orderingKey);
    }
    if (!message.sequenceId.isZero()) {
      writer.uint32(64).uint64(message.sequenceId);
    }
    if (message.nullValue === true) {
      writer.uint32(72).bool(message.nullValue);
    }
    if (message.nullPartitionKey === true) {
      writer.uint32(80).bool(message.nullPartitionKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleMessageMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleMessageMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.partitionKey = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.payloadSize = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.compactedOut = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.eventTime = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.partitionKeyB64Encoded = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.orderingKey = reader.bytes();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.sequenceId = reader.uint64() as Long;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.nullValue = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.nullPartitionKey = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleMessageMetadata {
    return {
      properties: Array.isArray(object?.properties) ? object.properties.map((e: any) => KeyValue.fromJSON(e)) : [],
      partitionKey: isSet(object.partitionKey) ? String(object.partitionKey) : "",
      payloadSize: isSet(object.payloadSize) ? Number(object.payloadSize) : 0,
      compactedOut: isSet(object.compactedOut) ? Boolean(object.compactedOut) : false,
      eventTime: isSet(object.eventTime) ? Long.fromValue(object.eventTime) : Long.UZERO,
      partitionKeyB64Encoded: isSet(object.partitionKeyB64Encoded) ? Boolean(object.partitionKeyB64Encoded) : false,
      orderingKey: isSet(object.orderingKey) ? bytesFromBase64(object.orderingKey) : new Uint8Array(0),
      sequenceId: isSet(object.sequenceId) ? Long.fromValue(object.sequenceId) : Long.UZERO,
      nullValue: isSet(object.nullValue) ? Boolean(object.nullValue) : false,
      nullPartitionKey: isSet(object.nullPartitionKey) ? Boolean(object.nullPartitionKey) : false,
    };
  },

  toJSON(message: SingleMessageMetadata): unknown {
    const obj: any = {};
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => KeyValue.toJSON(e));
    }
    if (message.partitionKey !== "") {
      obj.partitionKey = message.partitionKey;
    }
    if (message.payloadSize !== 0) {
      obj.payloadSize = Math.round(message.payloadSize);
    }
    if (message.compactedOut === true) {
      obj.compactedOut = message.compactedOut;
    }
    if (!message.eventTime.isZero()) {
      obj.eventTime = (message.eventTime || Long.UZERO).toString();
    }
    if (message.partitionKeyB64Encoded === true) {
      obj.partitionKeyB64Encoded = message.partitionKeyB64Encoded;
    }
    if (message.orderingKey.length !== 0) {
      obj.orderingKey = base64FromBytes(message.orderingKey);
    }
    if (!message.sequenceId.isZero()) {
      obj.sequenceId = (message.sequenceId || Long.UZERO).toString();
    }
    if (message.nullValue === true) {
      obj.nullValue = message.nullValue;
    }
    if (message.nullPartitionKey === true) {
      obj.nullPartitionKey = message.nullPartitionKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleMessageMetadata>, I>>(base?: I): SingleMessageMetadata {
    return SingleMessageMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleMessageMetadata>, I>>(object: I): SingleMessageMetadata {
    const message = createBaseSingleMessageMetadata();
    message.properties = object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.partitionKey = object.partitionKey ?? "";
    message.payloadSize = object.payloadSize ?? 0;
    message.compactedOut = object.compactedOut ?? false;
    message.eventTime = (object.eventTime !== undefined && object.eventTime !== null)
      ? Long.fromValue(object.eventTime)
      : Long.UZERO;
    message.partitionKeyB64Encoded = object.partitionKeyB64Encoded ?? false;
    message.orderingKey = object.orderingKey ?? new Uint8Array(0);
    message.sequenceId = (object.sequenceId !== undefined && object.sequenceId !== null)
      ? Long.fromValue(object.sequenceId)
      : Long.UZERO;
    message.nullValue = object.nullValue ?? false;
    message.nullPartitionKey = object.nullPartitionKey ?? false;
    return message;
  },
};

function createBaseBrokerEntryMetadata(): BrokerEntryMetadata {
  return { brokerTimestamp: Long.UZERO, index: Long.UZERO };
}

export const BrokerEntryMetadata = {
  encode(message: BrokerEntryMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.brokerTimestamp.isZero()) {
      writer.uint32(8).uint64(message.brokerTimestamp);
    }
    if (!message.index.isZero()) {
      writer.uint32(16).uint64(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrokerEntryMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrokerEntryMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.brokerTimestamp = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrokerEntryMetadata {
    return {
      brokerTimestamp: isSet(object.brokerTimestamp) ? Long.fromValue(object.brokerTimestamp) : Long.UZERO,
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.UZERO,
    };
  },

  toJSON(message: BrokerEntryMetadata): unknown {
    const obj: any = {};
    if (!message.brokerTimestamp.isZero()) {
      obj.brokerTimestamp = (message.brokerTimestamp || Long.UZERO).toString();
    }
    if (!message.index.isZero()) {
      obj.index = (message.index || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrokerEntryMetadata>, I>>(base?: I): BrokerEntryMetadata {
    return BrokerEntryMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrokerEntryMetadata>, I>>(object: I): BrokerEntryMetadata {
    const message = createBaseBrokerEntryMetadata();
    message.brokerTimestamp = (object.brokerTimestamp !== undefined && object.brokerTimestamp !== null)
      ? Long.fromValue(object.brokerTimestamp)
      : Long.UZERO;
    message.index = (object.index !== undefined && object.index !== null) ? Long.fromValue(object.index) : Long.UZERO;
    return message;
  },
};

function createBaseCommandConnect(): CommandConnect {
  return {
    clientVersion: "",
    authMethod: 0,
    authData: new Uint8Array(0),
    protocolVersion: 0,
    authMethodName: "",
    proxyToBrokerUrl: "",
    originalPrincipal: "",
    originalAuthData: "",
    originalAuthMethod: "",
    featureFlags: undefined,
  };
}

export const CommandConnect = {
  encode(message: CommandConnect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientVersion !== "") {
      writer.uint32(10).string(message.clientVersion);
    }
    if (message.authMethod !== 0) {
      writer.uint32(16).int32(message.authMethod);
    }
    if (message.authData.length !== 0) {
      writer.uint32(26).bytes(message.authData);
    }
    if (message.protocolVersion !== 0) {
      writer.uint32(32).int32(message.protocolVersion);
    }
    if (message.authMethodName !== "") {
      writer.uint32(42).string(message.authMethodName);
    }
    if (message.proxyToBrokerUrl !== "") {
      writer.uint32(50).string(message.proxyToBrokerUrl);
    }
    if (message.originalPrincipal !== "") {
      writer.uint32(58).string(message.originalPrincipal);
    }
    if (message.originalAuthData !== "") {
      writer.uint32(66).string(message.originalAuthData);
    }
    if (message.originalAuthMethod !== "") {
      writer.uint32(74).string(message.originalAuthMethod);
    }
    if (message.featureFlags !== undefined) {
      FeatureFlags.encode(message.featureFlags, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConnect {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConnect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientVersion = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.authMethod = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.authData = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.protocolVersion = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.authMethodName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proxyToBrokerUrl = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.originalPrincipal = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.originalAuthData = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.originalAuthMethod = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.featureFlags = FeatureFlags.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandConnect {
    return {
      clientVersion: isSet(object.clientVersion) ? String(object.clientVersion) : "",
      authMethod: isSet(object.authMethod) ? authMethodFromJSON(object.authMethod) : 0,
      authData: isSet(object.authData) ? bytesFromBase64(object.authData) : new Uint8Array(0),
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0,
      authMethodName: isSet(object.authMethodName) ? String(object.authMethodName) : "",
      proxyToBrokerUrl: isSet(object.proxyToBrokerUrl) ? String(object.proxyToBrokerUrl) : "",
      originalPrincipal: isSet(object.originalPrincipal) ? String(object.originalPrincipal) : "",
      originalAuthData: isSet(object.originalAuthData) ? String(object.originalAuthData) : "",
      originalAuthMethod: isSet(object.originalAuthMethod) ? String(object.originalAuthMethod) : "",
      featureFlags: isSet(object.featureFlags) ? FeatureFlags.fromJSON(object.featureFlags) : undefined,
    };
  },

  toJSON(message: CommandConnect): unknown {
    const obj: any = {};
    if (message.clientVersion !== "") {
      obj.clientVersion = message.clientVersion;
    }
    if (message.authMethod !== 0) {
      obj.authMethod = authMethodToJSON(message.authMethod);
    }
    if (message.authData.length !== 0) {
      obj.authData = base64FromBytes(message.authData);
    }
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    if (message.authMethodName !== "") {
      obj.authMethodName = message.authMethodName;
    }
    if (message.proxyToBrokerUrl !== "") {
      obj.proxyToBrokerUrl = message.proxyToBrokerUrl;
    }
    if (message.originalPrincipal !== "") {
      obj.originalPrincipal = message.originalPrincipal;
    }
    if (message.originalAuthData !== "") {
      obj.originalAuthData = message.originalAuthData;
    }
    if (message.originalAuthMethod !== "") {
      obj.originalAuthMethod = message.originalAuthMethod;
    }
    if (message.featureFlags !== undefined) {
      obj.featureFlags = FeatureFlags.toJSON(message.featureFlags);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandConnect>, I>>(base?: I): CommandConnect {
    return CommandConnect.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandConnect>, I>>(object: I): CommandConnect {
    const message = createBaseCommandConnect();
    message.clientVersion = object.clientVersion ?? "";
    message.authMethod = object.authMethod ?? 0;
    message.authData = object.authData ?? new Uint8Array(0);
    message.protocolVersion = object.protocolVersion ?? 0;
    message.authMethodName = object.authMethodName ?? "";
    message.proxyToBrokerUrl = object.proxyToBrokerUrl ?? "";
    message.originalPrincipal = object.originalPrincipal ?? "";
    message.originalAuthData = object.originalAuthData ?? "";
    message.originalAuthMethod = object.originalAuthMethod ?? "";
    message.featureFlags = (object.featureFlags !== undefined && object.featureFlags !== null)
      ? FeatureFlags.fromPartial(object.featureFlags)
      : undefined;
    return message;
  },
};

function createBaseFeatureFlags(): FeatureFlags {
  return {
    supportsAuthRefresh: false,
    supportsBrokerEntryMetadata: false,
    supportsPartialProducer: false,
    supportsTopicWatchers: false,
  };
}

export const FeatureFlags = {
  encode(message: FeatureFlags, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.supportsAuthRefresh === true) {
      writer.uint32(8).bool(message.supportsAuthRefresh);
    }
    if (message.supportsBrokerEntryMetadata === true) {
      writer.uint32(16).bool(message.supportsBrokerEntryMetadata);
    }
    if (message.supportsPartialProducer === true) {
      writer.uint32(24).bool(message.supportsPartialProducer);
    }
    if (message.supportsTopicWatchers === true) {
      writer.uint32(32).bool(message.supportsTopicWatchers);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureFlags {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureFlags();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.supportsAuthRefresh = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.supportsBrokerEntryMetadata = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.supportsPartialProducer = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.supportsTopicWatchers = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureFlags {
    return {
      supportsAuthRefresh: isSet(object.supportsAuthRefresh) ? Boolean(object.supportsAuthRefresh) : false,
      supportsBrokerEntryMetadata: isSet(object.supportsBrokerEntryMetadata)
        ? Boolean(object.supportsBrokerEntryMetadata)
        : false,
      supportsPartialProducer: isSet(object.supportsPartialProducer) ? Boolean(object.supportsPartialProducer) : false,
      supportsTopicWatchers: isSet(object.supportsTopicWatchers) ? Boolean(object.supportsTopicWatchers) : false,
    };
  },

  toJSON(message: FeatureFlags): unknown {
    const obj: any = {};
    if (message.supportsAuthRefresh === true) {
      obj.supportsAuthRefresh = message.supportsAuthRefresh;
    }
    if (message.supportsBrokerEntryMetadata === true) {
      obj.supportsBrokerEntryMetadata = message.supportsBrokerEntryMetadata;
    }
    if (message.supportsPartialProducer === true) {
      obj.supportsPartialProducer = message.supportsPartialProducer;
    }
    if (message.supportsTopicWatchers === true) {
      obj.supportsTopicWatchers = message.supportsTopicWatchers;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FeatureFlags>, I>>(base?: I): FeatureFlags {
    return FeatureFlags.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FeatureFlags>, I>>(object: I): FeatureFlags {
    const message = createBaseFeatureFlags();
    message.supportsAuthRefresh = object.supportsAuthRefresh ?? false;
    message.supportsBrokerEntryMetadata = object.supportsBrokerEntryMetadata ?? false;
    message.supportsPartialProducer = object.supportsPartialProducer ?? false;
    message.supportsTopicWatchers = object.supportsTopicWatchers ?? false;
    return message;
  },
};

function createBaseCommandConnected(): CommandConnected {
  return { serverVersion: "", protocolVersion: 0, maxMessageSize: 0, featureFlags: undefined };
}

export const CommandConnected = {
  encode(message: CommandConnected, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serverVersion !== "") {
      writer.uint32(10).string(message.serverVersion);
    }
    if (message.protocolVersion !== 0) {
      writer.uint32(16).int32(message.protocolVersion);
    }
    if (message.maxMessageSize !== 0) {
      writer.uint32(24).int32(message.maxMessageSize);
    }
    if (message.featureFlags !== undefined) {
      FeatureFlags.encode(message.featureFlags, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConnected {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConnected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.serverVersion = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.protocolVersion = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxMessageSize = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.featureFlags = FeatureFlags.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandConnected {
    return {
      serverVersion: isSet(object.serverVersion) ? String(object.serverVersion) : "",
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0,
      maxMessageSize: isSet(object.maxMessageSize) ? Number(object.maxMessageSize) : 0,
      featureFlags: isSet(object.featureFlags) ? FeatureFlags.fromJSON(object.featureFlags) : undefined,
    };
  },

  toJSON(message: CommandConnected): unknown {
    const obj: any = {};
    if (message.serverVersion !== "") {
      obj.serverVersion = message.serverVersion;
    }
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    if (message.maxMessageSize !== 0) {
      obj.maxMessageSize = Math.round(message.maxMessageSize);
    }
    if (message.featureFlags !== undefined) {
      obj.featureFlags = FeatureFlags.toJSON(message.featureFlags);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandConnected>, I>>(base?: I): CommandConnected {
    return CommandConnected.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandConnected>, I>>(object: I): CommandConnected {
    const message = createBaseCommandConnected();
    message.serverVersion = object.serverVersion ?? "";
    message.protocolVersion = object.protocolVersion ?? 0;
    message.maxMessageSize = object.maxMessageSize ?? 0;
    message.featureFlags = (object.featureFlags !== undefined && object.featureFlags !== null)
      ? FeatureFlags.fromPartial(object.featureFlags)
      : undefined;
    return message;
  },
};

function createBaseCommandAuthResponse(): CommandAuthResponse {
  return { clientVersion: "", response: undefined, protocolVersion: 0 };
}

export const CommandAuthResponse = {
  encode(message: CommandAuthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientVersion !== "") {
      writer.uint32(10).string(message.clientVersion);
    }
    if (message.response !== undefined) {
      AuthData.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolVersion !== 0) {
      writer.uint32(24).int32(message.protocolVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAuthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientVersion = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = AuthData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.protocolVersion = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAuthResponse {
    return {
      clientVersion: isSet(object.clientVersion) ? String(object.clientVersion) : "",
      response: isSet(object.response) ? AuthData.fromJSON(object.response) : undefined,
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0,
    };
  },

  toJSON(message: CommandAuthResponse): unknown {
    const obj: any = {};
    if (message.clientVersion !== "") {
      obj.clientVersion = message.clientVersion;
    }
    if (message.response !== undefined) {
      obj.response = AuthData.toJSON(message.response);
    }
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAuthResponse>, I>>(base?: I): CommandAuthResponse {
    return CommandAuthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAuthResponse>, I>>(object: I): CommandAuthResponse {
    const message = createBaseCommandAuthResponse();
    message.clientVersion = object.clientVersion ?? "";
    message.response = (object.response !== undefined && object.response !== null)
      ? AuthData.fromPartial(object.response)
      : undefined;
    message.protocolVersion = object.protocolVersion ?? 0;
    return message;
  },
};

function createBaseCommandAuthChallenge(): CommandAuthChallenge {
  return { serverVersion: "", challenge: undefined, protocolVersion: 0 };
}

export const CommandAuthChallenge = {
  encode(message: CommandAuthChallenge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serverVersion !== "") {
      writer.uint32(10).string(message.serverVersion);
    }
    if (message.challenge !== undefined) {
      AuthData.encode(message.challenge, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocolVersion !== 0) {
      writer.uint32(24).int32(message.protocolVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAuthChallenge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAuthChallenge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.serverVersion = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.challenge = AuthData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.protocolVersion = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAuthChallenge {
    return {
      serverVersion: isSet(object.serverVersion) ? String(object.serverVersion) : "",
      challenge: isSet(object.challenge) ? AuthData.fromJSON(object.challenge) : undefined,
      protocolVersion: isSet(object.protocolVersion) ? Number(object.protocolVersion) : 0,
    };
  },

  toJSON(message: CommandAuthChallenge): unknown {
    const obj: any = {};
    if (message.serverVersion !== "") {
      obj.serverVersion = message.serverVersion;
    }
    if (message.challenge !== undefined) {
      obj.challenge = AuthData.toJSON(message.challenge);
    }
    if (message.protocolVersion !== 0) {
      obj.protocolVersion = Math.round(message.protocolVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAuthChallenge>, I>>(base?: I): CommandAuthChallenge {
    return CommandAuthChallenge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAuthChallenge>, I>>(object: I): CommandAuthChallenge {
    const message = createBaseCommandAuthChallenge();
    message.serverVersion = object.serverVersion ?? "";
    message.challenge = (object.challenge !== undefined && object.challenge !== null)
      ? AuthData.fromPartial(object.challenge)
      : undefined;
    message.protocolVersion = object.protocolVersion ?? 0;
    return message;
  },
};

function createBaseAuthData(): AuthData {
  return { authMethodName: "", authData: new Uint8Array(0) };
}

export const AuthData = {
  encode(message: AuthData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authMethodName !== "") {
      writer.uint32(10).string(message.authMethodName);
    }
    if (message.authData.length !== 0) {
      writer.uint32(18).bytes(message.authData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authMethodName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authData = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthData {
    return {
      authMethodName: isSet(object.authMethodName) ? String(object.authMethodName) : "",
      authData: isSet(object.authData) ? bytesFromBase64(object.authData) : new Uint8Array(0),
    };
  },

  toJSON(message: AuthData): unknown {
    const obj: any = {};
    if (message.authMethodName !== "") {
      obj.authMethodName = message.authMethodName;
    }
    if (message.authData.length !== 0) {
      obj.authData = base64FromBytes(message.authData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthData>, I>>(base?: I): AuthData {
    return AuthData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthData>, I>>(object: I): AuthData {
    const message = createBaseAuthData();
    message.authMethodName = object.authMethodName ?? "";
    message.authData = object.authData ?? new Uint8Array(0);
    return message;
  },
};

function createBaseKeySharedMeta(): KeySharedMeta {
  return { keySharedMode: 0, hashRanges: [], allowOutOfOrderDelivery: false };
}

export const KeySharedMeta = {
  encode(message: KeySharedMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keySharedMode !== 0) {
      writer.uint32(8).int32(message.keySharedMode);
    }
    for (const v of message.hashRanges) {
      IntRange.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.allowOutOfOrderDelivery === true) {
      writer.uint32(32).bool(message.allowOutOfOrderDelivery);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeySharedMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeySharedMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.keySharedMode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.hashRanges.push(IntRange.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.allowOutOfOrderDelivery = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KeySharedMeta {
    return {
      keySharedMode: isSet(object.keySharedMode) ? keySharedModeFromJSON(object.keySharedMode) : 0,
      hashRanges: Array.isArray(object?.hashRanges) ? object.hashRanges.map((e: any) => IntRange.fromJSON(e)) : [],
      allowOutOfOrderDelivery: isSet(object.allowOutOfOrderDelivery) ? Boolean(object.allowOutOfOrderDelivery) : false,
    };
  },

  toJSON(message: KeySharedMeta): unknown {
    const obj: any = {};
    if (message.keySharedMode !== 0) {
      obj.keySharedMode = keySharedModeToJSON(message.keySharedMode);
    }
    if (message.hashRanges?.length) {
      obj.hashRanges = message.hashRanges.map((e) => IntRange.toJSON(e));
    }
    if (message.allowOutOfOrderDelivery === true) {
      obj.allowOutOfOrderDelivery = message.allowOutOfOrderDelivery;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KeySharedMeta>, I>>(base?: I): KeySharedMeta {
    return KeySharedMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KeySharedMeta>, I>>(object: I): KeySharedMeta {
    const message = createBaseKeySharedMeta();
    message.keySharedMode = object.keySharedMode ?? 0;
    message.hashRanges = object.hashRanges?.map((e) => IntRange.fromPartial(e)) || [];
    message.allowOutOfOrderDelivery = object.allowOutOfOrderDelivery ?? false;
    return message;
  },
};

function createBaseCommandSubscribe(): CommandSubscribe {
  return {
    topic: "",
    subscription: "",
    subType: 0,
    consumerId: Long.UZERO,
    requestId: Long.UZERO,
    consumerName: "",
    priorityLevel: 0,
    durable: false,
    startMessageId: undefined,
    metadata: [],
    readCompacted: false,
    schema: undefined,
    initialPosition: 0,
    replicateSubscriptionState: false,
    forceTopicCreation: false,
    startMessageRollbackDurationSec: Long.UZERO,
    keySharedMeta: undefined,
    subscriptionProperties: [],
    consumerEpoch: Long.UZERO,
  };
}

export const CommandSubscribe = {
  encode(message: CommandSubscribe, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.subscription !== "") {
      writer.uint32(18).string(message.subscription);
    }
    if (message.subType !== 0) {
      writer.uint32(24).int32(message.subType);
    }
    if (!message.consumerId.isZero()) {
      writer.uint32(32).uint64(message.consumerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(40).uint64(message.requestId);
    }
    if (message.consumerName !== "") {
      writer.uint32(50).string(message.consumerName);
    }
    if (message.priorityLevel !== 0) {
      writer.uint32(56).int32(message.priorityLevel);
    }
    if (message.durable === true) {
      writer.uint32(64).bool(message.durable);
    }
    if (message.startMessageId !== undefined) {
      MessageIdData.encode(message.startMessageId, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.metadata) {
      KeyValue.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.readCompacted === true) {
      writer.uint32(88).bool(message.readCompacted);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(98).fork()).ldelim();
    }
    if (message.initialPosition !== 0) {
      writer.uint32(104).int32(message.initialPosition);
    }
    if (message.replicateSubscriptionState === true) {
      writer.uint32(112).bool(message.replicateSubscriptionState);
    }
    if (message.forceTopicCreation === true) {
      writer.uint32(120).bool(message.forceTopicCreation);
    }
    if (!message.startMessageRollbackDurationSec.isZero()) {
      writer.uint32(128).uint64(message.startMessageRollbackDurationSec);
    }
    if (message.keySharedMeta !== undefined) {
      KeySharedMeta.encode(message.keySharedMeta, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.subscriptionProperties) {
      KeyValue.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    if (!message.consumerEpoch.isZero()) {
      writer.uint32(152).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSubscribe {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSubscribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subscription = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.subType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.consumerName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.priorityLevel = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.durable = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.startMessageId = MessageIdData.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.readCompacted = reader.bool();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.initialPosition = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.replicateSubscriptionState = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.forceTopicCreation = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.startMessageRollbackDurationSec = reader.uint64() as Long;
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.keySharedMeta = KeySharedMeta.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.subscriptionProperties.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.consumerEpoch = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSubscribe {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      subscription: isSet(object.subscription) ? String(object.subscription) : "",
      subType: isSet(object.subType) ? commandSubscribe_SubTypeFromJSON(object.subType) : 0,
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      consumerName: isSet(object.consumerName) ? String(object.consumerName) : "",
      priorityLevel: isSet(object.priorityLevel) ? Number(object.priorityLevel) : 0,
      durable: isSet(object.durable) ? Boolean(object.durable) : false,
      startMessageId: isSet(object.startMessageId) ? MessageIdData.fromJSON(object.startMessageId) : undefined,
      metadata: Array.isArray(object?.metadata) ? object.metadata.map((e: any) => KeyValue.fromJSON(e)) : [],
      readCompacted: isSet(object.readCompacted) ? Boolean(object.readCompacted) : false,
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      initialPosition: isSet(object.initialPosition)
        ? commandSubscribe_InitialPositionFromJSON(object.initialPosition)
        : 0,
      replicateSubscriptionState: isSet(object.replicateSubscriptionState)
        ? Boolean(object.replicateSubscriptionState)
        : false,
      forceTopicCreation: isSet(object.forceTopicCreation) ? Boolean(object.forceTopicCreation) : false,
      startMessageRollbackDurationSec: isSet(object.startMessageRollbackDurationSec)
        ? Long.fromValue(object.startMessageRollbackDurationSec)
        : Long.UZERO,
      keySharedMeta: isSet(object.keySharedMeta) ? KeySharedMeta.fromJSON(object.keySharedMeta) : undefined,
      subscriptionProperties: Array.isArray(object?.subscriptionProperties)
        ? object.subscriptionProperties.map((e: any) => KeyValue.fromJSON(e))
        : [],
      consumerEpoch: isSet(object.consumerEpoch) ? Long.fromValue(object.consumerEpoch) : Long.UZERO,
    };
  },

  toJSON(message: CommandSubscribe): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.subscription !== "") {
      obj.subscription = message.subscription;
    }
    if (message.subType !== 0) {
      obj.subType = commandSubscribe_SubTypeToJSON(message.subType);
    }
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.consumerName !== "") {
      obj.consumerName = message.consumerName;
    }
    if (message.priorityLevel !== 0) {
      obj.priorityLevel = Math.round(message.priorityLevel);
    }
    if (message.durable === true) {
      obj.durable = message.durable;
    }
    if (message.startMessageId !== undefined) {
      obj.startMessageId = MessageIdData.toJSON(message.startMessageId);
    }
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => KeyValue.toJSON(e));
    }
    if (message.readCompacted === true) {
      obj.readCompacted = message.readCompacted;
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.initialPosition !== 0) {
      obj.initialPosition = commandSubscribe_InitialPositionToJSON(message.initialPosition);
    }
    if (message.replicateSubscriptionState === true) {
      obj.replicateSubscriptionState = message.replicateSubscriptionState;
    }
    if (message.forceTopicCreation === true) {
      obj.forceTopicCreation = message.forceTopicCreation;
    }
    if (!message.startMessageRollbackDurationSec.isZero()) {
      obj.startMessageRollbackDurationSec = (message.startMessageRollbackDurationSec || Long.UZERO).toString();
    }
    if (message.keySharedMeta !== undefined) {
      obj.keySharedMeta = KeySharedMeta.toJSON(message.keySharedMeta);
    }
    if (message.subscriptionProperties?.length) {
      obj.subscriptionProperties = message.subscriptionProperties.map((e) => KeyValue.toJSON(e));
    }
    if (!message.consumerEpoch.isZero()) {
      obj.consumerEpoch = (message.consumerEpoch || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSubscribe>, I>>(base?: I): CommandSubscribe {
    return CommandSubscribe.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSubscribe>, I>>(object: I): CommandSubscribe {
    const message = createBaseCommandSubscribe();
    message.topic = object.topic ?? "";
    message.subscription = object.subscription ?? "";
    message.subType = object.subType ?? 0;
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.consumerName = object.consumerName ?? "";
    message.priorityLevel = object.priorityLevel ?? 0;
    message.durable = object.durable ?? false;
    message.startMessageId = (object.startMessageId !== undefined && object.startMessageId !== null)
      ? MessageIdData.fromPartial(object.startMessageId)
      : undefined;
    message.metadata = object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    message.readCompacted = object.readCompacted ?? false;
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.initialPosition = object.initialPosition ?? 0;
    message.replicateSubscriptionState = object.replicateSubscriptionState ?? false;
    message.forceTopicCreation = object.forceTopicCreation ?? false;
    message.startMessageRollbackDurationSec =
      (object.startMessageRollbackDurationSec !== undefined && object.startMessageRollbackDurationSec !== null)
        ? Long.fromValue(object.startMessageRollbackDurationSec)
        : Long.UZERO;
    message.keySharedMeta = (object.keySharedMeta !== undefined && object.keySharedMeta !== null)
      ? KeySharedMeta.fromPartial(object.keySharedMeta)
      : undefined;
    message.subscriptionProperties = object.subscriptionProperties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.consumerEpoch = (object.consumerEpoch !== undefined && object.consumerEpoch !== null)
      ? Long.fromValue(object.consumerEpoch)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandPartitionedTopicMetadata(): CommandPartitionedTopicMetadata {
  return { topic: "", requestId: Long.UZERO, originalPrincipal: "", originalAuthData: "", originalAuthMethod: "" };
}

export const CommandPartitionedTopicMetadata = {
  encode(message: CommandPartitionedTopicMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.originalPrincipal !== "") {
      writer.uint32(26).string(message.originalPrincipal);
    }
    if (message.originalAuthData !== "") {
      writer.uint32(34).string(message.originalAuthData);
    }
    if (message.originalAuthMethod !== "") {
      writer.uint32(42).string(message.originalAuthMethod);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandPartitionedTopicMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPartitionedTopicMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.originalPrincipal = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.originalAuthData = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.originalAuthMethod = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandPartitionedTopicMetadata {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      originalPrincipal: isSet(object.originalPrincipal) ? String(object.originalPrincipal) : "",
      originalAuthData: isSet(object.originalAuthData) ? String(object.originalAuthData) : "",
      originalAuthMethod: isSet(object.originalAuthMethod) ? String(object.originalAuthMethod) : "",
    };
  },

  toJSON(message: CommandPartitionedTopicMetadata): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.originalPrincipal !== "") {
      obj.originalPrincipal = message.originalPrincipal;
    }
    if (message.originalAuthData !== "") {
      obj.originalAuthData = message.originalAuthData;
    }
    if (message.originalAuthMethod !== "") {
      obj.originalAuthMethod = message.originalAuthMethod;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandPartitionedTopicMetadata>, I>>(base?: I): CommandPartitionedTopicMetadata {
    return CommandPartitionedTopicMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandPartitionedTopicMetadata>, I>>(
    object: I,
  ): CommandPartitionedTopicMetadata {
    const message = createBaseCommandPartitionedTopicMetadata();
    message.topic = object.topic ?? "";
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.originalPrincipal = object.originalPrincipal ?? "";
    message.originalAuthData = object.originalAuthData ?? "";
    message.originalAuthMethod = object.originalAuthMethod ?? "";
    return message;
  },
};

function createBaseCommandPartitionedTopicMetadataResponse(): CommandPartitionedTopicMetadataResponse {
  return { partitions: 0, requestId: Long.UZERO, response: 0, error: 0, message: "" };
}

export const CommandPartitionedTopicMetadataResponse = {
  encode(message: CommandPartitionedTopicMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.partitions !== 0) {
      writer.uint32(8).uint32(message.partitions);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.response !== 0) {
      writer.uint32(24).int32(message.response);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandPartitionedTopicMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPartitionedTopicMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.partitions = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.response = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandPartitionedTopicMetadataResponse {
    return {
      partitions: isSet(object.partitions) ? Number(object.partitions) : 0,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      response: isSet(object.response)
        ? commandPartitionedTopicMetadataResponse_LookupTypeFromJSON(object.response)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandPartitionedTopicMetadataResponse): unknown {
    const obj: any = {};
    if (message.partitions !== 0) {
      obj.partitions = Math.round(message.partitions);
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.response !== 0) {
      obj.response = commandPartitionedTopicMetadataResponse_LookupTypeToJSON(message.response);
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandPartitionedTopicMetadataResponse>, I>>(
    base?: I,
  ): CommandPartitionedTopicMetadataResponse {
    return CommandPartitionedTopicMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandPartitionedTopicMetadataResponse>, I>>(
    object: I,
  ): CommandPartitionedTopicMetadataResponse {
    const message = createBaseCommandPartitionedTopicMetadataResponse();
    message.partitions = object.partitions ?? 0;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.response = object.response ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandLookupTopic(): CommandLookupTopic {
  return {
    topic: "",
    requestId: Long.UZERO,
    authoritative: false,
    originalPrincipal: "",
    originalAuthData: "",
    originalAuthMethod: "",
    advertisedListenerName: "",
  };
}

export const CommandLookupTopic = {
  encode(message: CommandLookupTopic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.authoritative === true) {
      writer.uint32(24).bool(message.authoritative);
    }
    if (message.originalPrincipal !== "") {
      writer.uint32(34).string(message.originalPrincipal);
    }
    if (message.originalAuthData !== "") {
      writer.uint32(42).string(message.originalAuthData);
    }
    if (message.originalAuthMethod !== "") {
      writer.uint32(50).string(message.originalAuthMethod);
    }
    if (message.advertisedListenerName !== "") {
      writer.uint32(58).string(message.advertisedListenerName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandLookupTopic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandLookupTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.authoritative = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.originalPrincipal = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.originalAuthData = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.originalAuthMethod = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.advertisedListenerName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandLookupTopic {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      authoritative: isSet(object.authoritative) ? Boolean(object.authoritative) : false,
      originalPrincipal: isSet(object.originalPrincipal) ? String(object.originalPrincipal) : "",
      originalAuthData: isSet(object.originalAuthData) ? String(object.originalAuthData) : "",
      originalAuthMethod: isSet(object.originalAuthMethod) ? String(object.originalAuthMethod) : "",
      advertisedListenerName: isSet(object.advertisedListenerName) ? String(object.advertisedListenerName) : "",
    };
  },

  toJSON(message: CommandLookupTopic): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.authoritative === true) {
      obj.authoritative = message.authoritative;
    }
    if (message.originalPrincipal !== "") {
      obj.originalPrincipal = message.originalPrincipal;
    }
    if (message.originalAuthData !== "") {
      obj.originalAuthData = message.originalAuthData;
    }
    if (message.originalAuthMethod !== "") {
      obj.originalAuthMethod = message.originalAuthMethod;
    }
    if (message.advertisedListenerName !== "") {
      obj.advertisedListenerName = message.advertisedListenerName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandLookupTopic>, I>>(base?: I): CommandLookupTopic {
    return CommandLookupTopic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandLookupTopic>, I>>(object: I): CommandLookupTopic {
    const message = createBaseCommandLookupTopic();
    message.topic = object.topic ?? "";
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.authoritative = object.authoritative ?? false;
    message.originalPrincipal = object.originalPrincipal ?? "";
    message.originalAuthData = object.originalAuthData ?? "";
    message.originalAuthMethod = object.originalAuthMethod ?? "";
    message.advertisedListenerName = object.advertisedListenerName ?? "";
    return message;
  },
};

function createBaseCommandLookupTopicResponse(): CommandLookupTopicResponse {
  return {
    brokerServiceUrl: "",
    brokerServiceUrlTls: "",
    response: 0,
    requestId: Long.UZERO,
    authoritative: false,
    error: 0,
    message: "",
    proxyThroughServiceUrl: false,
  };
}

export const CommandLookupTopicResponse = {
  encode(message: CommandLookupTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brokerServiceUrl !== "") {
      writer.uint32(10).string(message.brokerServiceUrl);
    }
    if (message.brokerServiceUrlTls !== "") {
      writer.uint32(18).string(message.brokerServiceUrlTls);
    }
    if (message.response !== 0) {
      writer.uint32(24).int32(message.response);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(32).uint64(message.requestId);
    }
    if (message.authoritative === true) {
      writer.uint32(40).bool(message.authoritative);
    }
    if (message.error !== 0) {
      writer.uint32(48).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(58).string(message.message);
    }
    if (message.proxyThroughServiceUrl === true) {
      writer.uint32(64).bool(message.proxyThroughServiceUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandLookupTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandLookupTopicResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brokerServiceUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.brokerServiceUrlTls = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.response = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.authoritative = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.message = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.proxyThroughServiceUrl = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandLookupTopicResponse {
    return {
      brokerServiceUrl: isSet(object.brokerServiceUrl) ? String(object.brokerServiceUrl) : "",
      brokerServiceUrlTls: isSet(object.brokerServiceUrlTls) ? String(object.brokerServiceUrlTls) : "",
      response: isSet(object.response) ? commandLookupTopicResponse_LookupTypeFromJSON(object.response) : 0,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      authoritative: isSet(object.authoritative) ? Boolean(object.authoritative) : false,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      proxyThroughServiceUrl: isSet(object.proxyThroughServiceUrl) ? Boolean(object.proxyThroughServiceUrl) : false,
    };
  },

  toJSON(message: CommandLookupTopicResponse): unknown {
    const obj: any = {};
    if (message.brokerServiceUrl !== "") {
      obj.brokerServiceUrl = message.brokerServiceUrl;
    }
    if (message.brokerServiceUrlTls !== "") {
      obj.brokerServiceUrlTls = message.brokerServiceUrlTls;
    }
    if (message.response !== 0) {
      obj.response = commandLookupTopicResponse_LookupTypeToJSON(message.response);
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.authoritative === true) {
      obj.authoritative = message.authoritative;
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (message.proxyThroughServiceUrl === true) {
      obj.proxyThroughServiceUrl = message.proxyThroughServiceUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandLookupTopicResponse>, I>>(base?: I): CommandLookupTopicResponse {
    return CommandLookupTopicResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandLookupTopicResponse>, I>>(object: I): CommandLookupTopicResponse {
    const message = createBaseCommandLookupTopicResponse();
    message.brokerServiceUrl = object.brokerServiceUrl ?? "";
    message.brokerServiceUrlTls = object.brokerServiceUrlTls ?? "";
    message.response = object.response ?? 0;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.authoritative = object.authoritative ?? false;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    message.proxyThroughServiceUrl = object.proxyThroughServiceUrl ?? false;
    return message;
  },
};

function createBaseCommandProducer(): CommandProducer {
  return {
    topic: "",
    producerId: Long.UZERO,
    requestId: Long.UZERO,
    producerName: "",
    encrypted: false,
    metadata: [],
    schema: undefined,
    epoch: Long.UZERO,
    userProvidedProducerName: false,
    producerAccessMode: 0,
    topicEpoch: Long.UZERO,
    txnEnabled: false,
    initialSubscriptionName: "",
  };
}

export const CommandProducer = {
  encode(message: CommandProducer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (!message.producerId.isZero()) {
      writer.uint32(16).uint64(message.producerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(24).uint64(message.requestId);
    }
    if (message.producerName !== "") {
      writer.uint32(34).string(message.producerName);
    }
    if (message.encrypted === true) {
      writer.uint32(40).bool(message.encrypted);
    }
    for (const v of message.metadata) {
      KeyValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(58).fork()).ldelim();
    }
    if (!message.epoch.isZero()) {
      writer.uint32(64).uint64(message.epoch);
    }
    if (message.userProvidedProducerName === true) {
      writer.uint32(72).bool(message.userProvidedProducerName);
    }
    if (message.producerAccessMode !== 0) {
      writer.uint32(80).int32(message.producerAccessMode);
    }
    if (!message.topicEpoch.isZero()) {
      writer.uint32(88).uint64(message.topicEpoch);
    }
    if (message.txnEnabled === true) {
      writer.uint32(96).bool(message.txnEnabled);
    }
    if (message.initialSubscriptionName !== "") {
      writer.uint32(106).string(message.initialSubscriptionName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandProducer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandProducer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.producerId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.producerName = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.encrypted = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.epoch = reader.uint64() as Long;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.userProvidedProducerName = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.producerAccessMode = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.topicEpoch = reader.uint64() as Long;
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.txnEnabled = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.initialSubscriptionName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandProducer {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      producerId: isSet(object.producerId) ? Long.fromValue(object.producerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      producerName: isSet(object.producerName) ? String(object.producerName) : "",
      encrypted: isSet(object.encrypted) ? Boolean(object.encrypted) : false,
      metadata: Array.isArray(object?.metadata) ? object.metadata.map((e: any) => KeyValue.fromJSON(e)) : [],
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      epoch: isSet(object.epoch) ? Long.fromValue(object.epoch) : Long.UZERO,
      userProvidedProducerName: isSet(object.userProvidedProducerName)
        ? Boolean(object.userProvidedProducerName)
        : false,
      producerAccessMode: isSet(object.producerAccessMode) ? producerAccessModeFromJSON(object.producerAccessMode) : 0,
      topicEpoch: isSet(object.topicEpoch) ? Long.fromValue(object.topicEpoch) : Long.UZERO,
      txnEnabled: isSet(object.txnEnabled) ? Boolean(object.txnEnabled) : false,
      initialSubscriptionName: isSet(object.initialSubscriptionName) ? String(object.initialSubscriptionName) : "",
    };
  },

  toJSON(message: CommandProducer): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (!message.producerId.isZero()) {
      obj.producerId = (message.producerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.producerName !== "") {
      obj.producerName = message.producerName;
    }
    if (message.encrypted === true) {
      obj.encrypted = message.encrypted;
    }
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => KeyValue.toJSON(e));
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (!message.epoch.isZero()) {
      obj.epoch = (message.epoch || Long.UZERO).toString();
    }
    if (message.userProvidedProducerName === true) {
      obj.userProvidedProducerName = message.userProvidedProducerName;
    }
    if (message.producerAccessMode !== 0) {
      obj.producerAccessMode = producerAccessModeToJSON(message.producerAccessMode);
    }
    if (!message.topicEpoch.isZero()) {
      obj.topicEpoch = (message.topicEpoch || Long.UZERO).toString();
    }
    if (message.txnEnabled === true) {
      obj.txnEnabled = message.txnEnabled;
    }
    if (message.initialSubscriptionName !== "") {
      obj.initialSubscriptionName = message.initialSubscriptionName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandProducer>, I>>(base?: I): CommandProducer {
    return CommandProducer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandProducer>, I>>(object: I): CommandProducer {
    const message = createBaseCommandProducer();
    message.topic = object.topic ?? "";
    message.producerId = (object.producerId !== undefined && object.producerId !== null)
      ? Long.fromValue(object.producerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.producerName = object.producerName ?? "";
    message.encrypted = object.encrypted ?? false;
    message.metadata = object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.epoch = (object.epoch !== undefined && object.epoch !== null) ? Long.fromValue(object.epoch) : Long.UZERO;
    message.userProvidedProducerName = object.userProvidedProducerName ?? false;
    message.producerAccessMode = object.producerAccessMode ?? 0;
    message.topicEpoch = (object.topicEpoch !== undefined && object.topicEpoch !== null)
      ? Long.fromValue(object.topicEpoch)
      : Long.UZERO;
    message.txnEnabled = object.txnEnabled ?? false;
    message.initialSubscriptionName = object.initialSubscriptionName ?? "";
    return message;
  },
};

function createBaseCommandSend(): CommandSend {
  return {
    producerId: Long.UZERO,
    sequenceId: Long.UZERO,
    numMessages: 0,
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    highestSequenceId: Long.UZERO,
    isChunk: false,
    marker: false,
  };
}

export const CommandSend = {
  encode(message: CommandSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.producerId.isZero()) {
      writer.uint32(8).uint64(message.producerId);
    }
    // if (!message.sequenceId.isZero()) {
      writer.uint32(16).uint64(message.sequenceId);
    // }
    if (message.numMessages !== 0) {
      writer.uint32(24).int32(message.numMessages);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(32).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(40).uint64(message.txnidMostBits);
    }
    if (!message.highestSequenceId.isZero()) {
      writer.uint32(48).uint64(message.highestSequenceId);
    }
    if (message.isChunk === true) {
      writer.uint32(56).bool(message.isChunk);
    }
    if (message.marker === true) {
      writer.uint32(64).bool(message.marker);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.producerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequenceId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numMessages = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.highestSequenceId = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isChunk = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.marker = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSend {
    return {
      producerId: isSet(object.producerId) ? Long.fromValue(object.producerId) : Long.UZERO,
      sequenceId: isSet(object.sequenceId) ? Long.fromValue(object.sequenceId) : Long.UZERO,
      numMessages: isSet(object.numMessages) ? Number(object.numMessages) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      highestSequenceId: isSet(object.highestSequenceId) ? Long.fromValue(object.highestSequenceId) : Long.UZERO,
      isChunk: isSet(object.isChunk) ? Boolean(object.isChunk) : false,
      marker: isSet(object.marker) ? Boolean(object.marker) : false,
    };
  },

  toJSON(message: CommandSend): unknown {
    const obj: any = {};
    if (!message.producerId.isZero()) {
      obj.producerId = (message.producerId || Long.UZERO).toString();
    }
    if (!message.sequenceId.isZero()) {
      obj.sequenceId = (message.sequenceId || Long.UZERO).toString();
    }
    if (message.numMessages !== 0) {
      obj.numMessages = Math.round(message.numMessages);
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (!message.highestSequenceId.isZero()) {
      obj.highestSequenceId = (message.highestSequenceId || Long.UZERO).toString();
    }
    if (message.isChunk === true) {
      obj.isChunk = message.isChunk;
    }
    if (message.marker === true) {
      obj.marker = message.marker;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSend>, I>>(base?: I): CommandSend {
    return CommandSend.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSend>, I>>(object: I): CommandSend {
    const message = createBaseCommandSend();
    message.producerId = (object.producerId !== undefined && object.producerId !== null)
      ? Long.fromValue(object.producerId)
      : Long.UZERO;
    message.sequenceId = (object.sequenceId !== undefined && object.sequenceId !== null)
      ? Long.fromValue(object.sequenceId)
      : Long.UZERO;
    message.numMessages = object.numMessages ?? 0;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.highestSequenceId = (object.highestSequenceId !== undefined && object.highestSequenceId !== null)
      ? Long.fromValue(object.highestSequenceId)
      : Long.UZERO;
    message.isChunk = object.isChunk ?? false;
    message.marker = object.marker ?? false;
    return message;
  },
};

function createBaseCommandSendReceipt(): CommandSendReceipt {
  return { producerId: Long.UZERO, sequenceId: Long.UZERO, messageId: undefined, highestSequenceId: Long.UZERO };
}

export const CommandSendReceipt = {
  encode(message: CommandSendReceipt, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.producerId.isZero()) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (!message.sequenceId.isZero()) {
      writer.uint32(16).uint64(message.sequenceId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(message.messageId, writer.uint32(26).fork()).ldelim();
    }
    if (!message.highestSequenceId.isZero()) {
      writer.uint32(32).uint64(message.highestSequenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSendReceipt {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSendReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.producerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequenceId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId = MessageIdData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.highestSequenceId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSendReceipt {
    return {
      producerId: isSet(object.producerId) ? Long.fromValue(object.producerId) : Long.UZERO,
      sequenceId: isSet(object.sequenceId) ? Long.fromValue(object.sequenceId) : Long.UZERO,
      messageId: isSet(object.messageId) ? MessageIdData.fromJSON(object.messageId) : undefined,
      highestSequenceId: isSet(object.highestSequenceId) ? Long.fromValue(object.highestSequenceId) : Long.UZERO,
    };
  },

  toJSON(message: CommandSendReceipt): unknown {
    const obj: any = {};
    if (!message.producerId.isZero()) {
      obj.producerId = (message.producerId || Long.UZERO).toString();
    }
    if (!message.sequenceId.isZero()) {
      obj.sequenceId = (message.sequenceId || Long.UZERO).toString();
    }
    if (message.messageId !== undefined) {
      obj.messageId = MessageIdData.toJSON(message.messageId);
    }
    if (!message.highestSequenceId.isZero()) {
      obj.highestSequenceId = (message.highestSequenceId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSendReceipt>, I>>(base?: I): CommandSendReceipt {
    return CommandSendReceipt.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSendReceipt>, I>>(object: I): CommandSendReceipt {
    const message = createBaseCommandSendReceipt();
    message.producerId = (object.producerId !== undefined && object.producerId !== null)
      ? Long.fromValue(object.producerId)
      : Long.UZERO;
    message.sequenceId = (object.sequenceId !== undefined && object.sequenceId !== null)
      ? Long.fromValue(object.sequenceId)
      : Long.UZERO;
    message.messageId = (object.messageId !== undefined && object.messageId !== null)
      ? MessageIdData.fromPartial(object.messageId)
      : undefined;
    message.highestSequenceId = (object.highestSequenceId !== undefined && object.highestSequenceId !== null)
      ? Long.fromValue(object.highestSequenceId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandSendError(): CommandSendError {
  return { producerId: Long.UZERO, sequenceId: Long.UZERO, error: 0, message: "" };
}

export const CommandSendError = {
  encode(message: CommandSendError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.producerId.isZero()) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (!message.sequenceId.isZero()) {
      writer.uint32(16).uint64(message.sequenceId);
    }
    if (message.error !== 0) {
      writer.uint32(24).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSendError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSendError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.producerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequenceId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSendError {
    return {
      producerId: isSet(object.producerId) ? Long.fromValue(object.producerId) : Long.UZERO,
      sequenceId: isSet(object.sequenceId) ? Long.fromValue(object.sequenceId) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandSendError): unknown {
    const obj: any = {};
    if (!message.producerId.isZero()) {
      obj.producerId = (message.producerId || Long.UZERO).toString();
    }
    if (!message.sequenceId.isZero()) {
      obj.sequenceId = (message.sequenceId || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSendError>, I>>(base?: I): CommandSendError {
    return CommandSendError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSendError>, I>>(object: I): CommandSendError {
    const message = createBaseCommandSendError();
    message.producerId = (object.producerId !== undefined && object.producerId !== null)
      ? Long.fromValue(object.producerId)
      : Long.UZERO;
    message.sequenceId = (object.sequenceId !== undefined && object.sequenceId !== null)
      ? Long.fromValue(object.sequenceId)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandMessage(): CommandMessage {
  return { consumerId: Long.UZERO, messageId: undefined, redeliveryCount: 0, ackSet: [], consumerEpoch: Long.UZERO };
}

export const CommandMessage = {
  encode(message: CommandMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(message.messageId, writer.uint32(18).fork()).ldelim();
    }
    if (message.redeliveryCount !== 0) {
      writer.uint32(24).uint32(message.redeliveryCount);
    }
    writer.uint32(34).fork();
    for (const v of message.ackSet) {
      writer.int64(v);
    }
    writer.ldelim();
    if (!message.consumerEpoch.isZero()) {
      writer.uint32(40).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.messageId = MessageIdData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.redeliveryCount = reader.uint32();
          continue;
        case 4:
          if (tag === 32) {
            message.ackSet.push(reader.int64() as Long);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ackSet.push(reader.int64() as Long);
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.consumerEpoch = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandMessage {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      messageId: isSet(object.messageId) ? MessageIdData.fromJSON(object.messageId) : undefined,
      redeliveryCount: isSet(object.redeliveryCount) ? Number(object.redeliveryCount) : 0,
      ackSet: Array.isArray(object?.ackSet) ? object.ackSet.map((e: any) => Long.fromValue(e)) : [],
      consumerEpoch: isSet(object.consumerEpoch) ? Long.fromValue(object.consumerEpoch) : Long.UZERO,
    };
  },

  toJSON(message: CommandMessage): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (message.messageId !== undefined) {
      obj.messageId = MessageIdData.toJSON(message.messageId);
    }
    if (message.redeliveryCount !== 0) {
      obj.redeliveryCount = Math.round(message.redeliveryCount);
    }
    if (message.ackSet?.length) {
      obj.ackSet = message.ackSet.map((e) => (e || Long.ZERO).toString());
    }
    if (!message.consumerEpoch.isZero()) {
      obj.consumerEpoch = (message.consumerEpoch || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandMessage>, I>>(base?: I): CommandMessage {
    return CommandMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandMessage>, I>>(object: I): CommandMessage {
    const message = createBaseCommandMessage();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.messageId = (object.messageId !== undefined && object.messageId !== null)
      ? MessageIdData.fromPartial(object.messageId)
      : undefined;
    message.redeliveryCount = object.redeliveryCount ?? 0;
    message.ackSet = object.ackSet?.map((e) => Long.fromValue(e)) || [];
    message.consumerEpoch = (object.consumerEpoch !== undefined && object.consumerEpoch !== null)
      ? Long.fromValue(object.consumerEpoch)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandAck(): CommandAck {
  return {
    consumerId: Long.UZERO,
    ackType: 0,
    messageId: [],
    validationError: 0,
    properties: [],
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    requestId: Long.UZERO,
  };
}

export const CommandAck = {
  encode(message: CommandAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.ackType !== 0) {
      writer.uint32(16).int32(message.ackType);
    }
    for (const v of message.messageId) {
      MessageIdData.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.validationError !== 0) {
      writer.uint32(32).int32(message.validationError);
    }
    for (const v of message.properties) {
      KeyLongValue.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(48).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(56).uint64(message.txnidMostBits);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(64).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ackType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId.push(MessageIdData.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.validationError = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.properties.push(KeyLongValue.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAck {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      ackType: isSet(object.ackType) ? commandAck_AckTypeFromJSON(object.ackType) : 0,
      messageId: Array.isArray(object?.messageId) ? object.messageId.map((e: any) => MessageIdData.fromJSON(e)) : [],
      validationError: isSet(object.validationError) ? commandAck_ValidationErrorFromJSON(object.validationError) : 0,
      properties: Array.isArray(object?.properties) ? object.properties.map((e: any) => KeyLongValue.fromJSON(e)) : [],
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandAck): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (message.ackType !== 0) {
      obj.ackType = commandAck_AckTypeToJSON(message.ackType);
    }
    if (message.messageId?.length) {
      obj.messageId = message.messageId.map((e) => MessageIdData.toJSON(e));
    }
    if (message.validationError !== 0) {
      obj.validationError = commandAck_ValidationErrorToJSON(message.validationError);
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => KeyLongValue.toJSON(e));
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAck>, I>>(base?: I): CommandAck {
    return CommandAck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAck>, I>>(object: I): CommandAck {
    const message = createBaseCommandAck();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.ackType = object.ackType ?? 0;
    message.messageId = object.messageId?.map((e) => MessageIdData.fromPartial(e)) || [];
    message.validationError = object.validationError ?? 0;
    message.properties = object.properties?.map((e) => KeyLongValue.fromPartial(e)) || [];
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandAckResponse(): CommandAckResponse {
  return {
    consumerId: Long.UZERO,
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    error: 0,
    message: "",
    requestId: Long.UZERO,
  };
}

export const CommandAckResponse = {
  encode(message: CommandAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(48).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAckResponse {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandAckResponse): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAckResponse>, I>>(base?: I): CommandAckResponse {
    return CommandAckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAckResponse>, I>>(object: I): CommandAckResponse {
    const message = createBaseCommandAckResponse();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandActiveConsumerChange(): CommandActiveConsumerChange {
  return { consumerId: Long.UZERO, isActive: false };
}

export const CommandActiveConsumerChange = {
  encode(message: CommandActiveConsumerChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.isActive === true) {
      writer.uint32(16).bool(message.isActive);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandActiveConsumerChange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandActiveConsumerChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandActiveConsumerChange {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      isActive: isSet(object.isActive) ? Boolean(object.isActive) : false,
    };
  },

  toJSON(message: CommandActiveConsumerChange): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (message.isActive === true) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandActiveConsumerChange>, I>>(base?: I): CommandActiveConsumerChange {
    return CommandActiveConsumerChange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandActiveConsumerChange>, I>>(object: I): CommandActiveConsumerChange {
    const message = createBaseCommandActiveConsumerChange();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseCommandFlow(): CommandFlow {
  return { consumerId: Long.UZERO, messagePermits: 0 };
}

export const CommandFlow = {
  encode(message: CommandFlow, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.messagePermits !== 0) {
      writer.uint32(16).uint32(message.messagePermits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandFlow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandFlow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.messagePermits = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandFlow {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      messagePermits: isSet(object.messagePermits) ? Number(object.messagePermits) : 0,
    };
  },

  toJSON(message: CommandFlow): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (message.messagePermits !== 0) {
      obj.messagePermits = Math.round(message.messagePermits);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandFlow>, I>>(base?: I): CommandFlow {
    return CommandFlow.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandFlow>, I>>(object: I): CommandFlow {
    const message = createBaseCommandFlow();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.messagePermits = object.messagePermits ?? 0;
    return message;
  },
};

function createBaseCommandUnsubscribe(): CommandUnsubscribe {
  return { consumerId: Long.UZERO, requestId: Long.UZERO };
}

export const CommandUnsubscribe = {
  encode(message: CommandUnsubscribe, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandUnsubscribe {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandUnsubscribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandUnsubscribe {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandUnsubscribe): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandUnsubscribe>, I>>(base?: I): CommandUnsubscribe {
    return CommandUnsubscribe.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandUnsubscribe>, I>>(object: I): CommandUnsubscribe {
    const message = createBaseCommandUnsubscribe();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandSeek(): CommandSeek {
  return { consumerId: Long.UZERO, requestId: Long.UZERO, messageId: undefined, messagePublishTime: Long.UZERO };
}

export const CommandSeek = {
  encode(message: CommandSeek, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(message.messageId, writer.uint32(26).fork()).ldelim();
    }
    if (!message.messagePublishTime.isZero()) {
      writer.uint32(32).uint64(message.messagePublishTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSeek {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSeek();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.messageId = MessageIdData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.messagePublishTime = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSeek {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      messageId: isSet(object.messageId) ? MessageIdData.fromJSON(object.messageId) : undefined,
      messagePublishTime: isSet(object.messagePublishTime) ? Long.fromValue(object.messagePublishTime) : Long.UZERO,
    };
  },

  toJSON(message: CommandSeek): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.messageId !== undefined) {
      obj.messageId = MessageIdData.toJSON(message.messageId);
    }
    if (!message.messagePublishTime.isZero()) {
      obj.messagePublishTime = (message.messagePublishTime || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSeek>, I>>(base?: I): CommandSeek {
    return CommandSeek.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSeek>, I>>(object: I): CommandSeek {
    const message = createBaseCommandSeek();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.messageId = (object.messageId !== undefined && object.messageId !== null)
      ? MessageIdData.fromPartial(object.messageId)
      : undefined;
    message.messagePublishTime = (object.messagePublishTime !== undefined && object.messagePublishTime !== null)
      ? Long.fromValue(object.messagePublishTime)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandReachedEndOfTopic(): CommandReachedEndOfTopic {
  return { consumerId: Long.UZERO };
}

export const CommandReachedEndOfTopic = {
  encode(message: CommandReachedEndOfTopic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandReachedEndOfTopic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandReachedEndOfTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandReachedEndOfTopic {
    return { consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO };
  },

  toJSON(message: CommandReachedEndOfTopic): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandReachedEndOfTopic>, I>>(base?: I): CommandReachedEndOfTopic {
    return CommandReachedEndOfTopic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandReachedEndOfTopic>, I>>(object: I): CommandReachedEndOfTopic {
    const message = createBaseCommandReachedEndOfTopic();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandCloseProducer(): CommandCloseProducer {
  return { producerId: Long.UZERO, requestId: Long.UZERO };
}

export const CommandCloseProducer = {
  encode(message: CommandCloseProducer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.producerId.isZero()) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandCloseProducer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandCloseProducer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.producerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandCloseProducer {
    return {
      producerId: isSet(object.producerId) ? Long.fromValue(object.producerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandCloseProducer): unknown {
    const obj: any = {};
    if (!message.producerId.isZero()) {
      obj.producerId = (message.producerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandCloseProducer>, I>>(base?: I): CommandCloseProducer {
    return CommandCloseProducer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandCloseProducer>, I>>(object: I): CommandCloseProducer {
    const message = createBaseCommandCloseProducer();
    message.producerId = (object.producerId !== undefined && object.producerId !== null)
      ? Long.fromValue(object.producerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandCloseConsumer(): CommandCloseConsumer {
  return { consumerId: Long.UZERO, requestId: Long.UZERO };
}

export const CommandCloseConsumer = {
  encode(message: CommandCloseConsumer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandCloseConsumer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandCloseConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandCloseConsumer {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandCloseConsumer): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandCloseConsumer>, I>>(base?: I): CommandCloseConsumer {
    return CommandCloseConsumer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandCloseConsumer>, I>>(object: I): CommandCloseConsumer {
    const message = createBaseCommandCloseConsumer();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandRedeliverUnacknowledgedMessages(): CommandRedeliverUnacknowledgedMessages {
  return { consumerId: Long.UZERO, messageIds: [], consumerEpoch: Long.UZERO };
}

export const CommandRedeliverUnacknowledgedMessages = {
  encode(message: CommandRedeliverUnacknowledgedMessages, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    for (const v of message.messageIds) {
      MessageIdData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.consumerEpoch.isZero()) {
      writer.uint32(24).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandRedeliverUnacknowledgedMessages {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandRedeliverUnacknowledgedMessages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.messageIds.push(MessageIdData.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.consumerEpoch = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandRedeliverUnacknowledgedMessages {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      messageIds: Array.isArray(object?.messageIds) ? object.messageIds.map((e: any) => MessageIdData.fromJSON(e)) : [],
      consumerEpoch: isSet(object.consumerEpoch) ? Long.fromValue(object.consumerEpoch) : Long.UZERO,
    };
  },

  toJSON(message: CommandRedeliverUnacknowledgedMessages): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (message.messageIds?.length) {
      obj.messageIds = message.messageIds.map((e) => MessageIdData.toJSON(e));
    }
    if (!message.consumerEpoch.isZero()) {
      obj.consumerEpoch = (message.consumerEpoch || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandRedeliverUnacknowledgedMessages>, I>>(
    base?: I,
  ): CommandRedeliverUnacknowledgedMessages {
    return CommandRedeliverUnacknowledgedMessages.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandRedeliverUnacknowledgedMessages>, I>>(
    object: I,
  ): CommandRedeliverUnacknowledgedMessages {
    const message = createBaseCommandRedeliverUnacknowledgedMessages();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.messageIds = object.messageIds?.map((e) => MessageIdData.fromPartial(e)) || [];
    message.consumerEpoch = (object.consumerEpoch !== undefined && object.consumerEpoch !== null)
      ? Long.fromValue(object.consumerEpoch)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandSuccess(): CommandSuccess {
  return { requestId: Long.UZERO, schema: undefined };
}

export const CommandSuccess = {
  encode(message: CommandSuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSuccess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandSuccess {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: CommandSuccess): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandSuccess>, I>>(base?: I): CommandSuccess {
    return CommandSuccess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandSuccess>, I>>(object: I): CommandSuccess {
    const message = createBaseCommandSuccess();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    return message;
  },
};

function createBaseCommandProducerSuccess(): CommandProducerSuccess {
  return {
    requestId: Long.UZERO,
    producerName: "",
    lastSequenceId: Long.ZERO,
    schemaVersion: new Uint8Array(0),
    topicEpoch: Long.UZERO,
    producerReady: false,
  };
}

export const CommandProducerSuccess = {
  encode(message: CommandProducerSuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.producerName !== "") {
      writer.uint32(18).string(message.producerName);
    }
    if (!message.lastSequenceId.isZero()) {
      writer.uint32(24).int64(message.lastSequenceId);
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(34).bytes(message.schemaVersion);
    }
    if (!message.topicEpoch.isZero()) {
      writer.uint32(40).uint64(message.topicEpoch);
    }
    if (message.producerReady === true) {
      writer.uint32(48).bool(message.producerReady);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandProducerSuccess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandProducerSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.producerName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lastSequenceId = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.schemaVersion = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.topicEpoch = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.producerReady = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandProducerSuccess {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      producerName: isSet(object.producerName) ? String(object.producerName) : "",
      lastSequenceId: isSet(object.lastSequenceId) ? Long.fromValue(object.lastSequenceId) : Long.ZERO,
      schemaVersion: isSet(object.schemaVersion) ? bytesFromBase64(object.schemaVersion) : new Uint8Array(0),
      topicEpoch: isSet(object.topicEpoch) ? Long.fromValue(object.topicEpoch) : Long.UZERO,
      producerReady: isSet(object.producerReady) ? Boolean(object.producerReady) : false,
    };
  },

  toJSON(message: CommandProducerSuccess): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.producerName !== "") {
      obj.producerName = message.producerName;
    }
    if (!message.lastSequenceId.isZero()) {
      obj.lastSequenceId = (message.lastSequenceId || Long.ZERO).toString();
    }
    if (message.schemaVersion.length !== 0) {
      obj.schemaVersion = base64FromBytes(message.schemaVersion);
    }
    if (!message.topicEpoch.isZero()) {
      obj.topicEpoch = (message.topicEpoch || Long.UZERO).toString();
    }
    if (message.producerReady === true) {
      obj.producerReady = message.producerReady;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandProducerSuccess>, I>>(base?: I): CommandProducerSuccess {
    return CommandProducerSuccess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandProducerSuccess>, I>>(object: I): CommandProducerSuccess {
    const message = createBaseCommandProducerSuccess();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.producerName = object.producerName ?? "";
    message.lastSequenceId = (object.lastSequenceId !== undefined && object.lastSequenceId !== null)
      ? Long.fromValue(object.lastSequenceId)
      : Long.ZERO;
    message.schemaVersion = object.schemaVersion ?? new Uint8Array(0);
    message.topicEpoch = (object.topicEpoch !== undefined && object.topicEpoch !== null)
      ? Long.fromValue(object.topicEpoch)
      : Long.UZERO;
    message.producerReady = object.producerReady ?? false;
    return message;
  },
};

function createBaseCommandError(): CommandError {
  return { requestId: Long.UZERO, error: 0, message: "" };
}

export const CommandError = {
  encode(message: CommandError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandError {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandError): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandError>, I>>(base?: I): CommandError {
    return CommandError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandError>, I>>(object: I): CommandError {
    const message = createBaseCommandError();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandPing(): CommandPing {
  return {};
}

export const CommandPing = {
  encode(_: CommandPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandPing {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CommandPing {
    return {};
  },

  toJSON(_: CommandPing): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandPing>, I>>(base?: I): CommandPing {
    return CommandPing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandPing>, I>>(_: I): CommandPing {
    const message = createBaseCommandPing();
    return message;
  },
};

function createBaseCommandPong(): CommandPong {
  return {};
}

export const CommandPong = {
  encode(_: CommandPong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandPong {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CommandPong {
    return {};
  },

  toJSON(_: CommandPong): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandPong>, I>>(base?: I): CommandPong {
    return CommandPong.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandPong>, I>>(_: I): CommandPong {
    const message = createBaseCommandPong();
    return message;
  },
};

function createBaseCommandConsumerStats(): CommandConsumerStats {
  return { requestId: Long.UZERO, consumerId: Long.UZERO };
}

export const CommandConsumerStats = {
  encode(message: CommandConsumerStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.consumerId.isZero()) {
      writer.uint32(32).uint64(message.consumerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConsumerStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConsumerStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandConsumerStats {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
    };
  },

  toJSON(message: CommandConsumerStats): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandConsumerStats>, I>>(base?: I): CommandConsumerStats {
    return CommandConsumerStats.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandConsumerStats>, I>>(object: I): CommandConsumerStats {
    const message = createBaseCommandConsumerStats();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandConsumerStatsResponse(): CommandConsumerStatsResponse {
  return {
    requestId: Long.UZERO,
    errorCode: 0,
    errorMessage: "",
    msgRateOut: 0,
    msgThroughputOut: 0,
    msgRateRedeliver: 0,
    consumerName: "",
    availablePermits: Long.UZERO,
    unackedMessages: Long.UZERO,
    blockedConsumerOnUnackedMsgs: false,
    address: "",
    connectedSince: "",
    type: "",
    msgRateExpired: 0,
    msgBacklog: Long.UZERO,
    messageAckRate: 0,
  };
}

export const CommandConsumerStatsResponse = {
  encode(message: CommandConsumerStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.errorCode !== 0) {
      writer.uint32(16).int32(message.errorCode);
    }
    if (message.errorMessage !== "") {
      writer.uint32(26).string(message.errorMessage);
    }
    if (message.msgRateOut !== 0) {
      writer.uint32(33).double(message.msgRateOut);
    }
    if (message.msgThroughputOut !== 0) {
      writer.uint32(41).double(message.msgThroughputOut);
    }
    if (message.msgRateRedeliver !== 0) {
      writer.uint32(49).double(message.msgRateRedeliver);
    }
    if (message.consumerName !== "") {
      writer.uint32(58).string(message.consumerName);
    }
    if (!message.availablePermits.isZero()) {
      writer.uint32(64).uint64(message.availablePermits);
    }
    if (!message.unackedMessages.isZero()) {
      writer.uint32(72).uint64(message.unackedMessages);
    }
    if (message.blockedConsumerOnUnackedMsgs === true) {
      writer.uint32(80).bool(message.blockedConsumerOnUnackedMsgs);
    }
    if (message.address !== "") {
      writer.uint32(90).string(message.address);
    }
    if (message.connectedSince !== "") {
      writer.uint32(98).string(message.connectedSince);
    }
    if (message.type !== "") {
      writer.uint32(106).string(message.type);
    }
    if (message.msgRateExpired !== 0) {
      writer.uint32(113).double(message.msgRateExpired);
    }
    if (!message.msgBacklog.isZero()) {
      writer.uint32(120).uint64(message.msgBacklog);
    }
    if (message.messageAckRate !== 0) {
      writer.uint32(129).double(message.messageAckRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConsumerStatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConsumerStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.errorCode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.msgRateOut = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.msgThroughputOut = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.msgRateRedeliver = reader.double();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.consumerName = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.availablePermits = reader.uint64() as Long;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.unackedMessages = reader.uint64() as Long;
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.blockedConsumerOnUnackedMsgs = reader.bool();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.address = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.connectedSince = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.type = reader.string();
          continue;
        case 14:
          if (tag !== 113) {
            break;
          }

          message.msgRateExpired = reader.double();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.msgBacklog = reader.uint64() as Long;
          continue;
        case 16:
          if (tag !== 129) {
            break;
          }

          message.messageAckRate = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandConsumerStatsResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      errorCode: isSet(object.errorCode) ? serverErrorFromJSON(object.errorCode) : 0,
      errorMessage: isSet(object.errorMessage) ? String(object.errorMessage) : "",
      msgRateOut: isSet(object.msgRateOut) ? Number(object.msgRateOut) : 0,
      msgThroughputOut: isSet(object.msgThroughputOut) ? Number(object.msgThroughputOut) : 0,
      msgRateRedeliver: isSet(object.msgRateRedeliver) ? Number(object.msgRateRedeliver) : 0,
      consumerName: isSet(object.consumerName) ? String(object.consumerName) : "",
      availablePermits: isSet(object.availablePermits) ? Long.fromValue(object.availablePermits) : Long.UZERO,
      unackedMessages: isSet(object.unackedMessages) ? Long.fromValue(object.unackedMessages) : Long.UZERO,
      blockedConsumerOnUnackedMsgs: isSet(object.blockedConsumerOnUnackedMsgs)
        ? Boolean(object.blockedConsumerOnUnackedMsgs)
        : false,
      address: isSet(object.address) ? String(object.address) : "",
      connectedSince: isSet(object.connectedSince) ? String(object.connectedSince) : "",
      type: isSet(object.type) ? String(object.type) : "",
      msgRateExpired: isSet(object.msgRateExpired) ? Number(object.msgRateExpired) : 0,
      msgBacklog: isSet(object.msgBacklog) ? Long.fromValue(object.msgBacklog) : Long.UZERO,
      messageAckRate: isSet(object.messageAckRate) ? Number(object.messageAckRate) : 0,
    };
  },

  toJSON(message: CommandConsumerStatsResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.errorCode !== 0) {
      obj.errorCode = serverErrorToJSON(message.errorCode);
    }
    if (message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.msgRateOut !== 0) {
      obj.msgRateOut = message.msgRateOut;
    }
    if (message.msgThroughputOut !== 0) {
      obj.msgThroughputOut = message.msgThroughputOut;
    }
    if (message.msgRateRedeliver !== 0) {
      obj.msgRateRedeliver = message.msgRateRedeliver;
    }
    if (message.consumerName !== "") {
      obj.consumerName = message.consumerName;
    }
    if (!message.availablePermits.isZero()) {
      obj.availablePermits = (message.availablePermits || Long.UZERO).toString();
    }
    if (!message.unackedMessages.isZero()) {
      obj.unackedMessages = (message.unackedMessages || Long.UZERO).toString();
    }
    if (message.blockedConsumerOnUnackedMsgs === true) {
      obj.blockedConsumerOnUnackedMsgs = message.blockedConsumerOnUnackedMsgs;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.connectedSince !== "") {
      obj.connectedSince = message.connectedSince;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.msgRateExpired !== 0) {
      obj.msgRateExpired = message.msgRateExpired;
    }
    if (!message.msgBacklog.isZero()) {
      obj.msgBacklog = (message.msgBacklog || Long.UZERO).toString();
    }
    if (message.messageAckRate !== 0) {
      obj.messageAckRate = message.messageAckRate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandConsumerStatsResponse>, I>>(base?: I): CommandConsumerStatsResponse {
    return CommandConsumerStatsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandConsumerStatsResponse>, I>>(object: I): CommandConsumerStatsResponse {
    const message = createBaseCommandConsumerStatsResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.msgRateOut = object.msgRateOut ?? 0;
    message.msgThroughputOut = object.msgThroughputOut ?? 0;
    message.msgRateRedeliver = object.msgRateRedeliver ?? 0;
    message.consumerName = object.consumerName ?? "";
    message.availablePermits = (object.availablePermits !== undefined && object.availablePermits !== null)
      ? Long.fromValue(object.availablePermits)
      : Long.UZERO;
    message.unackedMessages = (object.unackedMessages !== undefined && object.unackedMessages !== null)
      ? Long.fromValue(object.unackedMessages)
      : Long.UZERO;
    message.blockedConsumerOnUnackedMsgs = object.blockedConsumerOnUnackedMsgs ?? false;
    message.address = object.address ?? "";
    message.connectedSince = object.connectedSince ?? "";
    message.type = object.type ?? "";
    message.msgRateExpired = object.msgRateExpired ?? 0;
    message.msgBacklog = (object.msgBacklog !== undefined && object.msgBacklog !== null)
      ? Long.fromValue(object.msgBacklog)
      : Long.UZERO;
    message.messageAckRate = object.messageAckRate ?? 0;
    return message;
  },
};

function createBaseCommandGetLastMessageId(): CommandGetLastMessageId {
  return { consumerId: Long.UZERO, requestId: Long.UZERO };
}

export const CommandGetLastMessageId = {
  encode(message: CommandGetLastMessageId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.consumerId.isZero()) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetLastMessageId {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetLastMessageId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.consumerId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetLastMessageId {
    return {
      consumerId: isSet(object.consumerId) ? Long.fromValue(object.consumerId) : Long.UZERO,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
    };
  },

  toJSON(message: CommandGetLastMessageId): unknown {
    const obj: any = {};
    if (!message.consumerId.isZero()) {
      obj.consumerId = (message.consumerId || Long.UZERO).toString();
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetLastMessageId>, I>>(base?: I): CommandGetLastMessageId {
    return CommandGetLastMessageId.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetLastMessageId>, I>>(object: I): CommandGetLastMessageId {
    const message = createBaseCommandGetLastMessageId();
    message.consumerId = (object.consumerId !== undefined && object.consumerId !== null)
      ? Long.fromValue(object.consumerId)
      : Long.UZERO;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandGetLastMessageIdResponse(): CommandGetLastMessageIdResponse {
  return { lastMessageId: undefined, requestId: Long.UZERO, consumerMarkDeletePosition: undefined };
}

export const CommandGetLastMessageIdResponse = {
  encode(message: CommandGetLastMessageIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastMessageId !== undefined) {
      MessageIdData.encode(message.lastMessageId, writer.uint32(10).fork()).ldelim();
    }
    if (!message.requestId.isZero()) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.consumerMarkDeletePosition !== undefined) {
      MessageIdData.encode(message.consumerMarkDeletePosition, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetLastMessageIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetLastMessageIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lastMessageId = MessageIdData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.consumerMarkDeletePosition = MessageIdData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetLastMessageIdResponse {
    return {
      lastMessageId: isSet(object.lastMessageId) ? MessageIdData.fromJSON(object.lastMessageId) : undefined,
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      consumerMarkDeletePosition: isSet(object.consumerMarkDeletePosition)
        ? MessageIdData.fromJSON(object.consumerMarkDeletePosition)
        : undefined,
    };
  },

  toJSON(message: CommandGetLastMessageIdResponse): unknown {
    const obj: any = {};
    if (message.lastMessageId !== undefined) {
      obj.lastMessageId = MessageIdData.toJSON(message.lastMessageId);
    }
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.consumerMarkDeletePosition !== undefined) {
      obj.consumerMarkDeletePosition = MessageIdData.toJSON(message.consumerMarkDeletePosition);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetLastMessageIdResponse>, I>>(base?: I): CommandGetLastMessageIdResponse {
    return CommandGetLastMessageIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetLastMessageIdResponse>, I>>(
    object: I,
  ): CommandGetLastMessageIdResponse {
    const message = createBaseCommandGetLastMessageIdResponse();
    message.lastMessageId = (object.lastMessageId !== undefined && object.lastMessageId !== null)
      ? MessageIdData.fromPartial(object.lastMessageId)
      : undefined;
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.consumerMarkDeletePosition =
      (object.consumerMarkDeletePosition !== undefined && object.consumerMarkDeletePosition !== null)
        ? MessageIdData.fromPartial(object.consumerMarkDeletePosition)
        : undefined;
    return message;
  },
};

function createBaseCommandGetTopicsOfNamespace(): CommandGetTopicsOfNamespace {
  return { requestId: Long.UZERO, namespace: "", mode: 0, topicsPattern: "", topicsHash: "" };
}

export const CommandGetTopicsOfNamespace = {
  encode(message: CommandGetTopicsOfNamespace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.namespace !== "") {
      writer.uint32(18).string(message.namespace);
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.topicsPattern !== "") {
      writer.uint32(34).string(message.topicsPattern);
    }
    if (message.topicsHash !== "") {
      writer.uint32(42).string(message.topicsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetTopicsOfNamespace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetTopicsOfNamespace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.namespace = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topicsPattern = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.topicsHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetTopicsOfNamespace {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      mode: isSet(object.mode) ? commandGetTopicsOfNamespace_ModeFromJSON(object.mode) : 0,
      topicsPattern: isSet(object.topicsPattern) ? String(object.topicsPattern) : "",
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandGetTopicsOfNamespace): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.namespace !== "") {
      obj.namespace = message.namespace;
    }
    if (message.mode !== 0) {
      obj.mode = commandGetTopicsOfNamespace_ModeToJSON(message.mode);
    }
    if (message.topicsPattern !== "") {
      obj.topicsPattern = message.topicsPattern;
    }
    if (message.topicsHash !== "") {
      obj.topicsHash = message.topicsHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetTopicsOfNamespace>, I>>(base?: I): CommandGetTopicsOfNamespace {
    return CommandGetTopicsOfNamespace.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetTopicsOfNamespace>, I>>(object: I): CommandGetTopicsOfNamespace {
    const message = createBaseCommandGetTopicsOfNamespace();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.namespace = object.namespace ?? "";
    message.mode = object.mode ?? 0;
    message.topicsPattern = object.topicsPattern ?? "";
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandGetTopicsOfNamespaceResponse(): CommandGetTopicsOfNamespaceResponse {
  return { requestId: Long.UZERO, topics: [], filtered: false, topicsHash: "", changed: false };
}

export const CommandGetTopicsOfNamespaceResponse = {
  encode(message: CommandGetTopicsOfNamespaceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    for (const v of message.topics) {
      writer.uint32(18).string(v!);
    }
    if (message.filtered === true) {
      writer.uint32(24).bool(message.filtered);
    }
    if (message.topicsHash !== "") {
      writer.uint32(34).string(message.topicsHash);
    }
    if (message.changed === true) {
      writer.uint32(40).bool(message.changed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetTopicsOfNamespaceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetTopicsOfNamespaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.filtered = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topicsHash = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.changed = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetTopicsOfNamespaceResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      topics: Array.isArray(object?.topics) ? object.topics.map((e: any) => String(e)) : [],
      filtered: isSet(object.filtered) ? Boolean(object.filtered) : false,
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
      changed: isSet(object.changed) ? Boolean(object.changed) : false,
    };
  },

  toJSON(message: CommandGetTopicsOfNamespaceResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.filtered === true) {
      obj.filtered = message.filtered;
    }
    if (message.topicsHash !== "") {
      obj.topicsHash = message.topicsHash;
    }
    if (message.changed === true) {
      obj.changed = message.changed;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetTopicsOfNamespaceResponse>, I>>(
    base?: I,
  ): CommandGetTopicsOfNamespaceResponse {
    return CommandGetTopicsOfNamespaceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetTopicsOfNamespaceResponse>, I>>(
    object: I,
  ): CommandGetTopicsOfNamespaceResponse {
    const message = createBaseCommandGetTopicsOfNamespaceResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.topics = object.topics?.map((e) => e) || [];
    message.filtered = object.filtered ?? false;
    message.topicsHash = object.topicsHash ?? "";
    message.changed = object.changed ?? false;
    return message;
  },
};

function createBaseCommandWatchTopicList(): CommandWatchTopicList {
  return { requestId: Long.UZERO, watcherId: Long.UZERO, namespace: "", topicsPattern: "", topicsHash: "" };
}

export const CommandWatchTopicList = {
  encode(message: CommandWatchTopicList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.watcherId.isZero()) {
      writer.uint32(16).uint64(message.watcherId);
    }
    if (message.namespace !== "") {
      writer.uint32(26).string(message.namespace);
    }
    if (message.topicsPattern !== "") {
      writer.uint32(34).string(message.topicsPattern);
    }
    if (message.topicsHash !== "") {
      writer.uint32(42).string(message.topicsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandWatchTopicList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.watcherId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.namespace = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topicsPattern = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.topicsHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicList {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      watcherId: isSet(object.watcherId) ? Long.fromValue(object.watcherId) : Long.UZERO,
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      topicsPattern: isSet(object.topicsPattern) ? String(object.topicsPattern) : "",
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicList): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.watcherId.isZero()) {
      obj.watcherId = (message.watcherId || Long.UZERO).toString();
    }
    if (message.namespace !== "") {
      obj.namespace = message.namespace;
    }
    if (message.topicsPattern !== "") {
      obj.topicsPattern = message.topicsPattern;
    }
    if (message.topicsHash !== "") {
      obj.topicsHash = message.topicsHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandWatchTopicList>, I>>(base?: I): CommandWatchTopicList {
    return CommandWatchTopicList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicList>, I>>(object: I): CommandWatchTopicList {
    const message = createBaseCommandWatchTopicList();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.watcherId = (object.watcherId !== undefined && object.watcherId !== null)
      ? Long.fromValue(object.watcherId)
      : Long.UZERO;
    message.namespace = object.namespace ?? "";
    message.topicsPattern = object.topicsPattern ?? "";
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicListSuccess(): CommandWatchTopicListSuccess {
  return { requestId: Long.UZERO, watcherId: Long.UZERO, topic: [], topicsHash: "" };
}

export const CommandWatchTopicListSuccess = {
  encode(message: CommandWatchTopicListSuccess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.watcherId.isZero()) {
      writer.uint32(16).uint64(message.watcherId);
    }
    for (const v of message.topic) {
      writer.uint32(26).string(v!);
    }
    if (message.topicsHash !== "") {
      writer.uint32(34).string(message.topicsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandWatchTopicListSuccess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicListSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.watcherId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topic.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topicsHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicListSuccess {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      watcherId: isSet(object.watcherId) ? Long.fromValue(object.watcherId) : Long.UZERO,
      topic: Array.isArray(object?.topic) ? object.topic.map((e: any) => String(e)) : [],
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicListSuccess): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.watcherId.isZero()) {
      obj.watcherId = (message.watcherId || Long.UZERO).toString();
    }
    if (message.topic?.length) {
      obj.topic = message.topic;
    }
    if (message.topicsHash !== "") {
      obj.topicsHash = message.topicsHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandWatchTopicListSuccess>, I>>(base?: I): CommandWatchTopicListSuccess {
    return CommandWatchTopicListSuccess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicListSuccess>, I>>(object: I): CommandWatchTopicListSuccess {
    const message = createBaseCommandWatchTopicListSuccess();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.watcherId = (object.watcherId !== undefined && object.watcherId !== null)
      ? Long.fromValue(object.watcherId)
      : Long.UZERO;
    message.topic = object.topic?.map((e) => e) || [];
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicUpdate(): CommandWatchTopicUpdate {
  return { watcherId: Long.UZERO, newTopics: [], deletedTopics: [], topicsHash: "" };
}

export const CommandWatchTopicUpdate = {
  encode(message: CommandWatchTopicUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.watcherId.isZero()) {
      writer.uint32(8).uint64(message.watcherId);
    }
    for (const v of message.newTopics) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.deletedTopics) {
      writer.uint32(26).string(v!);
    }
    if (message.topicsHash !== "") {
      writer.uint32(34).string(message.topicsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandWatchTopicUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.watcherId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.newTopics.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deletedTopics.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topicsHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicUpdate {
    return {
      watcherId: isSet(object.watcherId) ? Long.fromValue(object.watcherId) : Long.UZERO,
      newTopics: Array.isArray(object?.newTopics) ? object.newTopics.map((e: any) => String(e)) : [],
      deletedTopics: Array.isArray(object?.deletedTopics) ? object.deletedTopics.map((e: any) => String(e)) : [],
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicUpdate): unknown {
    const obj: any = {};
    if (!message.watcherId.isZero()) {
      obj.watcherId = (message.watcherId || Long.UZERO).toString();
    }
    if (message.newTopics?.length) {
      obj.newTopics = message.newTopics;
    }
    if (message.deletedTopics?.length) {
      obj.deletedTopics = message.deletedTopics;
    }
    if (message.topicsHash !== "") {
      obj.topicsHash = message.topicsHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandWatchTopicUpdate>, I>>(base?: I): CommandWatchTopicUpdate {
    return CommandWatchTopicUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicUpdate>, I>>(object: I): CommandWatchTopicUpdate {
    const message = createBaseCommandWatchTopicUpdate();
    message.watcherId = (object.watcherId !== undefined && object.watcherId !== null)
      ? Long.fromValue(object.watcherId)
      : Long.UZERO;
    message.newTopics = object.newTopics?.map((e) => e) || [];
    message.deletedTopics = object.deletedTopics?.map((e) => e) || [];
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicListClose(): CommandWatchTopicListClose {
  return { requestId: Long.UZERO, watcherId: Long.UZERO };
}

export const CommandWatchTopicListClose = {
  encode(message: CommandWatchTopicListClose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.watcherId.isZero()) {
      writer.uint32(16).uint64(message.watcherId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandWatchTopicListClose {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicListClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.watcherId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicListClose {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      watcherId: isSet(object.watcherId) ? Long.fromValue(object.watcherId) : Long.UZERO,
    };
  },

  toJSON(message: CommandWatchTopicListClose): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.watcherId.isZero()) {
      obj.watcherId = (message.watcherId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandWatchTopicListClose>, I>>(base?: I): CommandWatchTopicListClose {
    return CommandWatchTopicListClose.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicListClose>, I>>(object: I): CommandWatchTopicListClose {
    const message = createBaseCommandWatchTopicListClose();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.watcherId = (object.watcherId !== undefined && object.watcherId !== null)
      ? Long.fromValue(object.watcherId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCommandGetSchema(): CommandGetSchema {
  return { requestId: Long.UZERO, topic: "", schemaVersion: new Uint8Array(0) };
}

export const CommandGetSchema = {
  encode(message: CommandGetSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.topic !== "") {
      writer.uint32(18).string(message.topic);
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(26).bytes(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.schemaVersion = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetSchema {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      topic: isSet(object.topic) ? String(object.topic) : "",
      schemaVersion: isSet(object.schemaVersion) ? bytesFromBase64(object.schemaVersion) : new Uint8Array(0),
    };
  },

  toJSON(message: CommandGetSchema): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.schemaVersion.length !== 0) {
      obj.schemaVersion = base64FromBytes(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetSchema>, I>>(base?: I): CommandGetSchema {
    return CommandGetSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetSchema>, I>>(object: I): CommandGetSchema {
    const message = createBaseCommandGetSchema();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.topic = object.topic ?? "";
    message.schemaVersion = object.schemaVersion ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommandGetSchemaResponse(): CommandGetSchemaResponse {
  return { requestId: Long.UZERO, errorCode: 0, errorMessage: "", schema: undefined, schemaVersion: new Uint8Array(0) };
}

export const CommandGetSchemaResponse = {
  encode(message: CommandGetSchemaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.errorCode !== 0) {
      writer.uint32(16).int32(message.errorCode);
    }
    if (message.errorMessage !== "") {
      writer.uint32(26).string(message.errorMessage);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(34).fork()).ldelim();
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(42).bytes(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.errorCode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.schemaVersion = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetSchemaResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      errorCode: isSet(object.errorCode) ? serverErrorFromJSON(object.errorCode) : 0,
      errorMessage: isSet(object.errorMessage) ? String(object.errorMessage) : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      schemaVersion: isSet(object.schemaVersion) ? bytesFromBase64(object.schemaVersion) : new Uint8Array(0),
    };
  },

  toJSON(message: CommandGetSchemaResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.errorCode !== 0) {
      obj.errorCode = serverErrorToJSON(message.errorCode);
    }
    if (message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    if (message.schemaVersion.length !== 0) {
      obj.schemaVersion = base64FromBytes(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetSchemaResponse>, I>>(base?: I): CommandGetSchemaResponse {
    return CommandGetSchemaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetSchemaResponse>, I>>(object: I): CommandGetSchemaResponse {
    const message = createBaseCommandGetSchemaResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    message.schemaVersion = object.schemaVersion ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommandGetOrCreateSchema(): CommandGetOrCreateSchema {
  return { requestId: Long.UZERO, topic: "", schema: undefined };
}

export const CommandGetOrCreateSchema = {
  encode(message: CommandGetOrCreateSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.topic !== "") {
      writer.uint32(18).string(message.topic);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetOrCreateSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetOrCreateSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.schema = Schema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetOrCreateSchema {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      topic: isSet(object.topic) ? String(object.topic) : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: CommandGetOrCreateSchema): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.schema !== undefined) {
      obj.schema = Schema.toJSON(message.schema);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetOrCreateSchema>, I>>(base?: I): CommandGetOrCreateSchema {
    return CommandGetOrCreateSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetOrCreateSchema>, I>>(object: I): CommandGetOrCreateSchema {
    const message = createBaseCommandGetOrCreateSchema();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.topic = object.topic ?? "";
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? Schema.fromPartial(object.schema)
      : undefined;
    return message;
  },
};

function createBaseCommandGetOrCreateSchemaResponse(): CommandGetOrCreateSchemaResponse {
  return { requestId: Long.UZERO, errorCode: 0, errorMessage: "", schemaVersion: new Uint8Array(0) };
}

export const CommandGetOrCreateSchemaResponse = {
  encode(message: CommandGetOrCreateSchemaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.errorCode !== 0) {
      writer.uint32(16).int32(message.errorCode);
    }
    if (message.errorMessage !== "") {
      writer.uint32(26).string(message.errorMessage);
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(34).bytes(message.schemaVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandGetOrCreateSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetOrCreateSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.errorCode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.schemaVersion = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandGetOrCreateSchemaResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      errorCode: isSet(object.errorCode) ? serverErrorFromJSON(object.errorCode) : 0,
      errorMessage: isSet(object.errorMessage) ? String(object.errorMessage) : "",
      schemaVersion: isSet(object.schemaVersion) ? bytesFromBase64(object.schemaVersion) : new Uint8Array(0),
    };
  },

  toJSON(message: CommandGetOrCreateSchemaResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.errorCode !== 0) {
      obj.errorCode = serverErrorToJSON(message.errorCode);
    }
    if (message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.schemaVersion.length !== 0) {
      obj.schemaVersion = base64FromBytes(message.schemaVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandGetOrCreateSchemaResponse>, I>>(
    base?: I,
  ): CommandGetOrCreateSchemaResponse {
    return CommandGetOrCreateSchemaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandGetOrCreateSchemaResponse>, I>>(
    object: I,
  ): CommandGetOrCreateSchemaResponse {
    const message = createBaseCommandGetOrCreateSchemaResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.schemaVersion = object.schemaVersion ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommandTcClientConnectRequest(): CommandTcClientConnectRequest {
  return { requestId: Long.UZERO, tcId: Long.UZERO };
}

export const CommandTcClientConnectRequest = {
  encode(message: CommandTcClientConnectRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.tcId.isZero()) {
      writer.uint32(16).uint64(message.tcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandTcClientConnectRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandTcClientConnectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.tcId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandTcClientConnectRequest {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      tcId: isSet(object.tcId) ? Long.fromValue(object.tcId) : Long.UZERO,
    };
  },

  toJSON(message: CommandTcClientConnectRequest): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.tcId.isZero()) {
      obj.tcId = (message.tcId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandTcClientConnectRequest>, I>>(base?: I): CommandTcClientConnectRequest {
    return CommandTcClientConnectRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandTcClientConnectRequest>, I>>(
    object: I,
  ): CommandTcClientConnectRequest {
    const message = createBaseCommandTcClientConnectRequest();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.tcId = (object.tcId !== undefined && object.tcId !== null) ? Long.fromValue(object.tcId) : Long.UZERO;
    return message;
  },
};

function createBaseCommandTcClientConnectResponse(): CommandTcClientConnectResponse {
  return { requestId: Long.UZERO, error: 0, message: "" };
}

export const CommandTcClientConnectResponse = {
  encode(message: CommandTcClientConnectResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.error !== 0) {
      writer.uint32(16).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandTcClientConnectResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandTcClientConnectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandTcClientConnectResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandTcClientConnectResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandTcClientConnectResponse>, I>>(base?: I): CommandTcClientConnectResponse {
    return CommandTcClientConnectResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandTcClientConnectResponse>, I>>(
    object: I,
  ): CommandTcClientConnectResponse {
    const message = createBaseCommandTcClientConnectResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandNewTxn(): CommandNewTxn {
  return { requestId: Long.UZERO, txnTtlSeconds: Long.UZERO, tcId: Long.UZERO };
}

export const CommandNewTxn = {
  encode(message: CommandNewTxn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnTtlSeconds.isZero()) {
      writer.uint32(16).uint64(message.txnTtlSeconds);
    }
    if (!message.tcId.isZero()) {
      writer.uint32(24).uint64(message.tcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandNewTxn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandNewTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnTtlSeconds = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.tcId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandNewTxn {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnTtlSeconds: isSet(object.txnTtlSeconds) ? Long.fromValue(object.txnTtlSeconds) : Long.UZERO,
      tcId: isSet(object.tcId) ? Long.fromValue(object.tcId) : Long.UZERO,
    };
  },

  toJSON(message: CommandNewTxn): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnTtlSeconds.isZero()) {
      obj.txnTtlSeconds = (message.txnTtlSeconds || Long.UZERO).toString();
    }
    if (!message.tcId.isZero()) {
      obj.tcId = (message.tcId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandNewTxn>, I>>(base?: I): CommandNewTxn {
    return CommandNewTxn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandNewTxn>, I>>(object: I): CommandNewTxn {
    const message = createBaseCommandNewTxn();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnTtlSeconds = (object.txnTtlSeconds !== undefined && object.txnTtlSeconds !== null)
      ? Long.fromValue(object.txnTtlSeconds)
      : Long.UZERO;
    message.tcId = (object.tcId !== undefined && object.tcId !== null) ? Long.fromValue(object.tcId) : Long.UZERO;
    return message;
  },
};

function createBaseCommandNewTxnResponse(): CommandNewTxnResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandNewTxnResponse = {
  encode(message: CommandNewTxnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandNewTxnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandNewTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandNewTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandNewTxnResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandNewTxnResponse>, I>>(base?: I): CommandNewTxnResponse {
    return CommandNewTxnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandNewTxnResponse>, I>>(object: I): CommandNewTxnResponse {
    const message = createBaseCommandNewTxnResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandAddPartitionToTxn(): CommandAddPartitionToTxn {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, partitions: [] };
}

export const CommandAddPartitionToTxn = {
  encode(message: CommandAddPartitionToTxn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    for (const v of message.partitions) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAddPartitionToTxn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddPartitionToTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.partitions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAddPartitionToTxn {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      partitions: Array.isArray(object?.partitions) ? object.partitions.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: CommandAddPartitionToTxn): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.partitions?.length) {
      obj.partitions = message.partitions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAddPartitionToTxn>, I>>(base?: I): CommandAddPartitionToTxn {
    return CommandAddPartitionToTxn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAddPartitionToTxn>, I>>(object: I): CommandAddPartitionToTxn {
    const message = createBaseCommandAddPartitionToTxn();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.partitions = object.partitions?.map((e) => e) || [];
    return message;
  },
};

function createBaseCommandAddPartitionToTxnResponse(): CommandAddPartitionToTxnResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandAddPartitionToTxnResponse = {
  encode(message: CommandAddPartitionToTxnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAddPartitionToTxnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddPartitionToTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAddPartitionToTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandAddPartitionToTxnResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAddPartitionToTxnResponse>, I>>(
    base?: I,
  ): CommandAddPartitionToTxnResponse {
    return CommandAddPartitionToTxnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAddPartitionToTxnResponse>, I>>(
    object: I,
  ): CommandAddPartitionToTxnResponse {
    const message = createBaseCommandAddPartitionToTxnResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSubscription(): Subscription {
  return { topic: "", subscription: "" };
}

export const Subscription = {
  encode(message: Subscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.subscription !== "") {
      writer.uint32(18).string(message.subscription);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Subscription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subscription = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Subscription {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      subscription: isSet(object.subscription) ? String(object.subscription) : "",
    };
  },

  toJSON(message: Subscription): unknown {
    const obj: any = {};
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.subscription !== "") {
      obj.subscription = message.subscription;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Subscription>, I>>(base?: I): Subscription {
    return Subscription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Subscription>, I>>(object: I): Subscription {
    const message = createBaseSubscription();
    message.topic = object.topic ?? "";
    message.subscription = object.subscription ?? "";
    return message;
  },
};

function createBaseCommandAddSubscriptionToTxn(): CommandAddSubscriptionToTxn {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, subscription: [] };
}

export const CommandAddSubscriptionToTxn = {
  encode(message: CommandAddSubscriptionToTxn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    for (const v of message.subscription) {
      Subscription.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAddSubscriptionToTxn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddSubscriptionToTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.subscription.push(Subscription.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAddSubscriptionToTxn {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      subscription: Array.isArray(object?.subscription)
        ? object.subscription.map((e: any) => Subscription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommandAddSubscriptionToTxn): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.subscription?.length) {
      obj.subscription = message.subscription.map((e) => Subscription.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAddSubscriptionToTxn>, I>>(base?: I): CommandAddSubscriptionToTxn {
    return CommandAddSubscriptionToTxn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAddSubscriptionToTxn>, I>>(object: I): CommandAddSubscriptionToTxn {
    const message = createBaseCommandAddSubscriptionToTxn();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.subscription = object.subscription?.map((e) => Subscription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommandAddSubscriptionToTxnResponse(): CommandAddSubscriptionToTxnResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandAddSubscriptionToTxnResponse = {
  encode(message: CommandAddSubscriptionToTxnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAddSubscriptionToTxnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddSubscriptionToTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandAddSubscriptionToTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandAddSubscriptionToTxnResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandAddSubscriptionToTxnResponse>, I>>(
    base?: I,
  ): CommandAddSubscriptionToTxnResponse {
    return CommandAddSubscriptionToTxnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandAddSubscriptionToTxnResponse>, I>>(
    object: I,
  ): CommandAddSubscriptionToTxnResponse {
    const message = createBaseCommandAddSubscriptionToTxnResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxn(): CommandEndTxn {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, txnAction: 0 };
}

export const CommandEndTxn = {
  encode(message: CommandEndTxn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.txnAction !== 0) {
      writer.uint32(32).int32(message.txnAction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.txnAction = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxn {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      txnAction: isSet(object.txnAction) ? txnActionFromJSON(object.txnAction) : 0,
    };
  },

  toJSON(message: CommandEndTxn): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.txnAction !== 0) {
      obj.txnAction = txnActionToJSON(message.txnAction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxn>, I>>(base?: I): CommandEndTxn {
    return CommandEndTxn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxn>, I>>(object: I): CommandEndTxn {
    const message = createBaseCommandEndTxn();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.txnAction = object.txnAction ?? 0;
    return message;
  },
};

function createBaseCommandEndTxnResponse(): CommandEndTxnResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandEndTxnResponse = {
  encode(message: CommandEndTxnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxnResponse>, I>>(base?: I): CommandEndTxnResponse {
    return CommandEndTxnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxnResponse>, I>>(object: I): CommandEndTxnResponse {
    const message = createBaseCommandEndTxnResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxnOnPartition(): CommandEndTxnOnPartition {
  return {
    requestId: Long.UZERO,
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    topic: "",
    txnAction: 0,
    txnidLeastBitsOfLowWatermark: Long.UZERO,
  };
}

export const CommandEndTxnOnPartition = {
  encode(message: CommandEndTxnOnPartition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.topic !== "") {
      writer.uint32(34).string(message.topic);
    }
    if (message.txnAction !== 0) {
      writer.uint32(40).int32(message.txnAction);
    }
    if (!message.txnidLeastBitsOfLowWatermark.isZero()) {
      writer.uint32(48).uint64(message.txnidLeastBitsOfLowWatermark);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxnOnPartition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnPartition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.txnAction = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.txnidLeastBitsOfLowWatermark = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnPartition {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      topic: isSet(object.topic) ? String(object.topic) : "",
      txnAction: isSet(object.txnAction) ? txnActionFromJSON(object.txnAction) : 0,
      txnidLeastBitsOfLowWatermark: isSet(object.txnidLeastBitsOfLowWatermark)
        ? Long.fromValue(object.txnidLeastBitsOfLowWatermark)
        : Long.UZERO,
    };
  },

  toJSON(message: CommandEndTxnOnPartition): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.txnAction !== 0) {
      obj.txnAction = txnActionToJSON(message.txnAction);
    }
    if (!message.txnidLeastBitsOfLowWatermark.isZero()) {
      obj.txnidLeastBitsOfLowWatermark = (message.txnidLeastBitsOfLowWatermark || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxnOnPartition>, I>>(base?: I): CommandEndTxnOnPartition {
    return CommandEndTxnOnPartition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnPartition>, I>>(object: I): CommandEndTxnOnPartition {
    const message = createBaseCommandEndTxnOnPartition();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.topic = object.topic ?? "";
    message.txnAction = object.txnAction ?? 0;
    message.txnidLeastBitsOfLowWatermark =
      (object.txnidLeastBitsOfLowWatermark !== undefined && object.txnidLeastBitsOfLowWatermark !== null)
        ? Long.fromValue(object.txnidLeastBitsOfLowWatermark)
        : Long.UZERO;
    return message;
  },
};

function createBaseCommandEndTxnOnPartitionResponse(): CommandEndTxnOnPartitionResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandEndTxnOnPartitionResponse = {
  encode(message: CommandEndTxnOnPartitionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxnOnPartitionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnPartitionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnPartitionResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnOnPartitionResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxnOnPartitionResponse>, I>>(
    base?: I,
  ): CommandEndTxnOnPartitionResponse {
    return CommandEndTxnOnPartitionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnPartitionResponse>, I>>(
    object: I,
  ): CommandEndTxnOnPartitionResponse {
    const message = createBaseCommandEndTxnOnPartitionResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxnOnSubscription(): CommandEndTxnOnSubscription {
  return {
    requestId: Long.UZERO,
    txnidLeastBits: Long.UZERO,
    txnidMostBits: Long.UZERO,
    subscription: undefined,
    txnAction: 0,
    txnidLeastBitsOfLowWatermark: Long.UZERO,
  };
}

export const CommandEndTxnOnSubscription = {
  encode(message: CommandEndTxnOnSubscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.subscription !== undefined) {
      Subscription.encode(message.subscription, writer.uint32(34).fork()).ldelim();
    }
    if (message.txnAction !== 0) {
      writer.uint32(40).int32(message.txnAction);
    }
    if (!message.txnidLeastBitsOfLowWatermark.isZero()) {
      writer.uint32(48).uint64(message.txnidLeastBitsOfLowWatermark);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxnOnSubscription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.subscription = Subscription.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.txnAction = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.txnidLeastBitsOfLowWatermark = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnSubscription {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      subscription: isSet(object.subscription) ? Subscription.fromJSON(object.subscription) : undefined,
      txnAction: isSet(object.txnAction) ? txnActionFromJSON(object.txnAction) : 0,
      txnidLeastBitsOfLowWatermark: isSet(object.txnidLeastBitsOfLowWatermark)
        ? Long.fromValue(object.txnidLeastBitsOfLowWatermark)
        : Long.UZERO,
    };
  },

  toJSON(message: CommandEndTxnOnSubscription): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.subscription !== undefined) {
      obj.subscription = Subscription.toJSON(message.subscription);
    }
    if (message.txnAction !== 0) {
      obj.txnAction = txnActionToJSON(message.txnAction);
    }
    if (!message.txnidLeastBitsOfLowWatermark.isZero()) {
      obj.txnidLeastBitsOfLowWatermark = (message.txnidLeastBitsOfLowWatermark || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxnOnSubscription>, I>>(base?: I): CommandEndTxnOnSubscription {
    return CommandEndTxnOnSubscription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnSubscription>, I>>(object: I): CommandEndTxnOnSubscription {
    const message = createBaseCommandEndTxnOnSubscription();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.subscription = (object.subscription !== undefined && object.subscription !== null)
      ? Subscription.fromPartial(object.subscription)
      : undefined;
    message.txnAction = object.txnAction ?? 0;
    message.txnidLeastBitsOfLowWatermark =
      (object.txnidLeastBitsOfLowWatermark !== undefined && object.txnidLeastBitsOfLowWatermark !== null)
        ? Long.fromValue(object.txnidLeastBitsOfLowWatermark)
        : Long.UZERO;
    return message;
  },
};

function createBaseCommandEndTxnOnSubscriptionResponse(): CommandEndTxnOnSubscriptionResponse {
  return { requestId: Long.UZERO, txnidLeastBits: Long.UZERO, txnidMostBits: Long.UZERO, error: 0, message: "" };
}

export const CommandEndTxnOnSubscriptionResponse = {
  encode(message: CommandEndTxnOnSubscriptionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.requestId.isZero()) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (!message.txnidLeastBits.isZero()) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (!message.txnidMostBits.isZero()) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxnOnSubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requestId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.txnidLeastBits = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.txnidMostBits = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.error = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnSubscriptionResponse {
    return {
      requestId: isSet(object.requestId) ? Long.fromValue(object.requestId) : Long.UZERO,
      txnidLeastBits: isSet(object.txnidLeastBits) ? Long.fromValue(object.txnidLeastBits) : Long.UZERO,
      txnidMostBits: isSet(object.txnidMostBits) ? Long.fromValue(object.txnidMostBits) : Long.UZERO,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnOnSubscriptionResponse): unknown {
    const obj: any = {};
    if (!message.requestId.isZero()) {
      obj.requestId = (message.requestId || Long.UZERO).toString();
    }
    if (!message.txnidLeastBits.isZero()) {
      obj.txnidLeastBits = (message.txnidLeastBits || Long.UZERO).toString();
    }
    if (!message.txnidMostBits.isZero()) {
      obj.txnidMostBits = (message.txnidMostBits || Long.UZERO).toString();
    }
    if (message.error !== 0) {
      obj.error = serverErrorToJSON(message.error);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommandEndTxnOnSubscriptionResponse>, I>>(
    base?: I,
  ): CommandEndTxnOnSubscriptionResponse {
    return CommandEndTxnOnSubscriptionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnSubscriptionResponse>, I>>(
    object: I,
  ): CommandEndTxnOnSubscriptionResponse {
    const message = createBaseCommandEndTxnOnSubscriptionResponse();
    message.requestId = (object.requestId !== undefined && object.requestId !== null)
      ? Long.fromValue(object.requestId)
      : Long.UZERO;
    message.txnidLeastBits = (object.txnidLeastBits !== undefined && object.txnidLeastBits !== null)
      ? Long.fromValue(object.txnidLeastBits)
      : Long.UZERO;
    message.txnidMostBits = (object.txnidMostBits !== undefined && object.txnidMostBits !== null)
      ? Long.fromValue(object.txnidMostBits)
      : Long.UZERO;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseBaseCommand(): BaseCommand {
  return {
    type: 2,
    connect: undefined,
    connected: undefined,
    subscribe: undefined,
    producer: undefined,
    send: undefined,
    sendReceipt: undefined,
    sendError: undefined,
    message: undefined,
    ack: undefined,
    flow: undefined,
    unsubscribe: undefined,
    success: undefined,
    error: undefined,
    closeProducer: undefined,
    closeConsumer: undefined,
    producerSuccess: undefined,
    ping: undefined,
    pong: undefined,
    redeliverUnacknowledgedMessages: undefined,
    partitionMetadata: undefined,
    partitionMetadataResponse: undefined,
    lookupTopic: undefined,
    lookupTopicResponse: undefined,
    consumerStats: undefined,
    consumerStatsResponse: undefined,
    reachedEndOfTopic: undefined,
    seek: undefined,
    getLastMessageId: undefined,
    getLastMessageIdResponse: undefined,
    activeConsumerChange: undefined,
    getTopicsOfNamespace: undefined,
    getTopicsOfNamespaceResponse: undefined,
    getSchema: undefined,
    getSchemaResponse: undefined,
    authChallenge: undefined,
    authResponse: undefined,
    ackResponse: undefined,
    getOrCreateSchema: undefined,
    getOrCreateSchemaResponse: undefined,
    newTxn: undefined,
    newTxnResponse: undefined,
    addPartitionToTxn: undefined,
    addPartitionToTxnResponse: undefined,
    addSubscriptionToTxn: undefined,
    addSubscriptionToTxnResponse: undefined,
    endTxn: undefined,
    endTxnResponse: undefined,
    endTxnOnPartition: undefined,
    endTxnOnPartitionResponse: undefined,
    endTxnOnSubscription: undefined,
    endTxnOnSubscriptionResponse: undefined,
    tcClientConnectRequest: undefined,
    tcClientConnectResponse: undefined,
    watchTopicList: undefined,
    watchTopicListSuccess: undefined,
    watchTopicUpdate: undefined,
    watchTopicListClose: undefined,
  };
}

export const BaseCommand = {
  encode(message: BaseCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    // if (message.type !== 2) {
      writer.uint32(8).int32(message.type);
    // }
    if (message.connect !== undefined) {
      CommandConnect.encode(message.connect, writer.uint32(18).fork()).ldelim();
    }
    if (message.connected !== undefined) {
      CommandConnected.encode(message.connected, writer.uint32(26).fork()).ldelim();
    }
    if (message.subscribe !== undefined) {
      CommandSubscribe.encode(message.subscribe, writer.uint32(34).fork()).ldelim();
    }
    if (message.producer !== undefined) {
      CommandProducer.encode(message.producer, writer.uint32(42).fork()).ldelim();
    }
    if (message.send !== undefined) {
      CommandSend.encode(message.send, writer.uint32(50).fork()).ldelim();
    }
    if (message.sendReceipt !== undefined) {
      CommandSendReceipt.encode(message.sendReceipt, writer.uint32(58).fork()).ldelim();
    }
    if (message.sendError !== undefined) {
      CommandSendError.encode(message.sendError, writer.uint32(66).fork()).ldelim();
    }
    if (message.message !== undefined) {
      CommandMessage.encode(message.message, writer.uint32(74).fork()).ldelim();
    }
    if (message.ack !== undefined) {
      CommandAck.encode(message.ack, writer.uint32(82).fork()).ldelim();
    }
    if (message.flow !== undefined) {
      CommandFlow.encode(message.flow, writer.uint32(90).fork()).ldelim();
    }
    if (message.unsubscribe !== undefined) {
      CommandUnsubscribe.encode(message.unsubscribe, writer.uint32(98).fork()).ldelim();
    }
    if (message.success !== undefined) {
      CommandSuccess.encode(message.success, writer.uint32(106).fork()).ldelim();
    }
    if (message.error !== undefined) {
      CommandError.encode(message.error, writer.uint32(114).fork()).ldelim();
    }
    if (message.closeProducer !== undefined) {
      CommandCloseProducer.encode(message.closeProducer, writer.uint32(122).fork()).ldelim();
    }
    if (message.closeConsumer !== undefined) {
      CommandCloseConsumer.encode(message.closeConsumer, writer.uint32(130).fork()).ldelim();
    }
    if (message.producerSuccess !== undefined) {
      CommandProducerSuccess.encode(message.producerSuccess, writer.uint32(138).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      CommandPing.encode(message.ping, writer.uint32(146).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      CommandPong.encode(message.pong, writer.uint32(154).fork()).ldelim();
    }
    if (message.redeliverUnacknowledgedMessages !== undefined) {
      CommandRedeliverUnacknowledgedMessages.encode(message.redeliverUnacknowledgedMessages, writer.uint32(162).fork())
        .ldelim();
    }
    if (message.partitionMetadata !== undefined) {
      CommandPartitionedTopicMetadata.encode(message.partitionMetadata, writer.uint32(170).fork()).ldelim();
    }
    if (message.partitionMetadataResponse !== undefined) {
      CommandPartitionedTopicMetadataResponse.encode(message.partitionMetadataResponse, writer.uint32(178).fork())
        .ldelim();
    }
    if (message.lookupTopic !== undefined) {
      CommandLookupTopic.encode(message.lookupTopic, writer.uint32(186).fork()).ldelim();
    }
    if (message.lookupTopicResponse !== undefined) {
      CommandLookupTopicResponse.encode(message.lookupTopicResponse, writer.uint32(194).fork()).ldelim();
    }
    if (message.consumerStats !== undefined) {
      CommandConsumerStats.encode(message.consumerStats, writer.uint32(202).fork()).ldelim();
    }
    if (message.consumerStatsResponse !== undefined) {
      CommandConsumerStatsResponse.encode(message.consumerStatsResponse, writer.uint32(210).fork()).ldelim();
    }
    if (message.reachedEndOfTopic !== undefined) {
      CommandReachedEndOfTopic.encode(message.reachedEndOfTopic, writer.uint32(218).fork()).ldelim();
    }
    if (message.seek !== undefined) {
      CommandSeek.encode(message.seek, writer.uint32(226).fork()).ldelim();
    }
    if (message.getLastMessageId !== undefined) {
      CommandGetLastMessageId.encode(message.getLastMessageId, writer.uint32(234).fork()).ldelim();
    }
    if (message.getLastMessageIdResponse !== undefined) {
      CommandGetLastMessageIdResponse.encode(message.getLastMessageIdResponse, writer.uint32(242).fork()).ldelim();
    }
    if (message.activeConsumerChange !== undefined) {
      CommandActiveConsumerChange.encode(message.activeConsumerChange, writer.uint32(250).fork()).ldelim();
    }
    if (message.getTopicsOfNamespace !== undefined) {
      CommandGetTopicsOfNamespace.encode(message.getTopicsOfNamespace, writer.uint32(258).fork()).ldelim();
    }
    if (message.getTopicsOfNamespaceResponse !== undefined) {
      CommandGetTopicsOfNamespaceResponse.encode(message.getTopicsOfNamespaceResponse, writer.uint32(266).fork())
        .ldelim();
    }
    if (message.getSchema !== undefined) {
      CommandGetSchema.encode(message.getSchema, writer.uint32(274).fork()).ldelim();
    }
    if (message.getSchemaResponse !== undefined) {
      CommandGetSchemaResponse.encode(message.getSchemaResponse, writer.uint32(282).fork()).ldelim();
    }
    if (message.authChallenge !== undefined) {
      CommandAuthChallenge.encode(message.authChallenge, writer.uint32(290).fork()).ldelim();
    }
    if (message.authResponse !== undefined) {
      CommandAuthResponse.encode(message.authResponse, writer.uint32(298).fork()).ldelim();
    }
    if (message.ackResponse !== undefined) {
      CommandAckResponse.encode(message.ackResponse, writer.uint32(306).fork()).ldelim();
    }
    if (message.getOrCreateSchema !== undefined) {
      CommandGetOrCreateSchema.encode(message.getOrCreateSchema, writer.uint32(314).fork()).ldelim();
    }
    if (message.getOrCreateSchemaResponse !== undefined) {
      CommandGetOrCreateSchemaResponse.encode(message.getOrCreateSchemaResponse, writer.uint32(322).fork()).ldelim();
    }
    if (message.newTxn !== undefined) {
      CommandNewTxn.encode(message.newTxn, writer.uint32(402).fork()).ldelim();
    }
    if (message.newTxnResponse !== undefined) {
      CommandNewTxnResponse.encode(message.newTxnResponse, writer.uint32(410).fork()).ldelim();
    }
    if (message.addPartitionToTxn !== undefined) {
      CommandAddPartitionToTxn.encode(message.addPartitionToTxn, writer.uint32(418).fork()).ldelim();
    }
    if (message.addPartitionToTxnResponse !== undefined) {
      CommandAddPartitionToTxnResponse.encode(message.addPartitionToTxnResponse, writer.uint32(426).fork()).ldelim();
    }
    if (message.addSubscriptionToTxn !== undefined) {
      CommandAddSubscriptionToTxn.encode(message.addSubscriptionToTxn, writer.uint32(434).fork()).ldelim();
    }
    if (message.addSubscriptionToTxnResponse !== undefined) {
      CommandAddSubscriptionToTxnResponse.encode(message.addSubscriptionToTxnResponse, writer.uint32(442).fork())
        .ldelim();
    }
    if (message.endTxn !== undefined) {
      CommandEndTxn.encode(message.endTxn, writer.uint32(450).fork()).ldelim();
    }
    if (message.endTxnResponse !== undefined) {
      CommandEndTxnResponse.encode(message.endTxnResponse, writer.uint32(458).fork()).ldelim();
    }
    if (message.endTxnOnPartition !== undefined) {
      CommandEndTxnOnPartition.encode(message.endTxnOnPartition, writer.uint32(466).fork()).ldelim();
    }
    if (message.endTxnOnPartitionResponse !== undefined) {
      CommandEndTxnOnPartitionResponse.encode(message.endTxnOnPartitionResponse, writer.uint32(474).fork()).ldelim();
    }
    if (message.endTxnOnSubscription !== undefined) {
      CommandEndTxnOnSubscription.encode(message.endTxnOnSubscription, writer.uint32(482).fork()).ldelim();
    }
    if (message.endTxnOnSubscriptionResponse !== undefined) {
      CommandEndTxnOnSubscriptionResponse.encode(message.endTxnOnSubscriptionResponse, writer.uint32(490).fork())
        .ldelim();
    }
    if (message.tcClientConnectRequest !== undefined) {
      CommandTcClientConnectRequest.encode(message.tcClientConnectRequest, writer.uint32(498).fork()).ldelim();
    }
    if (message.tcClientConnectResponse !== undefined) {
      CommandTcClientConnectResponse.encode(message.tcClientConnectResponse, writer.uint32(506).fork()).ldelim();
    }
    if (message.watchTopicList !== undefined) {
      CommandWatchTopicList.encode(message.watchTopicList, writer.uint32(514).fork()).ldelim();
    }
    if (message.watchTopicListSuccess !== undefined) {
      CommandWatchTopicListSuccess.encode(message.watchTopicListSuccess, writer.uint32(522).fork()).ldelim();
    }
    if (message.watchTopicUpdate !== undefined) {
      CommandWatchTopicUpdate.encode(message.watchTopicUpdate, writer.uint32(530).fork()).ldelim();
    }
    if (message.watchTopicListClose !== undefined) {
      CommandWatchTopicListClose.encode(message.watchTopicListClose, writer.uint32(538).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connect = CommandConnect.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.connected = CommandConnected.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.subscribe = CommandSubscribe.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.producer = CommandProducer.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.send = CommandSend.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sendReceipt = CommandSendReceipt.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sendError = CommandSendError.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.message = CommandMessage.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ack = CommandAck.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.flow = CommandFlow.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.unsubscribe = CommandUnsubscribe.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.success = CommandSuccess.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.error = CommandError.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.closeProducer = CommandCloseProducer.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.closeConsumer = CommandCloseConsumer.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.producerSuccess = CommandProducerSuccess.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.ping = CommandPing.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.pong = CommandPong.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.redeliverUnacknowledgedMessages = CommandRedeliverUnacknowledgedMessages.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.partitionMetadata = CommandPartitionedTopicMetadata.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.partitionMetadataResponse = CommandPartitionedTopicMetadataResponse.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.lookupTopic = CommandLookupTopic.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.lookupTopicResponse = CommandLookupTopicResponse.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.consumerStats = CommandConsumerStats.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.consumerStatsResponse = CommandConsumerStatsResponse.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.reachedEndOfTopic = CommandReachedEndOfTopic.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.seek = CommandSeek.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.getLastMessageId = CommandGetLastMessageId.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.getLastMessageIdResponse = CommandGetLastMessageIdResponse.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.activeConsumerChange = CommandActiveConsumerChange.decode(reader, reader.uint32());
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.getTopicsOfNamespace = CommandGetTopicsOfNamespace.decode(reader, reader.uint32());
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.getTopicsOfNamespaceResponse = CommandGetTopicsOfNamespaceResponse.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.getSchema = CommandGetSchema.decode(reader, reader.uint32());
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.getSchemaResponse = CommandGetSchemaResponse.decode(reader, reader.uint32());
          continue;
        case 36:
          if (tag !== 290) {
            break;
          }

          message.authChallenge = CommandAuthChallenge.decode(reader, reader.uint32());
          continue;
        case 37:
          if (tag !== 298) {
            break;
          }

          message.authResponse = CommandAuthResponse.decode(reader, reader.uint32());
          continue;
        case 38:
          if (tag !== 306) {
            break;
          }

          message.ackResponse = CommandAckResponse.decode(reader, reader.uint32());
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.getOrCreateSchema = CommandGetOrCreateSchema.decode(reader, reader.uint32());
          continue;
        case 40:
          if (tag !== 322) {
            break;
          }

          message.getOrCreateSchemaResponse = CommandGetOrCreateSchemaResponse.decode(reader, reader.uint32());
          continue;
        case 50:
          if (tag !== 402) {
            break;
          }

          message.newTxn = CommandNewTxn.decode(reader, reader.uint32());
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.newTxnResponse = CommandNewTxnResponse.decode(reader, reader.uint32());
          continue;
        case 52:
          if (tag !== 418) {
            break;
          }

          message.addPartitionToTxn = CommandAddPartitionToTxn.decode(reader, reader.uint32());
          continue;
        case 53:
          if (tag !== 426) {
            break;
          }

          message.addPartitionToTxnResponse = CommandAddPartitionToTxnResponse.decode(reader, reader.uint32());
          continue;
        case 54:
          if (tag !== 434) {
            break;
          }

          message.addSubscriptionToTxn = CommandAddSubscriptionToTxn.decode(reader, reader.uint32());
          continue;
        case 55:
          if (tag !== 442) {
            break;
          }

          message.addSubscriptionToTxnResponse = CommandAddSubscriptionToTxnResponse.decode(reader, reader.uint32());
          continue;
        case 56:
          if (tag !== 450) {
            break;
          }

          message.endTxn = CommandEndTxn.decode(reader, reader.uint32());
          continue;
        case 57:
          if (tag !== 458) {
            break;
          }

          message.endTxnResponse = CommandEndTxnResponse.decode(reader, reader.uint32());
          continue;
        case 58:
          if (tag !== 466) {
            break;
          }

          message.endTxnOnPartition = CommandEndTxnOnPartition.decode(reader, reader.uint32());
          continue;
        case 59:
          if (tag !== 474) {
            break;
          }

          message.endTxnOnPartitionResponse = CommandEndTxnOnPartitionResponse.decode(reader, reader.uint32());
          continue;
        case 60:
          if (tag !== 482) {
            break;
          }

          message.endTxnOnSubscription = CommandEndTxnOnSubscription.decode(reader, reader.uint32());
          continue;
        case 61:
          if (tag !== 490) {
            break;
          }

          message.endTxnOnSubscriptionResponse = CommandEndTxnOnSubscriptionResponse.decode(reader, reader.uint32());
          continue;
        case 62:
          if (tag !== 498) {
            break;
          }

          message.tcClientConnectRequest = CommandTcClientConnectRequest.decode(reader, reader.uint32());
          continue;
        case 63:
          if (tag !== 506) {
            break;
          }

          message.tcClientConnectResponse = CommandTcClientConnectResponse.decode(reader, reader.uint32());
          continue;
        case 64:
          if (tag !== 514) {
            break;
          }

          message.watchTopicList = CommandWatchTopicList.decode(reader, reader.uint32());
          continue;
        case 65:
          if (tag !== 522) {
            break;
          }

          message.watchTopicListSuccess = CommandWatchTopicListSuccess.decode(reader, reader.uint32());
          continue;
        case 66:
          if (tag !== 530) {
            break;
          }

          message.watchTopicUpdate = CommandWatchTopicUpdate.decode(reader, reader.uint32());
          continue;
        case 67:
          if (tag !== 538) {
            break;
          }

          message.watchTopicListClose = CommandWatchTopicListClose.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseCommand {
    return {
      type: isSet(object.type) ? baseCommand_TypeFromJSON(object.type) : 2,
      connect: isSet(object.connect) ? CommandConnect.fromJSON(object.connect) : undefined,
      connected: isSet(object.connected) ? CommandConnected.fromJSON(object.connected) : undefined,
      subscribe: isSet(object.subscribe) ? CommandSubscribe.fromJSON(object.subscribe) : undefined,
      producer: isSet(object.producer) ? CommandProducer.fromJSON(object.producer) : undefined,
      send: isSet(object.send) ? CommandSend.fromJSON(object.send) : undefined,
      sendReceipt: isSet(object.sendReceipt) ? CommandSendReceipt.fromJSON(object.sendReceipt) : undefined,
      sendError: isSet(object.sendError) ? CommandSendError.fromJSON(object.sendError) : undefined,
      message: isSet(object.message) ? CommandMessage.fromJSON(object.message) : undefined,
      ack: isSet(object.ack) ? CommandAck.fromJSON(object.ack) : undefined,
      flow: isSet(object.flow) ? CommandFlow.fromJSON(object.flow) : undefined,
      unsubscribe: isSet(object.unsubscribe) ? CommandUnsubscribe.fromJSON(object.unsubscribe) : undefined,
      success: isSet(object.success) ? CommandSuccess.fromJSON(object.success) : undefined,
      error: isSet(object.error) ? CommandError.fromJSON(object.error) : undefined,
      closeProducer: isSet(object.closeProducer) ? CommandCloseProducer.fromJSON(object.closeProducer) : undefined,
      closeConsumer: isSet(object.closeConsumer) ? CommandCloseConsumer.fromJSON(object.closeConsumer) : undefined,
      producerSuccess: isSet(object.producerSuccess)
        ? CommandProducerSuccess.fromJSON(object.producerSuccess)
        : undefined,
      ping: isSet(object.ping) ? CommandPing.fromJSON(object.ping) : undefined,
      pong: isSet(object.pong) ? CommandPong.fromJSON(object.pong) : undefined,
      redeliverUnacknowledgedMessages: isSet(object.redeliverUnacknowledgedMessages)
        ? CommandRedeliverUnacknowledgedMessages.fromJSON(object.redeliverUnacknowledgedMessages)
        : undefined,
      partitionMetadata: isSet(object.partitionMetadata)
        ? CommandPartitionedTopicMetadata.fromJSON(object.partitionMetadata)
        : undefined,
      partitionMetadataResponse: isSet(object.partitionMetadataResponse)
        ? CommandPartitionedTopicMetadataResponse.fromJSON(object.partitionMetadataResponse)
        : undefined,
      lookupTopic: isSet(object.lookupTopic) ? CommandLookupTopic.fromJSON(object.lookupTopic) : undefined,
      lookupTopicResponse: isSet(object.lookupTopicResponse)
        ? CommandLookupTopicResponse.fromJSON(object.lookupTopicResponse)
        : undefined,
      consumerStats: isSet(object.consumerStats) ? CommandConsumerStats.fromJSON(object.consumerStats) : undefined,
      consumerStatsResponse: isSet(object.consumerStatsResponse)
        ? CommandConsumerStatsResponse.fromJSON(object.consumerStatsResponse)
        : undefined,
      reachedEndOfTopic: isSet(object.reachedEndOfTopic)
        ? CommandReachedEndOfTopic.fromJSON(object.reachedEndOfTopic)
        : undefined,
      seek: isSet(object.seek) ? CommandSeek.fromJSON(object.seek) : undefined,
      getLastMessageId: isSet(object.getLastMessageId)
        ? CommandGetLastMessageId.fromJSON(object.getLastMessageId)
        : undefined,
      getLastMessageIdResponse: isSet(object.getLastMessageIdResponse)
        ? CommandGetLastMessageIdResponse.fromJSON(object.getLastMessageIdResponse)
        : undefined,
      activeConsumerChange: isSet(object.activeConsumerChange)
        ? CommandActiveConsumerChange.fromJSON(object.activeConsumerChange)
        : undefined,
      getTopicsOfNamespace: isSet(object.getTopicsOfNamespace)
        ? CommandGetTopicsOfNamespace.fromJSON(object.getTopicsOfNamespace)
        : undefined,
      getTopicsOfNamespaceResponse: isSet(object.getTopicsOfNamespaceResponse)
        ? CommandGetTopicsOfNamespaceResponse.fromJSON(object.getTopicsOfNamespaceResponse)
        : undefined,
      getSchema: isSet(object.getSchema) ? CommandGetSchema.fromJSON(object.getSchema) : undefined,
      getSchemaResponse: isSet(object.getSchemaResponse)
        ? CommandGetSchemaResponse.fromJSON(object.getSchemaResponse)
        : undefined,
      authChallenge: isSet(object.authChallenge) ? CommandAuthChallenge.fromJSON(object.authChallenge) : undefined,
      authResponse: isSet(object.authResponse) ? CommandAuthResponse.fromJSON(object.authResponse) : undefined,
      ackResponse: isSet(object.ackResponse) ? CommandAckResponse.fromJSON(object.ackResponse) : undefined,
      getOrCreateSchema: isSet(object.getOrCreateSchema)
        ? CommandGetOrCreateSchema.fromJSON(object.getOrCreateSchema)
        : undefined,
      getOrCreateSchemaResponse: isSet(object.getOrCreateSchemaResponse)
        ? CommandGetOrCreateSchemaResponse.fromJSON(object.getOrCreateSchemaResponse)
        : undefined,
      newTxn: isSet(object.newTxn) ? CommandNewTxn.fromJSON(object.newTxn) : undefined,
      newTxnResponse: isSet(object.newTxnResponse) ? CommandNewTxnResponse.fromJSON(object.newTxnResponse) : undefined,
      addPartitionToTxn: isSet(object.addPartitionToTxn)
        ? CommandAddPartitionToTxn.fromJSON(object.addPartitionToTxn)
        : undefined,
      addPartitionToTxnResponse: isSet(object.addPartitionToTxnResponse)
        ? CommandAddPartitionToTxnResponse.fromJSON(object.addPartitionToTxnResponse)
        : undefined,
      addSubscriptionToTxn: isSet(object.addSubscriptionToTxn)
        ? CommandAddSubscriptionToTxn.fromJSON(object.addSubscriptionToTxn)
        : undefined,
      addSubscriptionToTxnResponse: isSet(object.addSubscriptionToTxnResponse)
        ? CommandAddSubscriptionToTxnResponse.fromJSON(object.addSubscriptionToTxnResponse)
        : undefined,
      endTxn: isSet(object.endTxn) ? CommandEndTxn.fromJSON(object.endTxn) : undefined,
      endTxnResponse: isSet(object.endTxnResponse) ? CommandEndTxnResponse.fromJSON(object.endTxnResponse) : undefined,
      endTxnOnPartition: isSet(object.endTxnOnPartition)
        ? CommandEndTxnOnPartition.fromJSON(object.endTxnOnPartition)
        : undefined,
      endTxnOnPartitionResponse: isSet(object.endTxnOnPartitionResponse)
        ? CommandEndTxnOnPartitionResponse.fromJSON(object.endTxnOnPartitionResponse)
        : undefined,
      endTxnOnSubscription: isSet(object.endTxnOnSubscription)
        ? CommandEndTxnOnSubscription.fromJSON(object.endTxnOnSubscription)
        : undefined,
      endTxnOnSubscriptionResponse: isSet(object.endTxnOnSubscriptionResponse)
        ? CommandEndTxnOnSubscriptionResponse.fromJSON(object.endTxnOnSubscriptionResponse)
        : undefined,
      tcClientConnectRequest: isSet(object.tcClientConnectRequest)
        ? CommandTcClientConnectRequest.fromJSON(object.tcClientConnectRequest)
        : undefined,
      tcClientConnectResponse: isSet(object.tcClientConnectResponse)
        ? CommandTcClientConnectResponse.fromJSON(object.tcClientConnectResponse)
        : undefined,
      watchTopicList: isSet(object.watchTopicList) ? CommandWatchTopicList.fromJSON(object.watchTopicList) : undefined,
      watchTopicListSuccess: isSet(object.watchTopicListSuccess)
        ? CommandWatchTopicListSuccess.fromJSON(object.watchTopicListSuccess)
        : undefined,
      watchTopicUpdate: isSet(object.watchTopicUpdate)
        ? CommandWatchTopicUpdate.fromJSON(object.watchTopicUpdate)
        : undefined,
      watchTopicListClose: isSet(object.watchTopicListClose)
        ? CommandWatchTopicListClose.fromJSON(object.watchTopicListClose)
        : undefined,
    };
  },

  toJSON(message: BaseCommand): unknown {
    const obj: any = {};
    if (message.type !== 2) {
      obj.type = baseCommand_TypeToJSON(message.type);
    }
    if (message.connect !== undefined) {
      obj.connect = CommandConnect.toJSON(message.connect);
    }
    if (message.connected !== undefined) {
      obj.connected = CommandConnected.toJSON(message.connected);
    }
    if (message.subscribe !== undefined) {
      obj.subscribe = CommandSubscribe.toJSON(message.subscribe);
    }
    if (message.producer !== undefined) {
      obj.producer = CommandProducer.toJSON(message.producer);
    }
    if (message.send !== undefined) {
      obj.send = CommandSend.toJSON(message.send);
    }
    if (message.sendReceipt !== undefined) {
      obj.sendReceipt = CommandSendReceipt.toJSON(message.sendReceipt);
    }
    if (message.sendError !== undefined) {
      obj.sendError = CommandSendError.toJSON(message.sendError);
    }
    if (message.message !== undefined) {
      obj.message = CommandMessage.toJSON(message.message);
    }
    if (message.ack !== undefined) {
      obj.ack = CommandAck.toJSON(message.ack);
    }
    if (message.flow !== undefined) {
      obj.flow = CommandFlow.toJSON(message.flow);
    }
    if (message.unsubscribe !== undefined) {
      obj.unsubscribe = CommandUnsubscribe.toJSON(message.unsubscribe);
    }
    if (message.success !== undefined) {
      obj.success = CommandSuccess.toJSON(message.success);
    }
    if (message.error !== undefined) {
      obj.error = CommandError.toJSON(message.error);
    }
    if (message.closeProducer !== undefined) {
      obj.closeProducer = CommandCloseProducer.toJSON(message.closeProducer);
    }
    if (message.closeConsumer !== undefined) {
      obj.closeConsumer = CommandCloseConsumer.toJSON(message.closeConsumer);
    }
    if (message.producerSuccess !== undefined) {
      obj.producerSuccess = CommandProducerSuccess.toJSON(message.producerSuccess);
    }
    if (message.ping !== undefined) {
      obj.ping = CommandPing.toJSON(message.ping);
    }
    if (message.pong !== undefined) {
      obj.pong = CommandPong.toJSON(message.pong);
    }
    if (message.redeliverUnacknowledgedMessages !== undefined) {
      obj.redeliverUnacknowledgedMessages = CommandRedeliverUnacknowledgedMessages.toJSON(
        message.redeliverUnacknowledgedMessages,
      );
    }
    if (message.partitionMetadata !== undefined) {
      obj.partitionMetadata = CommandPartitionedTopicMetadata.toJSON(message.partitionMetadata);
    }
    if (message.partitionMetadataResponse !== undefined) {
      obj.partitionMetadataResponse = CommandPartitionedTopicMetadataResponse.toJSON(message.partitionMetadataResponse);
    }
    if (message.lookupTopic !== undefined) {
      obj.lookupTopic = CommandLookupTopic.toJSON(message.lookupTopic);
    }
    if (message.lookupTopicResponse !== undefined) {
      obj.lookupTopicResponse = CommandLookupTopicResponse.toJSON(message.lookupTopicResponse);
    }
    if (message.consumerStats !== undefined) {
      obj.consumerStats = CommandConsumerStats.toJSON(message.consumerStats);
    }
    if (message.consumerStatsResponse !== undefined) {
      obj.consumerStatsResponse = CommandConsumerStatsResponse.toJSON(message.consumerStatsResponse);
    }
    if (message.reachedEndOfTopic !== undefined) {
      obj.reachedEndOfTopic = CommandReachedEndOfTopic.toJSON(message.reachedEndOfTopic);
    }
    if (message.seek !== undefined) {
      obj.seek = CommandSeek.toJSON(message.seek);
    }
    if (message.getLastMessageId !== undefined) {
      obj.getLastMessageId = CommandGetLastMessageId.toJSON(message.getLastMessageId);
    }
    if (message.getLastMessageIdResponse !== undefined) {
      obj.getLastMessageIdResponse = CommandGetLastMessageIdResponse.toJSON(message.getLastMessageIdResponse);
    }
    if (message.activeConsumerChange !== undefined) {
      obj.activeConsumerChange = CommandActiveConsumerChange.toJSON(message.activeConsumerChange);
    }
    if (message.getTopicsOfNamespace !== undefined) {
      obj.getTopicsOfNamespace = CommandGetTopicsOfNamespace.toJSON(message.getTopicsOfNamespace);
    }
    if (message.getTopicsOfNamespaceResponse !== undefined) {
      obj.getTopicsOfNamespaceResponse = CommandGetTopicsOfNamespaceResponse.toJSON(
        message.getTopicsOfNamespaceResponse,
      );
    }
    if (message.getSchema !== undefined) {
      obj.getSchema = CommandGetSchema.toJSON(message.getSchema);
    }
    if (message.getSchemaResponse !== undefined) {
      obj.getSchemaResponse = CommandGetSchemaResponse.toJSON(message.getSchemaResponse);
    }
    if (message.authChallenge !== undefined) {
      obj.authChallenge = CommandAuthChallenge.toJSON(message.authChallenge);
    }
    if (message.authResponse !== undefined) {
      obj.authResponse = CommandAuthResponse.toJSON(message.authResponse);
    }
    if (message.ackResponse !== undefined) {
      obj.ackResponse = CommandAckResponse.toJSON(message.ackResponse);
    }
    if (message.getOrCreateSchema !== undefined) {
      obj.getOrCreateSchema = CommandGetOrCreateSchema.toJSON(message.getOrCreateSchema);
    }
    if (message.getOrCreateSchemaResponse !== undefined) {
      obj.getOrCreateSchemaResponse = CommandGetOrCreateSchemaResponse.toJSON(message.getOrCreateSchemaResponse);
    }
    if (message.newTxn !== undefined) {
      obj.newTxn = CommandNewTxn.toJSON(message.newTxn);
    }
    if (message.newTxnResponse !== undefined) {
      obj.newTxnResponse = CommandNewTxnResponse.toJSON(message.newTxnResponse);
    }
    if (message.addPartitionToTxn !== undefined) {
      obj.addPartitionToTxn = CommandAddPartitionToTxn.toJSON(message.addPartitionToTxn);
    }
    if (message.addPartitionToTxnResponse !== undefined) {
      obj.addPartitionToTxnResponse = CommandAddPartitionToTxnResponse.toJSON(message.addPartitionToTxnResponse);
    }
    if (message.addSubscriptionToTxn !== undefined) {
      obj.addSubscriptionToTxn = CommandAddSubscriptionToTxn.toJSON(message.addSubscriptionToTxn);
    }
    if (message.addSubscriptionToTxnResponse !== undefined) {
      obj.addSubscriptionToTxnResponse = CommandAddSubscriptionToTxnResponse.toJSON(
        message.addSubscriptionToTxnResponse,
      );
    }
    if (message.endTxn !== undefined) {
      obj.endTxn = CommandEndTxn.toJSON(message.endTxn);
    }
    if (message.endTxnResponse !== undefined) {
      obj.endTxnResponse = CommandEndTxnResponse.toJSON(message.endTxnResponse);
    }
    if (message.endTxnOnPartition !== undefined) {
      obj.endTxnOnPartition = CommandEndTxnOnPartition.toJSON(message.endTxnOnPartition);
    }
    if (message.endTxnOnPartitionResponse !== undefined) {
      obj.endTxnOnPartitionResponse = CommandEndTxnOnPartitionResponse.toJSON(message.endTxnOnPartitionResponse);
    }
    if (message.endTxnOnSubscription !== undefined) {
      obj.endTxnOnSubscription = CommandEndTxnOnSubscription.toJSON(message.endTxnOnSubscription);
    }
    if (message.endTxnOnSubscriptionResponse !== undefined) {
      obj.endTxnOnSubscriptionResponse = CommandEndTxnOnSubscriptionResponse.toJSON(
        message.endTxnOnSubscriptionResponse,
      );
    }
    if (message.tcClientConnectRequest !== undefined) {
      obj.tcClientConnectRequest = CommandTcClientConnectRequest.toJSON(message.tcClientConnectRequest);
    }
    if (message.tcClientConnectResponse !== undefined) {
      obj.tcClientConnectResponse = CommandTcClientConnectResponse.toJSON(message.tcClientConnectResponse);
    }
    if (message.watchTopicList !== undefined) {
      obj.watchTopicList = CommandWatchTopicList.toJSON(message.watchTopicList);
    }
    if (message.watchTopicListSuccess !== undefined) {
      obj.watchTopicListSuccess = CommandWatchTopicListSuccess.toJSON(message.watchTopicListSuccess);
    }
    if (message.watchTopicUpdate !== undefined) {
      obj.watchTopicUpdate = CommandWatchTopicUpdate.toJSON(message.watchTopicUpdate);
    }
    if (message.watchTopicListClose !== undefined) {
      obj.watchTopicListClose = CommandWatchTopicListClose.toJSON(message.watchTopicListClose);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseCommand>, I>>(base?: I): BaseCommand {
    return BaseCommand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseCommand>, I>>(object: I): BaseCommand {
    const message = createBaseBaseCommand();
    message.type = object.type ?? 2;
    message.connect = (object.connect !== undefined && object.connect !== null)
      ? CommandConnect.fromPartial(object.connect)
      : undefined;
    message.connected = (object.connected !== undefined && object.connected !== null)
      ? CommandConnected.fromPartial(object.connected)
      : undefined;
    message.subscribe = (object.subscribe !== undefined && object.subscribe !== null)
      ? CommandSubscribe.fromPartial(object.subscribe)
      : undefined;
    message.producer = (object.producer !== undefined && object.producer !== null)
      ? CommandProducer.fromPartial(object.producer)
      : undefined;
    message.send = (object.send !== undefined && object.send !== null)
      ? CommandSend.fromPartial(object.send)
      : undefined;
    message.sendReceipt = (object.sendReceipt !== undefined && object.sendReceipt !== null)
      ? CommandSendReceipt.fromPartial(object.sendReceipt)
      : undefined;
    message.sendError = (object.sendError !== undefined && object.sendError !== null)
      ? CommandSendError.fromPartial(object.sendError)
      : undefined;
    message.message = (object.message !== undefined && object.message !== null)
      ? CommandMessage.fromPartial(object.message)
      : undefined;
    message.ack = (object.ack !== undefined && object.ack !== null) ? CommandAck.fromPartial(object.ack) : undefined;
    message.flow = (object.flow !== undefined && object.flow !== null)
      ? CommandFlow.fromPartial(object.flow)
      : undefined;
    message.unsubscribe = (object.unsubscribe !== undefined && object.unsubscribe !== null)
      ? CommandUnsubscribe.fromPartial(object.unsubscribe)
      : undefined;
    message.success = (object.success !== undefined && object.success !== null)
      ? CommandSuccess.fromPartial(object.success)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? CommandError.fromPartial(object.error)
      : undefined;
    message.closeProducer = (object.closeProducer !== undefined && object.closeProducer !== null)
      ? CommandCloseProducer.fromPartial(object.closeProducer)
      : undefined;
    message.closeConsumer = (object.closeConsumer !== undefined && object.closeConsumer !== null)
      ? CommandCloseConsumer.fromPartial(object.closeConsumer)
      : undefined;
    message.producerSuccess = (object.producerSuccess !== undefined && object.producerSuccess !== null)
      ? CommandProducerSuccess.fromPartial(object.producerSuccess)
      : undefined;
    message.ping = (object.ping !== undefined && object.ping !== null)
      ? CommandPing.fromPartial(object.ping)
      : undefined;
    message.pong = (object.pong !== undefined && object.pong !== null)
      ? CommandPong.fromPartial(object.pong)
      : undefined;
    message.redeliverUnacknowledgedMessages =
      (object.redeliverUnacknowledgedMessages !== undefined && object.redeliverUnacknowledgedMessages !== null)
        ? CommandRedeliverUnacknowledgedMessages.fromPartial(object.redeliverUnacknowledgedMessages)
        : undefined;
    message.partitionMetadata = (object.partitionMetadata !== undefined && object.partitionMetadata !== null)
      ? CommandPartitionedTopicMetadata.fromPartial(object.partitionMetadata)
      : undefined;
    message.partitionMetadataResponse =
      (object.partitionMetadataResponse !== undefined && object.partitionMetadataResponse !== null)
        ? CommandPartitionedTopicMetadataResponse.fromPartial(object.partitionMetadataResponse)
        : undefined;
    message.lookupTopic = (object.lookupTopic !== undefined && object.lookupTopic !== null)
      ? CommandLookupTopic.fromPartial(object.lookupTopic)
      : undefined;
    message.lookupTopicResponse = (object.lookupTopicResponse !== undefined && object.lookupTopicResponse !== null)
      ? CommandLookupTopicResponse.fromPartial(object.lookupTopicResponse)
      : undefined;
    message.consumerStats = (object.consumerStats !== undefined && object.consumerStats !== null)
      ? CommandConsumerStats.fromPartial(object.consumerStats)
      : undefined;
    message.consumerStatsResponse =
      (object.consumerStatsResponse !== undefined && object.consumerStatsResponse !== null)
        ? CommandConsumerStatsResponse.fromPartial(object.consumerStatsResponse)
        : undefined;
    message.reachedEndOfTopic = (object.reachedEndOfTopic !== undefined && object.reachedEndOfTopic !== null)
      ? CommandReachedEndOfTopic.fromPartial(object.reachedEndOfTopic)
      : undefined;
    message.seek = (object.seek !== undefined && object.seek !== null)
      ? CommandSeek.fromPartial(object.seek)
      : undefined;
    message.getLastMessageId = (object.getLastMessageId !== undefined && object.getLastMessageId !== null)
      ? CommandGetLastMessageId.fromPartial(object.getLastMessageId)
      : undefined;
    message.getLastMessageIdResponse =
      (object.getLastMessageIdResponse !== undefined && object.getLastMessageIdResponse !== null)
        ? CommandGetLastMessageIdResponse.fromPartial(object.getLastMessageIdResponse)
        : undefined;
    message.activeConsumerChange = (object.activeConsumerChange !== undefined && object.activeConsumerChange !== null)
      ? CommandActiveConsumerChange.fromPartial(object.activeConsumerChange)
      : undefined;
    message.getTopicsOfNamespace = (object.getTopicsOfNamespace !== undefined && object.getTopicsOfNamespace !== null)
      ? CommandGetTopicsOfNamespace.fromPartial(object.getTopicsOfNamespace)
      : undefined;
    message.getTopicsOfNamespaceResponse =
      (object.getTopicsOfNamespaceResponse !== undefined && object.getTopicsOfNamespaceResponse !== null)
        ? CommandGetTopicsOfNamespaceResponse.fromPartial(object.getTopicsOfNamespaceResponse)
        : undefined;
    message.getSchema = (object.getSchema !== undefined && object.getSchema !== null)
      ? CommandGetSchema.fromPartial(object.getSchema)
      : undefined;
    message.getSchemaResponse = (object.getSchemaResponse !== undefined && object.getSchemaResponse !== null)
      ? CommandGetSchemaResponse.fromPartial(object.getSchemaResponse)
      : undefined;
    message.authChallenge = (object.authChallenge !== undefined && object.authChallenge !== null)
      ? CommandAuthChallenge.fromPartial(object.authChallenge)
      : undefined;
    message.authResponse = (object.authResponse !== undefined && object.authResponse !== null)
      ? CommandAuthResponse.fromPartial(object.authResponse)
      : undefined;
    message.ackResponse = (object.ackResponse !== undefined && object.ackResponse !== null)
      ? CommandAckResponse.fromPartial(object.ackResponse)
      : undefined;
    message.getOrCreateSchema = (object.getOrCreateSchema !== undefined && object.getOrCreateSchema !== null)
      ? CommandGetOrCreateSchema.fromPartial(object.getOrCreateSchema)
      : undefined;
    message.getOrCreateSchemaResponse =
      (object.getOrCreateSchemaResponse !== undefined && object.getOrCreateSchemaResponse !== null)
        ? CommandGetOrCreateSchemaResponse.fromPartial(object.getOrCreateSchemaResponse)
        : undefined;
    message.newTxn = (object.newTxn !== undefined && object.newTxn !== null)
      ? CommandNewTxn.fromPartial(object.newTxn)
      : undefined;
    message.newTxnResponse = (object.newTxnResponse !== undefined && object.newTxnResponse !== null)
      ? CommandNewTxnResponse.fromPartial(object.newTxnResponse)
      : undefined;
    message.addPartitionToTxn = (object.addPartitionToTxn !== undefined && object.addPartitionToTxn !== null)
      ? CommandAddPartitionToTxn.fromPartial(object.addPartitionToTxn)
      : undefined;
    message.addPartitionToTxnResponse =
      (object.addPartitionToTxnResponse !== undefined && object.addPartitionToTxnResponse !== null)
        ? CommandAddPartitionToTxnResponse.fromPartial(object.addPartitionToTxnResponse)
        : undefined;
    message.addSubscriptionToTxn = (object.addSubscriptionToTxn !== undefined && object.addSubscriptionToTxn !== null)
      ? CommandAddSubscriptionToTxn.fromPartial(object.addSubscriptionToTxn)
      : undefined;
    message.addSubscriptionToTxnResponse =
      (object.addSubscriptionToTxnResponse !== undefined && object.addSubscriptionToTxnResponse !== null)
        ? CommandAddSubscriptionToTxnResponse.fromPartial(object.addSubscriptionToTxnResponse)
        : undefined;
    message.endTxn = (object.endTxn !== undefined && object.endTxn !== null)
      ? CommandEndTxn.fromPartial(object.endTxn)
      : undefined;
    message.endTxnResponse = (object.endTxnResponse !== undefined && object.endTxnResponse !== null)
      ? CommandEndTxnResponse.fromPartial(object.endTxnResponse)
      : undefined;
    message.endTxnOnPartition = (object.endTxnOnPartition !== undefined && object.endTxnOnPartition !== null)
      ? CommandEndTxnOnPartition.fromPartial(object.endTxnOnPartition)
      : undefined;
    message.endTxnOnPartitionResponse =
      (object.endTxnOnPartitionResponse !== undefined && object.endTxnOnPartitionResponse !== null)
        ? CommandEndTxnOnPartitionResponse.fromPartial(object.endTxnOnPartitionResponse)
        : undefined;
    message.endTxnOnSubscription = (object.endTxnOnSubscription !== undefined && object.endTxnOnSubscription !== null)
      ? CommandEndTxnOnSubscription.fromPartial(object.endTxnOnSubscription)
      : undefined;
    message.endTxnOnSubscriptionResponse =
      (object.endTxnOnSubscriptionResponse !== undefined && object.endTxnOnSubscriptionResponse !== null)
        ? CommandEndTxnOnSubscriptionResponse.fromPartial(object.endTxnOnSubscriptionResponse)
        : undefined;
    message.tcClientConnectRequest =
      (object.tcClientConnectRequest !== undefined && object.tcClientConnectRequest !== null)
        ? CommandTcClientConnectRequest.fromPartial(object.tcClientConnectRequest)
        : undefined;
    message.tcClientConnectResponse =
      (object.tcClientConnectResponse !== undefined && object.tcClientConnectResponse !== null)
        ? CommandTcClientConnectResponse.fromPartial(object.tcClientConnectResponse)
        : undefined;
    message.watchTopicList = (object.watchTopicList !== undefined && object.watchTopicList !== null)
      ? CommandWatchTopicList.fromPartial(object.watchTopicList)
      : undefined;
    message.watchTopicListSuccess =
      (object.watchTopicListSuccess !== undefined && object.watchTopicListSuccess !== null)
        ? CommandWatchTopicListSuccess.fromPartial(object.watchTopicListSuccess)
        : undefined;
    message.watchTopicUpdate = (object.watchTopicUpdate !== undefined && object.watchTopicUpdate !== null)
      ? CommandWatchTopicUpdate.fromPartial(object.watchTopicUpdate)
      : undefined;
    message.watchTopicListClose = (object.watchTopicListClose !== undefined && object.watchTopicListClose !== null)
      ? CommandWatchTopicListClose.fromPartial(object.watchTopicListClose)
      : undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
