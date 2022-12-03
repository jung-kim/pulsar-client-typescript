import Long from 'long'

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
    let res: (response: T) => void
    let rej: (e: any) => void
    let timeout: ReturnType<typeof setTimeout>

    const requestTrack = {
      id,
      prom: new Promise<T>((resolve, reject) => {
        res = resolve
        rej = reject
        if (timeoutMs !== undefined && timeoutMs > 0) {
          timeout = setTimeout(() => {
            rej(Error('timeout of $timeout is triggered.'))
          }, timeoutMs)
        }
      }).finally(() => {
        clearTimeout(timeout)
        this.requestTrackMap.delete(id.toString())
      }),
      resolveRequest: (value: T) => { res(value) },
      rejectRequest: (e: any) => { rej(e) }
    }

    this.requestTrackMap.set(id.toString(), requestTrack)
    return requestTrack
  }

  get (id: Long): RequestTrack<T> | undefined {
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
