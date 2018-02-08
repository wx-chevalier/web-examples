const path = require('path');

// 定义非直接引用依赖
// 定义第三方直接用 script 引入而不需要打包的类库
// 使用方式即为 const $ = require("jquery")
exports.externals = {
  window: 'window',
  jquery: '$',
};

//判断当前是否处于开发状态下
exports.__DEV__ = (process.env.NODE_ENV || 'development') === 'development';

// 判断是否需要编译成服务端渲染模式
exports.__SSR__ = (process.env.NODE_ENV || "development") === "ssr";
