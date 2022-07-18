import { ClientOption, TlsOptions, _initializeOption } from "./option"
import * as _ from 'lodash'

export class Client {
  readonly clientOptions: ClientOption
  readonly tlsOptions: TlsOptions | undefined

  constructor(clientOptions: ClientOption) {
    this.clientOptions = _initializeOption(_.cloneDeep(clientOptions))
  }
}
