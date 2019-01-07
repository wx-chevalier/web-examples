import App from '@wx/rtw-host-app';
import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { vendors } from './config/vendors';
import { isProd } from './constant/env';
import { init, registerModule, importApp } from './launcher';

if (!isProd()) {
  // 开发模式，会加载本地设置的开发态应用
  // 获取当前需要调试的应用列表
  const devApp = (window as any).__DEV_APP__;

  if (devApp == null) {
    throw new Error('Please set __DEV_APP__ in dev mode');
  }

  // 注册非 CDN 加载而直接打入 Bundle 中的模块
  registerModule('axios', axios);

  // 这里将 Menu 独立于 App
  init({
    apps: [devApp],
    vendors: vendors.map(vendorConfig => ({
      ...vendorConfig,
      ...vendorConfig.dev
    }))
  });

  importApp('/main.js');
} else {
  // 线上模式，则会直接加载配置好的线上应用
}

ReactDOM.render(<App />, document.getElementById('root'));
