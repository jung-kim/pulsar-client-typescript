import { BaseCommand, BaseCommand_Type } from "proto/PulsarApi";
import { Connection } from "./Connection";
import { Message, BaseSocket } from "./baseSocket";

// handles pingpong logic
export class PingPongSocket extends BaseSocket {
  private readonly interval: ReturnType<typeof setInterval>
  private lastDataReceived: number = 0

  constructor(connection: Connection) {
    super(connection)

    this.dataStream.add((message: Message) => {
      switch(message.baseCommand.type) {
        case BaseCommand_Type.PING:
          this.handlePing()
          break
        case BaseCommand_Type.PONG:
          this.handlePong()
          break
      }
    })
    this.interval = setInterval(this.handleInterval, this.options.keepAliveIntervalMs)
  }

  handleInterval() {
    this.sendPing()

    if (this.lastDataReceived + (this.options.keepAliveIntervalMs * 2) < new Date().getMilliseconds()) {
      // stale connection, closing
      this.parent.close()
    }
  }

  close() {
    clearInterval(this.interval)
    super.close()
  }

  sendPing() {
    return this.sendCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PING
      })
    )
  }

  handlePong() {}

  handlePing() {
    return this.sendCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    )
  }

  protected parseReceived(data: Buffer) {
    this.lastDataReceived = (new Date()).getMilliseconds()
    return super.parseReceived(data)
  }
}