import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import { ConnectionOptions } from '../connectionOptions'
import { DEFAULT_MAX_MESSAGE_SIZE, EventSignalType, PROTOCOL_VERSION, PULSAR_CLIENT_VERSION } from '..'
import { commandToPayload } from './utils'
import { KeepAliveSocket } from './keepAliveSocket'
import { Signal } from 'micro-signals'

/**
 * contains pulsar specifc socket logic
 */
export class PulsarSocket extends KeepAliveSocket {
  private interval: ReturnType<typeof setInterval> | undefined = undefined

  constructor (options: ConnectionOptions, logicalAddress: URL, _eventSignal: Signal<EventSignalType>) {
    super(options, logicalAddress, _eventSignal)

    this._eventSignal.add(payload => {
      switch (payload.event) {
        case 'handshake_start':
          void this.sendHandshake()
          break
        case 'handshake_response':
          this.receiveHandshake(payload.message.baseCommand)
          break
      }
    })

    void this.initializeRawSocket()
  }

  public close (): void {
    clearInterval(this.interval)
    this.interval = undefined
    super.close()
    this.wrappedLogger.info('closed pulsar socket')
  }

  protected async sendHandshake (): Promise<void> {
    if (this.getState() !== 'INITIALIZING') {
      return
    }
    try {
      this.wrappedLogger.info('handshake initiated')
      const authData = await this.options.auth.getToken()
      const handshake = BaseCommand.fromJSON({
        type: BaseCommand_Type.CONNECT,
        connect: {
          protocolVersion: PROTOCOL_VERSION,
          clientVersion: PULSAR_CLIENT_VERSION,
          authMethodName: this.options.auth.name,
          authData: Buffer.from(authData).toString('base64'),
          featureFlags: {
            supportsAuthRefresh: true
          },
          proxyToBrokerUrl: this.logicalAddress.href === this.options._urlObj.href ? undefined : this.logicalAddress.host
        }
      })
      await super.send(commandToPayload(handshake))
    } catch (e) {
      this.wrappedLogger.error('failed to send handshake', e)
    }
  }

  protected receiveHandshake (baseCommand: BaseCommand): void {
    this.wrappedLogger.info(`received handshake response ${this.getState()}`)
    if (this.getState() !== 'INITIALIZING') {
      this.wrappedLogger.warn(
        'received handshake response out side of initializing state',
        { state: this.getState() }
      )
      return
    }

    if (baseCommand.connected === undefined || baseCommand.error !== undefined) {
      this.wrappedLogger.error(
        'error during handshake',
        baseCommand.error,
        { baseCommandType: baseCommand.type }
      )
      return
    }

    if ((baseCommand.connected?.maxMessageSize ?? 0) > 0 && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.interval = setInterval((this.handleInterval.bind(this)), this.options.keepAliveIntervalMs)
    this.wrappedLogger.info('connected!!')
    this.setReady()
  }

  public async send (buffer: Uint8Array | Buffer): Promise<void> {
    await this.ensureReady()
    return await super.send(buffer)
  }
}
