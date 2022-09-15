import { BaseCommand, BaseCommand_Type, CommandSendReceipt } from '../proto/PulsarApi'
import { ConnectionOptions, ConnectionOptionsRaw } from './ConnectionOptions'
import os from 'os'
import { PingPongSocket } from './pingPongSocket';
import { PulsarSocket } from './pulsarSocket';
import { ProducerListener } from './producerListener';
import { Message } from './abstractPulsarSocket';

const localAddress = Object.values(os.networkInterfaces())
  .flat()
  .filter((item) => !item?.internal && item?.family === 'IPv4')
  .find(Boolean)?.address ?? '127.0.0.1';

export class Connection {
  private readonly socket: PingPongSocket
  private readonly options: ConnectionOptions
  private readonly producerListener: ProducerListener

  // https://www.npmjs.com/package/long
  // Hopefully, 2^53-1 is enough...
  private requestId = -1

  constructor(options: ConnectionOptionsRaw) {
    this.options = new ConnectionOptions(options)
    this.socket = new PulsarSocket(this)

    // register producer listener
    this.producerListener = new ProducerListener(this.socket)
    this.socket.dataStream.add((message: Message) => {
      switch (message.baseCommand.type) {
        case BaseCommand_Type.SEND_RECEIPT:
          this.producerListener.handleSendRecipt(message)
          break;
        default:
          break;
      }
    })
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

  registerProducerListener(id: number, callback: { (receipt: CommandSendReceipt): void }) {
    return this.producerListener.registerProducerListener(id, callback)
  }

  unregisterProducerListener(id: number) {  
    return this.producerListener.unregisterProducerListener(id)
  }

}
