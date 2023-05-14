import { EventSignalType, Message } from '..'
import { ReadableSignal, Signal } from 'micro-signals'
import { WrappedLogger } from '../../util/logger'
import { _ConnectionOptions } from '../ConnectionOptions'
import { getDeferred } from '../../../src/util/deferred'
import { BaseCommand } from '../../../src/proto/PulsarApi'
import { Socket } from 'net'
import { STATE } from '../'

/**
 * handles state and state's transitions for the pulsar socket
 */
export abstract class Initializable {
  private state: STATE = 'INITIALIZING'
  private readonly initializeDeferrred = getDeferred<unknown>()
  protected readonly wrappedLogger: WrappedLogger

  public readonly _eventSignal: Signal<EventSignalType>
  public readonly eventSignal: ReadableSignal<EventSignalType>
  public readonly _dataSignal: Signal<Message>
  public readonly dataSignal: ReadableSignal<Message>
  public readonly options: _ConnectionOptions

  constructor (name: string, options: _ConnectionOptions, logicalAddress: URL) {
    this._eventSignal = options._eventSignal
    this.eventSignal = this._eventSignal.readOnly()
    this._dataSignal = options._dataSignal
    this.dataSignal = this._dataSignal.readOnly()
    this.options = options
    this.wrappedLogger = options.getWrappedLogger(name, logicalAddress)

    this.eventSignal.add(payload => {
      switch (payload.event) {
        case 'close':
          this.onClose()
          break
        case 'connect':
          this.options.getSocket()
            .then(this.initializeRawSocket.bind(this))
            .catch((e) => {
              this.wrappedLogger.error('failed to initialize socket', e)
              this._eventSignal.dispatch({ event: 'close' })
            })
            .then(this.sendHandshake.bind(this))
            .catch((e) => {
              this.wrappedLogger.error('failed during handshake', e)
              this._eventSignal.dispatch({ event: 'close' })
            })
          break
      }
    })

    this.dataSignal.add(message => {
      if (this.getState() === 'INITIALIZING') {
        // message received during "initializing" is assumed to be from handshake effort.
        try {
          this.receiveHandshake(message.baseCommand)
          this.onReady()
        } catch {
          this.onClose()
        }
      }
    })
  }

  protected abstract initializeRawSocket: (socket: Socket) => void
  protected abstract sendHandshake (): Promise<void>
  protected abstract receiveHandshake (baseCommand: BaseCommand): void
  protected abstract _onClose (): void

  private onClose (): void {
    this._onClose()
    this.wrappedLogger.info('close requested')
    this.initializeDeferrred.reject()
    this.state = 'CLOSED'
  }

  private onReady (): void {
    this.initializeDeferrred.resolve(undefined)
    this.state = 'READY'
    this._eventSignal.dispatch({ event: 'ready' })
  }

  public async ensureReady (): Promise<void> {
    await this.initializeDeferrred.promise
    if (this.state !== 'READY') {
      throw Error('Not initialized')
    }
  }

  public getState (): STATE {
    return this.state
  }
}
