import { Auth } from './auth'
import { OutgoingHttpHeaders } from 'http'
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

export const convertFromSNOauth2KeyFile = (audience: string, args: {
  client_id: string
  client_secret: string
  issuer_url: string
}): OAuthOptions => {
  return {
    clientId: args.client_id,
    clientSecret: args.client_secret,
    baseSite: args.issuer_url,
    accessTokenPath: 'oauth/token',
    customParams: {
      audience,
      grant_type: 'client_credentials'
    }
  }
}

export class OAuth implements Auth {
  readonly name = 'token'
  readonly oauth: OAuthLib.OAuth2
  readonly customParams: Record<string, string>
  readonly tokenOverride: string | undefined
  _accessToken: string = ''
  _refreshToken: string = ''
  _expiresAt: number | undefined

  constructor (options: OAuthOptions) {
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
  async getToken (): Promise<string> {
    if (this.tokenOverride !== undefined) {
      return this.tokenOverride
    }
    if (this.isCurrentTokenValid()) {
      return this._accessToken
    }

    if (this.isTokenExpired() && this._refreshToken !== '') {
      return await this.refreshToken()
    }

    const params: Record<string, string> = {
      ...this.customParams,
      grant_type: 'client_credentials'
    }

    return await this._getAccessToken(params)
  }

  /**
   * Refresh current token via OIDC refresh workflow
   * @returns
   */
  async refreshToken (): Promise<string> {
    if (this._refreshToken === '') {
      throw Error('refresh token is not set')
    }

    const params: Record<string, string> = {
      ...this.customParams,
      grant_type: 'refresh_token',
      refresh_token: this._refreshToken
    }

    return await this._getAccessToken(params)
  }

  /**
   * true if cached current token is set and not expired
   * @returns
   */
  isCurrentTokenValid (): boolean {
    if (this._accessToken === '') {
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
  isTokenExpired (): boolean {
    if (this._expiresAt !== undefined && Date.now() < this._expiresAt) {
      return false
    }
    return true
  }

  async _fetchAccessToken (params: Record<string, string>): Promise<{ accessToken: string, refreshToken: string, expiresIn: number }> {
    return await new Promise<{ accessToken: string, refreshToken: string, expiresIn: number }>((resolve, reject) => {
      this.oauth.getOAuthAccessToken('', params, (err, accessToken, refreshToken, results) => {
        if (err !== undefined && err !== null) {
          reject(new Error(`Failed to get token, statusCode: ${err.statusCode}`))
        } else if (results?.expires_in === undefined) {
          reject(new Error('Failed to get token expiry'))
        } else {
          resolve({ accessToken, refreshToken, expiresIn: results.expires_in })
        }
      })
    })
  }

  /**
   * make OIDC get token request
   * @param params to pass in as a request body param
   * @returns
   */
  private async _getAccessToken (params: Record<string, string>): Promise<string> {
    const tokenFetchResult = await this._fetchAccessToken(params)
    this._accessToken = tokenFetchResult.accessToken
    this._refreshToken = tokenFetchResult.refreshToken
    this._expiresAt = Date.now() + (tokenFetchResult.expiresIn * 1000) - 30000
    return this._accessToken
  }
}
