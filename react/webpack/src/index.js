import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './application/App';
import './index.css';

if (typeof PRODUCTION !== 'undefined') {
  OfflinePluginRuntime.install();
}

render(<App title="Webpack 4 Demo" />, document.querySelector('#root'));
