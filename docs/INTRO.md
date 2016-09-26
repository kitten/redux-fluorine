<p align="center"><img src="https://raw.githubusercontent.com/philpl/fluorine/master/docs/fluorine-flasky-2x.gif" width=400></p>
<h2 align="center">redux-fluorine</h2>
<p align="center">
<strong>A <a href="https://redux.js.org">Redux</a> enhancer to manage groups of actions as agendas.</strong>
<br><br>
<a href="https://travis-ci.org/philpl/redux-fluorine"><img src="https://img.shields.io/travis/philpl/redux-fluorine/master.svg"></a>
<a href="https://coveralls.io/github/philpl/redux-fluorine"><img src="https://img.shields.io/coveralls/philpl/redux-fluorine/master.svg"></a>
<a href="https://slack.fluorinejs.org/"><img alt="Join Fluorine's Slack!" src="https://slack.fluorinejs.org/badge.svg"></a>
<a href="https://npmjs.com/package/redux-fluorine"><img src="https://img.shields.io/npm/dm/redux-fluorine.svg"></a>
<a href="https://npmjs.com/package/redux-fluorine"><img src="https://img.shields.io/npm/v/redux-fluorine.svg"></a>
</p>

**Redux Fluorine** is an enhancer to transform Observables truly into a first-class
citizen in Redux. It enables you to directly dispatch observables containing actions,
which is called an "agenda".

**It gracefully handles errors!** If an agenda completes with an error, it automatically
reverts all its changes, without affecting the rest of your actions.

**It's the perfect companion!** It nicely complements side effect middleware like
[redux-saga](https://github.com/yelouafi/redux-saga) or of course
[redux-observable](https://github.com/redux-observable/redux-observable).

**Better composition!** Since you can directly dispatch observables, it's easy to compose
different agendas to create complex behaviour. This even allows you to track them
without creating "signal actions".

