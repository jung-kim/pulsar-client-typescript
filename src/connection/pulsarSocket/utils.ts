import { BaseCommand } from '../../../src/proto/PulsarApi'
import { getFixed32BigEndian } from '../../util/proto'

export const commandToPayload = (command: BaseCommand): Uint8Array => {
  const marshalledCommand = BaseCommand.encode(command).finish()
  const payload = new Uint8Array(4 + 4 + marshalledCommand.length)
  payload.set(getFixed32BigEndian(4 + marshalledCommand.length), 0)
  payload.set(getFixed32BigEndian(marshalledCommand.length), 4)
  payload.set(marshalledCommand, 8)
  return payload
}
