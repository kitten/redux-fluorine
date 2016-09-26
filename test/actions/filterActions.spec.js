import expect from 'expect'
import filterActions, { RECOVER_AFTER_ERROR } from '../../src/actions/filterActions'

describe('filterActions', () => {
  it('creates a RECOVER_AFTER_ERROR action', () => {
    const anchor = {}
    const actions = []

    const action = filterActions(anchor, actions)

    expect(Object.keys(action).length).toBe(3)
    expect(action.type).toBe(RECOVER_AFTER_ERROR)
    expect(action.anchor).toBe(anchor)
    expect(action.actions).toBe(actions)
  })
})

