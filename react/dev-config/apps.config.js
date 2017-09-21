/** 应用配置 */

const defaultIndexPage = './dev-config/server/template.html';

module.exports = {
  // 基本的应用配置信息
  apps: [
    // HelloWorld
    {
      id: 'index',
      src: './flow/src/client.js',
      indexPage: defaultIndexPage,
      compiled: true
    }
  ],

  // 开发入口配置
  devServer: {
    appEntrySrc: './flow/src/client.js', // 当前待调试的APP的入口文件
    port: 3000 // 监听的Server端口
  },

  // 用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: './flow/src/ssr_server.js'
  },

  // 依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    '/api/*': 'http://localhost:3001'
  },

  // 后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
  api: {
    dev: {},
    prod: {}
  }
};
