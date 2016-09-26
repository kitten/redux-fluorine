# Loading State

While it's easy to fall into the trap of writing a state machine and signal actions, like
`FETCH_X`, `ERROR_X`, `COMPLETE_X`, and `RESULT_X`, this is often not necessary when you
only need to keep track of the progress in a single place.

With RxJS's `finally` operator you could for example represent the loading state quite
easily:

```js
let loading = true

store.dispatch(fetch('/sth').finally(() => {
  loading = false
}))
```

In React this could be your `this.setState` call, that shows a small loading indicator in
your component.

The point is: You might not need epics, or sagas, or thunks for explicit, simple sequencesof actions.

