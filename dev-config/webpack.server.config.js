/**
 * Created by apple on 16/7/27.
 */
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

import appsConfig from './apps.config';

const nodeModules = {};

// 遍历所有的NodeModules以防止意外引入
fs.readdirSync('node_modules')
  .filter(
    x => ['.bin'].indexOf(x) === -1
  )
  .forEach((mod) => {
    nodeModules[mod] = `commonjs${mod} `;
  });

// 设置基本的模块导入导出规范
export default {
  entry: appsConfig.ssrServer.serverEntrySrc,
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'ssr_server.bundle.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    // 忽略所有的CSS与LESS文件
    new webpack.IgnorePlugin(/\.(css|less|scss)$/),
    // 定义环境变量
    new webpack.DefinePlugin({
      // 判断当前是否处于开发状态
      __DEV__: JSON.stringify(false),
      __SSR__: JSON.stringify(true)
    })
  ],
  devtool: 'sourcemap'
};
