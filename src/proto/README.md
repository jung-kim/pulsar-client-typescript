
# Pulsar proto
PulsarApi.ts is a generated file from the `PulsarApi.proto` file. 

## Protofile source
https://github.com/apache/pulsar/blob/a73e1f3a2d54d626fc1dfe01e55bc1b8ab0ee8f2/pulsar-common/src/main/proto/PulsarApi.proto

## command to generate
```
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./src/proto/PulsarApi.proto -I. --ts_proto_out=. --ts_proto_opt=esModuleInterop=true --ts_proto_opt=forceLong=long
```

## manual fixes:

For some reasons, generated files doesn't work without few manual interventions.  Below are the list of manual edits made on the generated `PulsarApi.ts`.

- `BaseCommand` doesn't output `type` if command is `CommandConnect` https://github.com/stephenh/ts-proto/issues/663
