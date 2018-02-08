'use strict';

// 默认生成的应用使用的模板
const defaultIndexPage = './dev-config/server/template.html';

module.exports = {
  // 基本的应用配置信息
  apps: [
    //HelloWorld
    {
      id: 'index',
      src: './src/client.js',
      indexPage: defaultIndexPage,
      compiled: true,
    },
  ],

  preference: {
    // 是否使用 CSS Modules
    useCSSModules: false,

    // 是否使用 OfflinePlugin,
    enablePWA: true,

    // 是否使用 Prepack 进行代码优化，仅用于编译时
    usePrepack: false,
  },

  // 开发入口配置
  devServer: {
    //当前待调试的 APP 的入口文件
    src: './src/client.js',

    // 监听的 Server 端口
    port: 3000,
  },

  // 后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
  api: {
    dev: {},
    prod: {},
    // 依赖项配置
    proxy: {
      //后端服务器地址 http://your.backend/
      '/api/*': 'http://localhost:3001',
    },
  },
};
