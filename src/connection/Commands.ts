import { getFixed32BigEndian } from '../util/proto'
import { BaseCommand, BaseCommand_Type, CommandSend, MessageMetadata } from '../proto/PulsarApi'

import { Crc32c } from '@aws-crypto/crc32c'

const magicCrc32Bytes = [14, 1]

export const serializeBatch = (cmdSend: CommandSend, msgMetadata: MessageMetadata, uncompressedPayload: Uint8Array): Uint8Array => {
  // Wire format
  // [TOTAL_SIZE] [CMD_SIZE] [CMD] [MAGIC_NUMBER] [CHECKSUM] [METADATA_SIZE] [METADATA] [PAYLOAD]

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
  const crc32Digest = (new Crc32c()).update(messagePayload).digest()

  const frameSize = commandPayload.length + messagePayload.length + 2 + 4
  const mergedArray = new Uint8Array(4 + commandPayload.length + 2 + 4 + messagePayload.length)

  mergedArray.set(getFixed32BigEndian(frameSize))
  mergedArray.set(commandPayload, 4)
  mergedArray.set(magicCrc32Bytes, 4 + commandPayload.length)
  mergedArray.set(getFixed32BigEndian(crc32Digest), 4 + commandPayload.length + 2)
  mergedArray.set(messagePayload, 4 + commandPayload.length + 2 + 4)

  return mergedArray
}

// [CMD_SIZE] [CMD]
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
