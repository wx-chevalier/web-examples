import React, { Component } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';

import SyncCounter from '../container/SyncCounter';
import ThunkCounter from '../container/ThunkCounter';
import PromiseCounter from '../container/PromiseCounter';
import SagasCounter from '../container/SagasCounter';

import logo from './logo.svg';
import './App.css';

import createStore from '../store/store';

//构建Redux Store
const store = createStore(window.__INITIAL_STATE__ || {});

class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Redux Coding Snippets</h1>
          </header>
          <ErrorBoundary>
            <SyncCounter />
            <ThunkCounter />
            <PromiseCounter />
            <SagasCounter />
          </ErrorBoundary>
        </div>
      </Provider>
    );
  }
}

export default App;
