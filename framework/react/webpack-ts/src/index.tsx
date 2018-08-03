import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './application/App';

declare var PRODUCTION: any;

if (typeof PRODUCTION !== 'undefined') {
  OfflinePluginRuntime.install();
}

ReactDOM.render(<App />, document.getElementById('root'));
