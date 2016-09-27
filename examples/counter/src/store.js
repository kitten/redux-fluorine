import { applyMiddleware, createStore, compose } from 'redux'
import { createAgendaEnhancer } from 'redux-fluorine'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from './reducers'

const logger = createLogger();
const enhancer = compose(
  applyMiddleware(thunk, logger),
  createAgendaEnhancer()
)

const store = createStore(rootReducer, enhancer);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
}

export default store

