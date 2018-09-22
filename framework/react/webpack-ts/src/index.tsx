import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import * as Worker from './service/ts-worker';
import { createWorker } from './service/create-worker';

import App from './application/App';

const instance = createWorker(Worker);
instance.expensive(10000).then((count: number) => {
  console.log(`Run ${count} loops`);
});

declare var PRODUCTION: any;

if (typeof PRODUCTION !== 'undefined') {
  OfflinePluginRuntime.install();
}

ReactDOM.render(<App />, document.getElementById('root'));
