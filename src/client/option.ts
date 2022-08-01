import { Auth } from "auth";
import { NoAuth } from "auth/noauth";
import { parse, UrlWithStringQuery } from "url";

export const defaultConnectionTimeoutMs = 10 * 1000
export const defaultOperationTimeoutMs = 30 * 1000
export const defaultMaxConnectionsPerHost = 1

export interface TlsOptions {
  allowInsecureConnection?: boolean
  trustCertsFilePath?: string
  validateHostname?: boolean
}

export interface ClientOption extends TlsOptions {
  url: string
  _parsedUrl?: UrlWithStringQuery
  authentication?: Auth
  connectionTimeoutMs?: number
  operationTimeoutMs?: number
  maxConnectionsPerHost?: number
}

/**
 * Initialize provided `clientOptions` by filling default values and some validations
 * @param clientOptions 
 * @returns 
 */
export const _initializeOption = (clientOptions: ClientOption): ClientOption => {
  if (!clientOptions.url) {
    throw new Error('URL is required for client')
  }
  
  // check protocol
  clientOptions._parsedUrl = parse(clientOptions.url)
    switch(clientOptions._parsedUrl.protocol) {
    case 'https:':
    case 'pulsar+ssl:':
      // requires fields within `TlsOptions` to be set.
      break
    case 'http:':
    case 'pulsar:':
      clientOptions.allowInsecureConnection = undefined
      clientOptions.trustCertsFilePath = undefined
      clientOptions.validateHostname = undefined
      break
    default:
      throw new Error(`Invalid URL scheme '${clientOptions.url}'`)
  }

  if (!clientOptions.authentication) {
    clientOptions.authentication = new NoAuth()
  }

  if (clientOptions.connectionTimeoutMs || 0 <= 0) {
    clientOptions.connectionTimeoutMs = defaultConnectionTimeoutMs
  }
  if (clientOptions.operationTimeoutMs || 0 <= 0) {
    clientOptions.operationTimeoutMs = defaultOperationTimeoutMs 
  }
  if (clientOptions.maxConnectionsPerHost || 0 <= 0) {
    clientOptions.maxConnectionsPerHost = defaultMaxConnectionsPerHost
  }

  return clientOptions
}
