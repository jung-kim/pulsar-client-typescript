import { BaseCommand, BaseCommand_Type } from '../../proto/PulsarApi'
import { _ConnectionOptions } from '../ConnectionOptions'
import { BaseSocket } from './baseSocket'
import { DEFAULT_MAX_MESSAGE_SIZE, PROTOCOL_VERSION, PULSAR_CLIENT_VERSION } from '..'
import { commandToPayload } from './utils'

/**
 * contains pulsar specifc socket logic
 */
export class PulsarSocket extends BaseSocket {
  private interval: ReturnType<typeof setInterval> | undefined = undefined
  private readonly logicalAddress: URL
  private readonly id: string

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super(options, logicalAddress)
    this.logicalAddress = logicalAddress
    this.id = `${options.connectionId}-${logicalAddress.host}`

    this.eventSignal.add(payload => {
      switch (payload.event) {
        case 'close':
          this.closePulsarSocket()
          break
        case 'handshake_start':
          void this.sendHandshake()
          break
        case 'ping':
          this.handlePing()
          break
        case 'pong':
          this.handlePong()
          break
        case 'handshake_response':
          this.receiveHandshake(payload.command)
          break
      }
    })

    this._eventSignal.dispatch({ event: 'connect' })
  }

  public getId (): string {
    return this.id
  }

  public async writeCommand (command: BaseCommand): Promise<void> {
    return await this.send(commandToPayload(command))
  }

  private closePulsarSocket (): void {
    clearInterval(this.interval)
    this.interval = undefined
    this.wrappedLogger.info('closed pulsar socket')
  }

  protected async sendHandshake (): Promise<void> {
    try {
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
          proxyToBrokerUrl: this.logicalAddress.href === this.options.urlObj.href ? undefined : this.logicalAddress.host
        }
      })
      await this.sendUnsafe(commandToPayload(handshake))
    } catch (e) {
      this.wrappedLogger.error('failed to send handshake', e)
      this._eventSignal.dispatch({ event: 'close', err: e })
    }
  }

  protected receiveHandshake (baseCommand: BaseCommand): void {
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
      this._eventSignal.dispatch({
        event: 'close',
        err: Error('error while receiving handshake', { cause: baseCommand.error })
      })
      return
    }

    if ((baseCommand.connected?.maxMessageSize ?? 0) > 0 && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.interval = setInterval((this.handleInterval.bind(this)), this.options.keepAliveIntervalMs)
    this.wrappedLogger.info('connected!!')
    this._eventSignal.dispatch({ event: 'handshake_success' })
  }

  private handleInterval (): void {
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

  protected handlePong (): void { }

  protected handlePing (): void {
    this.wrappedLogger.debug('handle ping')
    this.writeCommand(
      BaseCommand.fromJSON({
        type: BaseCommand_Type.PONG
      })
    ).catch((err) => this.wrappedLogger.error('handle ping error', err))
  }
}
