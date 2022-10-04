import Long from 'long';

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
  private readonly requestTrackMap: Record<string, RequestTrack<T>> = {}

  private getRequestId() {
    const id = this.currentRequestId
    if (id.equals(Long.MAX_UNSIGNED_VALUE)) {
      this.currentRequestId = Long.UZERO
    } else {
      this.currentRequestId = this.currentRequestId.add(1)
    }
    return id
  }

  trackRequest(timeoutMs?: number): RequestTrack<T> {
    const id = this.getRequestId()
    let res: (response: T) => void
    let rej: (e: any) => void
    let timeout: ReturnType<typeof setTimeout>
    
    return this.requestTrackMap[id.toString()] = {
      id,
      prom: new Promise<T>((res, rej) => {
        res = res
        rej = rej
        if (timeoutMs && timeoutMs > 0) {
          timeout = setTimeout(() => {
            rej(Error(`timeout of $timeout is triggered.`))
          }, timeoutMs)
        }
      }).finally(() => {
        clearTimeout(timeout)
        delete this.requestTrackMap[id.toString()]
      }),
      resolveRequest: (value: T) => { res(value) },
      rejectRequest: (e: any) => { rej(e) }
    }
  }

  resolveRequest(id: Long | undefined, value: T) {
    if (!id) {
      return
    }
    const requestTrack = this.requestTrackMap[id.toString()]
    if (requestTrack) {
      requestTrack.resolveRequest(value)
    }
  }

  rejectRequest(id: Long | undefined, reason?: any) {
    if (!id) {
      return
    }
    const requestTrack = this.requestTrackMap[id.toString()]
    if (requestTrack) {
      requestTrack.rejectRequest(reason)
    }
  }

  clear() {
    Object.values(this.requestTrackMap).forEach(requestTrack => requestTrack.rejectRequest('socket is closing.'))
  }
}