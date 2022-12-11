import { Auth } from './index'

export class NoAuth extends Auth {
  readonly name = 'noauth'

  async getToken (): Promise<string> { return '' }
}
