import { Writer } from 'protobufjs'

export const getFixed32BigEndian = (value: number): Uint8Array => {
  return new Writer()
    .fixed32(value)
    .finish()
    .reverse()
}
