import { EventSignalType, STATE } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { ConnectionOptions } from '../connectionOptions'
import { BaseCommand } from '../../../src/proto/PulsarApi'
import { commandToPayload } from './utils'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class AbstractPulsarSocket {
  private state: STATE = 'CLOSED'
  protected readonly wrappedLogger: WrappedLogger

  protected readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly options: ConnectionOptions
  public readonly logicalAddress: URL

  constructor (options: ConnectionOptions, logicalAddress: URL, _eventSignal: Signal<EventSignalType>) {
    this._eventSignal = _eventSignal
    this.eventSignal = this._eventSignal.readOnly()
    this.options = options
    this.logicalAddress = logicalAddress
    this.wrappedLogger = new WrappedLogger({
      name: 'pulsar-socket',
      uuid: this.options.uuid,
      host: logicalAddress.host
    })
  }

  protected setClosed (): void {
    this.state = 'CLOSED'
    this._eventSignal.dispatch({ event: 'socket-closed' })
  }

  protected setReady (): void {
    this.state = 'READY'
    this._eventSignal.dispatch({ event: 'socket-ready' })
  }

  protected setInitializing (): void {
    this.state = 'INITIALIZING'
    this._eventSignal.dispatch({ event: 'socket-initializing' })
  }

  public abstract send (buffer: Uint8Array | Buffer): Promise<void>

  public async writeCommand (command: BaseCommand): Promise<void> {
    return await this.send(commandToPayload(command))
  }

  public getState (): STATE {
    return this.state
  }

  async ensureReady (): Promise<void> {
    if (this.getState() === 'READY') {
      return
    }

    const successSignal = this._eventSignal.filter(p => p.event === 'socket-ready')
    const failurePromise = new Promise((resolve, reject) => setTimeout(reject, this.options.connectionTimeoutMs))
    await Promise.race([Signal.promisify(successSignal).then(() => { this.state = 'READY' }), failurePromise])
  }
}
