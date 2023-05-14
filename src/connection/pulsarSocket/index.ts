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

    this.dataSignal.add(message => {
      if (this.getState() === 'READY') {
        // when ready, handle normal data stream for pingpongs
        switch (message.baseCommand.type) {
          case BaseCommand_Type.PING:
            this.handlePing()
            break
          case BaseCommand_Type.PONG:
            this.handlePong()
            break
        }
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

  protected _onClose (): void {
    clearInterval(this.interval)
    this.interval = undefined
  }

  protected async sendHandshake (): Promise<void> {
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
  }

  protected receiveHandshake (baseCommand: BaseCommand): void {
    if (baseCommand.connected === undefined || baseCommand.error !== undefined) {
      this.wrappedLogger.error(
        'error during handshake',
        baseCommand.error,
        { baseCommandType: baseCommand.type }
      )
      throw Error('error while receiving handshake', { cause: baseCommand.error })
    }

    if ((baseCommand.connected?.maxMessageSize ?? 0) > 0 && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.wrappedLogger.info('connected!!')
    this.interval = setInterval((this.handleInterval.bind(this)), this.options.keepAliveIntervalMs)
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
