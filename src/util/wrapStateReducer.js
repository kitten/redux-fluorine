import { RECOVER_AFTER_ERROR } from '../actions/filterActions'
import reapplyActionsWithout from './reapplyActionsWithout'

export default function wrapStateReducer(reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error('wrapStateReducer: Expected `reducer` to be a function.')
  }

  const _defaultState = {
    action: null,
    state: initialState,
    next: null
  }

  return (state = _defaultState, action) => {
    if (action.type === RECOVER_AFTER_ERROR) {
      // Reapply all past actions subtracting the errored ones
      const { anchor, actions } = action
      return reapplyActionsWithout(reducer, anchor, actions)
    }

    const lastState = state.state
    const nextState = reducer(lastState, action)

    // Create next wrapped state and link it
    state.next = {
      action,
      state: nextState,
      next: null
    }

    return state.next
  }
}

