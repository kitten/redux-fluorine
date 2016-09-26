import expect from 'expect'

import { RECOVER_AFTER_ERROR } from '../../src/actions/filterActions'
import wrapStateReducer from '../../src/util/wrapStateReducer'

function reducer() {
  return 'test'
}

describe('wrapStateReducer', () => {
  it('throws when reducer is not a function', () => {
    expect(() => {
      wrapStateReducer()
    }).toThrow('wrapStateReducer: Expected `reducer` to be a function.')
  })

  it('returns wrapped states', () => {
    const action = {}
    const lastState = {}
    const state = wrapStateReducer(reducer)(lastState, action)

    expect(lastState.next).toBe(state)
    expect(state.action).toBe(action)
    expect(state.state).toBe('test')
    expect(state.next).toBe(null)
  })

  it('has a correct default state', cb => {
    const initial = {}
    const action = {}

    const state = wrapStateReducer((lastState, x) => {
      expect(lastState).toBe(initial)
      expect(x).toBe(action)

      cb()
    }, initial)(undefined, action)
  })

  it('calls reapplyActionsWithout on RECOVER_AFTER_ERROR', () => {
    const anchor = {}

    const res = wrapStateReducer(reducer)(undefined, {
      type: RECOVER_AFTER_ERROR,
      anchor,
      actions: []
    })

    expect(res).toBe(anchor)
    expect(res.next).toBe(null)
  })
})

