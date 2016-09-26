import expect from 'expect'
import symbolObservable from 'symbol-observable'
import { createStore, compose } from 'redux'
import { Observable } from 'rxjs'

import { createAgendaEnhancer } from '../src/index'

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

function collectWrappers(wrapper) {
  const wrappers = []

  do {
    wrappers.push({ ...wrapper })
    wrapper = wrapper.next
  } while (wrapper)

  return wrappers
}

describe('createAgendaEnhancer', () => {
  it('doesn\'t throw', () => {
    expect(() => {
      createAgendaEnhancer()
    }).toNotThrow()
  })

  it('can\'t be applied twice', () => {
    expect(() => {
      const enhancer = compose(createAgendaEnhancer(), createAgendaEnhancer())
      const store = enhancer(createStore)(counter)
    }).toThrow('createAgendaEnhancer: The Redux Fluorine enhancer should only be applied once.')
  })

  it('functions like a normal Redux store', () => {
    const subscribeSpy = expect.createSpy()

    const store = createStore(counter, createAgendaEnhancer())
    store.subscribe(subscribeSpy)

    expect(store.getState()).toBe(0)

    // Plus: The addition of the internal, actual Redux store
    expect(store.preAgendaStore).toBeTruthy()
    expect(store.preAgendaStore.getState().state).toBe(store.getState())

    store.dispatch(add())

    expect(store.getState()).toBe(1)
    expect(subscribeSpy).toHaveBeenCalled()
  })

  it('accepts actions in observable (agendas)', () => {
    const subscribeSpy = expect.createSpy()

    const store = createStore(counter, createAgendaEnhancer())
    store.subscribe(subscribeSpy)

    expect(store.getState()).toBe(0)
    store.dispatch(Observable.of(add()))
    expect(store.getState()).toBe(1)

    expect(subscribeSpy).toHaveBeenCalled()
  })

  it('reverts all changes made by errored agendas', cb => {
    const store = createStore(counter, createAgendaEnhancer())

    Observable
      .from(store)
      .bufferCount(3)
      .first()
      .subscribe(x => {
        expect(x).toEqual([ 0, 1, 0 ])
      }, err => {
        throw err
      }, () => {
        cb()
      })

    store.dispatch(Observable
      .of(add())
      .concat(Observable.throw('test')))
  })

  it('ignores empty errored agendas', cb => {
    const store = createStore(counter, createAgendaEnhancer())

    Observable
      .from(store)
      .first()
      .subscribe(x => {
        expect(x).toEqual(0)
      }, err => {
        throw err
      }, () => {
        cb()
      })

    store.dispatch(Observable.throw('test'))
  })

  it('supports cancellation through the returned subscription', cb => {
    const store = createStore(counter, createAgendaEnhancer())

    const first = Observable.of(add())
    const second = Observable.of(add()).delay(10)

    expect(store.getState()).toBe(0)
    const { unsubscribe } = store.dispatch(first.merge(second))
    expect(store.getState()).toBe(1)
    unsubscribe()

    setTimeout(() => {
      expect(store.getState()).toBe(1)
      cb()
    }, 15)
  })

  it('allows the reducer to be replace on the fly', () => {
    function newReducer(state) {
      return state + 'test'
    }

    const store = createStore(counter, createAgendaEnhancer())

    expect(store.getState()).toBe(0)
    store.dispatch(add())
    expect(store.getState()).toBe(1)
    store.replaceReducer(newReducer)
    expect(store.getState()).toBe('1test')
  })

  it('throws if no object is passed to observable().subscribe', () => {
    const store = createStore(counter, createAgendaEnhancer())
    const obs = store[symbolObservable]()

    expect(obs[symbolObservable]()).toBe(obs)

    expect(() => {
      obs.subscribe(undefined)
    }).toThrow('Expected the observer to be an object.')
  })
})

