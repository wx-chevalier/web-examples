import { IAppModule } from '@wx/rtw-core/dist/types/constant/types';
import { ComponentType } from 'react';
import { importApp } from './index';

export interface ResolvedModule {
  default: ComponentType<any>;
  reducer?: object;
}

export interface Module {
  name: string;
  type: 'page' | 'module' | 'app' | 'widget' | 'extension';
  loader: () => Promise<ResolvedModule>;
}

// menifest 包含了所有页面、模块、应用、控件、插件加载方式的声明，在索引时并不严格区分类型，而推荐按照唯一键索引即可，方便迁移。
const _manifest: { [key: string]: Module } = {
  'page-a': {
    name: 'PageA',
    type: 'page',
    loader: () => import(/* webpackChunkName: "page-a" */ './pages/page-a')
  },
  'redux-app': {
    name: 'Redux App',
    type: 'app',
    // 这里在 rtw-bootstrap 中完成了注册，这里直接加载导入
    loader: () => importApp!('http://redux-app')
  }
};

declare global {
  interface Window {
    __DEV_APP__?: IAppModule;
  }
}

// 判断是否定义了开发应用
if (window.__DEV_APP__) {
  _manifest[window.__DEV_APP__.id] = {
    ...window.__DEV_APP__,
    type: 'app',
    loader: () => importApp!(window.__DEV_APP__!.module)
  };
}

export const manifest = _manifest;
