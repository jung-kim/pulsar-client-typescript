
export abstract class Auth {
  abstract readonly name: string

  /**
   * Exract token from cache or get new token.
   */
  abstract getToken (): Promise<string>
}
