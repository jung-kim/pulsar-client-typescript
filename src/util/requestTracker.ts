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
  private currentRequestId: Long = Long.UZERO
  private readonly requestTrackMap: Map<string, RequestTrack<T>> = new Map()

  private getRequestId (): Long {
    const id = this.currentRequestId
    if (id.equals(Long.MAX_UNSIGNED_VALUE)) {
      this.currentRequestId = Long.UZERO
    } else {
      this.currentRequestId = this.currentRequestId.add(1)
    }
    return id
  }

  trackRequest (timeoutMs?: number): RequestTrack<T> {
    const id = this.getRequestId()
    const deferred = getDeferred<T>()

    try {
      return {
        id,
        prom: deferred.promise,
        resolveRequest: deferred.resolve,
        rejectRequest: deferred.reject
      }
    } finally {
      if (timeoutMs !== undefined && timeoutMs > 0) {
        const timeout = setTimeout(() => {
          deferred.reject(Error(`timeout of ${timeoutMs} is triggered.`))
        }, timeoutMs)
        deferred.promise.finally(() => {
          clearTimeout(timeout)
          this.requestTrackMap.delete(id.toString())
        })
      }
    }
  }

  get (id: Long | undefined): RequestTrack<T> | undefined {
    if (id === undefined) {
      return undefined
    }
    return this.requestTrackMap.get(id.toString())
  }

  resolveRequest (id: Long | undefined, value: T): void {
    if (id === undefined) {
      return
    }
    const requestTrack = this.get(id)
    if (requestTrack !== undefined) {
      requestTrack.resolveRequest(value)
    }
  }

  rejectRequest (id: Long | undefined, reason?: any): void {
    if (id === undefined) {
      return
    }
    const requestTrack = this.get(id)
    if (requestTrack !== undefined) {
      requestTrack.rejectRequest(reason)
    }
  }

  clear (): void {
    Object.values(this.requestTrackMap).forEach(requestTrack => requestTrack.rejectRequest('socket is closing.'))
  }
}
