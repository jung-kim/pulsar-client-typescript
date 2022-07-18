import { Client } from "client/client"
import _ from "lodash"
import { ProducerOption, _initializeOption } from "./option"

export class Producer {
  readonly client: Client
  readonly option: ProducerOption
  constructor(option: ProducerOption, client: Client) {
    this.client = client
    this.option = _initializeOption(_.cloneDeep(option))
  }
}