/**
 * Created by apple on 16/10/9.
 */
var webpack = require('webpack');
var path = require('path');

var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');

var appsConfig = require("./../apps.config.js");
const utils = require('./utils');


//获取命令行NODE_ENV环境变量,默认为development
var NODE_ENV = process.env.NODE_ENV || "development";

var TARGET = process.env.TARGET || "standalone";

//判断当前是否处于开发状态下
var __DEV__ = NODE_ENV === "development";

//通用插件组
exports.commonPlugins = [

  //自动分割Vendor代码
  new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),

  //定义环境变量
  new webpack.DefinePlugin({
    'process.env': {
      //因为使用热加载，所以在开发状态下可能传入的环境变量为空
      'NODE_ENV': JSON.stringify(NODE_ENV)
    },
    //判断当前是否处于开发状态
    __DEV__: JSON.stringify(__DEV__),
    __SSR__: TARGET === 'ssr' ? JSON.stringify(true) : JSON.stringify(false),
    __SERVER__: JSON.stringify(false)
  })
];


//开发时使用插件
exports.devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: '/',
      postcss: utils.postCSSConfig
    }
  })
];

//判断是否为开发模式,如果为开发模式则添加WebpackDashboard
if (__DEV__) {
  var Dashboard = require('webpack-dashboard');
  var DashboardPlugin = require('webpack-dashboard/plugin');
  var dashboard = new Dashboard();
  exports.devPlugins.push(new DashboardPlugin(dashboard.setData));
}


//生产环境下使用插件
exports.prodPlugins = [
  //提取出所有的CSS代码
  new ExtractTextPlugin('[name].css'),

  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: '/',
      postcss: utils.postCSSConfig
    }
  }),

  new webpack.optimize.DedupePlugin(), //dedupe similar code

  //代码压缩插件
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }),

  new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
];