import filterActions from '../actions/filterActions'

export default function executeAgenda(agenda, store) {
  const { dispatch, getState } = store

  const anchor = getState()
  const actions = []

  // Subscribe to the agenda and return the subscription

  return agenda.subscribe({
    next(action) {
      // Dispatch action normally and push it to our bucket
      dispatch(action)
      actions.push(action)
    },
    error(err) {
      console.error && console.error(err)

      // Instruct the reducer wrapper to recompute the state
      // without any actions inside the `actions` array

      if (actions.length) {
        dispatch(filterActions(anchor, actions))
      }
    },
    complete() {
      // NOTE: We don't need to do anything here
    }
  })
}

