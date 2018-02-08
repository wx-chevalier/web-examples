// @flow

import React from 'react';
import App from './container/App';
import { clientRender } from '../../dev-config/tool/render';

// 将组件渲染到DOM中
clientRender(<App />, document.getElementById('root'), './container/App', true);
