
![](https://github.com/wxyyxc1992/OSS/blob/master/2017/8/1/VuePack.png?raw=true)


# iVuePack: Modern Template For vue-cli, with  Vue.js, Webpack 3, Vue-Router, Vuex, MobX, etc.

本模板受到 [egoist/vuepack](https://github.com/egoist/vuepack) 的启发，是对于笔者的 [create-webpack-app/vue](https://github.com/wxyyxc1992/create-webpack-app/tree/master/vue) 的模板化改造。

默认的模板使用了 Flow 作为静态类型检测工具，而在 template-ts 目录下存放的是 TypeScript 模板，在 template-electron 目录下存放了 Electron 模板（目前 Electron 模板还是直接拷贝自 Egoist，会逐步替换）。

```sh
# 初始化项目
$ npm install vue-cli -g
$ vue init wxyyxc1992/vuepack test

# 下载依赖
$ cd test
$ npm install

# 运行开发环境
$ npm run dev // npm start
```

# 特性概述

- 技术栈支持
  - 使用 ES6/ES7 语法，
  - 允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill
  - 支持使用 styled-component 进行 CSS-in-JS 样式控制
  - 使用 Vuex 与 Mobx 作为状态管理工具（按需使用）
  - 使用 Flow 作为静态类型检测工具
  - 使用 Jest 作为默认的测试框架
  - 使用 TestCafe 作为默认的 E2E 测试框架
  - 目前使用 Element 作为默认的组件库，欢迎提出其他建议
  
- 开发环境
  - 使用 Storybook 进行组件预览
  - 使用 WebpackDevServer 部署开发服务器
  - 支持组件热加载
  - 使用 Babel 进行代码转换
  - 使用 ESLint 进行代码检测

- 构建优化  
  - 使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度
  - 使用 Prepack & prepack-webpack-plugin 进行代码优化

- 生产环境
  - 使用 CommonChunksPlugin 作为生产环境下公共代码提取工具
  - 使用 offline-plugin 添加简单的 PWA 特性增强
  - 部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染



# 常见问题

## 离线模板

将对应的模板下载到：~/.vue-templates 目录下，然后初始化的时候选择：

```s
$ vue init -offline test webpack
```

即可以优先使用本地缓存的模板。

## SSL 校验

vuepack 默认使用 Nightwatch 进行 E2E 测试，其在安装的时候会自动使用 Git 下载 phantomjs；我们可以手动从[这里](https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-windows.zip)下载 phantomjs 安装包并且添加到系统环境变量路径中。

```s
Error making request.
Error: unable to verify the first certificate
    at TLSSocket.<anonymous> (_tls_wrap.js:1108:38)
    at emitNone (events.js:105:13)
    at TLSSocket.emit (events.js:207:7)
    at TLSSocket._finishInit (_tls_wrap.js:638:8)
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:468:38)
```

# About

## Roadmap

- 个性化项目中固有的部分，进行模板化改造；

## LICENSE

The MIT License (MIT)

Copyright (c) 2017 王下邀月熊 384924552@qq.com




