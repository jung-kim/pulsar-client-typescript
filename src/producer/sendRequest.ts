import { ProducerMessage } from "./producer"

export interface SendRequest {
  msg: ProducerMessage
  publishTimeMs: number
  flushImmediately: boolean
}
