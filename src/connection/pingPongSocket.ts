import { BaseCommand, BaseCommand_Type } from '../proto/PulsarApi'
import { Connection } from './Connection'
import { AbstractPulsarSocket, Message } from './abstractPulsarSocket'

// handles pingpong logic
export abstract class PingPongSocket extends AbstractPulsarSocket {
  private interval: ReturnType<typeof setInterval> | undefined = setInterval(this.handleInterval.bind(this), this.options.keepAliveIntervalMs)
  private lastDataReceived: number = 0

  constructor (connection: Connection) {
    super(connection)

    this.dataStream.add((message: Message) => {
      switch (message.baseCommand.type) {
        case BaseCommand_Type.PING:
          this.handlePing()
          break
        case BaseCommand_Type.PONG:
          this.handlePong()
          break
      }
    })
    this.wrappedLogger.debug('pingpong socket is created')
  }

  async reconnect (): Promise<void> {
    await super.reconnect()
    if (this.interval === undefined) {
      this.interval = setInterval(this.handleInterval.bind(this), this.options.keepAliveIntervalMs)
      this.wrappedLogger.debug('pingpong interval is configured')
    }
  }

  private handleInterval (): void {
    if (this.state !== 'READY') {
      return
    }
    this.sendPing()

    if (this.lastDataReceived + (this.options.keepAliveIntervalMs * 2) < new Date().getMilliseconds()) {
      this.wrappedLogger.info('stale connection, closing')
      // stale connection, closing
      this.parent.close()
    }
  }

  close (): void {
    this.wrappedLogger.debug('pingpong socket close')
    clearInterval(this.interval)
    this.interval = undefined
    super.close()
  }

  private sendPing (): void {
    this.wrappedLogger.debug('send ping')
    return this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PING
      })
    )
  }

  private handlePong (): void { }

  private handlePing (): void {
    this.wrappedLogger.debug('handle ping')
    return this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    )
  }

  protected parseReceived (data: Buffer): Message {
    this.lastDataReceived = (new Date()).getMilliseconds()
    return this._parseReceived(data)
  }
}
