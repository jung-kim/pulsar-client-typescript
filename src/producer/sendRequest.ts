import { ProducerMessage } from './producerMessage'

export interface SendRequest {
  msg: ProducerMessage
  publishTimeMs: number
  flushImmediately: boolean
}
