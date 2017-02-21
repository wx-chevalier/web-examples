/**
 * Created by apple on 16/7/27.
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


//设置基本的模块导入导出规范
module.exports = {
  entry: './src/weapp/bridge/bridge.js',
  output: {
    path: path.join(__dirname, '../src/weapp/src/'),
    libraryTarget: 'umd',
    filename: 'bridge.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  },
  plugins: [
    //忽略所有的CSS与LESS文件
    new webpack.IgnorePlugin(/\.(css|less)$/),
    //定义环境变量
    new webpack.DefinePlugin({
      //判断当前是否处于开发状态
      __WEAPP__: JSON.stringify(true),
      __DEV__: JSON.stringify(false),
    })
  ]
};
