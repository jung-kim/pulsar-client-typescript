import { BaseCommand, BaseCommand_Type } from '../proto/PulsarApi'
import { _ConnectionOptions } from './ConnectionOptions'
import { Message } from './index'
import { PulsarSocket } from './pulsarSocket'

// handles pingpong logic
export abstract class PingPongSocket extends PulsarSocket {
  public pingPongSocketState: 'INITIALIZING' | 'READY' | 'CLOSED' = 'INITIALIZING'
  private interval: ReturnType<typeof setInterval> | undefined = undefined

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)

    this.eventStream.add(event => {
      switch (event) {
        case 'close':
          this.close()
          break
        case 'pulsar_socket_ready':
          this.onPulsarSocketReady()
          break
      }
    })

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

  onPulsarSocketReady (): void {
    this.pingPongSocketState = 'READY'
    this.interval = setInterval(this.handleInterval.bind(this), this.options.keepAliveIntervalMs)
  }

  close (): void {
    this.pingPongSocketState = 'CLOSED'
    this.wrappedLogger.debug('pingpong socket close')
    clearInterval(this.interval)
    this.interval = undefined
    super.close()
  }

  private handleInterval (): void {
    if (this.pingPongSocketState !== 'READY') {
      return
    }
    this.sendPing()

    if (this.lastDataReceived + (this.options.keepAliveIntervalMs * 2) < new Date().getMilliseconds()) {
      this.wrappedLogger.info('stale connection, closing')
      // stale connection, closing
      this._eventStream.dispatch('close')
    }
  }

  private sendPing (): void {
    this.wrappedLogger.debug('send ping')
    this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PING
      })
    ).catch((err) => this.wrappedLogger.error('send ping error', err))
  }

  private handlePong (): void { }

  private handlePing (): void {
    this.wrappedLogger.debug('handle ping')
    this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    ).catch((err) => this.wrappedLogger.error('handle ping error', err))
  }
}
