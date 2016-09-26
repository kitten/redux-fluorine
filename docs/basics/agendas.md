# Agendas

**Agendas** are redux-fluorine's the only feature, so to speak.

They are Observables emitting actions. While in Redux most developers resort to
thunks or even side effect management for sending a mere request to an API, an
observable can be the perfect alternative.

Most observable libraries come with a fetch helper and you could directly transform
them to emit the actions that add the response to your store. Multiple agendas can
of course be combined with Observable operators.

### Why is this different from thunks and side effects?

While thunks and side effect managers are often used for "one-off" kind of action
sequences, they're really cumbersome for that task.

Thunks require a lot of boilerplate code and need to be tested throughly. Can you
guarantees that all errors are being handled gracefully by a thunk that requests
multiple resources from a server? And how do you compose thunks into complex
sequences and dependencies?

Side effect managers like [redux-observable](https://redux-observable.js.org)
or [redux-saga](https://github.com/yelouafi/redux-saga) are really popular
these days to handle requests for example. But if you want to keep track of
the requests you suddenly need actions for the requests start, errors,
completion and its result. This can be overwhelming. Especially if you then
want to add a state machine for this request as well.

Certainly side effect managers are great for, exactly, *side effects*, but if it
comes to explicit groups actions being dispatched on demand, then side effects
are better kept for reacting to these explicit actions.

Instead of writing a lot of code for simple one-off action sequences, with
redux-fluorine we can just dispatch observables on the Redux store directly.

It also features:

- Cancellation through returning the subscription
- Action reversal on errors
- Compatibility with the entire Redux ecosystem, of course

## A first example

> **NOTE:** The docs will use RxJS v5 for all examples. However, redux-fluorine supports
> all observable libraries that implement the ES2017 spec.

Take a look at this small snippet:

```js
const agenda = Observable.of({ type: 'TEST' })

store.dispatch(agenda)
```

This dispatches an observable on the store, and is the equivalent of doing:

```js
store.dispatch({ type: 'TEST' })
```

You can use all variations of observables and operators, as long as they emit things
that you can also directly dispatch:

```js
const first = Observable.of({ type: 'FIRST' })
const second = Observable.of({ type: 'SECOND' })

store.dispatch(first.merge(second))
```

The great thing about this is, that the observables can emit anything that the `dispatch`
method already accepts. So you could emit thunks inside your observables, although the
other way around might be more interesting in practical projects.

Now, when we have an agenda that errors, Redux Fluorine will revert all its actions:

```js
const error = Observable.throw('Oops')
const agenda = Observable.of({ type: 'FIRST' })

store.dispatch(agenda.concat(error))
```

So what actions will happen to the store in this case?

First it's going to normally emit the `FIRST` action, as you would expect. But when
it encounters the error, it goes back in time and filters out all actions that the
errored agenda emitted. Neat for error handling, isn't it?

Since it filters the affected actions, it doesn't affect other agendas:

```js
const error = Observable.throw('Oops').delay(500)
const first = Observable.of({ type: 'FIRST' })
const second = Observable.of({ type: 'SECOND' })

store.dispatch(agenda.concat(error))
store.dispatch(second)
```

In this case `FIRST` will later be filtered out, but `SECOND` will be unharmed.

You don't need to think twice about the performance implications. Redux Fluorine will do
its best to not recompute any state unless it's necessary.

### You're ready to go!

These are the mere basics, that will enable you to use Redux Fluorine. It should be
enough to start off your journey.

