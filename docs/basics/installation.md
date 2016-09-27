# Installation

## Installing the package

Installing the latest version of redux-fluorine is as easy as:

```
npm install --save redux-fluorine
```

Don't forget to choose a nice Observable library to go with it. RxJS v5 is advisable,
especially if you plan on using [redux-observable](https://redux-observable.js.org).

## Setting up the store

Installing the enhancer with your Redux store should be simple:

```js
import { createStore, combine, applyMiddleware } from 'redux';
import { createAgendaEnhancer } from 'redux-fluorine';

const enhancer = combine(
  applyMiddleware(...middleware),
  createAgendaEnhancer()
)

// For Redux >3.1
const store = createStore(reducer, enhancer)

// For Redux <3.1
const store = enhancer(createStore)(reducer)
```

Make sure that `createAgendaEnhancer()` is the first enhancer you apply. With `combine`,
which combines the functions from right-to-left, the enhancer will need to be the
last argument.

