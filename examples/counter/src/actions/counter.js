import { Observable } from 'rxjs'

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/counter'

export function increment() {
  return Observable.of({
    type: INCREMENT_COUNTER
  })
}

export function decrement() {
  return Observable.of({
    type: DECREMENT_COUNTER
  })
}

// We create an observable emitting the action and delay
// it with an RxJS operator
export function incrementDelayed(delay = 1000) {
  return increment().delay(delay);
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    dispatch(
      Observable
        .of(counter)
        .flatMap(val => (val % 2 !== 0) ? increment() : Observable.empty())
    )
  }
}

// This uses the incremention, but concats an error. This will
// trigger Redux Fluorine to rollback the incremention.
export function incrementDelayedRollback() {
  return increment()
    .concat(Observable
      .throw('Hello World!')
      .delay(1000)) // Delay the error so we can observe the rollback
}

