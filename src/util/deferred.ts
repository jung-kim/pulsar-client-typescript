export const deferred = <T>(): {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  promise: Promise<T>
} => {
  let res!: (value: T | PromiseLike<T>) => void
  let rej!: (reason?: any) => void
  const promise = new Promise<T>((resolve, reject) => {
    res = resolve
    rej = reject
  })

  return {
    resolve: res,
    reject: rej,
    promise
  }
}
