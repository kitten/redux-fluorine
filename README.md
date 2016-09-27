<p align="center"><img src="https://raw.githubusercontent.com/philpl/fluorine/master/docs/fluorine-flasky-2x.gif" width=400></p>
<h2 align="center">redux-fluorine</h2>
<p align="center">
<strong>A <a href="https://redux.js.org">Redux</a> enhancer to manage groups of actions as agendas.</strong>
<br><br>
<a href="https://travis-ci.org/philpl/redux-fluorine"><img src="https://img.shields.io/travis/philpl/redux-fluorine/master.svg"></a>
<a href="https://coveralls.io/github/philpl/redux-fluorine"><img src="https://img.shields.io/coveralls/philpl/redux-fluorine/master.svg"></a>
<a href="https://slack.fluorinejs.org/"><img alt="Join Fluorine's Slack!" src="https://slack.fluorinejs.org/badge.svg"></a>
<a href="https://npmjs.com/package/redux-fluorine"><img src="https://img.shields.io/npm/dm/redux-fluorine.svg"></a>
<a href="https://npmjs.com/package/redux-fluorine"><img src="https://img.shields.io/npm/v/redux-fluorine.svg"></a>
</p>

**Redux Fluorine** is an enhancer to transform Observables truly into a first-class
citizen in Redux. It enables you to directly dispatch observables containing actions,
which is called an "agenda".

**It gracefully handles errors!** If an agenda completes with an error, it automatically
reverts all its changes, without affecting the rest of your actions.

**It's the perfect companion!** It nicely complements side effect middleware like
[redux-saga](https://github.com/yelouafi/redux-saga) or of course
[redux-observable](https://github.com/redux-observable/redux-observable).

**Better composition!** Since you can directly dispatch observables, it's easy to compose
different agendas to create complex behaviour. This even allows you to track them
without creating "signal actions".

## Usage

To install the npm package run:

```
npm install --save redux-fluorine
```

It is very simple to integrate Redux Fluorine into your existing Redux projects.
Keep in mind that because it wraps the store's state, you should apply it
before the middleware-enhancer.
It should be added to the `compose` function after the `applyMiddleware`:

```js
import { createStore, compose, applyMiddleware } from 'redux';
import { createAgendaEnhancer } from 'redux-fluorine';

const enhancer = compose(
  applyMiddleware(...middleware),
  createAgendaEnhancer()
)

// You need Redux >3.1 to pass the enhancer to createStore directly
const store = createStore(reducer, initialState, enhancer);
```

Once you have installed it in your Redux project, you will be able to dispatch observables directly.
Any emissions from these observables are dispatched as actions. This observable is referred to as an
agenda. When an agenda errors, all its actions are reverted.

## [Documentation](https://redux.fluorinejs.org)

- [Agendas](https://redux.fluorinejs.org/basics/agendas.html)
- [Installation](https://redux.fluorinejs.org/basics/installation.html)

## Short Demo

```js
import { Observable } from 'rxjs';
import { createStore } from 'redux';
import { createAgendaEnhancer } from 'redux-fluorine';

// Let's use a simple counter reducer as our example store
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

const store = createStore(reducer, createAgendaEnhancer())

store.getState() // 0

store.dispatch({ type: 'INCREMENT' })
store.getState() // 1

// Here we dispatch our action wrapped by an RxJS Observable
store.dispatch(Observable.of({ type: 'DECREMENT' }))
store.getState() // 0

// This observable dispatches INCREMENT, but is reverted after it throws its error
store.dispatch(
  Observable.of({ type: INCREMENT })
  .concat(Observable.throw('An Error')) // This observable throws an error
)

// The above agenda will have dispatched the INCREMENT action, but will emit
// a new state that reverted this action, after the error.

store.getState() // 0
```

When you dispatch an observable, the actions are all dispatched, but if the observable
completes with an error, Fluorine will step through your past state and "filter out"
all actions that this errored observable emitted.

By being able to dispatch observables, you will not need as many signal actions anymore.
You can keep track of the observable's state in your container components.
Or you can compose some actions really quickly. While it is not as elegant for side effects
as redux-observable for example, it certainly is great for dispatching explicit actions.

## Help & Discussion

You are welcome to ask questions, discuss your ideas and use cases, or troubleshoot potential
bugs on the Fluorine Slack!

<a href="https://slack.fluorinejs.org/"><img alt="Join Fluorine's Slack!" src="https://slack.fluorinejs.org/badge.svg"></a>

