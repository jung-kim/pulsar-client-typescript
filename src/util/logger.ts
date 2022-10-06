import { createLogger, transports, format } from 'winston'
import configs from '../configs/configs'

const consoleFormat = new transports.Console({
  format: format.combine(
    format.timestamp(),
    format.prettyPrint()
  )
})
const jsonFormat = new transports.Console({
  format: format.json()
})

export const logger = createLogger({
  level: configs.logLevel,
  transports: configs.logFormat === 'json' ? jsonFormat : consoleFormat,
})

export class WrappedLogger {
  private readonly logMetadata: any
  constructor(logMetadata: any) {
    this.logMetadata = logMetadata
  }

  info(message: string, meta?: Record<string, any>) {
    logger.info(message, { trackingData: this.logMetadata, meta })
  }
  debug(message: string, meta?: Record<string, any>) {
    logger.debug(message, { trackingData: this.logMetadata, meta })
  }
  warn(message: string, meta?: Record<string, any>) {
    logger.warn(message, { trackingData: this.logMetadata, meta })
  }
  error(message: string, err?: any, meta?: Record<string, any>) {
    logger.error(message, { trackingData: this.logMetadata, meta, err })
  }
  log(level: string, message: string, meta?: Record<string, any>) {
    logger.log(level, message, { trackingData: this.logMetadata, meta })
  }
}
