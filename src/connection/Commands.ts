import { BaseCommand, BaseCommand_Type, CommandSend, MessageMetadata } from '../proto/PulsarApi'
import { Writer } from 'protobufjs'
import crc32 from 'crc/crc32'

// const magicCrc32c = 0x0e01
const magicCrc32Bytes = 3585

let cmdsize = 0
let msgpayloadsize = 0

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
  const messagePayload = getMessagePayload(msgMetadata, encryptedPayload)
  const checksum = crc32(messagePayload)
  const frameSize = commandPayload.length + messagePayload.length + 2 + 4
  const mergedArray = new Uint8Array(4 + commandPayload.length + 4 + 4 + messagePayload.length)

  mergedArray.set(getFixed32BigEndian(frameSize))
  mergedArray.set(commandPayload, 4)
  mergedArray.set(getFixed32BigEndian(magicCrc32Bytes), 4 + commandPayload.length)
  mergedArray.set(getFixed32BigEndian(checksum), 4 + commandPayload.length + 4)
  mergedArray.set(getFixed32BigEndian(checksum), 4 + commandPayload.length + 4 + 4)

  return mergedArray
}

const getFixed32BigEndian = (value: number): Uint8Array => {
  return new Writer()
    .fixed32(value)
    .finish()
    .reverse()
}

const getCommandPayload = (cmdSend: BaseCommand): Uint8Array => {
  const cmdSendPayload = BaseCommand.encode(cmdSend).finish()

  const mergedArray = new Uint8Array(4 + cmdSendPayload.length)
  mergedArray.set(getFixed32BigEndian(cmdSendPayload.length))
  mergedArray.set(cmdSendPayload, 4)
  return mergedArray
}

const getMessagePayload = (msgMetadata: MessageMetadata, payload: Uint8Array): Uint8Array => {
  const msgMetadataPayload = MessageMetadata.encode(msgMetadata).finish()

  const mergedArray = new Uint8Array(4 + msgMetadataPayload.length + payload.length)
  mergedArray.set(getFixed32BigEndian(msgMetadataPayload.length))
  mergedArray.set(msgMetadataPayload, 4)
  mergedArray.set(payload, 4 + msgMetadataPayload.length)
  return mergedArray
}
