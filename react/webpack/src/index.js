import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './application/App';
import Worker from './service/worker';

import './index.css';

if (typeof PRODUCTION !== 'undefined') {
  OfflinePluginRuntime.install();
}

// 演示 Web Worker 的功能
const worker = new Worker();

worker.expensive(1000).then(count => {
  console.log(`Ran ${count} loops`);
});

render(<App title="Webpack 4 Demo" />, document.querySelector('#root'));
