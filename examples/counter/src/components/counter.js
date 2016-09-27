import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  increment,
  decrement,
  incrementDelayed,
  incrementIfOdd,
  incrementDelayedRollback
} from '../actions/counter'

@connect(
  ({ counter }) => ({ counter }),
  dispatch => bindActionCreators({
    increment,
    decrement,
    incrementDelayed,
    incrementIfOdd,
    incrementDelayedRollback
  }, dispatch))

export default class Counter extends Component {
  render() {
    const {
      increment,
      decrement,
      incrementDelayed,
      incrementIfOdd,
      incrementDelayedRollback,
      counter
    } = this.props

    return (
      <div>
        <p>
          Clicked: {counter} times
        </p>

        <div>
          <button onClick={() => increment()}>
            +
          </button>

          <button onClick={() => decrement()}>
            -
          </button>

          <button onClick={() => incrementDelayed()}>
            Increment in 1000ms
          </button>

          <br/>

          <button onClick={() => incrementIfOdd()}>
            Increment if odd
          </button>

          <button onClick={() => incrementDelayedRollback()}>
            Increment async and rollback
          </button>
        </div>
      </div>
    )
  }
}
