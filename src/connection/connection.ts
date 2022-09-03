import { BaseCommand } from '../proto/PulsarApi'
import { ConnectionOptions, ConnectionOptionsRaw } from './connectionOptions'
import { PulsarSocket } from './pulsarSocket'
import os from 'os'

const localAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => !item?.internal && item?.family === 'IPv4')
  .find(Boolean)?.address ?? '127.0.0.1';

export class Connection {
  private readonly socket: PulsarSocket
  private readonly options: ConnectionOptions

  // https://www.npmjs.com/package/long
  // Hopefully, 2^53-1 is enough...
  private requestId = -1

  constructor(options: ConnectionOptionsRaw) {
    this.options = new ConnectionOptions(options)
    // set initializePromise
    this.socket = new PulsarSocket(this)
  }

  reconnect() {
    this.socket.reconnect()
  }
  close() {
    this.socket.close()
  }
  sendCommand(command: BaseCommand) {
    return this.socket.sendCommand(command)
  }

  getId() {
    return `${localAddress} -> ${this.options.url}`
  }

  GetMaxMessageSize() {
    return this.options._maxMesageSize
  }

  getNextRequestId() {
    return this.requestId++
  }

  /**
   * gets read only copy of the options the connection is operating with.
   * @returns 
   */
  getOption(): Readonly<ConnectionOptions> {
    return this.options
  }
}
