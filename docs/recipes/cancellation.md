# Cancellation

One of the main advantages of Observables are their cancellability. Since the ES2017
spec, you receive a subscription when subscribing to an obervable. This subscription
contains the `unsubscribe` method.

Rather than throwing an error, when the unsubscribe method is called, the observable
is just being disposed, and effectively muted. This is useful when the user's interaction
has made a past interaction superfluous for example.

In redux-fluorine the dispatch method doesn't just return the dispatched action, when you
pass it an observable. It returns the *underlying subscription*.

This means that you can easily cancel the agenda's execution at any time!

```js
const agenda = Observable.of({ type: 'EXPENSIVE_OP' }).delay(1)
const { unsuscribe } = store.dispatch(agenda)

unsubscribe()
// The EXPENSIVE_OP action is never dispatched
```

This is really useful, when you're for example dealing with a type ahead interface. In
that case you can disregard user input, when new keystrokes come in.

