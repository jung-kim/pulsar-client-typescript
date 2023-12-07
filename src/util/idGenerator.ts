import Long from 'long'

export class IncrementalIdGenerator {
  private id: Long = new Long(1, undefined, true)

  public getAndIncrement (): Long {
    const id = this.id
    this.id = this.id.add(1)
    return id
  }
}
