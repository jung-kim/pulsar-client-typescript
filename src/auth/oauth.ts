import { Auth } from "auth"
import { OutgoingHttpHeaders } from "http"
import * as OAuthLib from 'oauth'

export interface OAuthOptions {
  clientId: string
  clientSecret: string
  baseSite: string
  authorizePath?: string
  accessTokenPath?: string
  customHeaders?: OutgoingHttpHeaders
  customParams?: Record<string, string>

  _token?: string // this is more for debuging, used if passed in instead of token exchange
}

export class OAuth implements Auth {
  readonly name = 'token'
  readonly oauth: OAuthLib.OAuth2
  readonly customParams: Record<string, string>
  readonly tokenOverride: string | undefined
  _accessToken: string = ''
  _refreshToken: string = ''
  _expiresAt: number | undefined

  constructor(options: OAuthOptions) {
    this.oauth = new OAuthLib.OAuth2(
      options.clientId,
      options.clientSecret,
      options.baseSite,
      options.authorizePath,
      options.accessTokenPath,
      options.customHeaders
    )

    this.customParams = { ...options.customParams }
    this.tokenOverride = options._token
  }

  /**
   * If cached token is valid, return the cached token
   * If cached token is expired and refreshable, refresh the token
   * Else, get new token and return the token
   * 
   * For most use cases, we should rely on this getToken() function only.
   * @returns 
   */
  async getToken(): Promise<string> {
    if (this.tokenOverride) {
      return this.tokenOverride
    }
    if (this.isCurrentTokenValid()) {
      return this._accessToken
    }

    if (this.isTokenExpired() && this._refreshToken) {
      return this.refreshToken()
    }

    const params: Record<string, string> = {
      ...this.customParams,
      grant_type: 'client_credentials'
    }

    return this._getAccessToken(params)
  }

  async getAuthData(): Promise<string> {
    return await this.getToken()
  }

  /**
   * Refresh current token via OIDC refresh workflow
   * @returns
   */
  async refreshToken(): Promise<string> {
    if (!this._refreshToken) {
      throw Error('refresh token is not set')
    }

    const params: Record<string, string> = {
      ...this.customParams,
      grant_type: 'refresh_token',
      refresh_token: this._refreshToken
    }

    return this._getAccessToken(params)
  }

  /**
   * true if cached current token is set and not expired
   * @returns 
   */
  isCurrentTokenValid() {
    if (!this._accessToken) {
      return false
    }

    if (this.isTokenExpired()) {
      return false
    }
    
    return true
  }

  /**
   * true if cached token is expired.  If undecernable, returns false
   * @returns 
   */
  isTokenExpired() {
    if (!this._expiresAt || Date.now() < this._expiresAt) {
      return false
    }
    return true
  }

  /**
   * make OIDC get token request
   * @param params to pass in as a request body param
   * @returns 
   */
  private async _getAccessToken(params: Record<string, string>): Promise<string> {
    await new Promise<void>((resolve, reject) => {
      this.oauth.getOAuthAccessToken('', params, (err, access_token, refresh_token, results) => {
        if (err) {
          reject(Error(`Failed to get token, statusCode: ${err.statusCode}, data: ${err.data}`))
        }

        this._accessToken = access_token
        this._refreshToken = refresh_token
        if (results && results['expires_in']) {
          // set when the token expires in and set the token expiresAt.
          // assumes `expires_in` is in seconds, subtract 30second just to refresh preemptively
          this._expiresAt = Date.now() + (results['expires_in'] * 1000) - 30000
        }
        resolve()
      })
    })
    return this._accessToken
  }
}