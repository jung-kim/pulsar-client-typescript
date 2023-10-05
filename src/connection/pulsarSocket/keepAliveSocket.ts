import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import { _ConnectionOptions } from '../connectionOptions'
import { RawSocket } from './rawSocket'

export class KeepAliveSocket extends RawSocket {
  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)

    this._eventSignal.add(payload => {
      switch (payload.event) {
        case 'ping':
          this.handlePing()
          break
        case 'pong':
          this.handlePong()
          break
      }
    })
  }

  protected handleInterval (): void {
    this.sendPing()

    if (this.getLastDataReceived() + (this.options.keepAliveIntervalMs * 2) < new Date().getMilliseconds()) {
      // stale connection, closing
      this.wrappedLogger.info('stale connection, closing')
      this._eventSignal.dispatch({ event: 'close' })
    }
  }

  private sendPing (): void {
    if (this.getState() !== 'READY') {
      return
    }
    this.wrappedLogger.debug('send ping')
    this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PING
      })
    ).catch((err) => this.wrappedLogger.error('send ping error', err))
  }

  private handlePong (): void { }

  private handlePing (): void {
    if (this.getState() !== 'READY') {
      return
    }
    this.wrappedLogger.debug('handle ping')
    this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    ).catch((err) => this.wrappedLogger.error('handle ping error', err))
  }
}
