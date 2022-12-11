import { BaseCommand, BaseCommand_Type, CommandSend, MessageMetadata } from '../proto/PulsarApi'
import { Writer } from 'protobufjs'
import crc32 from 'crc/crc32'

// const magicCrc32c = 0x0e01
const magicCrc32Bytes = new Uint8Array(2)
magicCrc32Bytes[0] = 0x0e
magicCrc32Bytes[1] = 0x01

export const serializeBatch = (cmdSend: CommandSend, msgMetadata: MessageMetadata, uncompressedPayload: Uint8Array): Uint8Array => {
  // Wire format
  // [TOTAL_SIZE] [CMD_SIZE][CMD] [MAGIC_NUMBER][CHECKSUM] [METADATA_SIZE][METADATA] [PAYLOAD]

  // compressedPayload := compressionProvider.Compress(nil, uncompressedPayload.ReadableSlice())
  const compressedPayload = uncompressedPayload
  // encryptedPayload, err := encryptor.Encrypt(compressedPayload, msgMetadata)
  // if err != nil {
  // // error occurred while encrypting the payload, ProducerCryptoFailureAction is set to Fail
  // return fmt.Errorf("encryption of message failed, ProducerCryptoFailureAction is set to Fail. Error :%v", err)
  // }
  const encryptedPayload = compressedPayload
  const baseCommand = BaseCommand.fromJSON({
    type: BaseCommand_Type.SEND,
    send: cmdSend
  })

  const commandPayload = getCommandPayload(baseCommand)
  const msgMetadataPayload = getMsMetadataPayload(msgMetadata)

  const payloadSize = commandPayload.length + msgMetadataPayload.length + encryptedPayload.length

  const payload = new Uint8Array(4 + payloadSize)
  payload.set((new Writer()).fixed32(payloadSize).finish())
  payload.set(commandPayload)
  payload.set(msgMetadataPayload)
  payload.set(encryptedPayload)
  return payload
}

export const getCommandPayload = (cmdSend: BaseCommand): Uint8Array => {
  const cmdSendPayload = BaseCommand.encode(cmdSend).finish()

  // [CMD_SIZE][CMD]
  const payload = new Uint8Array(4 + cmdSendPayload.length)
  payload.set((new Writer()).fixed32(payload.length).finish())
  payload.set(cmdSendPayload)
  return payload
}

export const getMsMetadataPayload = (msgMetadata: MessageMetadata): Uint8Array => {
  const msgMetadataPayload = MessageMetadata.encode(msgMetadata).finish()

  const metadataPayload = new Uint8Array(4 + msgMetadataPayload.length)
  metadataPayload.set((new Writer()).fixed32(msgMetadataPayload.length).finish())
  metadataPayload.set(msgMetadataPayload)

  const crc = crc32(metadataPayload)

  // [MAGIC_NUMBER][CHECKSUM] [METADATA_SIZE][METADATA]
  const payload = new Uint8Array(2 + 4 + metadataPayload.length)
  payload.set(magicCrc32Bytes)
  payload.set((new Writer()).fixed32(crc).finish())
  payload.set(metadataPayload)
  return payload
}
