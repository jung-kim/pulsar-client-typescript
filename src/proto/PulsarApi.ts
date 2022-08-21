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
  ledgerId: number;
  entryId: number;
  partition: number;
  batchIndex: number;
  ackSet: number[];
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
  value: number;
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
  sequenceId: number;
  publishTime: number;
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
  eventTime: number;
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
  deliverAtTime: number;
  /**
   * Identify whether a message is a "marker" message used for
   * internal metadata instead of application published data.
   * Markers will generally not be propagated back to clients
   */
  markerType: number;
  /** transaction related message info */
  txnidLeastBits: number;
  txnidMostBits: number;
  /** / Add highest sequence id to support batch message with external sequence id */
  highestSequenceId: number;
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
  eventTime: number;
  partitionKeyB64Encoded: boolean;
  /** Specific a key to overwrite the message key which used for ordering dispatch in Key_Shared mode. */
  orderingKey: Uint8Array;
  /** Allows consumer retrieve the sequence id that the producer set. */
  sequenceId: number;
  /** Indicate if the message payload value is set */
  nullValue: boolean;
  /** Indicate if the message partition key is set */
  nullPartitionKey: boolean;
}

/** metadata added for entry from broker */
export interface BrokerEntryMetadata {
  brokerTimestamp: number;
  index: number;
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
  consumerId: number;
  requestId: number;
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
  startMessageId: MessageIdData | undefined;
  /** / Add optional metadata key=value to this consumer */
  metadata: KeyValue[];
  readCompacted: boolean;
  schema: Schema | undefined;
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
  startMessageRollbackDurationSec: number;
  keySharedMeta: KeySharedMeta | undefined;
  subscriptionProperties: KeyValue[];
  /** The consumer epoch, when exclusive and failover consumer redeliver unack message will increase the epoch */
  consumerEpoch: number;
}

export enum CommandSubscribe_SubType {
  Exclusive = 0,
  Shared = 1,
  Failover = 2,
  Key_Shared = 3,
  UNRECOGNIZED = -1,
}

