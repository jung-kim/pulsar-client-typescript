import { expect } from 'chai'
import Long from 'long'
import sinon from 'sinon'
import { RequestTrack, RequestTracker } from '../../../src/util/requestTracker'

describe('util.requestTracker', () => {
  class TestRequestTracker<T> extends RequestTracker<T> {
    getCurrentRequestId = (): Long => { return this.currentRequestId }
    getRequestTrackMap = (): Map<string, RequestTrack<T>> => { return this.requestTrackMap }
    setCurrentRequestIdToMax = (): void => {
      this.currentRequestId = Long.MAX_UNSIGNED_VALUE
    }
  }

  it('constructor()', () => {
    const rt = new TestRequestTracker()

    expect(rt.getCurrentRequestId()).to.deep.eq(Long.UZERO)
    expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq([])
  })

  describe('trackRequest()', () => {
    it('without timeout', () => {
      const rt = new TestRequestTracker()

      const first = rt.trackRequest()
      expect(first.id).to.deep.eq(Long.UONE)
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['1'])
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.UONE)

      const second = rt.trackRequest()
      expect(second.id).to.deep.eq(Long.fromNumber(2, true))
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['1', '2'])
      expect(rt.getRequestTrackMap().get(Long.UONE.toString())?.id).to.deep.eq(Long.UONE)
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.fromNumber(2, true))
    })

    it('test track request with timeout', async () => {
      const rt = new TestRequestTracker()
      const clock = sinon.useFakeTimers()

      const first = rt.trackRequest(10000)
      expect(first.id).to.deep.eq(Long.UONE)
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['1'])
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.UONE)

      clock.tick(5000)
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['1'])
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.UONE)

      clock.tick(6000)
      try {
        await rt.getRequestTrackMap().get('0')?.prom
        expect.fail('should not have succeded')
      } catch (e) { }
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq([])
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.UONE)
    })

    it('should gracefully handle request id overflow', () => {
      const rt = new TestRequestTracker()
      rt.setCurrentRequestIdToMax()

      expect(rt.getCurrentRequestId()).to.deep.eq(Long.MAX_UNSIGNED_VALUE)

      const max = rt.trackRequest()
      expect(max.id).to.deep.eq(Long.UZERO)
      expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['0'])
      expect(rt.getCurrentRequestId()).to.deep.eq(Long.UZERO)
    })
  })

  it('should clear the request map', async () => {
    const rt = new TestRequestTracker()

    const first = rt.trackRequest()
    const second = rt.trackRequest()

    expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq(['1', '2'])

    rt.clear()

    try {
      await first.prom
      expect.fail('should note have succeeded')
    } catch {}
    try {
      await second.prom
      expect.fail('should note have succeeded')
    } catch {}

    expect(Array.from(rt.getRequestTrackMap().keys())).to.deep.eq([])
  })
})
