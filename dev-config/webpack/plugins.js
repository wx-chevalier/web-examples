/**
 * Created by apple on 16/10/9.
 */
var webpack = require('webpack');
var path = require('path');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//获取命令行NODE_ENV环境变量,默认为development
var NODE_ENV = process.env.NODE_ENV || "development";

//判断当前是否处于开发状态下
var __DEV__ = NODE_ENV === "development";

//通用插件组
exports.commonPlugins = [
  //提取出所有的CSS代码
  new ExtractTextPlugin('[name].css'),

  //自动分割Vendor代码
  new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),

  new webpack.optimize.OccurenceOrderPlugin(),

  //定义环境变量
  new webpack.DefinePlugin({
    'process.env': {
      //因为使用热加载，所以在开发状态下可能传入的环境变量为空
      'NODE_ENV': JSON.stringify(NODE_ENV)
    },
    //判断当前是否处于开发状态
    __DEV__: JSON.stringify(__DEV__)
  }),
];

//开发时使用插件
exports.devPlugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()];

//代码压缩插件
exports.uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    screw_ie8: true,
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  }
});
