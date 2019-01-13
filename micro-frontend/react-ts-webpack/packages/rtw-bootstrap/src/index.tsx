import { IAppModule } from '@wx/rtw-core/src/constant/types';
import axios from 'axios';
import { vendors } from './config/vendors';
import { init, registerModule, importApp } from './launcher';

declare var isProd: boolean;

declare global {
  interface Window {
    __HOST_APP__?: IAppModule;
    __DEV_APP__?: IAppModule;
  }
}

const hostApp: IAppModule = window.__HOST_APP__ as IAppModule;

// 注册非 CDN 加载而直接打入 Bundle 中的模块，子应用建议从 Core 中获取请求函数
registerModule('axios', axios);

if (!isProd) {
  // 开发模式，会加载本地设置的开发态应用
  // 获取当前需要调试的应用列表
  const devApp: IAppModule = window.__DEV_APP__ as IAppModule;

  if (devApp == null) {
    throw new Error('Please set __DEV_APP__ in dev mode');
  }

  // 这里将 Menu 独立于 App
  init({
    apps: [devApp],
    vendors: vendors.map(vendorConfig => ({
      ...vendorConfig,
      ...vendorConfig.dev
    }))
  });
} else {
  // 线上模式，则会直接加载配置好的线上应用；BootStrap 中声明可用的应用，Host App 中对应用进行可视化编排
  init({
    apps: [],
    vendors: vendors.map(vendorConfig => ({
      ...vendorConfig,
      ...vendorConfig.prod
    }))
  });
}

if (!hostApp) {
  throw new Error('Please set __HOST_APP__');
}

importApp(hostApp.module).then(hostAppModule => {
  if (typeof hostAppModule.render === 'function') {
    hostAppModule.render((module: string) => importApp(module));
  } else {
    throw new Error('Invalid HOST APP');
  }
});
