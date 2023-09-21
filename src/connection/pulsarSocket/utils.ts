import { Writer } from 'protobufjs'
import { BaseCommand } from '../../../src/proto/PulsarApi'

export const commandToPayload = (command: BaseCommand): Uint8Array => {
  const marshalledCommand = BaseCommand.encode(command).finish()
  const payload = new Uint8Array(4 + 4 + marshalledCommand.length)
  payload.set((new Writer()).fixed32(4 + marshalledCommand.length).finish().reverse(), 0)
  payload.set((new Writer()).fixed32(marshalledCommand.length).finish().reverse(), 4)
  payload.set(marshalledCommand, 8)
  return payload
}
