export default function reapplyActionsWithout(reducer, base, subtract = []) {
  let diverged = false
  let anchor = base.lastValidState || base
  let lastValid = anchor

  while (anchor.next) {
    // Iterate to next state
    anchor = anchor.next

    const { action, removed } = anchor

    if (subtract.indexOf(action) > -1) {
      // Prevent recomputation of any states until it's actually
      // necessary

      diverged = true

      // Link last valid state for any agenda that might have stored
      // this state as its anchor

      anchor.lastValidState = lastValid
    } else {
      if (diverged) {
        // Recompute state

        anchor.state = reducer(lastValid.state, action)
      }

      // Link the last valid state to this equally valid one and
      // replace the lastValid reference with this state

      lastValid.next = anchor
      lastValid = anchor
    }
  }

  // Make sure that the lastValid state is not pointing anywhere and
  // return it

  lastValid.next = null
  return lastValid
}

