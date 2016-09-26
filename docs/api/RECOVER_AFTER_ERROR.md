# RECOVER_AFTER_ERROR

The action type that triggers the roll back of errored agendas.

## Actions

Actions of this action type have the following signature:

```js
{
  type: RECOVER_AFTER_ERROR,
  anchor,
  actions
}
```

`anchor` is a reference to the redux-fluorine store state, when the agenda started.

`actions` is the list of actions that the agenda emitted, which thus must be filtered
from the store's state.

