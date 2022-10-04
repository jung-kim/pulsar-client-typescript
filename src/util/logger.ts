import { createLogger, transports, format } from 'winston'
import configs from '../configs/configs'

const consoleFormat = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`
    })
  )
})
const jsonFormat = new transports.Console({
  format: format.json()
})

export const logger = createLogger({
  level: configs.logLevel,
  transports: configs.logFormat === 'json' ? jsonFormat : consoleFormat,
})
