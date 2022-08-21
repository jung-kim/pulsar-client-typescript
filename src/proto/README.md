
# Pulsar proto
PulsarApi.ts is a generated file.

## Protofile source
https://github.com/apache/pulsar/blob/a73e1f3a2d54d626fc1dfe01e55bc1b8ab0ee8f2/pulsar-common/src/main/proto/PulsarApi.proto

## command to generate
```
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./src/proto/PulsarApi.proto -I. --ts_proto_out=. --ts_proto_opt=esModuleInterop=true
```

# Caution

`PulsarApi.ts` is automatically generated via protoc but generated file has an interesting bug that was manually edited.  For some odd reason generated code doesn't marshal `BaseCommmand.Type` value if type is `CommandConenct`.  I don't see such behavior in the generated goland library so I'm not sure why this is.  

```ts
// if (message.type !== 2) {
  writer.uint32(8).int32(message.type);
// }

```