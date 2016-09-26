import symbolObservable from 'symbol-observable'
import isObservable from './util/isObservable'
import executeAgenda from './util/executeAgenda'
import wrapStateReducer from './util/wrapStateReducer'

function wrapStore(store) {
  function getState() {
    const { state } = store.getState()
    return state
  }

  function dispatch(action) {
    if (isObservable(action)) {
      return executeAgenda(action, store)
    }

    return store.dispatch(action)
  }

  function replaceReducer(reducer) {
    store.replaceReducer(wrapStateReducer(reducer))
  }

  function observable() {
    return {
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          observer.next && observer.next(getState())
        }

        observeState()
        const unsubscribe = store.subscribe(observeState)
        return { unsubscribe }
      },
      [symbolObservable]() {
        return this
      }
    }
  }

  return {
    ...store,
    preAgendaStore: store,
    dispatch,
    getState,
    replaceReducer,
    [symbolObservable]: observable
  }
}

export default function createAgendaEnhancer() {
  return createStore => (reducer, preloadedState, enhancer) => {
    // Pass wrapped reducer to `createStore` instead

    const wrappedReducer = wrapStateReducer(reducer, preloadedState)
    const store = createStore(wrappedReducer, undefined, enhancer)

    if (store.preAgendaStore) {
      // Check whether this method was applied twice

      throw new Error('createAgendaEnhancer: The Redux Fluorine enhancer should only be applied once.')
    }

    return wrapStore(store)
  }
}

