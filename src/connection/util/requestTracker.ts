import Long from 'long';

export interface RequestTrack<T> {
  id: Long
  prom: Promise<T>
  resolveRequest: (response: T) => void
  rejectRequest: (e: any) => void
}

interface RequestResRej<T> {
  id: Long
  res: (response: T) => void
  rej: (e: any) => void
}

/**
 * 
 */
export class RequestTracker<T> {
  private currentRequestId: Long = Long.UZERO
  private readonly resRejMap: Record<string, RequestResRej<T>> = {}

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
    let timeout: ReturnType<typeof setTimeout>
    return {
      id,
      prom: new Promise<T>((res, rej) => {
        this.resRejMap[id.toString()] = { id, res, rej }
        if (timeoutMs && timeoutMs > 0) {
          timeout = setTimeout(() => {
            rej(Error(`timeout of $timeout is triggered.`))
          }, timeoutMs)
        }
      }).finally(() => {
        clearTimeout(timeout)
        delete this.resRejMap[id.toString()]
      }),
      resolveRequest: (value: T) => {
        this.resolveRequest(id, value)
      },
      rejectRequest: (e: any) => {
        this.rejectRequest(id, e)
      }
    }
  }

  resolveRequest(id: Long | undefined, value: T) {
    if (!id) {
      return
    }
    const resRej = this.resRejMap[id.toString()]
    if (resRej) {
      resRej.res(value)
    }
  }

  rejectRequest(id: Long | undefined, reason?: any) {
    if (!id) {
      return
    }
    const resRej = this.resRejMap[id.toString()]
    if (resRej) {
      resRej.rej(reason)
    }
  }

  clear() {
    Object.values(this.resRejMap).forEach(resRej => resRej.rej('socket is closing.'))
  }
}