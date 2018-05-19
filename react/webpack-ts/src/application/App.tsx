import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../state/redux/store/';
import MobXTimerView from '../state/mobx/MobXTimeView';
import Enthusiasm from '../state/redux/container/Enthusiasm';

import './App.css';
const logo = require('./logo.svg');

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, with TypeScript</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/application/App.tsx</code> and save to reload.
        </p>
        <h1>MobX Example: TimerView</h1>
        <MobXTimerView />
        <h1>Redux: Enthusiasm</h1>
        <Provider store={store}>
          <Enthusiasm />
        </Provider>
      </div>
    );
  }
}
