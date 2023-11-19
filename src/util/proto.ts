import proto from 'protobufjs'

// Pulsar expects byte array in bigendian but protobuf outputs little endian.
// ref: https://www.npmjs.com/package/protobufjs/v/0.12.6#on-endianess-before-011
export const getFixed32BigEndian = (value: number): Uint8Array => {
  return new proto.Writer()
    .fixed32(value)
    .finish()
    .reverse()
}
