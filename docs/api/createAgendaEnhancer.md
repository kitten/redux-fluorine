# createAgendEnhancer()

Creates a new redux-fluorine agenda enhancer. It's an enhancer that adds agenda
support to Redux.

## Arguments

- none.

## Returns

A function, that is a store enhancer, which applies the agenda enhancement. Its signature
is: `createStore => createStore'`. It can be passed directly to Redux's `createStore`
method as a third argument.

## See more

The Redux page for the `applyMiddleware` enhancer is a great page to find out more about
Redux enhancers.

http://redux.js.org/docs/api/applyMiddleware.html

