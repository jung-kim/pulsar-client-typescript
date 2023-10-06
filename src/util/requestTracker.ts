import Long from 'long'
import { getDeferred } from './deferred'

export interface RequestTrack<T> {
  id: Long
  prom: Promise<T>
  resolveRequest: (response: T) => void
  rejectRequest: (e: any) => void
}

/**
 *
 */
export class RequestTracker<T> {
  protected currentRequestId: Long = Long.UZERO // unsigned long
  protected readonly requestTrackMap: Map<string, RequestTrack<T>> = new Map()

  private getRequestId (): Long {
    this.currentRequestId = this.currentRequestId.add(1)
    return this.currentRequestId
  }

  trackRequest (timeoutMs?: number): RequestTrack<T> {
    const id = this.getRequestId()
    const deferred = getDeferred<T>()
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (timeoutMs !== undefined && timeoutMs > 0) {
      timeout = setTimeout(() => {
        deferred.reject(Error(`timeout of ${timeoutMs} is triggered.`))
      }, timeoutMs)
    }

    const requestTrack = {
      id,
      prom: deferred.promise.finally(() => {
        if (timeout !== undefined) {
          this.requestTrackMap.get(id.toString())?.rejectRequest(new Error(`timeout of ${timeoutMs ?? ''} occured`))
          clearTimeout(timeout)
        }
        this.requestTrackMap.delete(id.toString())
      }),
      resolveRequest: deferred.resolve,
      rejectRequest: deferred.reject
    }
    this.requestTrackMap.set(id.toString(), requestTrack)
    return requestTrack
  }

  get (id: Long | undefined): RequestTrack<T> | undefined {
    return id === undefined ? undefined : this.requestTrackMap.get(id.toString())
  }

  resolveRequest (id: Long | undefined, value: T): void {
    this.get(id)?.resolveRequest(value)
  }

  rejectRequest (id: Long | undefined, reason?: any): void {
    this.get(id)?.rejectRequest(reason)
  }

  clear (message?: string): void {
    this.requestTrackMap.forEach((v) => v.rejectRequest(new Error(message ?? 'clearing all requests')))
    this.requestTrackMap.clear()
  }
}
