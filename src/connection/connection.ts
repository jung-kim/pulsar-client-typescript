import { BaseCommand } from '../proto/PulsarApi'
import { ConnectionOptions, ConnectionOptionsRaw } from './ConnectionOptions'
import os from 'os'
import { PingPongSocket } from './pingPongSocket';
import { PulsarSocket } from './pulsarSocket';

const localAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => !item?.internal && item?.family === 'IPv4')
  .find(Boolean)?.address ?? '127.0.0.1';

export class Connection {
  private readonly socket: PingPongSocket
  private readonly options: ConnectionOptions

  // https://www.npmjs.com/package/long
  // Hopefully, 2^53-1 is enough...
  private requestId = -1

  constructor(options: ConnectionOptionsRaw) {
    this.options = new ConnectionOptions(options)
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
