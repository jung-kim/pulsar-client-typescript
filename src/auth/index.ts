
export abstract class Auth {
  abstract readonly name: string

  constructor() {}

  abstract init(): void
}