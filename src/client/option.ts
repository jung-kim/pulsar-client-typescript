// import { Auth } from "auth";
// import { NoAuth } from "auth/noauth";
// import { parse, UrlWithStringQuery } from "url";

// export const defaultConnectionTimeoutMs = 10 * 1000
// export const defaultOperationTimeoutMs = 30 * 1000
// export const defaultMaxConnectionsPerHost = 1

// export interface TlsOptions {
//   allowInsecureConnection?: boolean
//   trustCertsFilePath?: string
//   validateHostname?: boolean
// }

// export interface ClientOption extends TlsOptions {
//   url: string
//   connectionTimeoutMs?: number
//   operationTimeoutMs?: number
//   authentication?: Auth
// 	// // Set the path to the trusted TLS certificate file
// 	tlsTrustCertsFilePath?: string
// 	// // Configure whether the Pulsar client accept untrusted TLS certificate from broker (default: false)
// 	tlsAllowInsecureConnection?: boolean
// 	// // Configure whether the Pulsar client verify the validity of the host name from broker (default: false)
// 	tlsValidateHostname?: boolean
// 	// // Configure the net model for vpc user to connect the pulsar broker
// 	// ListenerName string
//   maxConnectionsPerHost?: number
// 	// // Configure the logger used by the client.
// 	// // By default, a wrapped logrus.StandardLogger will be used, namely,
// 	// // log.NewLoggerWithLogrus(logrus.StandardLogger())
// 	// // FIXME: use `logger` as internal field name instead of `log` as it's more idiomatic
// 	// Logger log.Logger
// 	// // Specify metric cardinality to the tenant, namespace or topic levels, or remove it completely.
// 	// // Default: MetricsCardinalityNamespace
// 	// MetricsCardinality MetricsCardinality
// 	// // Add custom labels to all the metrics reported by this client instance
// 	// CustomMetricsLabels map[string]string

//   _parsedUrl?: UrlWithStringQuery
// }

// /**
//  * Initialize provided `clientOptions` by filling default values and some validations
//  * @param clientOptions 
//  * @returns 
//  */
// export const _initializeOption = (clientOptions: ClientOption): ClientOption => {
//   if (!clientOptions.url) {
//     throw new Error('URL is required for client')
//   }
  
//   // check protocol
//   clientOptions._parsedUrl = parse(clientOptions.url)
//     switch(clientOptions._parsedUrl.protocol) {
//     case 'https:':
//     case 'pulsar+ssl:':
//       clientOptions.tlsAllowInsecureConnection = false
//       clientOptions.trustCertsFilePath = ''
//       clientOptions.validateHostname = false
//       break
//     case 'http:':
//     case 'pulsar:':
//       clientOptions.allowInsecureConnection = undefined
//       clientOptions.trustCertsFilePath = undefined
//       clientOptions.validateHostname = undefined
//       break
//     default:
//       throw new Error(`Invalid URL scheme '${clientOptions.url}'`)
//   }

//   if (!clientOptions.authentication) {
//     clientOptions.authentication = new NoAuth()
//   }

//   if (clientOptions.connectionTimeoutMs || 0 <= 0) {
//     clientOptions.connectionTimeoutMs = defaultConnectionTimeoutMs
//   }
//   if (clientOptions.operationTimeoutMs || 0 <= 0) {
//     clientOptions.operationTimeoutMs = defaultOperationTimeoutMs 
//   }
//   if (clientOptions.maxConnectionsPerHost || 0 <= 0) {
//     clientOptions.maxConnectionsPerHost = defaultMaxConnectionsPerHost
//   }

//   // if options.MetricsCardinality == 0 {
// 	// 	options.MetricsCardinality = MetricsCardinalityNamespace
// 	// }

// 	// var metrics *internal.Metrics
// 	// if options.CustomMetricsLabels != nil {
// 	// 	metrics = internal.NewMetricsProvider(int(options.MetricsCardinality), options.CustomMetricsLabels)
// 	// } else {
// 	// 	metrics = internal.NewMetricsProvider(int(options.MetricsCardinality), map[string]string{})
// 	// }

//   return clientOptions
// }
