import expect from 'expect'
import reapplyActionsWithout from '../../src/util/reapplyActionsWithout'

function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD': return state + 1
    case 'SUBTRACT': return state - 1
    default: return state
  }
}

const add = () => ({ type: 'ADD' })
const subtract = () => ({ type: 'SUBTRACT' })
const initial = { action: null, state: 0, next: null }

function dispatch(wrapper = initial, action) {
  wrapper.next = {
    action,
    state: counter(wrapper.state, action),
    next: null
  }

  return wrapper.next
}

function collectWrappers(wrapper) {
  const wrappers = []

  do {
    wrappers.push({ ...wrapper })
    wrapper = wrapper.next
  } while (wrapper)

  return wrappers
}

describe('reapplyActionsWithout', () => {
  it('keeps valid chains intact', () => {
    let wrapper

    const first = wrapper = dispatch(wrapper, add())
    wrapper = dispatch(wrapper, add())
    wrapper = dispatch(wrapper, subtract())

    const pre = collectWrappers(first)
    const last = reapplyActionsWithout(counter, first, [])
    const post = collectWrappers(first)

    // We expect nothing to change
    expect(pre).toEqual(post)
  })

  it('recomputes the state correctly when actions are subtracted', () => {
    const filter = [ add(), subtract(), add() ]

    let wrapper
    const first = wrapper = dispatch(wrapper, add()) // 1
    const deleted = wrapper = dispatch(wrapper, filter[0]) // 2
    wrapper = dispatch(wrapper, add()) // 3
    wrapper = dispatch(wrapper, subtract()) // 2
    wrapper = dispatch(wrapper, add()) // 3
    const prepreLast = wrapper = dispatch(wrapper, filter[1]) // 2
    const preLast = wrapper = dispatch(wrapper, add()) // 3
    wrapper = dispatch(wrapper, filter[2]) // 4

    const pre = collectWrappers(first)
    const last = reapplyActionsWithout(counter, first, filter)
    const post = collectWrappers(first)

    // Original chain must result in 4
    expect(pre[pre.length - 1].state).toBe(4)

    // Modified chain must result in 3
    expect(post[post.length - 1].state).toBe(3)

    // The chains can't be equal
    expect(pre).toNotEqual(post)

    // The last node was deleted, thus the new last node is preLast
    expect(preLast).toBe(last)

    // The node before preLast must have it as a pointer in x.next
    expect(prepreLast.next).toBe(preLast)

    // The new chain length must be the same minus the filter array length
    expect(pre.length - filter.length).toEqual(post.length)

    // A deleted node's lastValidState attr must point to the first valid node before
    expect(deleted.lastValidState).toBe(first)
  })

  it('uses base.lastValidState if it\'s set', () => {
    const lastValidState = {}
    const base = { lastValidState }

    const res = reapplyActionsWithout(null, base)

    expect(res).toBe(lastValidState)
    expect(res.next).toBe(null)
  })
})

