import { BaseCommand, BaseCommand_Type } from "proto/PulsarApi";
import { Connection } from "./Connection";
import { AbstractPulsarSocket, Message } from "./abstractPulsarSocket";

// handles pingpong logic
export abstract class PingPongSocket extends AbstractPulsarSocket {
  private interval: ReturnType<typeof setInterval> | undefined = undefined
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
    this.reconnect()
  }

   reconnect() {
    if (!this.interval) {
      this.interval = setInterval(this.handleInterval, this.options.keepAliveIntervalMs)
    }
    return super.reconnect()
  }

  private handleInterval() {
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

  private sendPing() {
    return this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PING
      })
    )
  }

  private handlePong() {}

  private handlePing() {
    return this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    )
  }

  protected parseReceived(data: Buffer) {
    this.lastDataReceived = (new Date()).getMilliseconds()
    return this._parseReceived(data)
  }
}