import { Auth } from "auth"

export class NoAuth extends Auth {
  readonly name = 'noauth'

  init() {}
}