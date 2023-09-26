import { Client } from '../src/client'
import { Connection } from '../src/connection'

export class TestClient extends Client {
  public getConnection (logicalAddress?: URL): Connection {
    return super.getConnection(logicalAddress)
  }
}
