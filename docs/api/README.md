# API Reference

Since redux-fluorine only features its
[Redux enhancer](http://redux.js.org/docs/Glossary.html#store-enhancer)
the API is very lean and minimal.

We encourage you to look at the other docs and the included examples
to decide for yourself how to use Redux Fluorine best.

> Note: All examples are written in ES6. You'll need to convert them
> to ES5 or lower, when you use them in your codebase.

## API


### [createAgendaEnhancer()](createAgendaEnhancer.md)

Returns a new [Redux Enhancer](http://redux.js.org/docs/Glossary.html#store-enhancer).
It wraps the store's original reducer and methods to save the state that is necessary
to control the agenda's rollbacks, without interferring with the store's normal
behaviour.

### [RECOVER_AFTER_ERROR](RECOVER_AFTER_ERROR.md)

The action type that triggers the roll back of errored agendas.