export function commandSubscribe_SubTypeFromJSON(
  object: any
): CommandSubscribe_SubType {
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

export function commandSubscribe_SubTypeToJSON(
  object: CommandSubscribe_SubType
): string {
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

export function commandSubscribe_InitialPositionFromJSON(
  object: any
): CommandSubscribe_InitialPosition {
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

export function commandSubscribe_InitialPositionToJSON(
  object: CommandSubscribe_InitialPosition
): string {
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
  requestId: number;
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
  requestId: number;
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
  object: any
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
  object: CommandPartitionedTopicMetadataResponse_LookupType
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
  requestId: number;
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
  requestId: number;
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

export function commandLookupTopicResponse_LookupTypeFromJSON(
  object: any
): CommandLookupTopicResponse_LookupType {
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

export function commandLookupTopicResponse_LookupTypeToJSON(
  object: CommandLookupTopicResponse_LookupType
): string {
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
  producerId: number;
  requestId: number;
  /**
   * / If a producer name is specified, the name will be used,
   * / otherwise the broker will generate a unique name
   */
  producerName: string;
  encrypted: boolean;
  /** / Add optional metadata key=value to this producer */
  metadata: KeyValue[];
  schema: Schema | undefined;
  /** If producer reconnect to broker, the epoch of this producer will +1 */
  epoch: number;
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
  topicEpoch: number;
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
  producerId: number;
  sequenceId: number;
  numMessages: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  /** / Add highest sequence id to support batch message with external sequence id */
  highestSequenceId: number;
  isChunk: boolean;
  /** Specify if the message being published is a Pulsar marker or not */
  marker: boolean;
}

export interface CommandSendReceipt {
  producerId: number;
  sequenceId: number;
  messageId: MessageIdData | undefined;
  highestSequenceId: number;
}

export interface CommandSendError {
  producerId: number;
  sequenceId: number;
  error: ServerError;
  message: string;
}

export interface CommandMessage {
  consumerId: number;
  messageId: MessageIdData | undefined;
  redeliveryCount: number;
  ackSet: number[];
  consumerEpoch: number;
}

export interface CommandAck {
  consumerId: number;
  ackType: CommandAck_AckType;
  /** In case of individual acks, the client can pass a list of message ids */
  messageId: MessageIdData[];
  validationError: CommandAck_ValidationError;
  properties: KeyLongValue[];
  txnidLeastBits: number;
  txnidMostBits: number;
  requestId: number;
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

export function commandAck_ValidationErrorFromJSON(
  object: any
): CommandAck_ValidationError {
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

export function commandAck_ValidationErrorToJSON(
  object: CommandAck_ValidationError
): string {
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
  consumerId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
  requestId: number;
}

/** changes on active consumer */
export interface CommandActiveConsumerChange {
  consumerId: number;
  isActive: boolean;
}

export interface CommandFlow {
  consumerId: number;
  /**
   * Max number of messages to prefetch, in addition
   * of any number previously specified
   */
  messagePermits: number;
}

export interface CommandUnsubscribe {
  consumerId: number;
  requestId: number;
}

/** Reset an existing consumer to a particular message id */
export interface CommandSeek {
  consumerId: number;
  requestId: number;
  messageId: MessageIdData | undefined;
  messagePublishTime: number;
}

/**
 * Message sent by broker to client when a topic
 * has been forcefully terminated and there are no more
 * messages left to consume
 */
export interface CommandReachedEndOfTopic {
  consumerId: number;
}

export interface CommandCloseProducer {
  producerId: number;
  requestId: number;
}

export interface CommandCloseConsumer {
  consumerId: number;
  requestId: number;
}

export interface CommandRedeliverUnacknowledgedMessages {
  consumerId: number;
  messageIds: MessageIdData[];
  consumerEpoch: number;
}

export interface CommandSuccess {
  requestId: number;
  schema: Schema | undefined;
}

/** / Response from CommandProducer */
export interface CommandProducerSuccess {
  requestId: number;
  producerName: string;
  /**
   * The last sequence id that was stored by this producer in the previous session
   * This will only be meaningful if deduplication has been enabled.
   */
  lastSequenceId: number;
  schemaVersion: Uint8Array;
  /**
   * The topic epoch assigned by the broker. This field will only be set if we
   * were requiring exclusive access when creating the producer.
   */
  topicEpoch: number;
  /**
   * If producer is not "ready", the client will avoid to timeout the request
   * for creating the producer. Instead it will wait indefinitely until it gets
   * a subsequent  `CommandProducerSuccess` with `producer_ready==true`.
   */
  producerReady: boolean;
}

export interface CommandError {
  requestId: number;
  error: ServerError;
  message: string;
}

/**
 * Commands to probe the state of connection.
 * When either client or broker doesn't receive commands for certain
 * amount of time, they will send a Ping probe.
 */
export interface CommandPing {}

export interface CommandPong {}

export interface CommandConsumerStats {
  requestId: number;
  /**
   * required string topic_name         = 2;
   * required string subscription_name  = 3;
   */
  consumerId: number;
}

export interface CommandConsumerStatsResponse {
  requestId: number;
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
  availablePermits: number;
  /** / Number of unacknowledged messages for the consumer */
  unackedMessages: number;
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
  msgBacklog: number;
  /** / Total rate of messages ack. msg/s */
  messageAckRate: number;
}

export interface CommandGetLastMessageId {
  consumerId: number;
  requestId: number;
}

export interface CommandGetLastMessageIdResponse {
  lastMessageId: MessageIdData | undefined;
  requestId: number;
  consumerMarkDeletePosition: MessageIdData | undefined;
}

export interface CommandGetTopicsOfNamespace {
  requestId: number;
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

export function commandGetTopicsOfNamespace_ModeFromJSON(
  object: any
): CommandGetTopicsOfNamespace_Mode {
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

export function commandGetTopicsOfNamespace_ModeToJSON(
  object: CommandGetTopicsOfNamespace_Mode
): string {
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
  requestId: number;
  topics: string[];
  /** true iff the topic list was filtered by the pattern supplied by the client */
  filtered: boolean;
  /** hash computed from the names of matching topics */
  topicsHash: string;
  /** if false, topics is empty and the list of matching topics has not changed */
  changed: boolean;
}

export interface CommandWatchTopicList {
  requestId: number;
  watcherId: number;
  namespace: string;
  topicsPattern: string;
  /** Only present when the client reconnects: */
  topicsHash: string;
}

export interface CommandWatchTopicListSuccess {
  requestId: number;
  watcherId: number;
  topic: string[];
  topicsHash: string;
}

export interface CommandWatchTopicUpdate {
  watcherId: number;
  newTopics: string[];
  deletedTopics: string[];
  topicsHash: string;
}

export interface CommandWatchTopicListClose {
  requestId: number;
  watcherId: number;
}

export interface CommandGetSchema {
  requestId: number;
  topic: string;
  schemaVersion: Uint8Array;
}

export interface CommandGetSchemaResponse {
  requestId: number;
  errorCode: ServerError;
  errorMessage: string;
  schema: Schema | undefined;
  schemaVersion: Uint8Array;
}

export interface CommandGetOrCreateSchema {
  requestId: number;
  topic: string;
  schema: Schema | undefined;
}

export interface CommandGetOrCreateSchemaResponse {
  requestId: number;
  errorCode: ServerError;
  errorMessage: string;
  schemaVersion: Uint8Array;
}

export interface CommandTcClientConnectRequest {
  requestId: number;
  tcId: number;
}

export interface CommandTcClientConnectResponse {
  requestId: number;
  error: ServerError;
  message: string;
}

export interface CommandNewTxn {
  requestId: number;
  txnTtlSeconds: number;
  tcId: number;
}

export interface CommandNewTxnResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
}

export interface CommandAddPartitionToTxn {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  partitions: string[];
}

export interface CommandAddPartitionToTxnResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
}

export interface Subscription {
  topic: string;
  subscription: string;
}

export interface CommandAddSubscriptionToTxn {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  subscription: Subscription[];
}

export interface CommandAddSubscriptionToTxnResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
}

export interface CommandEndTxn {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  txnAction: TxnAction;
}

export interface CommandEndTxnResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
}

export interface CommandEndTxnOnPartition {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  topic: string;
  txnAction: TxnAction;
  txnidLeastBitsOfLowWatermark: number;
}

export interface CommandEndTxnOnPartitionResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  error: ServerError;
  message: string;
}

export interface CommandEndTxnOnSubscription {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
  subscription: Subscription | undefined;
  txnAction: TxnAction;
  txnidLeastBitsOfLowWatermark: number;
}

export interface CommandEndTxnOnSubscriptionResponse {
  requestId: number;
  txnidLeastBits: number;
  txnidMostBits: number;
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
  redeliverUnacknowledgedMessages:
    | CommandRedeliverUnacknowledgedMessages
    | undefined;
  partitionMetadata: CommandPartitionedTopicMetadata | undefined;
  partitionMetadataResponse:
    | CommandPartitionedTopicMetadataResponse
    | undefined;
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
  getOrCreateSchemaResponse: CommandGetOrCreateSchemaResponse | undefined;
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
  return { name: "", schemaData: new Uint8Array(), type: 0, properties: [] };
}

export const Schema = {
  encode(
    message: Schema,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 3:
          message.schemaData = reader.bytes();
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Schema {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      schemaData: isSet(object.schemaData)
        ? bytesFromBase64(object.schemaData)
        : new Uint8Array(),
      type: isSet(object.type) ? schema_TypeFromJSON(object.type) : 0,
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => KeyValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.schemaData !== undefined &&
      (obj.schemaData = base64FromBytes(
        message.schemaData !== undefined ? message.schemaData : new Uint8Array()
      ));
    message.type !== undefined && (obj.type = schema_TypeToJSON(message.type));
    if (message.properties) {
      obj.properties = message.properties.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.properties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Schema>, I>>(object: I): Schema {
    const message = createBaseSchema();
    message.name = object.name ?? "";
    message.schemaData = object.schemaData ?? new Uint8Array();
    message.type = object.type ?? 0;
    message.properties =
      object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageIdData(): MessageIdData {
  return {
    ledgerId: 0,
    entryId: 0,
    partition: 0,
    batchIndex: 0,
    ackSet: [],
    batchSize: 0,
    firstChunkMessageId: undefined,
  };
}

export const MessageIdData = {
  encode(
    message: MessageIdData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ledgerId !== 0) {
      writer.uint32(8).uint64(message.ledgerId);
    }
    if (message.entryId !== 0) {
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
      MessageIdData.encode(
        message.firstChunkMessageId,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageIdData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageIdData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ledgerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.entryId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.partition = reader.int32();
          break;
        case 4:
          message.batchIndex = reader.int32();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ackSet.push(longToNumber(reader.int64() as Long));
            }
          } else {
            message.ackSet.push(longToNumber(reader.int64() as Long));
          }
          break;
        case 6:
          message.batchSize = reader.int32();
          break;
        case 7:
          message.firstChunkMessageId = MessageIdData.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageIdData {
    return {
      ledgerId: isSet(object.ledgerId) ? Number(object.ledgerId) : 0,
      entryId: isSet(object.entryId) ? Number(object.entryId) : 0,
      partition: isSet(object.partition) ? Number(object.partition) : 0,
      batchIndex: isSet(object.batchIndex) ? Number(object.batchIndex) : 0,
      ackSet: Array.isArray(object?.ackSet)
        ? object.ackSet.map((e: any) => Number(e))
        : [],
      batchSize: isSet(object.batchSize) ? Number(object.batchSize) : 0,
      firstChunkMessageId: isSet(object.firstChunkMessageId)
        ? MessageIdData.fromJSON(object.firstChunkMessageId)
        : undefined,
    };
  },

  toJSON(message: MessageIdData): unknown {
    const obj: any = {};
    message.ledgerId !== undefined &&
      (obj.ledgerId = Math.round(message.ledgerId));
    message.entryId !== undefined &&
      (obj.entryId = Math.round(message.entryId));
    message.partition !== undefined &&
      (obj.partition = Math.round(message.partition));
    message.batchIndex !== undefined &&
      (obj.batchIndex = Math.round(message.batchIndex));
    if (message.ackSet) {
      obj.ackSet = message.ackSet.map((e) => Math.round(e));
    } else {
      obj.ackSet = [];
    }
    message.batchSize !== undefined &&
      (obj.batchSize = Math.round(message.batchSize));
    message.firstChunkMessageId !== undefined &&
      (obj.firstChunkMessageId = message.firstChunkMessageId
        ? MessageIdData.toJSON(message.firstChunkMessageId)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageIdData>, I>>(
    object: I
  ): MessageIdData {
    const message = createBaseMessageIdData();
    message.ledgerId = object.ledgerId ?? 0;
    message.entryId = object.entryId ?? 0;
    message.partition = object.partition ?? 0;
    message.batchIndex = object.batchIndex ?? 0;
    message.ackSet = object.ackSet?.map((e) => e) || [];
    message.batchSize = object.batchSize ?? 0;
    message.firstChunkMessageId =
      object.firstChunkMessageId !== undefined &&
      object.firstChunkMessageId !== null
        ? MessageIdData.fromPartial(object.firstChunkMessageId)
        : undefined;
    return message;
  },
};

function createBaseKeyValue(): KeyValue {
  return { key: "", value: "" };
}

export const KeyValue = {
  encode(
    message: KeyValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyValue {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: KeyValue): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyValue>, I>>(object: I): KeyValue {
    const message = createBaseKeyValue();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseKeyLongValue(): KeyLongValue {
  return { key: "", value: 0 };
}

export const KeyLongValue = {
  encode(
    message: KeyLongValue,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyLongValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyLongValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyLongValue {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: KeyLongValue): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyLongValue>, I>>(
    object: I
  ): KeyLongValue {
    const message = createBaseKeyLongValue();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseIntRange(): IntRange {
  return { start: 0, end: 0 };
}

export const IntRange = {
  encode(
    message: IntRange,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntRange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = reader.int32();
          break;
        case 2:
          message.end = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IntRange {
    return {
      start: isSet(object.start) ? Number(object.start) : 0,
      end: isSet(object.end) ? Number(object.end) : 0,
    };
  },

  toJSON(message: IntRange): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.end !== undefined && (obj.end = Math.round(message.end));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IntRange>, I>>(object: I): IntRange {
    const message = createBaseIntRange();
    message.start = object.start ?? 0;
    message.end = object.end ?? 0;
    return message;
  },
};

function createBaseEncryptionKeys(): EncryptionKeys {
  return { key: "", value: new Uint8Array(), metadata: [] };
}

export const EncryptionKeys = {
  encode(
    message: EncryptionKeys,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptionKeys();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        case 3:
          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EncryptionKeys {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? bytesFromBase64(object.value)
        : new Uint8Array(),
      metadata: Array.isArray(object?.metadata)
        ? object.metadata.map((e: any) => KeyValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EncryptionKeys): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    if (message.metadata) {
      obj.metadata = message.metadata.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.metadata = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EncryptionKeys>, I>>(
    object: I
  ): EncryptionKeys {
    const message = createBaseEncryptionKeys();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    message.metadata =
      object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageMetadata(): MessageMetadata {
  return {
    producerName: "",
    sequenceId: 0,
    publishTime: 0,
    properties: [],
    replicatedFrom: "",
    partitionKey: "",
    replicateTo: [],
    compression: 0,
    uncompressedSize: 0,
    numMessagesInBatch: 0,
    eventTime: 0,
    encryptionKeys: [],
    encryptionAlgo: "",
    encryptionParam: new Uint8Array(),
    schemaVersion: new Uint8Array(),
    partitionKeyB64Encoded: false,
    orderingKey: new Uint8Array(),
    deliverAtTime: 0,
    markerType: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    highestSequenceId: 0,
    nullValue: false,
    uuid: "",
    numChunksFromMsg: 0,
    totalChunkMsgSize: 0,
    chunkId: 0,
    nullPartitionKey: false,
  };
}

export const MessageMetadata = {
  encode(
    message: MessageMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.producerName !== "") {
      writer.uint32(10).string(message.producerName);
    }
    if (message.sequenceId !== 0) {
      writer.uint32(16).uint64(message.sequenceId);
    }
    if (message.publishTime !== 0) {
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
    if (message.eventTime !== 0) {
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
    if (message.deliverAtTime !== 0) {
      writer.uint32(152).int64(message.deliverAtTime);
    }
    if (message.markerType !== 0) {
      writer.uint32(160).int32(message.markerType);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(176).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(184).uint64(message.txnidMostBits);
    }
    if (message.highestSequenceId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.producerName = reader.string();
          break;
        case 2:
          message.sequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.publishTime = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          break;
        case 5:
          message.replicatedFrom = reader.string();
          break;
        case 6:
          message.partitionKey = reader.string();
          break;
        case 7:
          message.replicateTo.push(reader.string());
          break;
        case 8:
          message.compression = reader.int32() as any;
          break;
        case 9:
          message.uncompressedSize = reader.uint32();
          break;
        case 11:
          message.numMessagesInBatch = reader.int32();
          break;
        case 12:
          message.eventTime = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.encryptionKeys.push(
            EncryptionKeys.decode(reader, reader.uint32())
          );
          break;
        case 14:
          message.encryptionAlgo = reader.string();
          break;
        case 15:
          message.encryptionParam = reader.bytes();
          break;
        case 16:
          message.schemaVersion = reader.bytes();
          break;
        case 17:
          message.partitionKeyB64Encoded = reader.bool();
          break;
        case 18:
          message.orderingKey = reader.bytes();
          break;
        case 19:
          message.deliverAtTime = longToNumber(reader.int64() as Long);
          break;
        case 20:
          message.markerType = reader.int32();
          break;
        case 22:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 23:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 24:
          message.highestSequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 25:
          message.nullValue = reader.bool();
          break;
        case 26:
          message.uuid = reader.string();
          break;
        case 27:
          message.numChunksFromMsg = reader.int32();
          break;
        case 28:
          message.totalChunkMsgSize = reader.int32();
          break;
        case 29:
          message.chunkId = reader.int32();
          break;
        case 30:
          message.nullPartitionKey = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageMetadata {
    return {
      producerName: isSet(object.producerName)
        ? String(object.producerName)
        : "",
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      publishTime: isSet(object.publishTime) ? Number(object.publishTime) : 0,
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => KeyValue.fromJSON(e))
        : [],
      replicatedFrom: isSet(object.replicatedFrom)
        ? String(object.replicatedFrom)
        : "",
      partitionKey: isSet(object.partitionKey)
        ? String(object.partitionKey)
        : "",
      replicateTo: Array.isArray(object?.replicateTo)
        ? object.replicateTo.map((e: any) => String(e))
        : [],
      compression: isSet(object.compression)
        ? compressionTypeFromJSON(object.compression)
        : 0,
      uncompressedSize: isSet(object.uncompressedSize)
        ? Number(object.uncompressedSize)
        : 0,
      numMessagesInBatch: isSet(object.numMessagesInBatch)
        ? Number(object.numMessagesInBatch)
        : 0,
      eventTime: isSet(object.eventTime) ? Number(object.eventTime) : 0,
      encryptionKeys: Array.isArray(object?.encryptionKeys)
        ? object.encryptionKeys.map((e: any) => EncryptionKeys.fromJSON(e))
        : [],
      encryptionAlgo: isSet(object.encryptionAlgo)
        ? String(object.encryptionAlgo)
        : "",
      encryptionParam: isSet(object.encryptionParam)
        ? bytesFromBase64(object.encryptionParam)
        : new Uint8Array(),
      schemaVersion: isSet(object.schemaVersion)
        ? bytesFromBase64(object.schemaVersion)
        : new Uint8Array(),
      partitionKeyB64Encoded: isSet(object.partitionKeyB64Encoded)
        ? Boolean(object.partitionKeyB64Encoded)
        : false,
      orderingKey: isSet(object.orderingKey)
        ? bytesFromBase64(object.orderingKey)
        : new Uint8Array(),
      deliverAtTime: isSet(object.deliverAtTime)
        ? Number(object.deliverAtTime)
        : 0,
      markerType: isSet(object.markerType) ? Number(object.markerType) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      highestSequenceId: isSet(object.highestSequenceId)
        ? Number(object.highestSequenceId)
        : 0,
      nullValue: isSet(object.nullValue) ? Boolean(object.nullValue) : false,
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      numChunksFromMsg: isSet(object.numChunksFromMsg)
        ? Number(object.numChunksFromMsg)
        : 0,
      totalChunkMsgSize: isSet(object.totalChunkMsgSize)
        ? Number(object.totalChunkMsgSize)
        : 0,
      chunkId: isSet(object.chunkId) ? Number(object.chunkId) : 0,
      nullPartitionKey: isSet(object.nullPartitionKey)
        ? Boolean(object.nullPartitionKey)
        : false,
    };
  },

  toJSON(message: MessageMetadata): unknown {
    const obj: any = {};
    message.producerName !== undefined &&
      (obj.producerName = message.producerName);
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.publishTime !== undefined &&
      (obj.publishTime = Math.round(message.publishTime));
    if (message.properties) {
      obj.properties = message.properties.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.properties = [];
    }
    message.replicatedFrom !== undefined &&
      (obj.replicatedFrom = message.replicatedFrom);
    message.partitionKey !== undefined &&
      (obj.partitionKey = message.partitionKey);
    if (message.replicateTo) {
      obj.replicateTo = message.replicateTo.map((e) => e);
    } else {
      obj.replicateTo = [];
    }
    message.compression !== undefined &&
      (obj.compression = compressionTypeToJSON(message.compression));
    message.uncompressedSize !== undefined &&
      (obj.uncompressedSize = Math.round(message.uncompressedSize));
    message.numMessagesInBatch !== undefined &&
      (obj.numMessagesInBatch = Math.round(message.numMessagesInBatch));
    message.eventTime !== undefined &&
      (obj.eventTime = Math.round(message.eventTime));
    if (message.encryptionKeys) {
      obj.encryptionKeys = message.encryptionKeys.map((e) =>
        e ? EncryptionKeys.toJSON(e) : undefined
      );
    } else {
      obj.encryptionKeys = [];
    }
    message.encryptionAlgo !== undefined &&
      (obj.encryptionAlgo = message.encryptionAlgo);
    message.encryptionParam !== undefined &&
      (obj.encryptionParam = base64FromBytes(
        message.encryptionParam !== undefined
          ? message.encryptionParam
          : new Uint8Array()
      ));
    message.schemaVersion !== undefined &&
      (obj.schemaVersion = base64FromBytes(
        message.schemaVersion !== undefined
          ? message.schemaVersion
          : new Uint8Array()
      ));
    message.partitionKeyB64Encoded !== undefined &&
      (obj.partitionKeyB64Encoded = message.partitionKeyB64Encoded);
    message.orderingKey !== undefined &&
      (obj.orderingKey = base64FromBytes(
        message.orderingKey !== undefined
          ? message.orderingKey
          : new Uint8Array()
      ));
    message.deliverAtTime !== undefined &&
      (obj.deliverAtTime = Math.round(message.deliverAtTime));
    message.markerType !== undefined &&
      (obj.markerType = Math.round(message.markerType));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.highestSequenceId !== undefined &&
      (obj.highestSequenceId = Math.round(message.highestSequenceId));
    message.nullValue !== undefined && (obj.nullValue = message.nullValue);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.numChunksFromMsg !== undefined &&
      (obj.numChunksFromMsg = Math.round(message.numChunksFromMsg));
    message.totalChunkMsgSize !== undefined &&
      (obj.totalChunkMsgSize = Math.round(message.totalChunkMsgSize));
    message.chunkId !== undefined &&
      (obj.chunkId = Math.round(message.chunkId));
    message.nullPartitionKey !== undefined &&
      (obj.nullPartitionKey = message.nullPartitionKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageMetadata>, I>>(
    object: I
  ): MessageMetadata {
    const message = createBaseMessageMetadata();
    message.producerName = object.producerName ?? "";
    message.sequenceId = object.sequenceId ?? 0;
    message.publishTime = object.publishTime ?? 0;
    message.properties =
      object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.replicatedFrom = object.replicatedFrom ?? "";
    message.partitionKey = object.partitionKey ?? "";
    message.replicateTo = object.replicateTo?.map((e) => e) || [];
    message.compression = object.compression ?? 0;
    message.uncompressedSize = object.uncompressedSize ?? 0;
    message.numMessagesInBatch = object.numMessagesInBatch ?? 0;
    message.eventTime = object.eventTime ?? 0;
    message.encryptionKeys =
      object.encryptionKeys?.map((e) => EncryptionKeys.fromPartial(e)) || [];
    message.encryptionAlgo = object.encryptionAlgo ?? "";
    message.encryptionParam = object.encryptionParam ?? new Uint8Array();
    message.schemaVersion = object.schemaVersion ?? new Uint8Array();
    message.partitionKeyB64Encoded = object.partitionKeyB64Encoded ?? false;
    message.orderingKey = object.orderingKey ?? new Uint8Array();
    message.deliverAtTime = object.deliverAtTime ?? 0;
    message.markerType = object.markerType ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.highestSequenceId = object.highestSequenceId ?? 0;
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
    eventTime: 0,
    partitionKeyB64Encoded: false,
    orderingKey: new Uint8Array(),
    sequenceId: 0,
    nullValue: false,
    nullPartitionKey: false,
  };
}

export const SingleMessageMetadata = {
  encode(
    message: SingleMessageMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    if (message.eventTime !== 0) {
      writer.uint32(40).uint64(message.eventTime);
    }
    if (message.partitionKeyB64Encoded === true) {
      writer.uint32(48).bool(message.partitionKeyB64Encoded);
    }
    if (message.orderingKey.length !== 0) {
      writer.uint32(58).bytes(message.orderingKey);
    }
    if (message.sequenceId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SingleMessageMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleMessageMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          break;
        case 2:
          message.partitionKey = reader.string();
          break;
        case 3:
          message.payloadSize = reader.int32();
          break;
        case 4:
          message.compactedOut = reader.bool();
          break;
        case 5:
          message.eventTime = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.partitionKeyB64Encoded = reader.bool();
          break;
        case 7:
          message.orderingKey = reader.bytes();
          break;
        case 8:
          message.sequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.nullValue = reader.bool();
          break;
        case 10:
          message.nullPartitionKey = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SingleMessageMetadata {
    return {
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => KeyValue.fromJSON(e))
        : [],
      partitionKey: isSet(object.partitionKey)
        ? String(object.partitionKey)
        : "",
      payloadSize: isSet(object.payloadSize) ? Number(object.payloadSize) : 0,
      compactedOut: isSet(object.compactedOut)
        ? Boolean(object.compactedOut)
        : false,
      eventTime: isSet(object.eventTime) ? Number(object.eventTime) : 0,
      partitionKeyB64Encoded: isSet(object.partitionKeyB64Encoded)
        ? Boolean(object.partitionKeyB64Encoded)
        : false,
      orderingKey: isSet(object.orderingKey)
        ? bytesFromBase64(object.orderingKey)
        : new Uint8Array(),
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      nullValue: isSet(object.nullValue) ? Boolean(object.nullValue) : false,
      nullPartitionKey: isSet(object.nullPartitionKey)
        ? Boolean(object.nullPartitionKey)
        : false,
    };
  },

  toJSON(message: SingleMessageMetadata): unknown {
    const obj: any = {};
    if (message.properties) {
      obj.properties = message.properties.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.properties = [];
    }
    message.partitionKey !== undefined &&
      (obj.partitionKey = message.partitionKey);
    message.payloadSize !== undefined &&
      (obj.payloadSize = Math.round(message.payloadSize));
    message.compactedOut !== undefined &&
      (obj.compactedOut = message.compactedOut);
    message.eventTime !== undefined &&
      (obj.eventTime = Math.round(message.eventTime));
    message.partitionKeyB64Encoded !== undefined &&
      (obj.partitionKeyB64Encoded = message.partitionKeyB64Encoded);
    message.orderingKey !== undefined &&
      (obj.orderingKey = base64FromBytes(
        message.orderingKey !== undefined
          ? message.orderingKey
          : new Uint8Array()
      ));
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.nullValue !== undefined && (obj.nullValue = message.nullValue);
    message.nullPartitionKey !== undefined &&
      (obj.nullPartitionKey = message.nullPartitionKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SingleMessageMetadata>, I>>(
    object: I
  ): SingleMessageMetadata {
    const message = createBaseSingleMessageMetadata();
    message.properties =
      object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.partitionKey = object.partitionKey ?? "";
    message.payloadSize = object.payloadSize ?? 0;
    message.compactedOut = object.compactedOut ?? false;
    message.eventTime = object.eventTime ?? 0;
    message.partitionKeyB64Encoded = object.partitionKeyB64Encoded ?? false;
    message.orderingKey = object.orderingKey ?? new Uint8Array();
    message.sequenceId = object.sequenceId ?? 0;
    message.nullValue = object.nullValue ?? false;
    message.nullPartitionKey = object.nullPartitionKey ?? false;
    return message;
  },
};

function createBaseBrokerEntryMetadata(): BrokerEntryMetadata {
  return { brokerTimestamp: 0, index: 0 };
}

export const BrokerEntryMetadata = {
  encode(
    message: BrokerEntryMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.brokerTimestamp !== 0) {
      writer.uint32(8).uint64(message.brokerTimestamp);
    }
    if (message.index !== 0) {
      writer.uint32(16).uint64(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrokerEntryMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrokerEntryMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.brokerTimestamp = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.index = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BrokerEntryMetadata {
    return {
      brokerTimestamp: isSet(object.brokerTimestamp)
        ? Number(object.brokerTimestamp)
        : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: BrokerEntryMetadata): unknown {
    const obj: any = {};
    message.brokerTimestamp !== undefined &&
      (obj.brokerTimestamp = Math.round(message.brokerTimestamp));
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BrokerEntryMetadata>, I>>(
    object: I
  ): BrokerEntryMetadata {
    const message = createBaseBrokerEntryMetadata();
    message.brokerTimestamp = object.brokerTimestamp ?? 0;
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseCommandConnect(): CommandConnect {
  return {
    clientVersion: "",
    authMethod: 0,
    authData: new Uint8Array(),
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
  encode(
    message: CommandConnect,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
      FeatureFlags.encode(
        message.featureFlags,
        writer.uint32(82).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConnect {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConnect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientVersion = reader.string();
          break;
        case 2:
          message.authMethod = reader.int32() as any;
          break;
        case 3:
          message.authData = reader.bytes();
          break;
        case 4:
          message.protocolVersion = reader.int32();
          break;
        case 5:
          message.authMethodName = reader.string();
          break;
        case 6:
          message.proxyToBrokerUrl = reader.string();
          break;
        case 7:
          message.originalPrincipal = reader.string();
          break;
        case 8:
          message.originalAuthData = reader.string();
          break;
        case 9:
          message.originalAuthMethod = reader.string();
          break;
        case 10:
          message.featureFlags = FeatureFlags.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandConnect {
    return {
      clientVersion: isSet(object.clientVersion)
        ? String(object.clientVersion)
        : "",
      authMethod: isSet(object.authMethod)
        ? authMethodFromJSON(object.authMethod)
        : 0,
      authData: isSet(object.authData)
        ? bytesFromBase64(object.authData)
        : new Uint8Array(),
      protocolVersion: isSet(object.protocolVersion)
        ? Number(object.protocolVersion)
        : 0,
      authMethodName: isSet(object.authMethodName)
        ? String(object.authMethodName)
        : "",
      proxyToBrokerUrl: isSet(object.proxyToBrokerUrl)
        ? String(object.proxyToBrokerUrl)
        : "",
      originalPrincipal: isSet(object.originalPrincipal)
        ? String(object.originalPrincipal)
        : "",
      originalAuthData: isSet(object.originalAuthData)
        ? String(object.originalAuthData)
        : "",
      originalAuthMethod: isSet(object.originalAuthMethod)
        ? String(object.originalAuthMethod)
        : "",
      featureFlags: isSet(object.featureFlags)
        ? FeatureFlags.fromJSON(object.featureFlags)
        : undefined,
    };
  },

  toJSON(message: CommandConnect): unknown {
    const obj: any = {};
    message.clientVersion !== undefined &&
      (obj.clientVersion = message.clientVersion);
    message.authMethod !== undefined &&
      (obj.authMethod = authMethodToJSON(message.authMethod));
    message.authData !== undefined &&
      (obj.authData = base64FromBytes(
        message.authData !== undefined ? message.authData : new Uint8Array()
      ));
    message.protocolVersion !== undefined &&
      (obj.protocolVersion = Math.round(message.protocolVersion));
    message.authMethodName !== undefined &&
      (obj.authMethodName = message.authMethodName);
    message.proxyToBrokerUrl !== undefined &&
      (obj.proxyToBrokerUrl = message.proxyToBrokerUrl);
    message.originalPrincipal !== undefined &&
      (obj.originalPrincipal = message.originalPrincipal);
    message.originalAuthData !== undefined &&
      (obj.originalAuthData = message.originalAuthData);
    message.originalAuthMethod !== undefined &&
      (obj.originalAuthMethod = message.originalAuthMethod);
    message.featureFlags !== undefined &&
      (obj.featureFlags = message.featureFlags
        ? FeatureFlags.toJSON(message.featureFlags)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandConnect>, I>>(
    object: I
  ): CommandConnect {
    const message = createBaseCommandConnect();
    message.clientVersion = object.clientVersion ?? "";
    message.authMethod = object.authMethod ?? 0;
    message.authData = object.authData ?? new Uint8Array();
    message.protocolVersion = object.protocolVersion ?? 0;
    message.authMethodName = object.authMethodName ?? "";
    message.proxyToBrokerUrl = object.proxyToBrokerUrl ?? "";
    message.originalPrincipal = object.originalPrincipal ?? "";
    message.originalAuthData = object.originalAuthData ?? "";
    message.originalAuthMethod = object.originalAuthMethod ?? "";
    message.featureFlags =
      object.featureFlags !== undefined && object.featureFlags !== null
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
  encode(
    message: FeatureFlags,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureFlags();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supportsAuthRefresh = reader.bool();
          break;
        case 2:
          message.supportsBrokerEntryMetadata = reader.bool();
          break;
        case 3:
          message.supportsPartialProducer = reader.bool();
          break;
        case 4:
          message.supportsTopicWatchers = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FeatureFlags {
    return {
      supportsAuthRefresh: isSet(object.supportsAuthRefresh)
        ? Boolean(object.supportsAuthRefresh)
        : false,
      supportsBrokerEntryMetadata: isSet(object.supportsBrokerEntryMetadata)
        ? Boolean(object.supportsBrokerEntryMetadata)
        : false,
      supportsPartialProducer: isSet(object.supportsPartialProducer)
        ? Boolean(object.supportsPartialProducer)
        : false,
      supportsTopicWatchers: isSet(object.supportsTopicWatchers)
        ? Boolean(object.supportsTopicWatchers)
        : false,
    };
  },

  toJSON(message: FeatureFlags): unknown {
    const obj: any = {};
    message.supportsAuthRefresh !== undefined &&
      (obj.supportsAuthRefresh = message.supportsAuthRefresh);
    message.supportsBrokerEntryMetadata !== undefined &&
      (obj.supportsBrokerEntryMetadata = message.supportsBrokerEntryMetadata);
    message.supportsPartialProducer !== undefined &&
      (obj.supportsPartialProducer = message.supportsPartialProducer);
    message.supportsTopicWatchers !== undefined &&
      (obj.supportsTopicWatchers = message.supportsTopicWatchers);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FeatureFlags>, I>>(
    object: I
  ): FeatureFlags {
    const message = createBaseFeatureFlags();
    message.supportsAuthRefresh = object.supportsAuthRefresh ?? false;
    message.supportsBrokerEntryMetadata =
      object.supportsBrokerEntryMetadata ?? false;
    message.supportsPartialProducer = object.supportsPartialProducer ?? false;
    message.supportsTopicWatchers = object.supportsTopicWatchers ?? false;
    return message;
  },
};

function createBaseCommandConnected(): CommandConnected {
  return {
    serverVersion: "",
    protocolVersion: 0,
    maxMessageSize: 0,
    featureFlags: undefined,
  };
}

export const CommandConnected = {
  encode(
    message: CommandConnected,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
      FeatureFlags.encode(
        message.featureFlags,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandConnected {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConnected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverVersion = reader.string();
          break;
        case 2:
          message.protocolVersion = reader.int32();
          break;
        case 3:
          message.maxMessageSize = reader.int32();
          break;
        case 4:
          message.featureFlags = FeatureFlags.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandConnected {
    return {
      serverVersion: isSet(object.serverVersion)
        ? String(object.serverVersion)
        : "",
      protocolVersion: isSet(object.protocolVersion)
        ? Number(object.protocolVersion)
        : 0,
      maxMessageSize: isSet(object.maxMessageSize)
        ? Number(object.maxMessageSize)
        : 0,
      featureFlags: isSet(object.featureFlags)
        ? FeatureFlags.fromJSON(object.featureFlags)
        : undefined,
    };
  },

  toJSON(message: CommandConnected): unknown {
    const obj: any = {};
    message.serverVersion !== undefined &&
      (obj.serverVersion = message.serverVersion);
    message.protocolVersion !== undefined &&
      (obj.protocolVersion = Math.round(message.protocolVersion));
    message.maxMessageSize !== undefined &&
      (obj.maxMessageSize = Math.round(message.maxMessageSize));
    message.featureFlags !== undefined &&
      (obj.featureFlags = message.featureFlags
        ? FeatureFlags.toJSON(message.featureFlags)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandConnected>, I>>(
    object: I
  ): CommandConnected {
    const message = createBaseCommandConnected();
    message.serverVersion = object.serverVersion ?? "";
    message.protocolVersion = object.protocolVersion ?? 0;
    message.maxMessageSize = object.maxMessageSize ?? 0;
    message.featureFlags =
      object.featureFlags !== undefined && object.featureFlags !== null
        ? FeatureFlags.fromPartial(object.featureFlags)
        : undefined;
    return message;
  },
};

function createBaseCommandAuthResponse(): CommandAuthResponse {
  return { clientVersion: "", response: undefined, protocolVersion: 0 };
}

export const CommandAuthResponse = {
  encode(
    message: CommandAuthResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientVersion = reader.string();
          break;
        case 2:
          message.response = AuthData.decode(reader, reader.uint32());
          break;
        case 3:
          message.protocolVersion = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAuthResponse {
    return {
      clientVersion: isSet(object.clientVersion)
        ? String(object.clientVersion)
        : "",
      response: isSet(object.response)
        ? AuthData.fromJSON(object.response)
        : undefined,
      protocolVersion: isSet(object.protocolVersion)
        ? Number(object.protocolVersion)
        : 0,
    };
  },

  toJSON(message: CommandAuthResponse): unknown {
    const obj: any = {};
    message.clientVersion !== undefined &&
      (obj.clientVersion = message.clientVersion);
    message.response !== undefined &&
      (obj.response = message.response
        ? AuthData.toJSON(message.response)
        : undefined);
    message.protocolVersion !== undefined &&
      (obj.protocolVersion = Math.round(message.protocolVersion));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAuthResponse>, I>>(
    object: I
  ): CommandAuthResponse {
    const message = createBaseCommandAuthResponse();
    message.clientVersion = object.clientVersion ?? "";
    message.response =
      object.response !== undefined && object.response !== null
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
  encode(
    message: CommandAuthChallenge,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandAuthChallenge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAuthChallenge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverVersion = reader.string();
          break;
        case 2:
          message.challenge = AuthData.decode(reader, reader.uint32());
          break;
        case 3:
          message.protocolVersion = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAuthChallenge {
    return {
      serverVersion: isSet(object.serverVersion)
        ? String(object.serverVersion)
        : "",
      challenge: isSet(object.challenge)
        ? AuthData.fromJSON(object.challenge)
        : undefined,
      protocolVersion: isSet(object.protocolVersion)
        ? Number(object.protocolVersion)
        : 0,
    };
  },

  toJSON(message: CommandAuthChallenge): unknown {
    const obj: any = {};
    message.serverVersion !== undefined &&
      (obj.serverVersion = message.serverVersion);
    message.challenge !== undefined &&
      (obj.challenge = message.challenge
        ? AuthData.toJSON(message.challenge)
        : undefined);
    message.protocolVersion !== undefined &&
      (obj.protocolVersion = Math.round(message.protocolVersion));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAuthChallenge>, I>>(
    object: I
  ): CommandAuthChallenge {
    const message = createBaseCommandAuthChallenge();
    message.serverVersion = object.serverVersion ?? "";
    message.challenge =
      object.challenge !== undefined && object.challenge !== null
        ? AuthData.fromPartial(object.challenge)
        : undefined;
    message.protocolVersion = object.protocolVersion ?? 0;
    return message;
  },
};

function createBaseAuthData(): AuthData {
  return { authMethodName: "", authData: new Uint8Array() };
}

export const AuthData = {
  encode(
    message: AuthData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authMethodName !== "") {
      writer.uint32(10).string(message.authMethodName);
    }
    if (message.authData.length !== 0) {
      writer.uint32(18).bytes(message.authData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authMethodName = reader.string();
          break;
        case 2:
          message.authData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthData {
    return {
      authMethodName: isSet(object.authMethodName)
        ? String(object.authMethodName)
        : "",
      authData: isSet(object.authData)
        ? bytesFromBase64(object.authData)
        : new Uint8Array(),
    };
  },

  toJSON(message: AuthData): unknown {
    const obj: any = {};
    message.authMethodName !== undefined &&
      (obj.authMethodName = message.authMethodName);
    message.authData !== undefined &&
      (obj.authData = base64FromBytes(
        message.authData !== undefined ? message.authData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthData>, I>>(object: I): AuthData {
    const message = createBaseAuthData();
    message.authMethodName = object.authMethodName ?? "";
    message.authData = object.authData ?? new Uint8Array();
    return message;
  },
};

function createBaseKeySharedMeta(): KeySharedMeta {
  return { keySharedMode: 0, hashRanges: [], allowOutOfOrderDelivery: false };
}

export const KeySharedMeta = {
  encode(
    message: KeySharedMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeySharedMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keySharedMode = reader.int32() as any;
          break;
        case 3:
          message.hashRanges.push(IntRange.decode(reader, reader.uint32()));
          break;
        case 4:
          message.allowOutOfOrderDelivery = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeySharedMeta {
    return {
      keySharedMode: isSet(object.keySharedMode)
        ? keySharedModeFromJSON(object.keySharedMode)
        : 0,
      hashRanges: Array.isArray(object?.hashRanges)
        ? object.hashRanges.map((e: any) => IntRange.fromJSON(e))
        : [],
      allowOutOfOrderDelivery: isSet(object.allowOutOfOrderDelivery)
        ? Boolean(object.allowOutOfOrderDelivery)
        : false,
    };
  },

  toJSON(message: KeySharedMeta): unknown {
    const obj: any = {};
    message.keySharedMode !== undefined &&
      (obj.keySharedMode = keySharedModeToJSON(message.keySharedMode));
    if (message.hashRanges) {
      obj.hashRanges = message.hashRanges.map((e) =>
        e ? IntRange.toJSON(e) : undefined
      );
    } else {
      obj.hashRanges = [];
    }
    message.allowOutOfOrderDelivery !== undefined &&
      (obj.allowOutOfOrderDelivery = message.allowOutOfOrderDelivery);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeySharedMeta>, I>>(
    object: I
  ): KeySharedMeta {
    const message = createBaseKeySharedMeta();
    message.keySharedMode = object.keySharedMode ?? 0;
    message.hashRanges =
      object.hashRanges?.map((e) => IntRange.fromPartial(e)) || [];
    message.allowOutOfOrderDelivery = object.allowOutOfOrderDelivery ?? false;
    return message;
  },
};

function createBaseCommandSubscribe(): CommandSubscribe {
  return {
    topic: "",
    subscription: "",
    subType: 0,
    consumerId: 0,
    requestId: 0,
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
    startMessageRollbackDurationSec: 0,
    keySharedMeta: undefined,
    subscriptionProperties: [],
    consumerEpoch: 0,
  };
}

export const CommandSubscribe = {
  encode(
    message: CommandSubscribe,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.subscription !== "") {
      writer.uint32(18).string(message.subscription);
    }
    if (message.subType !== 0) {
      writer.uint32(24).int32(message.subType);
    }
    if (message.consumerId !== 0) {
      writer.uint32(32).uint64(message.consumerId);
    }
    if (message.requestId !== 0) {
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
      MessageIdData.encode(
        message.startMessageId,
        writer.uint32(74).fork()
      ).ldelim();
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
    if (message.startMessageRollbackDurationSec !== 0) {
      writer.uint32(128).uint64(message.startMessageRollbackDurationSec);
    }
    if (message.keySharedMeta !== undefined) {
      KeySharedMeta.encode(
        message.keySharedMeta,
        writer.uint32(138).fork()
      ).ldelim();
    }
    for (const v of message.subscriptionProperties) {
      KeyValue.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    if (message.consumerEpoch !== 0) {
      writer.uint32(152).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSubscribe {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSubscribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = reader.string();
          break;
        case 2:
          message.subscription = reader.string();
          break;
        case 3:
          message.subType = reader.int32() as any;
          break;
        case 4:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.consumerName = reader.string();
          break;
        case 7:
          message.priorityLevel = reader.int32();
          break;
        case 8:
          message.durable = reader.bool();
          break;
        case 9:
          message.startMessageId = MessageIdData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          break;
        case 11:
          message.readCompacted = reader.bool();
          break;
        case 12:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        case 13:
          message.initialPosition = reader.int32() as any;
          break;
        case 14:
          message.replicateSubscriptionState = reader.bool();
          break;
        case 15:
          message.forceTopicCreation = reader.bool();
          break;
        case 16:
          message.startMessageRollbackDurationSec = longToNumber(
            reader.uint64() as Long
          );
          break;
        case 17:
          message.keySharedMeta = KeySharedMeta.decode(reader, reader.uint32());
          break;
        case 18:
          message.subscriptionProperties.push(
            KeyValue.decode(reader, reader.uint32())
          );
          break;
        case 19:
          message.consumerEpoch = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSubscribe {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      subscription: isSet(object.subscription)
        ? String(object.subscription)
        : "",
      subType: isSet(object.subType)
        ? commandSubscribe_SubTypeFromJSON(object.subType)
        : 0,
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      consumerName: isSet(object.consumerName)
        ? String(object.consumerName)
        : "",
      priorityLevel: isSet(object.priorityLevel)
        ? Number(object.priorityLevel)
        : 0,
      durable: isSet(object.durable) ? Boolean(object.durable) : false,
      startMessageId: isSet(object.startMessageId)
        ? MessageIdData.fromJSON(object.startMessageId)
        : undefined,
      metadata: Array.isArray(object?.metadata)
        ? object.metadata.map((e: any) => KeyValue.fromJSON(e))
        : [],
      readCompacted: isSet(object.readCompacted)
        ? Boolean(object.readCompacted)
        : false,
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      initialPosition: isSet(object.initialPosition)
        ? commandSubscribe_InitialPositionFromJSON(object.initialPosition)
        : 0,
      replicateSubscriptionState: isSet(object.replicateSubscriptionState)
        ? Boolean(object.replicateSubscriptionState)
        : false,
      forceTopicCreation: isSet(object.forceTopicCreation)
        ? Boolean(object.forceTopicCreation)
        : false,
      startMessageRollbackDurationSec: isSet(
        object.startMessageRollbackDurationSec
      )
        ? Number(object.startMessageRollbackDurationSec)
        : 0,
      keySharedMeta: isSet(object.keySharedMeta)
        ? KeySharedMeta.fromJSON(object.keySharedMeta)
        : undefined,
      subscriptionProperties: Array.isArray(object?.subscriptionProperties)
        ? object.subscriptionProperties.map((e: any) => KeyValue.fromJSON(e))
        : [],
      consumerEpoch: isSet(object.consumerEpoch)
        ? Number(object.consumerEpoch)
        : 0,
    };
  },

  toJSON(message: CommandSubscribe): unknown {
    const obj: any = {};
    message.topic !== undefined && (obj.topic = message.topic);
    message.subscription !== undefined &&
      (obj.subscription = message.subscription);
    message.subType !== undefined &&
      (obj.subType = commandSubscribe_SubTypeToJSON(message.subType));
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.consumerName !== undefined &&
      (obj.consumerName = message.consumerName);
    message.priorityLevel !== undefined &&
      (obj.priorityLevel = Math.round(message.priorityLevel));
    message.durable !== undefined && (obj.durable = message.durable);
    message.startMessageId !== undefined &&
      (obj.startMessageId = message.startMessageId
        ? MessageIdData.toJSON(message.startMessageId)
        : undefined);
    if (message.metadata) {
      obj.metadata = message.metadata.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.metadata = [];
    }
    message.readCompacted !== undefined &&
      (obj.readCompacted = message.readCompacted);
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    message.initialPosition !== undefined &&
      (obj.initialPosition = commandSubscribe_InitialPositionToJSON(
        message.initialPosition
      ));
    message.replicateSubscriptionState !== undefined &&
      (obj.replicateSubscriptionState = message.replicateSubscriptionState);
    message.forceTopicCreation !== undefined &&
      (obj.forceTopicCreation = message.forceTopicCreation);
    message.startMessageRollbackDurationSec !== undefined &&
      (obj.startMessageRollbackDurationSec = Math.round(
        message.startMessageRollbackDurationSec
      ));
    message.keySharedMeta !== undefined &&
      (obj.keySharedMeta = message.keySharedMeta
        ? KeySharedMeta.toJSON(message.keySharedMeta)
        : undefined);
    if (message.subscriptionProperties) {
      obj.subscriptionProperties = message.subscriptionProperties.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.subscriptionProperties = [];
    }
    message.consumerEpoch !== undefined &&
      (obj.consumerEpoch = Math.round(message.consumerEpoch));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSubscribe>, I>>(
    object: I
  ): CommandSubscribe {
    const message = createBaseCommandSubscribe();
    message.topic = object.topic ?? "";
    message.subscription = object.subscription ?? "";
    message.subType = object.subType ?? 0;
    message.consumerId = object.consumerId ?? 0;
    message.requestId = object.requestId ?? 0;
    message.consumerName = object.consumerName ?? "";
    message.priorityLevel = object.priorityLevel ?? 0;
    message.durable = object.durable ?? false;
    message.startMessageId =
      object.startMessageId !== undefined && object.startMessageId !== null
        ? MessageIdData.fromPartial(object.startMessageId)
        : undefined;
    message.metadata =
      object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    message.readCompacted = object.readCompacted ?? false;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? Schema.fromPartial(object.schema)
        : undefined;
    message.initialPosition = object.initialPosition ?? 0;
    message.replicateSubscriptionState =
      object.replicateSubscriptionState ?? false;
    message.forceTopicCreation = object.forceTopicCreation ?? false;
    message.startMessageRollbackDurationSec =
      object.startMessageRollbackDurationSec ?? 0;
    message.keySharedMeta =
      object.keySharedMeta !== undefined && object.keySharedMeta !== null
        ? KeySharedMeta.fromPartial(object.keySharedMeta)
        : undefined;
    message.subscriptionProperties =
      object.subscriptionProperties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.consumerEpoch = object.consumerEpoch ?? 0;
    return message;
  },
};

function createBaseCommandPartitionedTopicMetadata(): CommandPartitionedTopicMetadata {
  return {
    topic: "",
    requestId: 0,
    originalPrincipal: "",
    originalAuthData: "",
    originalAuthMethod: "",
  };
}

export const CommandPartitionedTopicMetadata = {
  encode(
    message: CommandPartitionedTopicMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandPartitionedTopicMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPartitionedTopicMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = reader.string();
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.originalPrincipal = reader.string();
          break;
        case 4:
          message.originalAuthData = reader.string();
          break;
        case 5:
          message.originalAuthMethod = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandPartitionedTopicMetadata {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      originalPrincipal: isSet(object.originalPrincipal)
        ? String(object.originalPrincipal)
        : "",
      originalAuthData: isSet(object.originalAuthData)
        ? String(object.originalAuthData)
        : "",
      originalAuthMethod: isSet(object.originalAuthMethod)
        ? String(object.originalAuthMethod)
        : "",
    };
  },

  toJSON(message: CommandPartitionedTopicMetadata): unknown {
    const obj: any = {};
    message.topic !== undefined && (obj.topic = message.topic);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.originalPrincipal !== undefined &&
      (obj.originalPrincipal = message.originalPrincipal);
    message.originalAuthData !== undefined &&
      (obj.originalAuthData = message.originalAuthData);
    message.originalAuthMethod !== undefined &&
      (obj.originalAuthMethod = message.originalAuthMethod);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandPartitionedTopicMetadata>, I>>(
    object: I
  ): CommandPartitionedTopicMetadata {
    const message = createBaseCommandPartitionedTopicMetadata();
    message.topic = object.topic ?? "";
    message.requestId = object.requestId ?? 0;
    message.originalPrincipal = object.originalPrincipal ?? "";
    message.originalAuthData = object.originalAuthData ?? "";
    message.originalAuthMethod = object.originalAuthMethod ?? "";
    return message;
  },
};

function createBaseCommandPartitionedTopicMetadataResponse(): CommandPartitionedTopicMetadataResponse {
  return { partitions: 0, requestId: 0, response: 0, error: 0, message: "" };
}

export const CommandPartitionedTopicMetadataResponse = {
  encode(
    message: CommandPartitionedTopicMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.partitions !== 0) {
      writer.uint32(8).uint32(message.partitions);
    }
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandPartitionedTopicMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPartitionedTopicMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.partitions = reader.uint32();
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.response = reader.int32() as any;
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandPartitionedTopicMetadataResponse {
    return {
      partitions: isSet(object.partitions) ? Number(object.partitions) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      response: isSet(object.response)
        ? commandPartitionedTopicMetadataResponse_LookupTypeFromJSON(
            object.response
          )
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandPartitionedTopicMetadataResponse): unknown {
    const obj: any = {};
    message.partitions !== undefined &&
      (obj.partitions = Math.round(message.partitions));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.response !== undefined &&
      (obj.response = commandPartitionedTopicMetadataResponse_LookupTypeToJSON(
        message.response
      ));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandPartitionedTopicMetadataResponse>, I>
  >(object: I): CommandPartitionedTopicMetadataResponse {
    const message = createBaseCommandPartitionedTopicMetadataResponse();
    message.partitions = object.partitions ?? 0;
    message.requestId = object.requestId ?? 0;
    message.response = object.response ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandLookupTopic(): CommandLookupTopic {
  return {
    topic: "",
    requestId: 0,
    authoritative: false,
    originalPrincipal: "",
    originalAuthData: "",
    originalAuthMethod: "",
    advertisedListenerName: "",
  };
}

export const CommandLookupTopic = {
  encode(
    message: CommandLookupTopic,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.requestId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandLookupTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = reader.string();
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.authoritative = reader.bool();
          break;
        case 4:
          message.originalPrincipal = reader.string();
          break;
        case 5:
          message.originalAuthData = reader.string();
          break;
        case 6:
          message.originalAuthMethod = reader.string();
          break;
        case 7:
          message.advertisedListenerName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandLookupTopic {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      authoritative: isSet(object.authoritative)
        ? Boolean(object.authoritative)
        : false,
      originalPrincipal: isSet(object.originalPrincipal)
        ? String(object.originalPrincipal)
        : "",
      originalAuthData: isSet(object.originalAuthData)
        ? String(object.originalAuthData)
        : "",
      originalAuthMethod: isSet(object.originalAuthMethod)
        ? String(object.originalAuthMethod)
        : "",
      advertisedListenerName: isSet(object.advertisedListenerName)
        ? String(object.advertisedListenerName)
        : "",
    };
  },

  toJSON(message: CommandLookupTopic): unknown {
    const obj: any = {};
    message.topic !== undefined && (obj.topic = message.topic);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.authoritative !== undefined &&
      (obj.authoritative = message.authoritative);
    message.originalPrincipal !== undefined &&
      (obj.originalPrincipal = message.originalPrincipal);
    message.originalAuthData !== undefined &&
      (obj.originalAuthData = message.originalAuthData);
    message.originalAuthMethod !== undefined &&
      (obj.originalAuthMethod = message.originalAuthMethod);
    message.advertisedListenerName !== undefined &&
      (obj.advertisedListenerName = message.advertisedListenerName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandLookupTopic>, I>>(
    object: I
  ): CommandLookupTopic {
    const message = createBaseCommandLookupTopic();
    message.topic = object.topic ?? "";
    message.requestId = object.requestId ?? 0;
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
    requestId: 0,
    authoritative: false,
    error: 0,
    message: "",
    proxyThroughServiceUrl: false,
  };
}

export const CommandLookupTopicResponse = {
  encode(
    message: CommandLookupTopicResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.brokerServiceUrl !== "") {
      writer.uint32(10).string(message.brokerServiceUrl);
    }
    if (message.brokerServiceUrlTls !== "") {
      writer.uint32(18).string(message.brokerServiceUrlTls);
    }
    if (message.response !== 0) {
      writer.uint32(24).int32(message.response);
    }
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandLookupTopicResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandLookupTopicResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.brokerServiceUrl = reader.string();
          break;
        case 2:
          message.brokerServiceUrlTls = reader.string();
          break;
        case 3:
          message.response = reader.int32() as any;
          break;
        case 4:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.authoritative = reader.bool();
          break;
        case 6:
          message.error = reader.int32() as any;
          break;
        case 7:
          message.message = reader.string();
          break;
        case 8:
          message.proxyThroughServiceUrl = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandLookupTopicResponse {
    return {
      brokerServiceUrl: isSet(object.brokerServiceUrl)
        ? String(object.brokerServiceUrl)
        : "",
      brokerServiceUrlTls: isSet(object.brokerServiceUrlTls)
        ? String(object.brokerServiceUrlTls)
        : "",
      response: isSet(object.response)
        ? commandLookupTopicResponse_LookupTypeFromJSON(object.response)
        : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      authoritative: isSet(object.authoritative)
        ? Boolean(object.authoritative)
        : false,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      proxyThroughServiceUrl: isSet(object.proxyThroughServiceUrl)
        ? Boolean(object.proxyThroughServiceUrl)
        : false,
    };
  },

  toJSON(message: CommandLookupTopicResponse): unknown {
    const obj: any = {};
    message.brokerServiceUrl !== undefined &&
      (obj.brokerServiceUrl = message.brokerServiceUrl);
    message.brokerServiceUrlTls !== undefined &&
      (obj.brokerServiceUrlTls = message.brokerServiceUrlTls);
    message.response !== undefined &&
      (obj.response = commandLookupTopicResponse_LookupTypeToJSON(
        message.response
      ));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.authoritative !== undefined &&
      (obj.authoritative = message.authoritative);
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    message.proxyThroughServiceUrl !== undefined &&
      (obj.proxyThroughServiceUrl = message.proxyThroughServiceUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandLookupTopicResponse>, I>>(
    object: I
  ): CommandLookupTopicResponse {
    const message = createBaseCommandLookupTopicResponse();
    message.brokerServiceUrl = object.brokerServiceUrl ?? "";
    message.brokerServiceUrlTls = object.brokerServiceUrlTls ?? "";
    message.response = object.response ?? 0;
    message.requestId = object.requestId ?? 0;
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
    producerId: 0,
    requestId: 0,
    producerName: "",
    encrypted: false,
    metadata: [],
    schema: undefined,
    epoch: 0,
    userProvidedProducerName: false,
    producerAccessMode: 0,
    topicEpoch: 0,
    txnEnabled: false,
    initialSubscriptionName: "",
  };
}

export const CommandProducer = {
  encode(
    message: CommandProducer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.producerId !== 0) {
      writer.uint32(16).uint64(message.producerId);
    }
    if (message.requestId !== 0) {
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
    if (message.epoch !== 0) {
      writer.uint32(64).uint64(message.epoch);
    }
    if (message.userProvidedProducerName === true) {
      writer.uint32(72).bool(message.userProvidedProducerName);
    }
    if (message.producerAccessMode !== 0) {
      writer.uint32(80).int32(message.producerAccessMode);
    }
    if (message.topicEpoch !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandProducer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = reader.string();
          break;
        case 2:
          message.producerId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.producerName = reader.string();
          break;
        case 5:
          message.encrypted = reader.bool();
          break;
        case 6:
          message.metadata.push(KeyValue.decode(reader, reader.uint32()));
          break;
        case 7:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        case 8:
          message.epoch = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.userProvidedProducerName = reader.bool();
          break;
        case 10:
          message.producerAccessMode = reader.int32() as any;
          break;
        case 11:
          message.topicEpoch = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.txnEnabled = reader.bool();
          break;
        case 13:
          message.initialSubscriptionName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandProducer {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      producerId: isSet(object.producerId) ? Number(object.producerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      producerName: isSet(object.producerName)
        ? String(object.producerName)
        : "",
      encrypted: isSet(object.encrypted) ? Boolean(object.encrypted) : false,
      metadata: Array.isArray(object?.metadata)
        ? object.metadata.map((e: any) => KeyValue.fromJSON(e))
        : [],
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      epoch: isSet(object.epoch) ? Number(object.epoch) : 0,
      userProvidedProducerName: isSet(object.userProvidedProducerName)
        ? Boolean(object.userProvidedProducerName)
        : false,
      producerAccessMode: isSet(object.producerAccessMode)
        ? producerAccessModeFromJSON(object.producerAccessMode)
        : 0,
      topicEpoch: isSet(object.topicEpoch) ? Number(object.topicEpoch) : 0,
      txnEnabled: isSet(object.txnEnabled) ? Boolean(object.txnEnabled) : false,
      initialSubscriptionName: isSet(object.initialSubscriptionName)
        ? String(object.initialSubscriptionName)
        : "",
    };
  },

  toJSON(message: CommandProducer): unknown {
    const obj: any = {};
    message.topic !== undefined && (obj.topic = message.topic);
    message.producerId !== undefined &&
      (obj.producerId = Math.round(message.producerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.producerName !== undefined &&
      (obj.producerName = message.producerName);
    message.encrypted !== undefined && (obj.encrypted = message.encrypted);
    if (message.metadata) {
      obj.metadata = message.metadata.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.metadata = [];
    }
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    message.epoch !== undefined && (obj.epoch = Math.round(message.epoch));
    message.userProvidedProducerName !== undefined &&
      (obj.userProvidedProducerName = message.userProvidedProducerName);
    message.producerAccessMode !== undefined &&
      (obj.producerAccessMode = producerAccessModeToJSON(
        message.producerAccessMode
      ));
    message.topicEpoch !== undefined &&
      (obj.topicEpoch = Math.round(message.topicEpoch));
    message.txnEnabled !== undefined && (obj.txnEnabled = message.txnEnabled);
    message.initialSubscriptionName !== undefined &&
      (obj.initialSubscriptionName = message.initialSubscriptionName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandProducer>, I>>(
    object: I
  ): CommandProducer {
    const message = createBaseCommandProducer();
    message.topic = object.topic ?? "";
    message.producerId = object.producerId ?? 0;
    message.requestId = object.requestId ?? 0;
    message.producerName = object.producerName ?? "";
    message.encrypted = object.encrypted ?? false;
    message.metadata =
      object.metadata?.map((e) => KeyValue.fromPartial(e)) || [];
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? Schema.fromPartial(object.schema)
        : undefined;
    message.epoch = object.epoch ?? 0;
    message.userProvidedProducerName = object.userProvidedProducerName ?? false;
    message.producerAccessMode = object.producerAccessMode ?? 0;
    message.topicEpoch = object.topicEpoch ?? 0;
    message.txnEnabled = object.txnEnabled ?? false;
    message.initialSubscriptionName = object.initialSubscriptionName ?? "";
    return message;
  },
};

function createBaseCommandSend(): CommandSend {
  return {
    producerId: 0,
    sequenceId: 0,
    numMessages: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    highestSequenceId: 0,
    isChunk: false,
    marker: false,
  };
}

export const CommandSend = {
  encode(
    message: CommandSend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.producerId !== 0) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (message.sequenceId !== 0) {
      writer.uint32(16).uint64(message.sequenceId);
    }
    if (message.numMessages !== 0) {
      writer.uint32(24).int32(message.numMessages);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(32).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(40).uint64(message.txnidMostBits);
    }
    if (message.highestSequenceId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.producerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.sequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.numMessages = reader.int32();
          break;
        case 4:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.highestSequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.isChunk = reader.bool();
          break;
        case 8:
          message.marker = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSend {
    return {
      producerId: isSet(object.producerId) ? Number(object.producerId) : 0,
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      numMessages: isSet(object.numMessages) ? Number(object.numMessages) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      highestSequenceId: isSet(object.highestSequenceId)
        ? Number(object.highestSequenceId)
        : 0,
      isChunk: isSet(object.isChunk) ? Boolean(object.isChunk) : false,
      marker: isSet(object.marker) ? Boolean(object.marker) : false,
    };
  },

  toJSON(message: CommandSend): unknown {
    const obj: any = {};
    message.producerId !== undefined &&
      (obj.producerId = Math.round(message.producerId));
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.numMessages !== undefined &&
      (obj.numMessages = Math.round(message.numMessages));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.highestSequenceId !== undefined &&
      (obj.highestSequenceId = Math.round(message.highestSequenceId));
    message.isChunk !== undefined && (obj.isChunk = message.isChunk);
    message.marker !== undefined && (obj.marker = message.marker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSend>, I>>(
    object: I
  ): CommandSend {
    const message = createBaseCommandSend();
    message.producerId = object.producerId ?? 0;
    message.sequenceId = object.sequenceId ?? 0;
    message.numMessages = object.numMessages ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.highestSequenceId = object.highestSequenceId ?? 0;
    message.isChunk = object.isChunk ?? false;
    message.marker = object.marker ?? false;
    return message;
  },
};

function createBaseCommandSendReceipt(): CommandSendReceipt {
  return {
    producerId: 0,
    sequenceId: 0,
    messageId: undefined,
    highestSequenceId: 0,
  };
}

export const CommandSendReceipt = {
  encode(
    message: CommandSendReceipt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.producerId !== 0) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (message.sequenceId !== 0) {
      writer.uint32(16).uint64(message.sequenceId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(
        message.messageId,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.highestSequenceId !== 0) {
      writer.uint32(32).uint64(message.highestSequenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSendReceipt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSendReceipt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.producerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.sequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = MessageIdData.decode(reader, reader.uint32());
          break;
        case 4:
          message.highestSequenceId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSendReceipt {
    return {
      producerId: isSet(object.producerId) ? Number(object.producerId) : 0,
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      messageId: isSet(object.messageId)
        ? MessageIdData.fromJSON(object.messageId)
        : undefined,
      highestSequenceId: isSet(object.highestSequenceId)
        ? Number(object.highestSequenceId)
        : 0,
    };
  },

  toJSON(message: CommandSendReceipt): unknown {
    const obj: any = {};
    message.producerId !== undefined &&
      (obj.producerId = Math.round(message.producerId));
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.messageId !== undefined &&
      (obj.messageId = message.messageId
        ? MessageIdData.toJSON(message.messageId)
        : undefined);
    message.highestSequenceId !== undefined &&
      (obj.highestSequenceId = Math.round(message.highestSequenceId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSendReceipt>, I>>(
    object: I
  ): CommandSendReceipt {
    const message = createBaseCommandSendReceipt();
    message.producerId = object.producerId ?? 0;
    message.sequenceId = object.sequenceId ?? 0;
    message.messageId =
      object.messageId !== undefined && object.messageId !== null
        ? MessageIdData.fromPartial(object.messageId)
        : undefined;
    message.highestSequenceId = object.highestSequenceId ?? 0;
    return message;
  },
};

function createBaseCommandSendError(): CommandSendError {
  return { producerId: 0, sequenceId: 0, error: 0, message: "" };
}

export const CommandSendError = {
  encode(
    message: CommandSendError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.producerId !== 0) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (message.sequenceId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSendError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.producerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.sequenceId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.error = reader.int32() as any;
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSendError {
    return {
      producerId: isSet(object.producerId) ? Number(object.producerId) : 0,
      sequenceId: isSet(object.sequenceId) ? Number(object.sequenceId) : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandSendError): unknown {
    const obj: any = {};
    message.producerId !== undefined &&
      (obj.producerId = Math.round(message.producerId));
    message.sequenceId !== undefined &&
      (obj.sequenceId = Math.round(message.sequenceId));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSendError>, I>>(
    object: I
  ): CommandSendError {
    const message = createBaseCommandSendError();
    message.producerId = object.producerId ?? 0;
    message.sequenceId = object.sequenceId ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandMessage(): CommandMessage {
  return {
    consumerId: 0,
    messageId: undefined,
    redeliveryCount: 0,
    ackSet: [],
    consumerEpoch: 0,
  };
}

export const CommandMessage = {
  encode(
    message: CommandMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(
        message.messageId,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.redeliveryCount !== 0) {
      writer.uint32(24).uint32(message.redeliveryCount);
    }
    writer.uint32(34).fork();
    for (const v of message.ackSet) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.consumerEpoch !== 0) {
      writer.uint32(40).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.messageId = MessageIdData.decode(reader, reader.uint32());
          break;
        case 3:
          message.redeliveryCount = reader.uint32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ackSet.push(longToNumber(reader.int64() as Long));
            }
          } else {
            message.ackSet.push(longToNumber(reader.int64() as Long));
          }
          break;
        case 5:
          message.consumerEpoch = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandMessage {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      messageId: isSet(object.messageId)
        ? MessageIdData.fromJSON(object.messageId)
        : undefined,
      redeliveryCount: isSet(object.redeliveryCount)
        ? Number(object.redeliveryCount)
        : 0,
      ackSet: Array.isArray(object?.ackSet)
        ? object.ackSet.map((e: any) => Number(e))
        : [],
      consumerEpoch: isSet(object.consumerEpoch)
        ? Number(object.consumerEpoch)
        : 0,
    };
  },

  toJSON(message: CommandMessage): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.messageId !== undefined &&
      (obj.messageId = message.messageId
        ? MessageIdData.toJSON(message.messageId)
        : undefined);
    message.redeliveryCount !== undefined &&
      (obj.redeliveryCount = Math.round(message.redeliveryCount));
    if (message.ackSet) {
      obj.ackSet = message.ackSet.map((e) => Math.round(e));
    } else {
      obj.ackSet = [];
    }
    message.consumerEpoch !== undefined &&
      (obj.consumerEpoch = Math.round(message.consumerEpoch));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandMessage>, I>>(
    object: I
  ): CommandMessage {
    const message = createBaseCommandMessage();
    message.consumerId = object.consumerId ?? 0;
    message.messageId =
      object.messageId !== undefined && object.messageId !== null
        ? MessageIdData.fromPartial(object.messageId)
        : undefined;
    message.redeliveryCount = object.redeliveryCount ?? 0;
    message.ackSet = object.ackSet?.map((e) => e) || [];
    message.consumerEpoch = object.consumerEpoch ?? 0;
    return message;
  },
};

function createBaseCommandAck(): CommandAck {
  return {
    consumerId: 0,
    ackType: 0,
    messageId: [],
    validationError: 0,
    properties: [],
    txnidLeastBits: 0,
    txnidMostBits: 0,
    requestId: 0,
  };
}

export const CommandAck = {
  encode(
    message: CommandAck,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
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
    if (message.txnidLeastBits !== 0) {
      writer.uint32(48).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(56).uint64(message.txnidMostBits);
    }
    if (message.requestId !== 0) {
      writer.uint32(64).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.ackType = reader.int32() as any;
          break;
        case 3:
          message.messageId.push(MessageIdData.decode(reader, reader.uint32()));
          break;
        case 4:
          message.validationError = reader.int32() as any;
          break;
        case 5:
          message.properties.push(KeyLongValue.decode(reader, reader.uint32()));
          break;
        case 6:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAck {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      ackType: isSet(object.ackType)
        ? commandAck_AckTypeFromJSON(object.ackType)
        : 0,
      messageId: Array.isArray(object?.messageId)
        ? object.messageId.map((e: any) => MessageIdData.fromJSON(e))
        : [],
      validationError: isSet(object.validationError)
        ? commandAck_ValidationErrorFromJSON(object.validationError)
        : 0,
      properties: Array.isArray(object?.properties)
        ? object.properties.map((e: any) => KeyLongValue.fromJSON(e))
        : [],
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandAck): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.ackType !== undefined &&
      (obj.ackType = commandAck_AckTypeToJSON(message.ackType));
    if (message.messageId) {
      obj.messageId = message.messageId.map((e) =>
        e ? MessageIdData.toJSON(e) : undefined
      );
    } else {
      obj.messageId = [];
    }
    message.validationError !== undefined &&
      (obj.validationError = commandAck_ValidationErrorToJSON(
        message.validationError
      ));
    if (message.properties) {
      obj.properties = message.properties.map((e) =>
        e ? KeyLongValue.toJSON(e) : undefined
      );
    } else {
      obj.properties = [];
    }
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAck>, I>>(
    object: I
  ): CommandAck {
    const message = createBaseCommandAck();
    message.consumerId = object.consumerId ?? 0;
    message.ackType = object.ackType ?? 0;
    message.messageId =
      object.messageId?.map((e) => MessageIdData.fromPartial(e)) || [];
    message.validationError = object.validationError ?? 0;
    message.properties =
      object.properties?.map((e) => KeyLongValue.fromPartial(e)) || [];
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandAckResponse(): CommandAckResponse {
  return {
    consumerId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
    requestId: 0,
  };
}

export const CommandAckResponse = {
  encode(
    message: CommandAckResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.error !== 0) {
      writer.uint32(32).int32(message.error);
    }
    if (message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    if (message.requestId !== 0) {
      writer.uint32(48).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        case 6:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAckResponse {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandAckResponse): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAckResponse>, I>>(
    object: I
  ): CommandAckResponse {
    const message = createBaseCommandAckResponse();
    message.consumerId = object.consumerId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandActiveConsumerChange(): CommandActiveConsumerChange {
  return { consumerId: 0, isActive: false };
}

export const CommandActiveConsumerChange = {
  encode(
    message: CommandActiveConsumerChange,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.isActive === true) {
      writer.uint32(16).bool(message.isActive);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandActiveConsumerChange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandActiveConsumerChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.isActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandActiveConsumerChange {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      isActive: isSet(object.isActive) ? Boolean(object.isActive) : false,
    };
  },

  toJSON(message: CommandActiveConsumerChange): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.isActive !== undefined && (obj.isActive = message.isActive);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandActiveConsumerChange>, I>>(
    object: I
  ): CommandActiveConsumerChange {
    const message = createBaseCommandActiveConsumerChange();
    message.consumerId = object.consumerId ?? 0;
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseCommandFlow(): CommandFlow {
  return { consumerId: 0, messagePermits: 0 };
}

export const CommandFlow = {
  encode(
    message: CommandFlow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.messagePermits !== 0) {
      writer.uint32(16).uint32(message.messagePermits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandFlow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandFlow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.messagePermits = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandFlow {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      messagePermits: isSet(object.messagePermits)
        ? Number(object.messagePermits)
        : 0,
    };
  },

  toJSON(message: CommandFlow): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.messagePermits !== undefined &&
      (obj.messagePermits = Math.round(message.messagePermits));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandFlow>, I>>(
    object: I
  ): CommandFlow {
    const message = createBaseCommandFlow();
    message.consumerId = object.consumerId ?? 0;
    message.messagePermits = object.messagePermits ?? 0;
    return message;
  },
};

function createBaseCommandUnsubscribe(): CommandUnsubscribe {
  return { consumerId: 0, requestId: 0 };
}

export const CommandUnsubscribe = {
  encode(
    message: CommandUnsubscribe,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandUnsubscribe {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandUnsubscribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandUnsubscribe {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandUnsubscribe): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandUnsubscribe>, I>>(
    object: I
  ): CommandUnsubscribe {
    const message = createBaseCommandUnsubscribe();
    message.consumerId = object.consumerId ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandSeek(): CommandSeek {
  return {
    consumerId: 0,
    requestId: 0,
    messageId: undefined,
    messagePublishTime: 0,
  };
}

export const CommandSeek = {
  encode(
    message: CommandSeek,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.messageId !== undefined) {
      MessageIdData.encode(
        message.messageId,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.messagePublishTime !== 0) {
      writer.uint32(32).uint64(message.messagePublishTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSeek {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSeek();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = MessageIdData.decode(reader, reader.uint32());
          break;
        case 4:
          message.messagePublishTime = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSeek {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      messageId: isSet(object.messageId)
        ? MessageIdData.fromJSON(object.messageId)
        : undefined,
      messagePublishTime: isSet(object.messagePublishTime)
        ? Number(object.messagePublishTime)
        : 0,
    };
  },

  toJSON(message: CommandSeek): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.messageId !== undefined &&
      (obj.messageId = message.messageId
        ? MessageIdData.toJSON(message.messageId)
        : undefined);
    message.messagePublishTime !== undefined &&
      (obj.messagePublishTime = Math.round(message.messagePublishTime));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSeek>, I>>(
    object: I
  ): CommandSeek {
    const message = createBaseCommandSeek();
    message.consumerId = object.consumerId ?? 0;
    message.requestId = object.requestId ?? 0;
    message.messageId =
      object.messageId !== undefined && object.messageId !== null
        ? MessageIdData.fromPartial(object.messageId)
        : undefined;
    message.messagePublishTime = object.messagePublishTime ?? 0;
    return message;
  },
};

function createBaseCommandReachedEndOfTopic(): CommandReachedEndOfTopic {
  return { consumerId: 0 };
}

export const CommandReachedEndOfTopic = {
  encode(
    message: CommandReachedEndOfTopic,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandReachedEndOfTopic {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandReachedEndOfTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandReachedEndOfTopic {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
    };
  },

  toJSON(message: CommandReachedEndOfTopic): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandReachedEndOfTopic>, I>>(
    object: I
  ): CommandReachedEndOfTopic {
    const message = createBaseCommandReachedEndOfTopic();
    message.consumerId = object.consumerId ?? 0;
    return message;
  },
};

function createBaseCommandCloseProducer(): CommandCloseProducer {
  return { producerId: 0, requestId: 0 };
}

export const CommandCloseProducer = {
  encode(
    message: CommandCloseProducer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.producerId !== 0) {
      writer.uint32(8).uint64(message.producerId);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandCloseProducer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandCloseProducer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.producerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandCloseProducer {
    return {
      producerId: isSet(object.producerId) ? Number(object.producerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandCloseProducer): unknown {
    const obj: any = {};
    message.producerId !== undefined &&
      (obj.producerId = Math.round(message.producerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandCloseProducer>, I>>(
    object: I
  ): CommandCloseProducer {
    const message = createBaseCommandCloseProducer();
    message.producerId = object.producerId ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandCloseConsumer(): CommandCloseConsumer {
  return { consumerId: 0, requestId: 0 };
}

export const CommandCloseConsumer = {
  encode(
    message: CommandCloseConsumer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandCloseConsumer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandCloseConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandCloseConsumer {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandCloseConsumer): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandCloseConsumer>, I>>(
    object: I
  ): CommandCloseConsumer {
    const message = createBaseCommandCloseConsumer();
    message.consumerId = object.consumerId ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandRedeliverUnacknowledgedMessages(): CommandRedeliverUnacknowledgedMessages {
  return { consumerId: 0, messageIds: [], consumerEpoch: 0 };
}

export const CommandRedeliverUnacknowledgedMessages = {
  encode(
    message: CommandRedeliverUnacknowledgedMessages,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    for (const v of message.messageIds) {
      MessageIdData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.consumerEpoch !== 0) {
      writer.uint32(24).uint64(message.consumerEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandRedeliverUnacknowledgedMessages {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandRedeliverUnacknowledgedMessages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.messageIds.push(
            MessageIdData.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.consumerEpoch = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandRedeliverUnacknowledgedMessages {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      messageIds: Array.isArray(object?.messageIds)
        ? object.messageIds.map((e: any) => MessageIdData.fromJSON(e))
        : [],
      consumerEpoch: isSet(object.consumerEpoch)
        ? Number(object.consumerEpoch)
        : 0,
    };
  },

  toJSON(message: CommandRedeliverUnacknowledgedMessages): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    if (message.messageIds) {
      obj.messageIds = message.messageIds.map((e) =>
        e ? MessageIdData.toJSON(e) : undefined
      );
    } else {
      obj.messageIds = [];
    }
    message.consumerEpoch !== undefined &&
      (obj.consumerEpoch = Math.round(message.consumerEpoch));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandRedeliverUnacknowledgedMessages>, I>
  >(object: I): CommandRedeliverUnacknowledgedMessages {
    const message = createBaseCommandRedeliverUnacknowledgedMessages();
    message.consumerId = object.consumerId ?? 0;
    message.messageIds =
      object.messageIds?.map((e) => MessageIdData.fromPartial(e)) || [];
    message.consumerEpoch = object.consumerEpoch ?? 0;
    return message;
  },
};

function createBaseCommandSuccess(): CommandSuccess {
  return { requestId: 0, schema: undefined };
}

export const CommandSuccess = {
  encode(
    message: CommandSuccess,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandSuccess {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandSuccess {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: CommandSuccess): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandSuccess>, I>>(
    object: I
  ): CommandSuccess {
    const message = createBaseCommandSuccess();
    message.requestId = object.requestId ?? 0;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? Schema.fromPartial(object.schema)
        : undefined;
    return message;
  },
};

function createBaseCommandProducerSuccess(): CommandProducerSuccess {
  return {
    requestId: 0,
    producerName: "",
    lastSequenceId: 0,
    schemaVersion: new Uint8Array(),
    topicEpoch: 0,
    producerReady: false,
  };
}

export const CommandProducerSuccess = {
  encode(
    message: CommandProducerSuccess,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.producerName !== "") {
      writer.uint32(18).string(message.producerName);
    }
    if (message.lastSequenceId !== 0) {
      writer.uint32(24).int64(message.lastSequenceId);
    }
    if (message.schemaVersion.length !== 0) {
      writer.uint32(34).bytes(message.schemaVersion);
    }
    if (message.topicEpoch !== 0) {
      writer.uint32(40).uint64(message.topicEpoch);
    }
    if (message.producerReady === true) {
      writer.uint32(48).bool(message.producerReady);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandProducerSuccess {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandProducerSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.producerName = reader.string();
          break;
        case 3:
          message.lastSequenceId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.schemaVersion = reader.bytes();
          break;
        case 5:
          message.topicEpoch = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.producerReady = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandProducerSuccess {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      producerName: isSet(object.producerName)
        ? String(object.producerName)
        : "",
      lastSequenceId: isSet(object.lastSequenceId)
        ? Number(object.lastSequenceId)
        : 0,
      schemaVersion: isSet(object.schemaVersion)
        ? bytesFromBase64(object.schemaVersion)
        : new Uint8Array(),
      topicEpoch: isSet(object.topicEpoch) ? Number(object.topicEpoch) : 0,
      producerReady: isSet(object.producerReady)
        ? Boolean(object.producerReady)
        : false,
    };
  },

  toJSON(message: CommandProducerSuccess): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.producerName !== undefined &&
      (obj.producerName = message.producerName);
    message.lastSequenceId !== undefined &&
      (obj.lastSequenceId = Math.round(message.lastSequenceId));
    message.schemaVersion !== undefined &&
      (obj.schemaVersion = base64FromBytes(
        message.schemaVersion !== undefined
          ? message.schemaVersion
          : new Uint8Array()
      ));
    message.topicEpoch !== undefined &&
      (obj.topicEpoch = Math.round(message.topicEpoch));
    message.producerReady !== undefined &&
      (obj.producerReady = message.producerReady);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandProducerSuccess>, I>>(
    object: I
  ): CommandProducerSuccess {
    const message = createBaseCommandProducerSuccess();
    message.requestId = object.requestId ?? 0;
    message.producerName = object.producerName ?? "";
    message.lastSequenceId = object.lastSequenceId ?? 0;
    message.schemaVersion = object.schemaVersion ?? new Uint8Array();
    message.topicEpoch = object.topicEpoch ?? 0;
    message.producerReady = object.producerReady ?? false;
    return message;
  },
};

function createBaseCommandError(): CommandError {
  return { requestId: 0, error: 0, message: "" };
}

export const CommandError = {
  encode(
    message: CommandError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandError {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandError): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandError>, I>>(
    object: I
  ): CommandError {
    const message = createBaseCommandError();
    message.requestId = object.requestId ?? 0;
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandPong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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

  fromPartial<I extends Exact<DeepPartial<CommandPong>, I>>(_: I): CommandPong {
    const message = createBaseCommandPong();
    return message;
  },
};

function createBaseCommandConsumerStats(): CommandConsumerStats {
  return { requestId: 0, consumerId: 0 };
}

export const CommandConsumerStats = {
  encode(
    message: CommandConsumerStats,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.consumerId !== 0) {
      writer.uint32(32).uint64(message.consumerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandConsumerStats {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConsumerStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandConsumerStats {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
    };
  },

  toJSON(message: CommandConsumerStats): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandConsumerStats>, I>>(
    object: I
  ): CommandConsumerStats {
    const message = createBaseCommandConsumerStats();
    message.requestId = object.requestId ?? 0;
    message.consumerId = object.consumerId ?? 0;
    return message;
  },
};

function createBaseCommandConsumerStatsResponse(): CommandConsumerStatsResponse {
  return {
    requestId: 0,
    errorCode: 0,
    errorMessage: "",
    msgRateOut: 0,
    msgThroughputOut: 0,
    msgRateRedeliver: 0,
    consumerName: "",
    availablePermits: 0,
    unackedMessages: 0,
    blockedConsumerOnUnackedMsgs: false,
    address: "",
    connectedSince: "",
    type: "",
    msgRateExpired: 0,
    msgBacklog: 0,
    messageAckRate: 0,
  };
}

export const CommandConsumerStatsResponse = {
  encode(
    message: CommandConsumerStatsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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
    if (message.availablePermits !== 0) {
      writer.uint32(64).uint64(message.availablePermits);
    }
    if (message.unackedMessages !== 0) {
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
    if (message.msgBacklog !== 0) {
      writer.uint32(120).uint64(message.msgBacklog);
    }
    if (message.messageAckRate !== 0) {
      writer.uint32(129).double(message.messageAckRate);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandConsumerStatsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandConsumerStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.errorCode = reader.int32() as any;
          break;
        case 3:
          message.errorMessage = reader.string();
          break;
        case 4:
          message.msgRateOut = reader.double();
          break;
        case 5:
          message.msgThroughputOut = reader.double();
          break;
        case 6:
          message.msgRateRedeliver = reader.double();
          break;
        case 7:
          message.consumerName = reader.string();
          break;
        case 8:
          message.availablePermits = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.unackedMessages = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.blockedConsumerOnUnackedMsgs = reader.bool();
          break;
        case 11:
          message.address = reader.string();
          break;
        case 12:
          message.connectedSince = reader.string();
          break;
        case 13:
          message.type = reader.string();
          break;
        case 14:
          message.msgRateExpired = reader.double();
          break;
        case 15:
          message.msgBacklog = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.messageAckRate = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandConsumerStatsResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      errorCode: isSet(object.errorCode)
        ? serverErrorFromJSON(object.errorCode)
        : 0,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      msgRateOut: isSet(object.msgRateOut) ? Number(object.msgRateOut) : 0,
      msgThroughputOut: isSet(object.msgThroughputOut)
        ? Number(object.msgThroughputOut)
        : 0,
      msgRateRedeliver: isSet(object.msgRateRedeliver)
        ? Number(object.msgRateRedeliver)
        : 0,
      consumerName: isSet(object.consumerName)
        ? String(object.consumerName)
        : "",
      availablePermits: isSet(object.availablePermits)
        ? Number(object.availablePermits)
        : 0,
      unackedMessages: isSet(object.unackedMessages)
        ? Number(object.unackedMessages)
        : 0,
      blockedConsumerOnUnackedMsgs: isSet(object.blockedConsumerOnUnackedMsgs)
        ? Boolean(object.blockedConsumerOnUnackedMsgs)
        : false,
      address: isSet(object.address) ? String(object.address) : "",
      connectedSince: isSet(object.connectedSince)
        ? String(object.connectedSince)
        : "",
      type: isSet(object.type) ? String(object.type) : "",
      msgRateExpired: isSet(object.msgRateExpired)
        ? Number(object.msgRateExpired)
        : 0,
      msgBacklog: isSet(object.msgBacklog) ? Number(object.msgBacklog) : 0,
      messageAckRate: isSet(object.messageAckRate)
        ? Number(object.messageAckRate)
        : 0,
    };
  },

  toJSON(message: CommandConsumerStatsResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.errorCode !== undefined &&
      (obj.errorCode = serverErrorToJSON(message.errorCode));
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    message.msgRateOut !== undefined && (obj.msgRateOut = message.msgRateOut);
    message.msgThroughputOut !== undefined &&
      (obj.msgThroughputOut = message.msgThroughputOut);
    message.msgRateRedeliver !== undefined &&
      (obj.msgRateRedeliver = message.msgRateRedeliver);
    message.consumerName !== undefined &&
      (obj.consumerName = message.consumerName);
    message.availablePermits !== undefined &&
      (obj.availablePermits = Math.round(message.availablePermits));
    message.unackedMessages !== undefined &&
      (obj.unackedMessages = Math.round(message.unackedMessages));
    message.blockedConsumerOnUnackedMsgs !== undefined &&
      (obj.blockedConsumerOnUnackedMsgs = message.blockedConsumerOnUnackedMsgs);
    message.address !== undefined && (obj.address = message.address);
    message.connectedSince !== undefined &&
      (obj.connectedSince = message.connectedSince);
    message.type !== undefined && (obj.type = message.type);
    message.msgRateExpired !== undefined &&
      (obj.msgRateExpired = message.msgRateExpired);
    message.msgBacklog !== undefined &&
      (obj.msgBacklog = Math.round(message.msgBacklog));
    message.messageAckRate !== undefined &&
      (obj.messageAckRate = message.messageAckRate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandConsumerStatsResponse>, I>>(
    object: I
  ): CommandConsumerStatsResponse {
    const message = createBaseCommandConsumerStatsResponse();
    message.requestId = object.requestId ?? 0;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.msgRateOut = object.msgRateOut ?? 0;
    message.msgThroughputOut = object.msgThroughputOut ?? 0;
    message.msgRateRedeliver = object.msgRateRedeliver ?? 0;
    message.consumerName = object.consumerName ?? "";
    message.availablePermits = object.availablePermits ?? 0;
    message.unackedMessages = object.unackedMessages ?? 0;
    message.blockedConsumerOnUnackedMsgs =
      object.blockedConsumerOnUnackedMsgs ?? false;
    message.address = object.address ?? "";
    message.connectedSince = object.connectedSince ?? "";
    message.type = object.type ?? "";
    message.msgRateExpired = object.msgRateExpired ?? 0;
    message.msgBacklog = object.msgBacklog ?? 0;
    message.messageAckRate = object.messageAckRate ?? 0;
    return message;
  },
};

function createBaseCommandGetLastMessageId(): CommandGetLastMessageId {
  return { consumerId: 0, requestId: 0 };
}

export const CommandGetLastMessageId = {
  encode(
    message: CommandGetLastMessageId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== 0) {
      writer.uint32(8).uint64(message.consumerId);
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetLastMessageId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetLastMessageId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetLastMessageId {
    return {
      consumerId: isSet(object.consumerId) ? Number(object.consumerId) : 0,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
    };
  },

  toJSON(message: CommandGetLastMessageId): unknown {
    const obj: any = {};
    message.consumerId !== undefined &&
      (obj.consumerId = Math.round(message.consumerId));
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetLastMessageId>, I>>(
    object: I
  ): CommandGetLastMessageId {
    const message = createBaseCommandGetLastMessageId();
    message.consumerId = object.consumerId ?? 0;
    message.requestId = object.requestId ?? 0;
    return message;
  },
};

function createBaseCommandGetLastMessageIdResponse(): CommandGetLastMessageIdResponse {
  return {
    lastMessageId: undefined,
    requestId: 0,
    consumerMarkDeletePosition: undefined,
  };
}

export const CommandGetLastMessageIdResponse = {
  encode(
    message: CommandGetLastMessageIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.lastMessageId !== undefined) {
      MessageIdData.encode(
        message.lastMessageId,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.requestId !== 0) {
      writer.uint32(16).uint64(message.requestId);
    }
    if (message.consumerMarkDeletePosition !== undefined) {
      MessageIdData.encode(
        message.consumerMarkDeletePosition,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetLastMessageIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetLastMessageIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastMessageId = MessageIdData.decode(reader, reader.uint32());
          break;
        case 2:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.consumerMarkDeletePosition = MessageIdData.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetLastMessageIdResponse {
    return {
      lastMessageId: isSet(object.lastMessageId)
        ? MessageIdData.fromJSON(object.lastMessageId)
        : undefined,
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      consumerMarkDeletePosition: isSet(object.consumerMarkDeletePosition)
        ? MessageIdData.fromJSON(object.consumerMarkDeletePosition)
        : undefined,
    };
  },

  toJSON(message: CommandGetLastMessageIdResponse): unknown {
    const obj: any = {};
    message.lastMessageId !== undefined &&
      (obj.lastMessageId = message.lastMessageId
        ? MessageIdData.toJSON(message.lastMessageId)
        : undefined);
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.consumerMarkDeletePosition !== undefined &&
      (obj.consumerMarkDeletePosition = message.consumerMarkDeletePosition
        ? MessageIdData.toJSON(message.consumerMarkDeletePosition)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetLastMessageIdResponse>, I>>(
    object: I
  ): CommandGetLastMessageIdResponse {
    const message = createBaseCommandGetLastMessageIdResponse();
    message.lastMessageId =
      object.lastMessageId !== undefined && object.lastMessageId !== null
        ? MessageIdData.fromPartial(object.lastMessageId)
        : undefined;
    message.requestId = object.requestId ?? 0;
    message.consumerMarkDeletePosition =
      object.consumerMarkDeletePosition !== undefined &&
      object.consumerMarkDeletePosition !== null
        ? MessageIdData.fromPartial(object.consumerMarkDeletePosition)
        : undefined;
    return message;
  },
};

function createBaseCommandGetTopicsOfNamespace(): CommandGetTopicsOfNamespace {
  return {
    requestId: 0,
    namespace: "",
    mode: 0,
    topicsPattern: "",
    topicsHash: "",
  };
}

export const CommandGetTopicsOfNamespace = {
  encode(
    message: CommandGetTopicsOfNamespace,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetTopicsOfNamespace {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetTopicsOfNamespace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.namespace = reader.string();
          break;
        case 3:
          message.mode = reader.int32() as any;
          break;
        case 4:
          message.topicsPattern = reader.string();
          break;
        case 5:
          message.topicsHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetTopicsOfNamespace {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      mode: isSet(object.mode)
        ? commandGetTopicsOfNamespace_ModeFromJSON(object.mode)
        : 0,
      topicsPattern: isSet(object.topicsPattern)
        ? String(object.topicsPattern)
        : "",
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandGetTopicsOfNamespace): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.mode !== undefined &&
      (obj.mode = commandGetTopicsOfNamespace_ModeToJSON(message.mode));
    message.topicsPattern !== undefined &&
      (obj.topicsPattern = message.topicsPattern);
    message.topicsHash !== undefined && (obj.topicsHash = message.topicsHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetTopicsOfNamespace>, I>>(
    object: I
  ): CommandGetTopicsOfNamespace {
    const message = createBaseCommandGetTopicsOfNamespace();
    message.requestId = object.requestId ?? 0;
    message.namespace = object.namespace ?? "";
    message.mode = object.mode ?? 0;
    message.topicsPattern = object.topicsPattern ?? "";
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandGetTopicsOfNamespaceResponse(): CommandGetTopicsOfNamespaceResponse {
  return {
    requestId: 0,
    topics: [],
    filtered: false,
    topicsHash: "",
    changed: false,
  };
}

export const CommandGetTopicsOfNamespaceResponse = {
  encode(
    message: CommandGetTopicsOfNamespaceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetTopicsOfNamespaceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetTopicsOfNamespaceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.topics.push(reader.string());
          break;
        case 3:
          message.filtered = reader.bool();
          break;
        case 4:
          message.topicsHash = reader.string();
          break;
        case 5:
          message.changed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetTopicsOfNamespaceResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      topics: Array.isArray(object?.topics)
        ? object.topics.map((e: any) => String(e))
        : [],
      filtered: isSet(object.filtered) ? Boolean(object.filtered) : false,
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
      changed: isSet(object.changed) ? Boolean(object.changed) : false,
    };
  },

  toJSON(message: CommandGetTopicsOfNamespaceResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    if (message.topics) {
      obj.topics = message.topics.map((e) => e);
    } else {
      obj.topics = [];
    }
    message.filtered !== undefined && (obj.filtered = message.filtered);
    message.topicsHash !== undefined && (obj.topicsHash = message.topicsHash);
    message.changed !== undefined && (obj.changed = message.changed);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandGetTopicsOfNamespaceResponse>, I>
  >(object: I): CommandGetTopicsOfNamespaceResponse {
    const message = createBaseCommandGetTopicsOfNamespaceResponse();
    message.requestId = object.requestId ?? 0;
    message.topics = object.topics?.map((e) => e) || [];
    message.filtered = object.filtered ?? false;
    message.topicsHash = object.topicsHash ?? "";
    message.changed = object.changed ?? false;
    return message;
  },
};

function createBaseCommandWatchTopicList(): CommandWatchTopicList {
  return {
    requestId: 0,
    watcherId: 0,
    namespace: "",
    topicsPattern: "",
    topicsHash: "",
  };
}

export const CommandWatchTopicList = {
  encode(
    message: CommandWatchTopicList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.watcherId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandWatchTopicList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.watcherId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.namespace = reader.string();
          break;
        case 4:
          message.topicsPattern = reader.string();
          break;
        case 5:
          message.topicsHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicList {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      watcherId: isSet(object.watcherId) ? Number(object.watcherId) : 0,
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      topicsPattern: isSet(object.topicsPattern)
        ? String(object.topicsPattern)
        : "",
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicList): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.watcherId !== undefined &&
      (obj.watcherId = Math.round(message.watcherId));
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.topicsPattern !== undefined &&
      (obj.topicsPattern = message.topicsPattern);
    message.topicsHash !== undefined && (obj.topicsHash = message.topicsHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicList>, I>>(
    object: I
  ): CommandWatchTopicList {
    const message = createBaseCommandWatchTopicList();
    message.requestId = object.requestId ?? 0;
    message.watcherId = object.watcherId ?? 0;
    message.namespace = object.namespace ?? "";
    message.topicsPattern = object.topicsPattern ?? "";
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicListSuccess(): CommandWatchTopicListSuccess {
  return { requestId: 0, watcherId: 0, topic: [], topicsHash: "" };
}

export const CommandWatchTopicListSuccess = {
  encode(
    message: CommandWatchTopicListSuccess,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.watcherId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandWatchTopicListSuccess {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicListSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.watcherId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.topic.push(reader.string());
          break;
        case 4:
          message.topicsHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicListSuccess {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      watcherId: isSet(object.watcherId) ? Number(object.watcherId) : 0,
      topic: Array.isArray(object?.topic)
        ? object.topic.map((e: any) => String(e))
        : [],
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicListSuccess): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.watcherId !== undefined &&
      (obj.watcherId = Math.round(message.watcherId));
    if (message.topic) {
      obj.topic = message.topic.map((e) => e);
    } else {
      obj.topic = [];
    }
    message.topicsHash !== undefined && (obj.topicsHash = message.topicsHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicListSuccess>, I>>(
    object: I
  ): CommandWatchTopicListSuccess {
    const message = createBaseCommandWatchTopicListSuccess();
    message.requestId = object.requestId ?? 0;
    message.watcherId = object.watcherId ?? 0;
    message.topic = object.topic?.map((e) => e) || [];
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicUpdate(): CommandWatchTopicUpdate {
  return { watcherId: 0, newTopics: [], deletedTopics: [], topicsHash: "" };
}

export const CommandWatchTopicUpdate = {
  encode(
    message: CommandWatchTopicUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.watcherId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandWatchTopicUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.watcherId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newTopics.push(reader.string());
          break;
        case 3:
          message.deletedTopics.push(reader.string());
          break;
        case 4:
          message.topicsHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicUpdate {
    return {
      watcherId: isSet(object.watcherId) ? Number(object.watcherId) : 0,
      newTopics: Array.isArray(object?.newTopics)
        ? object.newTopics.map((e: any) => String(e))
        : [],
      deletedTopics: Array.isArray(object?.deletedTopics)
        ? object.deletedTopics.map((e: any) => String(e))
        : [],
      topicsHash: isSet(object.topicsHash) ? String(object.topicsHash) : "",
    };
  },

  toJSON(message: CommandWatchTopicUpdate): unknown {
    const obj: any = {};
    message.watcherId !== undefined &&
      (obj.watcherId = Math.round(message.watcherId));
    if (message.newTopics) {
      obj.newTopics = message.newTopics.map((e) => e);
    } else {
      obj.newTopics = [];
    }
    if (message.deletedTopics) {
      obj.deletedTopics = message.deletedTopics.map((e) => e);
    } else {
      obj.deletedTopics = [];
    }
    message.topicsHash !== undefined && (obj.topicsHash = message.topicsHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicUpdate>, I>>(
    object: I
  ): CommandWatchTopicUpdate {
    const message = createBaseCommandWatchTopicUpdate();
    message.watcherId = object.watcherId ?? 0;
    message.newTopics = object.newTopics?.map((e) => e) || [];
    message.deletedTopics = object.deletedTopics?.map((e) => e) || [];
    message.topicsHash = object.topicsHash ?? "";
    return message;
  },
};

function createBaseCommandWatchTopicListClose(): CommandWatchTopicListClose {
  return { requestId: 0, watcherId: 0 };
}

export const CommandWatchTopicListClose = {
  encode(
    message: CommandWatchTopicListClose,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.watcherId !== 0) {
      writer.uint32(16).uint64(message.watcherId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandWatchTopicListClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandWatchTopicListClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.watcherId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandWatchTopicListClose {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      watcherId: isSet(object.watcherId) ? Number(object.watcherId) : 0,
    };
  },

  toJSON(message: CommandWatchTopicListClose): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.watcherId !== undefined &&
      (obj.watcherId = Math.round(message.watcherId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandWatchTopicListClose>, I>>(
    object: I
  ): CommandWatchTopicListClose {
    const message = createBaseCommandWatchTopicListClose();
    message.requestId = object.requestId ?? 0;
    message.watcherId = object.watcherId ?? 0;
    return message;
  },
};

function createBaseCommandGetSchema(): CommandGetSchema {
  return { requestId: 0, topic: "", schemaVersion: new Uint8Array() };
}

export const CommandGetSchema = {
  encode(
    message: CommandGetSchema,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.topic = reader.string();
          break;
        case 3:
          message.schemaVersion = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetSchema {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      topic: isSet(object.topic) ? String(object.topic) : "",
      schemaVersion: isSet(object.schemaVersion)
        ? bytesFromBase64(object.schemaVersion)
        : new Uint8Array(),
    };
  },

  toJSON(message: CommandGetSchema): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.topic !== undefined && (obj.topic = message.topic);
    message.schemaVersion !== undefined &&
      (obj.schemaVersion = base64FromBytes(
        message.schemaVersion !== undefined
          ? message.schemaVersion
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetSchema>, I>>(
    object: I
  ): CommandGetSchema {
    const message = createBaseCommandGetSchema();
    message.requestId = object.requestId ?? 0;
    message.topic = object.topic ?? "";
    message.schemaVersion = object.schemaVersion ?? new Uint8Array();
    return message;
  },
};

function createBaseCommandGetSchemaResponse(): CommandGetSchemaResponse {
  return {
    requestId: 0,
    errorCode: 0,
    errorMessage: "",
    schema: undefined,
    schemaVersion: new Uint8Array(),
  };
}

export const CommandGetSchemaResponse = {
  encode(
    message: CommandGetSchemaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.errorCode = reader.int32() as any;
          break;
        case 3:
          message.errorMessage = reader.string();
          break;
        case 4:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        case 5:
          message.schemaVersion = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetSchemaResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      errorCode: isSet(object.errorCode)
        ? serverErrorFromJSON(object.errorCode)
        : 0,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
      schemaVersion: isSet(object.schemaVersion)
        ? bytesFromBase64(object.schemaVersion)
        : new Uint8Array(),
    };
  },

  toJSON(message: CommandGetSchemaResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.errorCode !== undefined &&
      (obj.errorCode = serverErrorToJSON(message.errorCode));
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    message.schemaVersion !== undefined &&
      (obj.schemaVersion = base64FromBytes(
        message.schemaVersion !== undefined
          ? message.schemaVersion
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetSchemaResponse>, I>>(
    object: I
  ): CommandGetSchemaResponse {
    const message = createBaseCommandGetSchemaResponse();
    message.requestId = object.requestId ?? 0;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? Schema.fromPartial(object.schema)
        : undefined;
    message.schemaVersion = object.schemaVersion ?? new Uint8Array();
    return message;
  },
};

function createBaseCommandGetOrCreateSchema(): CommandGetOrCreateSchema {
  return { requestId: 0, topic: "", schema: undefined };
}

export const CommandGetOrCreateSchema = {
  encode(
    message: CommandGetOrCreateSchema,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetOrCreateSchema {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetOrCreateSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.topic = reader.string();
          break;
        case 3:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetOrCreateSchema {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      topic: isSet(object.topic) ? String(object.topic) : "",
      schema: isSet(object.schema) ? Schema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: CommandGetOrCreateSchema): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.topic !== undefined && (obj.topic = message.topic);
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandGetOrCreateSchema>, I>>(
    object: I
  ): CommandGetOrCreateSchema {
    const message = createBaseCommandGetOrCreateSchema();
    message.requestId = object.requestId ?? 0;
    message.topic = object.topic ?? "";
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? Schema.fromPartial(object.schema)
        : undefined;
    return message;
  },
};

function createBaseCommandGetOrCreateSchemaResponse(): CommandGetOrCreateSchemaResponse {
  return {
    requestId: 0,
    errorCode: 0,
    errorMessage: "",
    schemaVersion: new Uint8Array(),
  };
}

export const CommandGetOrCreateSchemaResponse = {
  encode(
    message: CommandGetOrCreateSchemaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandGetOrCreateSchemaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandGetOrCreateSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.errorCode = reader.int32() as any;
          break;
        case 3:
          message.errorMessage = reader.string();
          break;
        case 4:
          message.schemaVersion = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandGetOrCreateSchemaResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      errorCode: isSet(object.errorCode)
        ? serverErrorFromJSON(object.errorCode)
        : 0,
      errorMessage: isSet(object.errorMessage)
        ? String(object.errorMessage)
        : "",
      schemaVersion: isSet(object.schemaVersion)
        ? bytesFromBase64(object.schemaVersion)
        : new Uint8Array(),
    };
  },

  toJSON(message: CommandGetOrCreateSchemaResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.errorCode !== undefined &&
      (obj.errorCode = serverErrorToJSON(message.errorCode));
    message.errorMessage !== undefined &&
      (obj.errorMessage = message.errorMessage);
    message.schemaVersion !== undefined &&
      (obj.schemaVersion = base64FromBytes(
        message.schemaVersion !== undefined
          ? message.schemaVersion
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandGetOrCreateSchemaResponse>, I>
  >(object: I): CommandGetOrCreateSchemaResponse {
    const message = createBaseCommandGetOrCreateSchemaResponse();
    message.requestId = object.requestId ?? 0;
    message.errorCode = object.errorCode ?? 0;
    message.errorMessage = object.errorMessage ?? "";
    message.schemaVersion = object.schemaVersion ?? new Uint8Array();
    return message;
  },
};

function createBaseCommandTcClientConnectRequest(): CommandTcClientConnectRequest {
  return { requestId: 0, tcId: 0 };
}

export const CommandTcClientConnectRequest = {
  encode(
    message: CommandTcClientConnectRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.tcId !== 0) {
      writer.uint32(16).uint64(message.tcId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandTcClientConnectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandTcClientConnectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.tcId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandTcClientConnectRequest {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      tcId: isSet(object.tcId) ? Number(object.tcId) : 0,
    };
  },

  toJSON(message: CommandTcClientConnectRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.tcId !== undefined && (obj.tcId = Math.round(message.tcId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandTcClientConnectRequest>, I>>(
    object: I
  ): CommandTcClientConnectRequest {
    const message = createBaseCommandTcClientConnectRequest();
    message.requestId = object.requestId ?? 0;
    message.tcId = object.tcId ?? 0;
    return message;
  },
};

function createBaseCommandTcClientConnectResponse(): CommandTcClientConnectResponse {
  return { requestId: 0, error: 0, message: "" };
}

export const CommandTcClientConnectResponse = {
  encode(
    message: CommandTcClientConnectResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandTcClientConnectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandTcClientConnectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.error = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandTcClientConnectResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandTcClientConnectResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandTcClientConnectResponse>, I>>(
    object: I
  ): CommandTcClientConnectResponse {
    const message = createBaseCommandTcClientConnectResponse();
    message.requestId = object.requestId ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandNewTxn(): CommandNewTxn {
  return { requestId: 0, txnTtlSeconds: 0, tcId: 0 };
}

export const CommandNewTxn = {
  encode(
    message: CommandNewTxn,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnTtlSeconds !== 0) {
      writer.uint32(16).uint64(message.txnTtlSeconds);
    }
    if (message.tcId !== 0) {
      writer.uint32(24).uint64(message.tcId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandNewTxn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandNewTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnTtlSeconds = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.tcId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandNewTxn {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnTtlSeconds: isSet(object.txnTtlSeconds)
        ? Number(object.txnTtlSeconds)
        : 0,
      tcId: isSet(object.tcId) ? Number(object.tcId) : 0,
    };
  },

  toJSON(message: CommandNewTxn): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnTtlSeconds !== undefined &&
      (obj.txnTtlSeconds = Math.round(message.txnTtlSeconds));
    message.tcId !== undefined && (obj.tcId = Math.round(message.tcId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandNewTxn>, I>>(
    object: I
  ): CommandNewTxn {
    const message = createBaseCommandNewTxn();
    message.requestId = object.requestId ?? 0;
    message.txnTtlSeconds = object.txnTtlSeconds ?? 0;
    message.tcId = object.tcId ?? 0;
    return message;
  },
};

function createBaseCommandNewTxnResponse(): CommandNewTxnResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandNewTxnResponse = {
  encode(
    message: CommandNewTxnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandNewTxnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandNewTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandNewTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandNewTxnResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandNewTxnResponse>, I>>(
    object: I
  ): CommandNewTxnResponse {
    const message = createBaseCommandNewTxnResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandAddPartitionToTxn(): CommandAddPartitionToTxn {
  return { requestId: 0, txnidLeastBits: 0, txnidMostBits: 0, partitions: [] };
}

export const CommandAddPartitionToTxn = {
  encode(
    message: CommandAddPartitionToTxn,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    for (const v of message.partitions) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandAddPartitionToTxn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddPartitionToTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.partitions.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAddPartitionToTxn {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      partitions: Array.isArray(object?.partitions)
        ? object.partitions.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CommandAddPartitionToTxn): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    if (message.partitions) {
      obj.partitions = message.partitions.map((e) => e);
    } else {
      obj.partitions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAddPartitionToTxn>, I>>(
    object: I
  ): CommandAddPartitionToTxn {
    const message = createBaseCommandAddPartitionToTxn();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.partitions = object.partitions?.map((e) => e) || [];
    return message;
  },
};

function createBaseCommandAddPartitionToTxnResponse(): CommandAddPartitionToTxnResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandAddPartitionToTxnResponse = {
  encode(
    message: CommandAddPartitionToTxnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandAddPartitionToTxnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddPartitionToTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAddPartitionToTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandAddPartitionToTxnResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandAddPartitionToTxnResponse>, I>
  >(object: I): CommandAddPartitionToTxnResponse {
    const message = createBaseCommandAddPartitionToTxnResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSubscription(): Subscription {
  return { topic: "", subscription: "" };
}

export const Subscription = {
  encode(
    message: Subscription,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== "") {
      writer.uint32(10).string(message.topic);
    }
    if (message.subscription !== "") {
      writer.uint32(18).string(message.subscription);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Subscription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = reader.string();
          break;
        case 2:
          message.subscription = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Subscription {
    return {
      topic: isSet(object.topic) ? String(object.topic) : "",
      subscription: isSet(object.subscription)
        ? String(object.subscription)
        : "",
    };
  },

  toJSON(message: Subscription): unknown {
    const obj: any = {};
    message.topic !== undefined && (obj.topic = message.topic);
    message.subscription !== undefined &&
      (obj.subscription = message.subscription);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Subscription>, I>>(
    object: I
  ): Subscription {
    const message = createBaseSubscription();
    message.topic = object.topic ?? "";
    message.subscription = object.subscription ?? "";
    return message;
  },
};

function createBaseCommandAddSubscriptionToTxn(): CommandAddSubscriptionToTxn {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    subscription: [],
  };
}

export const CommandAddSubscriptionToTxn = {
  encode(
    message: CommandAddSubscriptionToTxn,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    for (const v of message.subscription) {
      Subscription.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandAddSubscriptionToTxn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddSubscriptionToTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.subscription.push(
            Subscription.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAddSubscriptionToTxn {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      subscription: Array.isArray(object?.subscription)
        ? object.subscription.map((e: any) => Subscription.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommandAddSubscriptionToTxn): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    if (message.subscription) {
      obj.subscription = message.subscription.map((e) =>
        e ? Subscription.toJSON(e) : undefined
      );
    } else {
      obj.subscription = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandAddSubscriptionToTxn>, I>>(
    object: I
  ): CommandAddSubscriptionToTxn {
    const message = createBaseCommandAddSubscriptionToTxn();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.subscription =
      object.subscription?.map((e) => Subscription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommandAddSubscriptionToTxnResponse(): CommandAddSubscriptionToTxnResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandAddSubscriptionToTxnResponse = {
  encode(
    message: CommandAddSubscriptionToTxnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandAddSubscriptionToTxnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandAddSubscriptionToTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandAddSubscriptionToTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandAddSubscriptionToTxnResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandAddSubscriptionToTxnResponse>, I>
  >(object: I): CommandAddSubscriptionToTxnResponse {
    const message = createBaseCommandAddSubscriptionToTxnResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxn(): CommandEndTxn {
  return { requestId: 0, txnidLeastBits: 0, txnidMostBits: 0, txnAction: 0 };
}

export const CommandEndTxn = {
  encode(
    message: CommandEndTxn,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.txnAction !== 0) {
      writer.uint32(32).int32(message.txnAction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandEndTxn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.txnAction = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxn {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      txnAction: isSet(object.txnAction)
        ? txnActionFromJSON(object.txnAction)
        : 0,
    };
  },

  toJSON(message: CommandEndTxn): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.txnAction !== undefined &&
      (obj.txnAction = txnActionToJSON(message.txnAction));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandEndTxn>, I>>(
    object: I
  ): CommandEndTxn {
    const message = createBaseCommandEndTxn();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.txnAction = object.txnAction ?? 0;
    return message;
  },
};

function createBaseCommandEndTxnResponse(): CommandEndTxnResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandEndTxnResponse = {
  encode(
    message: CommandEndTxnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandEndTxnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandEndTxnResponse>, I>>(
    object: I
  ): CommandEndTxnResponse {
    const message = createBaseCommandEndTxnResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxnOnPartition(): CommandEndTxnOnPartition {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    topic: "",
    txnAction: 0,
    txnidLeastBitsOfLowWatermark: 0,
  };
}

export const CommandEndTxnOnPartition = {
  encode(
    message: CommandEndTxnOnPartition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.topic !== "") {
      writer.uint32(34).string(message.topic);
    }
    if (message.txnAction !== 0) {
      writer.uint32(40).int32(message.txnAction);
    }
    if (message.txnidLeastBitsOfLowWatermark !== 0) {
      writer.uint32(48).uint64(message.txnidLeastBitsOfLowWatermark);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandEndTxnOnPartition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnPartition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.topic = reader.string();
          break;
        case 5:
          message.txnAction = reader.int32() as any;
          break;
        case 6:
          message.txnidLeastBitsOfLowWatermark = longToNumber(
            reader.uint64() as Long
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnPartition {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      topic: isSet(object.topic) ? String(object.topic) : "",
      txnAction: isSet(object.txnAction)
        ? txnActionFromJSON(object.txnAction)
        : 0,
      txnidLeastBitsOfLowWatermark: isSet(object.txnidLeastBitsOfLowWatermark)
        ? Number(object.txnidLeastBitsOfLowWatermark)
        : 0,
    };
  },

  toJSON(message: CommandEndTxnOnPartition): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.topic !== undefined && (obj.topic = message.topic);
    message.txnAction !== undefined &&
      (obj.txnAction = txnActionToJSON(message.txnAction));
    message.txnidLeastBitsOfLowWatermark !== undefined &&
      (obj.txnidLeastBitsOfLowWatermark = Math.round(
        message.txnidLeastBitsOfLowWatermark
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnPartition>, I>>(
    object: I
  ): CommandEndTxnOnPartition {
    const message = createBaseCommandEndTxnOnPartition();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.topic = object.topic ?? "";
    message.txnAction = object.txnAction ?? 0;
    message.txnidLeastBitsOfLowWatermark =
      object.txnidLeastBitsOfLowWatermark ?? 0;
    return message;
  },
};

function createBaseCommandEndTxnOnPartitionResponse(): CommandEndTxnOnPartitionResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandEndTxnOnPartitionResponse = {
  encode(
    message: CommandEndTxnOnPartitionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandEndTxnOnPartitionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnPartitionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnPartitionResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnOnPartitionResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandEndTxnOnPartitionResponse>, I>
  >(object: I): CommandEndTxnOnPartitionResponse {
    const message = createBaseCommandEndTxnOnPartitionResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.error = object.error ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommandEndTxnOnSubscription(): CommandEndTxnOnSubscription {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    subscription: undefined,
    txnAction: 0,
    txnidLeastBitsOfLowWatermark: 0,
  };
}

export const CommandEndTxnOnSubscription = {
  encode(
    message: CommandEndTxnOnSubscription,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
      writer.uint32(24).uint64(message.txnidMostBits);
    }
    if (message.subscription !== undefined) {
      Subscription.encode(
        message.subscription,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.txnAction !== 0) {
      writer.uint32(40).int32(message.txnAction);
    }
    if (message.txnidLeastBitsOfLowWatermark !== 0) {
      writer.uint32(48).uint64(message.txnidLeastBitsOfLowWatermark);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandEndTxnOnSubscription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnSubscription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.subscription = Subscription.decode(reader, reader.uint32());
          break;
        case 5:
          message.txnAction = reader.int32() as any;
          break;
        case 6:
          message.txnidLeastBitsOfLowWatermark = longToNumber(
            reader.uint64() as Long
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnSubscription {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      subscription: isSet(object.subscription)
        ? Subscription.fromJSON(object.subscription)
        : undefined,
      txnAction: isSet(object.txnAction)
        ? txnActionFromJSON(object.txnAction)
        : 0,
      txnidLeastBitsOfLowWatermark: isSet(object.txnidLeastBitsOfLowWatermark)
        ? Number(object.txnidLeastBitsOfLowWatermark)
        : 0,
    };
  },

  toJSON(message: CommandEndTxnOnSubscription): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.subscription !== undefined &&
      (obj.subscription = message.subscription
        ? Subscription.toJSON(message.subscription)
        : undefined);
    message.txnAction !== undefined &&
      (obj.txnAction = txnActionToJSON(message.txnAction));
    message.txnidLeastBitsOfLowWatermark !== undefined &&
      (obj.txnidLeastBitsOfLowWatermark = Math.round(
        message.txnidLeastBitsOfLowWatermark
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommandEndTxnOnSubscription>, I>>(
    object: I
  ): CommandEndTxnOnSubscription {
    const message = createBaseCommandEndTxnOnSubscription();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
    message.subscription =
      object.subscription !== undefined && object.subscription !== null
        ? Subscription.fromPartial(object.subscription)
        : undefined;
    message.txnAction = object.txnAction ?? 0;
    message.txnidLeastBitsOfLowWatermark =
      object.txnidLeastBitsOfLowWatermark ?? 0;
    return message;
  },
};

function createBaseCommandEndTxnOnSubscriptionResponse(): CommandEndTxnOnSubscriptionResponse {
  return {
    requestId: 0,
    txnidLeastBits: 0,
    txnidMostBits: 0,
    error: 0,
    message: "",
  };
}

export const CommandEndTxnOnSubscriptionResponse = {
  encode(
    message: CommandEndTxnOnSubscriptionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).uint64(message.requestId);
    }
    if (message.txnidLeastBits !== 0) {
      writer.uint32(16).uint64(message.txnidLeastBits);
    }
    if (message.txnidMostBits !== 0) {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommandEndTxnOnSubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandEndTxnOnSubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.txnidLeastBits = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.txnidMostBits = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.error = reader.int32() as any;
          break;
        case 5:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommandEndTxnOnSubscriptionResponse {
    return {
      requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
      txnidLeastBits: isSet(object.txnidLeastBits)
        ? Number(object.txnidLeastBits)
        : 0,
      txnidMostBits: isSet(object.txnidMostBits)
        ? Number(object.txnidMostBits)
        : 0,
      error: isSet(object.error) ? serverErrorFromJSON(object.error) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: CommandEndTxnOnSubscriptionResponse): unknown {
    const obj: any = {};
    message.requestId !== undefined &&
      (obj.requestId = Math.round(message.requestId));
    message.txnidLeastBits !== undefined &&
      (obj.txnidLeastBits = Math.round(message.txnidLeastBits));
    message.txnidMostBits !== undefined &&
      (obj.txnidMostBits = Math.round(message.txnidMostBits));
    message.error !== undefined &&
      (obj.error = serverErrorToJSON(message.error));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CommandEndTxnOnSubscriptionResponse>, I>
  >(object: I): CommandEndTxnOnSubscriptionResponse {
    const message = createBaseCommandEndTxnOnSubscriptionResponse();
    message.requestId = object.requestId ?? 0;
    message.txnidLeastBits = object.txnidLeastBits ?? 0;
    message.txnidMostBits = object.txnidMostBits ?? 0;
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
  encode(
    message: BaseCommand,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 2) {
      writer.uint32(8).int32(message.type);
    }
    if (message.connect !== undefined) {
      CommandConnect.encode(message.connect, writer.uint32(18).fork()).ldelim();
    }
    if (message.connected !== undefined) {
      CommandConnected.encode(
        message.connected,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.subscribe !== undefined) {
      CommandSubscribe.encode(
        message.subscribe,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.producer !== undefined) {
      CommandProducer.encode(
        message.producer,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.send !== undefined) {
      CommandSend.encode(message.send, writer.uint32(50).fork()).ldelim();
    }
    if (message.sendReceipt !== undefined) {
      CommandSendReceipt.encode(
        message.sendReceipt,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.sendError !== undefined) {
      CommandSendError.encode(
        message.sendError,
        writer.uint32(66).fork()
      ).ldelim();
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
      CommandUnsubscribe.encode(
        message.unsubscribe,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.success !== undefined) {
      CommandSuccess.encode(
        message.success,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      CommandError.encode(message.error, writer.uint32(114).fork()).ldelim();
    }
    if (message.closeProducer !== undefined) {
      CommandCloseProducer.encode(
        message.closeProducer,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.closeConsumer !== undefined) {
      CommandCloseConsumer.encode(
        message.closeConsumer,
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.producerSuccess !== undefined) {
      CommandProducerSuccess.encode(
        message.producerSuccess,
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.ping !== undefined) {
      CommandPing.encode(message.ping, writer.uint32(146).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      CommandPong.encode(message.pong, writer.uint32(154).fork()).ldelim();
    }
    if (message.redeliverUnacknowledgedMessages !== undefined) {
      CommandRedeliverUnacknowledgedMessages.encode(
        message.redeliverUnacknowledgedMessages,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.partitionMetadata !== undefined) {
      CommandPartitionedTopicMetadata.encode(
        message.partitionMetadata,
        writer.uint32(170).fork()
      ).ldelim();
    }
    if (message.partitionMetadataResponse !== undefined) {
      CommandPartitionedTopicMetadataResponse.encode(
        message.partitionMetadataResponse,
        writer.uint32(178).fork()
      ).ldelim();
    }
    if (message.lookupTopic !== undefined) {
      CommandLookupTopic.encode(
        message.lookupTopic,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.lookupTopicResponse !== undefined) {
      CommandLookupTopicResponse.encode(
        message.lookupTopicResponse,
        writer.uint32(194).fork()
      ).ldelim();
    }
    if (message.consumerStats !== undefined) {
      CommandConsumerStats.encode(
        message.consumerStats,
        writer.uint32(202).fork()
      ).ldelim();
    }
    if (message.consumerStatsResponse !== undefined) {
      CommandConsumerStatsResponse.encode(
        message.consumerStatsResponse,
        writer.uint32(210).fork()
      ).ldelim();
    }
    if (message.reachedEndOfTopic !== undefined) {
      CommandReachedEndOfTopic.encode(
        message.reachedEndOfTopic,
        writer.uint32(218).fork()
      ).ldelim();
    }
    if (message.seek !== undefined) {
      CommandSeek.encode(message.seek, writer.uint32(226).fork()).ldelim();
    }
    if (message.getLastMessageId !== undefined) {
      CommandGetLastMessageId.encode(
        message.getLastMessageId,
        writer.uint32(234).fork()
      ).ldelim();
    }
    if (message.getLastMessageIdResponse !== undefined) {
      CommandGetLastMessageIdResponse.encode(
        message.getLastMessageIdResponse,
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.activeConsumerChange !== undefined) {
      CommandActiveConsumerChange.encode(
        message.activeConsumerChange,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.getTopicsOfNamespace !== undefined) {
      CommandGetTopicsOfNamespace.encode(
        message.getTopicsOfNamespace,
        writer.uint32(258).fork()
      ).ldelim();
    }
    if (message.getTopicsOfNamespaceResponse !== undefined) {
      CommandGetTopicsOfNamespaceResponse.encode(
        message.getTopicsOfNamespaceResponse,
        writer.uint32(266).fork()
      ).ldelim();
    }
    if (message.getSchema !== undefined) {
      CommandGetSchema.encode(
        message.getSchema,
        writer.uint32(274).fork()
      ).ldelim();
    }
    if (message.getSchemaResponse !== undefined) {
      CommandGetSchemaResponse.encode(
        message.getSchemaResponse,
        writer.uint32(282).fork()
      ).ldelim();
    }
    if (message.authChallenge !== undefined) {
      CommandAuthChallenge.encode(
        message.authChallenge,
        writer.uint32(290).fork()
      ).ldelim();
    }
    if (message.authResponse !== undefined) {
      CommandAuthResponse.encode(
        message.authResponse,
        writer.uint32(298).fork()
      ).ldelim();
    }
    if (message.ackResponse !== undefined) {
      CommandAckResponse.encode(
        message.ackResponse,
        writer.uint32(306).fork()
      ).ldelim();
    }
    if (message.getOrCreateSchema !== undefined) {
      CommandGetOrCreateSchema.encode(
        message.getOrCreateSchema,
        writer.uint32(314).fork()
      ).ldelim();
    }
    if (message.getOrCreateSchemaResponse !== undefined) {
      CommandGetOrCreateSchemaResponse.encode(
        message.getOrCreateSchemaResponse,
        writer.uint32(322).fork()
      ).ldelim();
    }
    if (message.newTxn !== undefined) {
      CommandNewTxn.encode(message.newTxn, writer.uint32(402).fork()).ldelim();
    }
    if (message.newTxnResponse !== undefined) {
      CommandNewTxnResponse.encode(
        message.newTxnResponse,
        writer.uint32(410).fork()
      ).ldelim();
    }
    if (message.addPartitionToTxn !== undefined) {
      CommandAddPartitionToTxn.encode(
        message.addPartitionToTxn,
        writer.uint32(418).fork()
      ).ldelim();
    }
    if (message.addPartitionToTxnResponse !== undefined) {
      CommandAddPartitionToTxnResponse.encode(
        message.addPartitionToTxnResponse,
        writer.uint32(426).fork()
      ).ldelim();
    }
    if (message.addSubscriptionToTxn !== undefined) {
      CommandAddSubscriptionToTxn.encode(
        message.addSubscriptionToTxn,
        writer.uint32(434).fork()
      ).ldelim();
    }
    if (message.addSubscriptionToTxnResponse !== undefined) {
      CommandAddSubscriptionToTxnResponse.encode(
        message.addSubscriptionToTxnResponse,
        writer.uint32(442).fork()
      ).ldelim();
    }
    if (message.endTxn !== undefined) {
      CommandEndTxn.encode(message.endTxn, writer.uint32(450).fork()).ldelim();
    }
    if (message.endTxnResponse !== undefined) {
      CommandEndTxnResponse.encode(
        message.endTxnResponse,
        writer.uint32(458).fork()
      ).ldelim();
    }
    if (message.endTxnOnPartition !== undefined) {
      CommandEndTxnOnPartition.encode(
        message.endTxnOnPartition,
        writer.uint32(466).fork()
      ).ldelim();
    }
    if (message.endTxnOnPartitionResponse !== undefined) {
      CommandEndTxnOnPartitionResponse.encode(
        message.endTxnOnPartitionResponse,
        writer.uint32(474).fork()
      ).ldelim();
    }
    if (message.endTxnOnSubscription !== undefined) {
      CommandEndTxnOnSubscription.encode(
        message.endTxnOnSubscription,
        writer.uint32(482).fork()
      ).ldelim();
    }
    if (message.endTxnOnSubscriptionResponse !== undefined) {
      CommandEndTxnOnSubscriptionResponse.encode(
        message.endTxnOnSubscriptionResponse,
        writer.uint32(490).fork()
      ).ldelim();
    }
    if (message.tcClientConnectRequest !== undefined) {
      CommandTcClientConnectRequest.encode(
        message.tcClientConnectRequest,
        writer.uint32(498).fork()
      ).ldelim();
    }
    if (message.tcClientConnectResponse !== undefined) {
      CommandTcClientConnectResponse.encode(
        message.tcClientConnectResponse,
        writer.uint32(506).fork()
      ).ldelim();
    }
    if (message.watchTopicList !== undefined) {
      CommandWatchTopicList.encode(
        message.watchTopicList,
        writer.uint32(514).fork()
      ).ldelim();
    }
    if (message.watchTopicListSuccess !== undefined) {
      CommandWatchTopicListSuccess.encode(
        message.watchTopicListSuccess,
        writer.uint32(522).fork()
      ).ldelim();
    }
    if (message.watchTopicUpdate !== undefined) {
      CommandWatchTopicUpdate.encode(
        message.watchTopicUpdate,
        writer.uint32(530).fork()
      ).ldelim();
    }
    if (message.watchTopicListClose !== undefined) {
      CommandWatchTopicListClose.encode(
        message.watchTopicListClose,
        writer.uint32(538).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.connect = CommandConnect.decode(reader, reader.uint32());
          break;
        case 3:
          message.connected = CommandConnected.decode(reader, reader.uint32());
          break;
        case 4:
          message.subscribe = CommandSubscribe.decode(reader, reader.uint32());
          break;
        case 5:
          message.producer = CommandProducer.decode(reader, reader.uint32());
          break;
        case 6:
          message.send = CommandSend.decode(reader, reader.uint32());
          break;
        case 7:
          message.sendReceipt = CommandSendReceipt.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.sendError = CommandSendError.decode(reader, reader.uint32());
          break;
        case 9:
          message.message = CommandMessage.decode(reader, reader.uint32());
          break;
        case 10:
          message.ack = CommandAck.decode(reader, reader.uint32());
          break;
        case 11:
          message.flow = CommandFlow.decode(reader, reader.uint32());
          break;
        case 12:
          message.unsubscribe = CommandUnsubscribe.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.success = CommandSuccess.decode(reader, reader.uint32());
          break;
        case 14:
          message.error = CommandError.decode(reader, reader.uint32());
          break;
        case 15:
          message.closeProducer = CommandCloseProducer.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.closeConsumer = CommandCloseConsumer.decode(
            reader,
            reader.uint32()
          );
          break;
        case 17:
          message.producerSuccess = CommandProducerSuccess.decode(
            reader,
            reader.uint32()
          );
          break;
        case 18:
          message.ping = CommandPing.decode(reader, reader.uint32());
          break;
        case 19:
          message.pong = CommandPong.decode(reader, reader.uint32());
          break;
        case 20:
          message.redeliverUnacknowledgedMessages =
            CommandRedeliverUnacknowledgedMessages.decode(
              reader,
              reader.uint32()
            );
          break;
        case 21:
          message.partitionMetadata = CommandPartitionedTopicMetadata.decode(
            reader,
            reader.uint32()
          );
          break;
        case 22:
          message.partitionMetadataResponse =
            CommandPartitionedTopicMetadataResponse.decode(
              reader,
              reader.uint32()
            );
          break;
        case 23:
          message.lookupTopic = CommandLookupTopic.decode(
            reader,
            reader.uint32()
          );
          break;
        case 24:
          message.lookupTopicResponse = CommandLookupTopicResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 25:
          message.consumerStats = CommandConsumerStats.decode(
            reader,
            reader.uint32()
          );
          break;
        case 26:
          message.consumerStatsResponse = CommandConsumerStatsResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 27:
          message.reachedEndOfTopic = CommandReachedEndOfTopic.decode(
            reader,
            reader.uint32()
          );
          break;
        case 28:
          message.seek = CommandSeek.decode(reader, reader.uint32());
          break;
        case 29:
          message.getLastMessageId = CommandGetLastMessageId.decode(
            reader,
            reader.uint32()
          );
          break;
        case 30:
          message.getLastMessageIdResponse =
            CommandGetLastMessageIdResponse.decode(reader, reader.uint32());
          break;
        case 31:
          message.activeConsumerChange = CommandActiveConsumerChange.decode(
            reader,
            reader.uint32()
          );
          break;
        case 32:
          message.getTopicsOfNamespace = CommandGetTopicsOfNamespace.decode(
            reader,
            reader.uint32()
          );
          break;
        case 33:
          message.getTopicsOfNamespaceResponse =
            CommandGetTopicsOfNamespaceResponse.decode(reader, reader.uint32());
          break;
        case 34:
          message.getSchema = CommandGetSchema.decode(reader, reader.uint32());
          break;
        case 35:
          message.getSchemaResponse = CommandGetSchemaResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 36:
          message.authChallenge = CommandAuthChallenge.decode(
            reader,
            reader.uint32()
          );
          break;
        case 37:
          message.authResponse = CommandAuthResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 38:
          message.ackResponse = CommandAckResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 39:
          message.getOrCreateSchema = CommandGetOrCreateSchema.decode(
            reader,
            reader.uint32()
          );
          break;
        case 40:
          message.getOrCreateSchemaResponse =
            CommandGetOrCreateSchemaResponse.decode(reader, reader.uint32());
          break;
        case 50:
          message.newTxn = CommandNewTxn.decode(reader, reader.uint32());
          break;
        case 51:
          message.newTxnResponse = CommandNewTxnResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 52:
          message.addPartitionToTxn = CommandAddPartitionToTxn.decode(
            reader,
            reader.uint32()
          );
          break;
        case 53:
          message.addPartitionToTxnResponse =
            CommandAddPartitionToTxnResponse.decode(reader, reader.uint32());
          break;
        case 54:
          message.addSubscriptionToTxn = CommandAddSubscriptionToTxn.decode(
            reader,
            reader.uint32()
          );
          break;
        case 55:
          message.addSubscriptionToTxnResponse =
            CommandAddSubscriptionToTxnResponse.decode(reader, reader.uint32());
          break;
        case 56:
          message.endTxn = CommandEndTxn.decode(reader, reader.uint32());
          break;
        case 57:
          message.endTxnResponse = CommandEndTxnResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 58:
          message.endTxnOnPartition = CommandEndTxnOnPartition.decode(
            reader,
            reader.uint32()
          );
          break;
        case 59:
          message.endTxnOnPartitionResponse =
            CommandEndTxnOnPartitionResponse.decode(reader, reader.uint32());
          break;
        case 60:
          message.endTxnOnSubscription = CommandEndTxnOnSubscription.decode(
            reader,
            reader.uint32()
          );
          break;
        case 61:
          message.endTxnOnSubscriptionResponse =
            CommandEndTxnOnSubscriptionResponse.decode(reader, reader.uint32());
          break;
        case 62:
          message.tcClientConnectRequest = CommandTcClientConnectRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 63:
          message.tcClientConnectResponse =
            CommandTcClientConnectResponse.decode(reader, reader.uint32());
          break;
        case 64:
          message.watchTopicList = CommandWatchTopicList.decode(
            reader,
            reader.uint32()
          );
          break;
        case 65:
          message.watchTopicListSuccess = CommandWatchTopicListSuccess.decode(
            reader,
            reader.uint32()
          );
          break;
        case 66:
          message.watchTopicUpdate = CommandWatchTopicUpdate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 67:
          message.watchTopicListClose = CommandWatchTopicListClose.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseCommand {
    return {
      type: isSet(object.type) ? baseCommand_TypeFromJSON(object.type) : 2,
      connect: isSet(object.connect)
        ? CommandConnect.fromJSON(object.connect)
        : undefined,
      connected: isSet(object.connected)
        ? CommandConnected.fromJSON(object.connected)
        : undefined,
      subscribe: isSet(object.subscribe)
        ? CommandSubscribe.fromJSON(object.subscribe)
        : undefined,
      producer: isSet(object.producer)
        ? CommandProducer.fromJSON(object.producer)
        : undefined,
      send: isSet(object.send) ? CommandSend.fromJSON(object.send) : undefined,
      sendReceipt: isSet(object.sendReceipt)
        ? CommandSendReceipt.fromJSON(object.sendReceipt)
        : undefined,
      sendError: isSet(object.sendError)
        ? CommandSendError.fromJSON(object.sendError)
        : undefined,
      message: isSet(object.message)
        ? CommandMessage.fromJSON(object.message)
        : undefined,
      ack: isSet(object.ack) ? CommandAck.fromJSON(object.ack) : undefined,
      flow: isSet(object.flow) ? CommandFlow.fromJSON(object.flow) : undefined,
      unsubscribe: isSet(object.unsubscribe)
        ? CommandUnsubscribe.fromJSON(object.unsubscribe)
        : undefined,
      success: isSet(object.success)
        ? CommandSuccess.fromJSON(object.success)
        : undefined,
      error: isSet(object.error)
        ? CommandError.fromJSON(object.error)
        : undefined,
      closeProducer: isSet(object.closeProducer)
        ? CommandCloseProducer.fromJSON(object.closeProducer)
        : undefined,
      closeConsumer: isSet(object.closeConsumer)
        ? CommandCloseConsumer.fromJSON(object.closeConsumer)
        : undefined,
      producerSuccess: isSet(object.producerSuccess)
        ? CommandProducerSuccess.fromJSON(object.producerSuccess)
        : undefined,
      ping: isSet(object.ping) ? CommandPing.fromJSON(object.ping) : undefined,
      pong: isSet(object.pong) ? CommandPong.fromJSON(object.pong) : undefined,
      redeliverUnacknowledgedMessages: isSet(
        object.redeliverUnacknowledgedMessages
      )
        ? CommandRedeliverUnacknowledgedMessages.fromJSON(
            object.redeliverUnacknowledgedMessages
          )
        : undefined,
      partitionMetadata: isSet(object.partitionMetadata)
        ? CommandPartitionedTopicMetadata.fromJSON(object.partitionMetadata)
        : undefined,
      partitionMetadataResponse: isSet(object.partitionMetadataResponse)
        ? CommandPartitionedTopicMetadataResponse.fromJSON(
            object.partitionMetadataResponse
          )
        : undefined,
      lookupTopic: isSet(object.lookupTopic)
        ? CommandLookupTopic.fromJSON(object.lookupTopic)
        : undefined,
      lookupTopicResponse: isSet(object.lookupTopicResponse)
        ? CommandLookupTopicResponse.fromJSON(object.lookupTopicResponse)
        : undefined,
      consumerStats: isSet(object.consumerStats)
        ? CommandConsumerStats.fromJSON(object.consumerStats)
        : undefined,
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
        ? CommandGetLastMessageIdResponse.fromJSON(
            object.getLastMessageIdResponse
          )
        : undefined,
      activeConsumerChange: isSet(object.activeConsumerChange)
        ? CommandActiveConsumerChange.fromJSON(object.activeConsumerChange)
        : undefined,
      getTopicsOfNamespace: isSet(object.getTopicsOfNamespace)
        ? CommandGetTopicsOfNamespace.fromJSON(object.getTopicsOfNamespace)
        : undefined,
      getTopicsOfNamespaceResponse: isSet(object.getTopicsOfNamespaceResponse)
        ? CommandGetTopicsOfNamespaceResponse.fromJSON(
            object.getTopicsOfNamespaceResponse
          )
        : undefined,
      getSchema: isSet(object.getSchema)
        ? CommandGetSchema.fromJSON(object.getSchema)
        : undefined,
      getSchemaResponse: isSet(object.getSchemaResponse)
        ? CommandGetSchemaResponse.fromJSON(object.getSchemaResponse)
        : undefined,
      authChallenge: isSet(object.authChallenge)
        ? CommandAuthChallenge.fromJSON(object.authChallenge)
        : undefined,
      authResponse: isSet(object.authResponse)
        ? CommandAuthResponse.fromJSON(object.authResponse)
        : undefined,
      ackResponse: isSet(object.ackResponse)
        ? CommandAckResponse.fromJSON(object.ackResponse)
        : undefined,
      getOrCreateSchema: isSet(object.getOrCreateSchema)
        ? CommandGetOrCreateSchema.fromJSON(object.getOrCreateSchema)
        : undefined,
      getOrCreateSchemaResponse: isSet(object.getOrCreateSchemaResponse)
        ? CommandGetOrCreateSchemaResponse.fromJSON(
            object.getOrCreateSchemaResponse
          )
        : undefined,
      newTxn: isSet(object.newTxn)
        ? CommandNewTxn.fromJSON(object.newTxn)
        : undefined,
      newTxnResponse: isSet(object.newTxnResponse)
        ? CommandNewTxnResponse.fromJSON(object.newTxnResponse)
        : undefined,
      addPartitionToTxn: isSet(object.addPartitionToTxn)
        ? CommandAddPartitionToTxn.fromJSON(object.addPartitionToTxn)
        : undefined,
      addPartitionToTxnResponse: isSet(object.addPartitionToTxnResponse)
        ? CommandAddPartitionToTxnResponse.fromJSON(
            object.addPartitionToTxnResponse
          )
        : undefined,
      addSubscriptionToTxn: isSet(object.addSubscriptionToTxn)
        ? CommandAddSubscriptionToTxn.fromJSON(object.addSubscriptionToTxn)
        : undefined,
      addSubscriptionToTxnResponse: isSet(object.addSubscriptionToTxnResponse)
        ? CommandAddSubscriptionToTxnResponse.fromJSON(
            object.addSubscriptionToTxnResponse
          )
        : undefined,
      endTxn: isSet(object.endTxn)
        ? CommandEndTxn.fromJSON(object.endTxn)
        : undefined,
      endTxnResponse: isSet(object.endTxnResponse)
        ? CommandEndTxnResponse.fromJSON(object.endTxnResponse)
        : undefined,
      endTxnOnPartition: isSet(object.endTxnOnPartition)
        ? CommandEndTxnOnPartition.fromJSON(object.endTxnOnPartition)
        : undefined,
      endTxnOnPartitionResponse: isSet(object.endTxnOnPartitionResponse)
        ? CommandEndTxnOnPartitionResponse.fromJSON(
            object.endTxnOnPartitionResponse
          )
        : undefined,
      endTxnOnSubscription: isSet(object.endTxnOnSubscription)
        ? CommandEndTxnOnSubscription.fromJSON(object.endTxnOnSubscription)
        : undefined,
      endTxnOnSubscriptionResponse: isSet(object.endTxnOnSubscriptionResponse)
        ? CommandEndTxnOnSubscriptionResponse.fromJSON(
            object.endTxnOnSubscriptionResponse
          )
        : undefined,
      tcClientConnectRequest: isSet(object.tcClientConnectRequest)
        ? CommandTcClientConnectRequest.fromJSON(object.tcClientConnectRequest)
        : undefined,
      tcClientConnectResponse: isSet(object.tcClientConnectResponse)
        ? CommandTcClientConnectResponse.fromJSON(
            object.tcClientConnectResponse
          )
        : undefined,
      watchTopicList: isSet(object.watchTopicList)
        ? CommandWatchTopicList.fromJSON(object.watchTopicList)
        : undefined,
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
    message.type !== undefined &&
      (obj.type = baseCommand_TypeToJSON(message.type));
    message.connect !== undefined &&
      (obj.connect = message.connect
        ? CommandConnect.toJSON(message.connect)
        : undefined);
    message.connected !== undefined &&
      (obj.connected = message.connected
        ? CommandConnected.toJSON(message.connected)
        : undefined);
    message.subscribe !== undefined &&
      (obj.subscribe = message.subscribe
        ? CommandSubscribe.toJSON(message.subscribe)
        : undefined);
    message.producer !== undefined &&
      (obj.producer = message.producer
        ? CommandProducer.toJSON(message.producer)
        : undefined);
    message.send !== undefined &&
      (obj.send = message.send ? CommandSend.toJSON(message.send) : undefined);
    message.sendReceipt !== undefined &&
      (obj.sendReceipt = message.sendReceipt
        ? CommandSendReceipt.toJSON(message.sendReceipt)
        : undefined);
    message.sendError !== undefined &&
      (obj.sendError = message.sendError
        ? CommandSendError.toJSON(message.sendError)
        : undefined);
    message.message !== undefined &&
      (obj.message = message.message
        ? CommandMessage.toJSON(message.message)
        : undefined);
    message.ack !== undefined &&
      (obj.ack = message.ack ? CommandAck.toJSON(message.ack) : undefined);
    message.flow !== undefined &&
      (obj.flow = message.flow ? CommandFlow.toJSON(message.flow) : undefined);
    message.unsubscribe !== undefined &&
      (obj.unsubscribe = message.unsubscribe
        ? CommandUnsubscribe.toJSON(message.unsubscribe)
        : undefined);
    message.success !== undefined &&
      (obj.success = message.success
        ? CommandSuccess.toJSON(message.success)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? CommandError.toJSON(message.error)
        : undefined);
    message.closeProducer !== undefined &&
      (obj.closeProducer = message.closeProducer
        ? CommandCloseProducer.toJSON(message.closeProducer)
        : undefined);
    message.closeConsumer !== undefined &&
      (obj.closeConsumer = message.closeConsumer
        ? CommandCloseConsumer.toJSON(message.closeConsumer)
        : undefined);
    message.producerSuccess !== undefined &&
      (obj.producerSuccess = message.producerSuccess
        ? CommandProducerSuccess.toJSON(message.producerSuccess)
        : undefined);
    message.ping !== undefined &&
      (obj.ping = message.ping ? CommandPing.toJSON(message.ping) : undefined);
    message.pong !== undefined &&
      (obj.pong = message.pong ? CommandPong.toJSON(message.pong) : undefined);
    message.redeliverUnacknowledgedMessages !== undefined &&
      (obj.redeliverUnacknowledgedMessages =
        message.redeliverUnacknowledgedMessages
          ? CommandRedeliverUnacknowledgedMessages.toJSON(
              message.redeliverUnacknowledgedMessages
            )
          : undefined);
    message.partitionMetadata !== undefined &&
      (obj.partitionMetadata = message.partitionMetadata
        ? CommandPartitionedTopicMetadata.toJSON(message.partitionMetadata)
        : undefined);
    message.partitionMetadataResponse !== undefined &&
      (obj.partitionMetadataResponse = message.partitionMetadataResponse
        ? CommandPartitionedTopicMetadataResponse.toJSON(
            message.partitionMetadataResponse
          )
        : undefined);
    message.lookupTopic !== undefined &&
      (obj.lookupTopic = message.lookupTopic
        ? CommandLookupTopic.toJSON(message.lookupTopic)
        : undefined);
    message.lookupTopicResponse !== undefined &&
      (obj.lookupTopicResponse = message.lookupTopicResponse
        ? CommandLookupTopicResponse.toJSON(message.lookupTopicResponse)
        : undefined);
    message.consumerStats !== undefined &&
      (obj.consumerStats = message.consumerStats
        ? CommandConsumerStats.toJSON(message.consumerStats)
        : undefined);
    message.consumerStatsResponse !== undefined &&
      (obj.consumerStatsResponse = message.consumerStatsResponse
        ? CommandConsumerStatsResponse.toJSON(message.consumerStatsResponse)
        : undefined);
    message.reachedEndOfTopic !== undefined &&
      (obj.reachedEndOfTopic = message.reachedEndOfTopic
        ? CommandReachedEndOfTopic.toJSON(message.reachedEndOfTopic)
        : undefined);
    message.seek !== undefined &&
      (obj.seek = message.seek ? CommandSeek.toJSON(message.seek) : undefined);
    message.getLastMessageId !== undefined &&
      (obj.getLastMessageId = message.getLastMessageId
        ? CommandGetLastMessageId.toJSON(message.getLastMessageId)
        : undefined);
    message.getLastMessageIdResponse !== undefined &&
      (obj.getLastMessageIdResponse = message.getLastMessageIdResponse
        ? CommandGetLastMessageIdResponse.toJSON(
            message.getLastMessageIdResponse
          )
        : undefined);
    message.activeConsumerChange !== undefined &&
      (obj.activeConsumerChange = message.activeConsumerChange
        ? CommandActiveConsumerChange.toJSON(message.activeConsumerChange)
        : undefined);
    message.getTopicsOfNamespace !== undefined &&
      (obj.getTopicsOfNamespace = message.getTopicsOfNamespace
        ? CommandGetTopicsOfNamespace.toJSON(message.getTopicsOfNamespace)
        : undefined);
    message.getTopicsOfNamespaceResponse !== undefined &&
      (obj.getTopicsOfNamespaceResponse = message.getTopicsOfNamespaceResponse
        ? CommandGetTopicsOfNamespaceResponse.toJSON(
            message.getTopicsOfNamespaceResponse
          )
        : undefined);
    message.getSchema !== undefined &&
      (obj.getSchema = message.getSchema
        ? CommandGetSchema.toJSON(message.getSchema)
        : undefined);
    message.getSchemaResponse !== undefined &&
      (obj.getSchemaResponse = message.getSchemaResponse
        ? CommandGetSchemaResponse.toJSON(message.getSchemaResponse)
        : undefined);
    message.authChallenge !== undefined &&
      (obj.authChallenge = message.authChallenge
        ? CommandAuthChallenge.toJSON(message.authChallenge)
        : undefined);
    message.authResponse !== undefined &&
      (obj.authResponse = message.authResponse
        ? CommandAuthResponse.toJSON(message.authResponse)
        : undefined);
    message.ackResponse !== undefined &&
      (obj.ackResponse = message.ackResponse
        ? CommandAckResponse.toJSON(message.ackResponse)
        : undefined);
    message.getOrCreateSchema !== undefined &&
      (obj.getOrCreateSchema = message.getOrCreateSchema
        ? CommandGetOrCreateSchema.toJSON(message.getOrCreateSchema)
        : undefined);
    message.getOrCreateSchemaResponse !== undefined &&
      (obj.getOrCreateSchemaResponse = message.getOrCreateSchemaResponse
        ? CommandGetOrCreateSchemaResponse.toJSON(
            message.getOrCreateSchemaResponse
          )
        : undefined);
    message.newTxn !== undefined &&
      (obj.newTxn = message.newTxn
        ? CommandNewTxn.toJSON(message.newTxn)
        : undefined);
    message.newTxnResponse !== undefined &&
      (obj.newTxnResponse = message.newTxnResponse
        ? CommandNewTxnResponse.toJSON(message.newTxnResponse)
        : undefined);
    message.addPartitionToTxn !== undefined &&
      (obj.addPartitionToTxn = message.addPartitionToTxn
        ? CommandAddPartitionToTxn.toJSON(message.addPartitionToTxn)
        : undefined);
    message.addPartitionToTxnResponse !== undefined &&
      (obj.addPartitionToTxnResponse = message.addPartitionToTxnResponse
        ? CommandAddPartitionToTxnResponse.toJSON(
            message.addPartitionToTxnResponse
          )
        : undefined);
    message.addSubscriptionToTxn !== undefined &&
      (obj.addSubscriptionToTxn = message.addSubscriptionToTxn
        ? CommandAddSubscriptionToTxn.toJSON(message.addSubscriptionToTxn)
        : undefined);
    message.addSubscriptionToTxnResponse !== undefined &&
      (obj.addSubscriptionToTxnResponse = message.addSubscriptionToTxnResponse
        ? CommandAddSubscriptionToTxnResponse.toJSON(
            message.addSubscriptionToTxnResponse
          )
        : undefined);
    message.endTxn !== undefined &&
      (obj.endTxn = message.endTxn
        ? CommandEndTxn.toJSON(message.endTxn)
        : undefined);
    message.endTxnResponse !== undefined &&
      (obj.endTxnResponse = message.endTxnResponse
        ? CommandEndTxnResponse.toJSON(message.endTxnResponse)
        : undefined);
    message.endTxnOnPartition !== undefined &&
      (obj.endTxnOnPartition = message.endTxnOnPartition
        ? CommandEndTxnOnPartition.toJSON(message.endTxnOnPartition)
        : undefined);
    message.endTxnOnPartitionResponse !== undefined &&
      (obj.endTxnOnPartitionResponse = message.endTxnOnPartitionResponse
        ? CommandEndTxnOnPartitionResponse.toJSON(
            message.endTxnOnPartitionResponse
          )
        : undefined);
    message.endTxnOnSubscription !== undefined &&
      (obj.endTxnOnSubscription = message.endTxnOnSubscription
        ? CommandEndTxnOnSubscription.toJSON(message.endTxnOnSubscription)
        : undefined);
    message.endTxnOnSubscriptionResponse !== undefined &&
      (obj.endTxnOnSubscriptionResponse = message.endTxnOnSubscriptionResponse
        ? CommandEndTxnOnSubscriptionResponse.toJSON(
            message.endTxnOnSubscriptionResponse
          )
        : undefined);
    message.tcClientConnectRequest !== undefined &&
      (obj.tcClientConnectRequest = message.tcClientConnectRequest
        ? CommandTcClientConnectRequest.toJSON(message.tcClientConnectRequest)
        : undefined);
    message.tcClientConnectResponse !== undefined &&
      (obj.tcClientConnectResponse = message.tcClientConnectResponse
        ? CommandTcClientConnectResponse.toJSON(message.tcClientConnectResponse)
        : undefined);
    message.watchTopicList !== undefined &&
      (obj.watchTopicList = message.watchTopicList
        ? CommandWatchTopicList.toJSON(message.watchTopicList)
        : undefined);
    message.watchTopicListSuccess !== undefined &&
      (obj.watchTopicListSuccess = message.watchTopicListSuccess
        ? CommandWatchTopicListSuccess.toJSON(message.watchTopicListSuccess)
        : undefined);
    message.watchTopicUpdate !== undefined &&
      (obj.watchTopicUpdate = message.watchTopicUpdate
        ? CommandWatchTopicUpdate.toJSON(message.watchTopicUpdate)
        : undefined);
    message.watchTopicListClose !== undefined &&
      (obj.watchTopicListClose = message.watchTopicListClose
        ? CommandWatchTopicListClose.toJSON(message.watchTopicListClose)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseCommand>, I>>(
    object: I
  ): BaseCommand {
    const message = createBaseBaseCommand();
    message.type = object.type ?? 2;
    message.connect =
      object.connect !== undefined && object.connect !== null
        ? CommandConnect.fromPartial(object.connect)
        : undefined;
    message.connected =
      object.connected !== undefined && object.connected !== null
        ? CommandConnected.fromPartial(object.connected)
        : undefined;
    message.subscribe =
      object.subscribe !== undefined && object.subscribe !== null
        ? CommandSubscribe.fromPartial(object.subscribe)
        : undefined;
    message.producer =
      object.producer !== undefined && object.producer !== null
        ? CommandProducer.fromPartial(object.producer)
        : undefined;
    message.send =
      object.send !== undefined && object.send !== null
        ? CommandSend.fromPartial(object.send)
        : undefined;
    message.sendReceipt =
      object.sendReceipt !== undefined && object.sendReceipt !== null
        ? CommandSendReceipt.fromPartial(object.sendReceipt)
        : undefined;
    message.sendError =
      object.sendError !== undefined && object.sendError !== null
        ? CommandSendError.fromPartial(object.sendError)
        : undefined;
    message.message =
      object.message !== undefined && object.message !== null
        ? CommandMessage.fromPartial(object.message)
        : undefined;
    message.ack =
      object.ack !== undefined && object.ack !== null
        ? CommandAck.fromPartial(object.ack)
        : undefined;
    message.flow =
      object.flow !== undefined && object.flow !== null
        ? CommandFlow.fromPartial(object.flow)
        : undefined;
    message.unsubscribe =
      object.unsubscribe !== undefined && object.unsubscribe !== null
        ? CommandUnsubscribe.fromPartial(object.unsubscribe)
        : undefined;
    message.success =
      object.success !== undefined && object.success !== null
        ? CommandSuccess.fromPartial(object.success)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? CommandError.fromPartial(object.error)
        : undefined;
    message.closeProducer =
      object.closeProducer !== undefined && object.closeProducer !== null
        ? CommandCloseProducer.fromPartial(object.closeProducer)
        : undefined;
    message.closeConsumer =
      object.closeConsumer !== undefined && object.closeConsumer !== null
        ? CommandCloseConsumer.fromPartial(object.closeConsumer)
        : undefined;
    message.producerSuccess =
      object.producerSuccess !== undefined && object.producerSuccess !== null
        ? CommandProducerSuccess.fromPartial(object.producerSuccess)
        : undefined;
    message.ping =
      object.ping !== undefined && object.ping !== null
        ? CommandPing.fromPartial(object.ping)
        : undefined;
    message.pong =
      object.pong !== undefined && object.pong !== null
        ? CommandPong.fromPartial(object.pong)
        : undefined;
    message.redeliverUnacknowledgedMessages =
      object.redeliverUnacknowledgedMessages !== undefined &&
      object.redeliverUnacknowledgedMessages !== null
        ? CommandRedeliverUnacknowledgedMessages.fromPartial(
            object.redeliverUnacknowledgedMessages
          )
        : undefined;
    message.partitionMetadata =
      object.partitionMetadata !== undefined &&
      object.partitionMetadata !== null
        ? CommandPartitionedTopicMetadata.fromPartial(object.partitionMetadata)
        : undefined;
    message.partitionMetadataResponse =
      object.partitionMetadataResponse !== undefined &&
      object.partitionMetadataResponse !== null
        ? CommandPartitionedTopicMetadataResponse.fromPartial(
            object.partitionMetadataResponse
          )
        : undefined;
    message.lookupTopic =
      object.lookupTopic !== undefined && object.lookupTopic !== null
        ? CommandLookupTopic.fromPartial(object.lookupTopic)
        : undefined;
    message.lookupTopicResponse =
      object.lookupTopicResponse !== undefined &&
      object.lookupTopicResponse !== null
        ? CommandLookupTopicResponse.fromPartial(object.lookupTopicResponse)
        : undefined;
    message.consumerStats =
      object.consumerStats !== undefined && object.consumerStats !== null
        ? CommandConsumerStats.fromPartial(object.consumerStats)
        : undefined;
    message.consumerStatsResponse =
      object.consumerStatsResponse !== undefined &&
      object.consumerStatsResponse !== null
        ? CommandConsumerStatsResponse.fromPartial(object.consumerStatsResponse)
        : undefined;
    message.reachedEndOfTopic =
      object.reachedEndOfTopic !== undefined &&
      object.reachedEndOfTopic !== null
        ? CommandReachedEndOfTopic.fromPartial(object.reachedEndOfTopic)
        : undefined;
    message.seek =
      object.seek !== undefined && object.seek !== null
        ? CommandSeek.fromPartial(object.seek)
        : undefined;
    message.getLastMessageId =
      object.getLastMessageId !== undefined && object.getLastMessageId !== null
        ? CommandGetLastMessageId.fromPartial(object.getLastMessageId)
        : undefined;
    message.getLastMessageIdResponse =
      object.getLastMessageIdResponse !== undefined &&
      object.getLastMessageIdResponse !== null
        ? CommandGetLastMessageIdResponse.fromPartial(
            object.getLastMessageIdResponse
          )
        : undefined;
    message.activeConsumerChange =
      object.activeConsumerChange !== undefined &&
      object.activeConsumerChange !== null
        ? CommandActiveConsumerChange.fromPartial(object.activeConsumerChange)
        : undefined;
    message.getTopicsOfNamespace =
      object.getTopicsOfNamespace !== undefined &&
      object.getTopicsOfNamespace !== null
        ? CommandGetTopicsOfNamespace.fromPartial(object.getTopicsOfNamespace)
        : undefined;
    message.getTopicsOfNamespaceResponse =
      object.getTopicsOfNamespaceResponse !== undefined &&
      object.getTopicsOfNamespaceResponse !== null
        ? CommandGetTopicsOfNamespaceResponse.fromPartial(
            object.getTopicsOfNamespaceResponse
          )
        : undefined;
    message.getSchema =
      object.getSchema !== undefined && object.getSchema !== null
        ? CommandGetSchema.fromPartial(object.getSchema)
        : undefined;
    message.getSchemaResponse =
      object.getSchemaResponse !== undefined &&
      object.getSchemaResponse !== null
        ? CommandGetSchemaResponse.fromPartial(object.getSchemaResponse)
        : undefined;
    message.authChallenge =
      object.authChallenge !== undefined && object.authChallenge !== null
        ? CommandAuthChallenge.fromPartial(object.authChallenge)
        : undefined;
    message.authResponse =
      object.authResponse !== undefined && object.authResponse !== null
        ? CommandAuthResponse.fromPartial(object.authResponse)
        : undefined;
    message.ackResponse =
      object.ackResponse !== undefined && object.ackResponse !== null
        ? CommandAckResponse.fromPartial(object.ackResponse)
        : undefined;
    message.getOrCreateSchema =
      object.getOrCreateSchema !== undefined &&
      object.getOrCreateSchema !== null
        ? CommandGetOrCreateSchema.fromPartial(object.getOrCreateSchema)
        : undefined;
    message.getOrCreateSchemaResponse =
      object.getOrCreateSchemaResponse !== undefined &&
      object.getOrCreateSchemaResponse !== null
        ? CommandGetOrCreateSchemaResponse.fromPartial(
            object.getOrCreateSchemaResponse
          )
        : undefined;
    message.newTxn =
      object.newTxn !== undefined && object.newTxn !== null
        ? CommandNewTxn.fromPartial(object.newTxn)
        : undefined;
    message.newTxnResponse =
      object.newTxnResponse !== undefined && object.newTxnResponse !== null
        ? CommandNewTxnResponse.fromPartial(object.newTxnResponse)
        : undefined;
    message.addPartitionToTxn =
      object.addPartitionToTxn !== undefined &&
      object.addPartitionToTxn !== null
        ? CommandAddPartitionToTxn.fromPartial(object.addPartitionToTxn)
        : undefined;
    message.addPartitionToTxnResponse =
      object.addPartitionToTxnResponse !== undefined &&
      object.addPartitionToTxnResponse !== null
        ? CommandAddPartitionToTxnResponse.fromPartial(
            object.addPartitionToTxnResponse
          )
        : undefined;
    message.addSubscriptionToTxn =
      object.addSubscriptionToTxn !== undefined &&
      object.addSubscriptionToTxn !== null
        ? CommandAddSubscriptionToTxn.fromPartial(object.addSubscriptionToTxn)
        : undefined;
    message.addSubscriptionToTxnResponse =
      object.addSubscriptionToTxnResponse !== undefined &&
      object.addSubscriptionToTxnResponse !== null
        ? CommandAddSubscriptionToTxnResponse.fromPartial(
            object.addSubscriptionToTxnResponse
          )
        : undefined;
    message.endTxn =
      object.endTxn !== undefined && object.endTxn !== null
        ? CommandEndTxn.fromPartial(object.endTxn)
        : undefined;
    message.endTxnResponse =
      object.endTxnResponse !== undefined && object.endTxnResponse !== null
        ? CommandEndTxnResponse.fromPartial(object.endTxnResponse)
        : undefined;
    message.endTxnOnPartition =
      object.endTxnOnPartition !== undefined &&
      object.endTxnOnPartition !== null
        ? CommandEndTxnOnPartition.fromPartial(object.endTxnOnPartition)
        : undefined;
    message.endTxnOnPartitionResponse =
      object.endTxnOnPartitionResponse !== undefined &&
      object.endTxnOnPartitionResponse !== null
        ? CommandEndTxnOnPartitionResponse.fromPartial(
            object.endTxnOnPartitionResponse
          )
        : undefined;
    message.endTxnOnSubscription =
      object.endTxnOnSubscription !== undefined &&
      object.endTxnOnSubscription !== null
        ? CommandEndTxnOnSubscription.fromPartial(object.endTxnOnSubscription)
        : undefined;
    message.endTxnOnSubscriptionResponse =
      object.endTxnOnSubscriptionResponse !== undefined &&
      object.endTxnOnSubscriptionResponse !== null
        ? CommandEndTxnOnSubscriptionResponse.fromPartial(
            object.endTxnOnSubscriptionResponse
          )
        : undefined;
    message.tcClientConnectRequest =
      object.tcClientConnectRequest !== undefined &&
      object.tcClientConnectRequest !== null
        ? CommandTcClientConnectRequest.fromPartial(
            object.tcClientConnectRequest
          )
        : undefined;
    message.tcClientConnectResponse =
      object.tcClientConnectResponse !== undefined &&
      object.tcClientConnectResponse !== null
        ? CommandTcClientConnectResponse.fromPartial(
            object.tcClientConnectResponse
          )
        : undefined;
    message.watchTopicList =
      object.watchTopicList !== undefined && object.watchTopicList !== null
        ? CommandWatchTopicList.fromPartial(object.watchTopicList)
        : undefined;
    message.watchTopicListSuccess =
      object.watchTopicListSuccess !== undefined &&
      object.watchTopicListSuccess !== null
        ? CommandWatchTopicListSuccess.fromPartial(object.watchTopicListSuccess)
        : undefined;
    message.watchTopicUpdate =
      object.watchTopicUpdate !== undefined && object.watchTopicUpdate !== null
        ? CommandWatchTopicUpdate.fromPartial(object.watchTopicUpdate)
        : undefined;
    message.watchTopicListClose =
      object.watchTopicListClose !== undefined &&
      object.watchTopicListClose !== null
        ? CommandWatchTopicListClose.fromPartial(object.watchTopicListClose)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
