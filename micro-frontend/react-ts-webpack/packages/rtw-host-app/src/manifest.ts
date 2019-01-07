import { ComponentType } from 'react';

export interface ResolvedModule {
  default: ComponentType<any>;
  reducer?: object;
}

export interface Module {
  name: string;
  loader: () => Promise<ResolvedModule>;
}

// menifest 包含了所有页面、模块、应用、控件、插件加载方式的声明，在索引时并不严格区分类型，而推荐按照唯一键索引即可，方便迁移。
export const manifest: { [key: string]: Module } = {
  'page-a': {
    name: 'PageA',
    loader: () => import(/* webpackChunkName: "page-a" */ './pages/page-a')
  },
  'redux-app': {
    name: 'PageA',
    // 这里在 rtw-bootstrap 中完成了注册，这里直接加载导入
    loader: () => System.import('redux-app')
  }
};
