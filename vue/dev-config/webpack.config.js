const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const utils = require('./webpack/utils');

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || 'development') === 'development';

//定义统一的Application，不同的单页面会作为不同的Application
const appsConfig = require('./apps.config.js');

//定义入口变量
let entry;

//根据不同的环境状态设置不同的开发变量
if (__DEV__) {
  //开发状态下的默认入口
  entry = [
    `webpack-dev-server/client?http://0.0.0.0:${appsConfig.devServer.port}`,
    'webpack/hot/only-dev-server',
    require('./apps.config.js').devServer.appEntrySrc
  ];
} else {
  entry = {};

  //遍历定义好的app进行构造
  appsConfig.apps.forEach(function(app) {
    //判断是否加入编译
    if (app.compiled === false) {
      //如果还未开发好,就设置为false
      return;
    }

    //添加入口
    entry[app.id] = app.src;
  });
}

//设置开发时源代码映射工具
const devTool = __DEV__ ? 'eval-cheap-module-source-map' : 'hidden-source-map';

//基本配置
let config = {
  cache: false,
  entry,
  devtool: devTool,
  //所有的出口文件，注意，所有的包括图片等本机被放置到了dist目录下，其他文件放置到static目录下
  output: {
    path: path.join(__dirname, '../dist'), //生成目录
    publicPath: './', //生成的公共目录
    filename: '[name].bundle.js', //文件名,不加chunkhash,以方便调试时使用，生产环境下可以设置为 [name].bundle.[hash:8].js
    sourceMapFilename: '[name].bundle.map', //映射名
    chunkFilename: '[name].[chunkhash].chunk.js' //块文件索引
  },
  //配置插件
  plugins: __DEV__
    ? //开发环境下所需要的插件
      [].concat(plugins.commonPlugins).concat(plugins.devPlugins)
    : //生产环境下需要添加的插件
      [].concat(plugins.commonPlugins).concat(plugins.prodPlugins),
  module: {
    rules: [
      // loaders.jslint,
      loaders.wasm,
      loaders.vue,
      loaders.jsx,
      loaders.styles.css,
      loaders.styles.scss,
      loaders.styles.less,
      loaders.assets,
      loaders.json
    ]
  },
  externals: utils.externals,
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  target: 'web'
};

module.exports = config;
