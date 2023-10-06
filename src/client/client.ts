import { Producer, ProducerOption } from '../producer'
import { Connection, ConnectionPool } from '../connection'
import { ClientOptions, _ClientOptions } from './clientOptions'
import { WrappedLogger } from '../util/logger'
import { v4 } from 'uuid'
import { LookupService } from './lookupService'

export class Client {
  private readonly cp: ConnectionPool
  private readonly logger: WrappedLogger
  public readonly opt: _ClientOptions
  public readonly lookupService: LookupService

  constructor (opt: ClientOptions) {
    this.cp = new ConnectionPool(opt)
    this.opt = new _ClientOptions(opt)
    this.logger = new WrappedLogger({
      uuid: v4(),
      type: 'client'
    })
    this.lookupService = new LookupService(this)

    // var tlsConfig *internal.TLSOptions
    // switch url.Scheme {
    // case "pulsar", "http":
    // 	tlsConfig = nil
    // case "pulsar+ssl", "https":
    // 	tlsConfig = &internal.TLSOptions{
    // 		AllowInsecureConnection: options.TLSAllowInsecureConnection,
    // 		TrustCertsFilePath:      options.TLSTrustCertsFilePath,
    // 		ValidateHostname:        options.TLSValidateHostname,
    // 	}

    // 	fmt.Printf("858582 %+v", tlsConfig)
    // default:
    // 	return nil, newError(InvalidConfiguration, fmt.Sprintf("Invalid URL scheme '%s'", url.Scheme))
    // }

    // var authProvider auth.Provider
    // var ok bool

    // if options.Authentication == nil {
    // 	authProvider = auth.NewAuthDisabled()
    // } else {
    // 	authProvider, ok = options.Authentication.(auth.Provider)
    // 	if !ok {
    // 		return nil, newError(AuthenticationError, "invalid auth provider interface")
    // 	}
    // }
    // err = authProvider.Init()
    // if err != nil {
    // 	return nil, err
    // }

    // connectionTimeout := options.ConnectionTimeout
    // if connectionTimeout.Nanoseconds() == 0 {
    // 	connectionTimeout = defaultConnectionTimeout
    // }

    // operationTimeout := options.OperationTimeout
    // if operationTimeout.Nanoseconds() == 0 {
    // 	operationTimeout = defaultOperationTimeout
    // }

    // maxConnectionsPerHost := options.MaxConnectionsPerBroker
    // if maxConnectionsPerHost <= 0 {
    // 	maxConnectionsPerHost = 1
    // }

    // if options.MetricsCardinality == 0 {
    // 	options.MetricsCardinality = MetricsCardinalityNamespace
    // }

    // var metrics *internal.Metrics
    // if options.CustomMetricsLabels != nil {
    // 	metrics = internal.NewMetricsProvider(int(options.MetricsCardinality), options.CustomMetricsLabels)
    // } else {
    // 	metrics = internal.NewMetricsProvider(int(options.MetricsCardinality), map[string]string{})
    // }

    // c := &client{
    // 	cnxPool: internal.NewConnectionPool(tlsConfig, authProvider, connectionTimeout, maxConnectionsPerHost, logger,
    // 		metrics),
    // 	log:     logger,
    // 	metrics: metrics,
    // }
    // serviceNameResolver := internal.NewPulsarServiceNameResolver(url)

    // c.rpcClient = internal.NewRPCClient(url, serviceNameResolver, c.cnxPool, operationTimeout, logger, metrics)

    // switch url.Scheme {
    // case "pulsar", "pulsar+ssl":
    // 	c.lookupService = internal.NewLookupService(c.rpcClient, url, serviceNameResolver,
    // 		tlsConfig != nil, options.ListenerName, logger, metrics)
    // case "http", "https":
    // 	httpClient, err := internal.NewHTTPClient(url, serviceNameResolver, tlsConfig,
    // 		operationTimeout, logger, metrics, authProvider)
    // 	if err != nil {
    // 		return nil, newError(InvalidConfiguration, fmt.Sprintf("Failed to init http client with err: '%s'",
    // 			err.Error()))
    // 	}
    // 	c.lookupService = internal.NewHTTPLookupService(httpClient, url, serviceNameResolver,
    // 		tlsConfig != nil, logger, metrics)
    // default:
    // 	return nil, newError(InvalidConfiguration, fmt.Sprintf("Invalid URL scheme '%s'", url.Scheme))
    // }

    // c.handlers = internal.NewClientHandlers()

    // return c, nil
  }

  /**
   * returns a connection
   * @param logicalAddress optional, if undefined return getAnyAdminConnection()
   * @returns Connection
   */
  public getConnection (logicalAddress?: URL): Connection {
    if (logicalAddress === undefined) {
      return this.cp.getAnyAdminConnection()
    }

    return this.getConnection(logicalAddress)
  }

  /**
   * close all connections
   */
  public clear (): void {
    this.cp.clear()
  }

  public createProducer (option: Partial<ProducerOption>): Producer {
    return new Producer(option, this.cp)
  }
}
