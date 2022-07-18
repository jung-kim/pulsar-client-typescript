import { Auth } from "auth"
import { OutgoingHttpHeaders } from "http"
import * as OAuthImpl from 'oauth'

export interface OAuthOptions {
  clientId: string,
  clientSecret: string,
  baseSite: string,
  authorizePath?: string,
  accessTokenPath?: string,
  customHeaders?: OutgoingHttpHeaders
}


export class OAuth implements Auth {
  readonly name = 'oauth'
  readonly oauth: OAuthImpl.OAuth2

  constructor(options: OAuthOptions) {
    this.oauth = new OAuthImpl.OAuth2(
      options.clientId,
      options.clientSecret,
      options.baseSite,
      options.authorizePath,
      options.accessTokenPath,
      options.customHeaders
    )
  }

  init() {}
}