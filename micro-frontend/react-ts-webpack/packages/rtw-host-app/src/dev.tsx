import { LocaleProvider } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as smoothscroll from 'smoothscroll-polyfill';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import App from './App';
import store from './skeleton/redux/store';
import { history } from './skeleton/env/index';

smoothscroll.polyfill();

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
