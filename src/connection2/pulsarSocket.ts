import { BaseCommand, BaseCommand_Type } from '../proto/PulsarApi'
import { Writer } from 'protobufjs'
import { DEFAULT_MAX_MESSAGE_SIZE, PROTOCOL_VERSION, PULSAR_CLIENT_VERSION, _ConnectionOptions } from './ConnectionOptions'
import { BaseSocket } from './baseSocket'
import { Initializable } from './initializable'

export class PulsarSocket extends Initializable<void> {
  private interval: ReturnType<typeof setInterval> | undefined = undefined
  private readonly logicalAddress: URL
  public readonly baseSocket: BaseSocket

  constructor (options: _ConnectionOptions, logicalAddress: URL) {
    super('PulsarSocket', options)
    this.baseSocket = new BaseSocket(options)
    this.logicalAddress = logicalAddress

    this.eventSignal.add(event => {
      switch (event) {
        case 'base_socket_ready':
          this.initialize()
          break
      }
    })

    this.dataSignal.add(message => {
      if (this.state === 'INITIALIZING') {
        // message received during "initializing" is assumed to be from handshake effort.
        this.receiveHandshake(message.baseCommand)
      } else {
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
  }

  public async writeCommand (command: BaseCommand): Promise<void> {
    await this.ensureReady()

    const marshalledCommand = BaseCommand.encode(command).finish()
    const payload = new Uint8Array(4 + 4 + marshalledCommand.length)
    payload.set((new Writer()).fixed32(4 + marshalledCommand.length).finish().reverse())
    payload.set((new Writer()).fixed32(marshalledCommand.length).finish().reverse())
    payload.set(marshalledCommand)

    return await this.baseSocket.send(payload)
  }

  protected async _initialize (): Promise<void> {
    await this.sendHandshake()

    const res = await Promise.any([
      this.eventSignal.filter(s => s === 'pulsar_socket_ready').promisify(),
      this.eventSignal.filter(s => s === 'pulsar_socket_error').promisify()
    ])

    if (res === 'pulsar_socket_error') {
      throw Error('pulsarSocket initfailed')
    }
  }

  protected _onClose (): void {
    clearInterval(this.interval)
    this.interval = undefined
  }

  protected async sendHandshake (): Promise<void> {
    await this.baseSocket.ensureReady()

    const authData = await this.options.auth.getToken()
    const payload = BaseCommand.fromJSON({
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
    await this.writeCommand(payload)
  }

  protected receiveHandshake (baseCommand: BaseCommand): void {
    if (baseCommand.connected === undefined) {
      if (baseCommand.error !== undefined) {
        this.wrappedLogger.error('error during handshake', baseCommand.error)
      } else {
        this.wrappedLogger.error(
          'unkonwn base command was received',
          undefined,
          { baseCommandType: baseCommand.type }
        )
      }
      this._eventSignal.dispatch('pulsar_socket_error')
      return
    }

    if ((baseCommand.connected?.maxMessageSize ?? 0) > 0 && baseCommand.connected?.maxMessageSize > 0) {
      this.options.maxMessageSize = baseCommand.connected?.maxMessageSize
    } else {
      this.options.maxMessageSize = DEFAULT_MAX_MESSAGE_SIZE
    }

    this.wrappedLogger.info('connected!!')
    this.interval = setInterval((this.handleInterval.bind(this)), this.options.keepAliveIntervalMs)
    this._eventSignal.dispatch('pulsar_socket_ready')
  }

  private handleInterval (): void {
    this.sendPing()

    if (this.baseSocket.getLastDataReceived() + (this.options.keepAliveIntervalMs * 2) < new Date().getMilliseconds()) {
      // stale connection, closing
      this.wrappedLogger.info('stale connection, closing')
      this._eventSignal.dispatch('close')
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
