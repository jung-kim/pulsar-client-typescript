# Pulsar client typescript

## 📖 Table of Contents

- [❓ why](#-why-)
- [💾 install](#-install-)
- [⚙️ code examples](#-example-)
- [✨ Features](#-features-)
- [📄 License](#-license-)

## why [🔝](#-table-of-contents)

Pulsar does have [node client](https://github.com/apache/pulsar-client-node).  However it is a wrapper around CPP client and that has some complications and limitations.  This project is to provide a more pure typescript solution that can be used more easily.

## install [🔝](#-table-of-contents)

```bash
npm i --save-dev pulsar-client-typescript
```

## examples [🔝](#-table-of-contents)

### client
Client is a basic pulsar client object that know how to connect to a pulsar cluster.  From pulsar client object we can create producers to send messages and consumers to receive messages.

Producers and consumers created from a client may share connections.  Conversely, producers and consumers created from different client doesn't share connections.

```typescript
import { Client } from 'pulsar-client-typescript'

// to connect to pulsar without any auth configured
const clientWithNoAuth = new Client({ url: configs.brokerUrl })

// to connect to pulsar with oauth2 key file in below format
// {
//  "type": "sn_service_account",
//  "client_id": "{CLIENT ID}",
//  "client_secret": "{CLIENT SECRET}",
//  "client_email": "{CLIENT EMAIL}",
//   "issuer_url": "{ISSUER URL}"
// }
const clientFromOauthKeyFile = new Client({
  url: '{BROKER URL}',
  auth: new OAuth(convertFromSNOauth2KeyFile(configs.audience, 'file:///path/to/oauth/file.json'))
})

// to connect to pulsar with oauth2 parameters directly
const clientFromOauth = new Client({
  clientId: '{CLIENT ID}',
  clientSecret: '{CLIENT SECRET}',
  baseSite: '{ISSUER URL}',
  authorizePath: undefined,       // optional
  accessTokenPath: 'oauth/token', // optional
  customHeaders: undefined        // optional
  customParams: {}                // optional
})
```

### producer
producer is an object to send messages to pulsar brokers.  

A partitioned producer may use multiple connections per topic if a topic is partitioned. A partitioned producer uses at least 1 connection per each partition but each connection per each partition may not be exclusive to the producer.

```typescript
const producer = client.createProducer({ topic: 'persistent://public/default/my-first-topic' })

producer.send('hello from other side')
```

### consumer
```typescript
// to implment...
```

## features map [🔝](#-table-of-contents)

| group | features | availability | notes |
|---|---|---|---|
| connections |  |  |  |
|  | connection pool | ✅ |  |
|  | reconnect | ❌ |  |
| producers |  |  |  |
|  | send persistent topic | ✅ |  |
|  | send partitioned topic | ✅ |  |
|  | send delayed messages | ✅ | send message at & send message after |
|  | payload compression | ❌ |  |
|  | payload encryption | ❌ |  |
| consumers |  | ❌ |  |

## License [🔝](#-table-of-contents)
Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0

