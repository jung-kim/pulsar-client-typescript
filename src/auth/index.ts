
export abstract class Auth {
  abstract readonly name: string

  constructor() {}

  /**
   * exract token from cache or get new token.
   */
  abstract getToken(): Promise<string>
}