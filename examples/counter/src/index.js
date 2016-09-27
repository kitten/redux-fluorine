import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'

import store from './store'
import App from './app'

function entry() {
  const root = document.getElementById('root')

  render((
    <AppContainer errorReporter={Redbox}>
      <App store={store}/>
    </AppContainer>
  ), root)
}

entry()

if (module.hot) {
  module.hot.accept('./app', () => {
    // NOTE: Circumvent webpack only considering modules accepted after a require
    const NewApp = require('./app')

    entry()
  })
}

