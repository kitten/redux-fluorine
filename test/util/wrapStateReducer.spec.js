import expect from 'expect'
import wrapStateReducer from '../../src/util/wrapStateReducer'

function reducer() {
  return 'test'
}

describe('wrapStateReducer', () => {
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
})

