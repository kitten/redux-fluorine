import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import Counter from './components/counter'

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <Counter/>
      </Provider>
    )
  }
}

