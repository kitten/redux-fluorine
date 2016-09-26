import expect from 'expect'
import { Observable } from 'rxjs'
import symbolObservable from 'symbol-observable'

import isObservable from '../../src/util/isObservable'

describe('isObservable', () => {
  it('returns true for observables', () => {
    expect(isObservable(Observable.of(null))).toBeTruthy()
    expect(isObservable({
      /* eslint no-empty-function: 0 */
      subscribe() {},
      [symbolObservable]() {}
    })).toBeTruthy()
  })

  it('returns false for non-observables', () => {
    expect(isObservable()).toBeFalsy()
    expect(isObservable({})).toBeFalsy()
    expect(isObservable(() => {})).toBeFalsy()
  })
})
