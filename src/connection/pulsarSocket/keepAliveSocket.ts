import { Signal } from 'micro-signals'
import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import { ConnectionOptions } from '../connectionOptions'
import { RawSocket } from './rawSocket'
import { EventSignalType } from '..'

export class KeepAliveSocket extends RawSocket {
  constructor (options: ConnectionOptions, logicalAddress: URL, _eventSignal: Signal<EventSignalType>) {
    super(options, logicalAddress, _eventSignal)

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
