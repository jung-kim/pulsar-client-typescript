
export abstract class Auth {
  abstract readonly name: string

  constructor() {}

  /**
   * Exract token from cache or get new token.
   */
  abstract getToken(): Promise<string>

  /**
   * This is the formated data we send to pulsar to do auth.
   */
  abstract getAuthData(): Promise<string>
}