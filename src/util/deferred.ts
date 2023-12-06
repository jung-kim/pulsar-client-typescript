export class Deferred <T> {
  public readonly promise: Promise<T>
  public readonly resolve: (value: T | PromiseLike<T>) => void
  public readonly reject: (reason?: any) => void
  private isResolved: boolean = false

  constructor (promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) {
    this.promise = promise
    this.resolve = (value: T | PromiseLike<T>) => {
      resolve(value)
      this.isResolved = true
    }
    this.reject = reject
  }

  public getIsReolved (): boolean {
    return this.isResolved
  }
}

export const getDeferred = <T>(): Deferred<T> => {
  let res!: (value: T | PromiseLike<T>) => void
  let rej!: (reason?: any) => void
  const promise = new Promise<T>((resolve, reject) => {
    res = resolve
    rej = reject
  })

  return new Deferred(promise, res, rej)
}
