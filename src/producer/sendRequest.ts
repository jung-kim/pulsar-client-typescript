import { ProducerMessage } from "./ProducerMessage"

export interface SendRequest {
  msg: ProducerMessage
  publishTimeMs: number
  flushImmediately: boolean
}
