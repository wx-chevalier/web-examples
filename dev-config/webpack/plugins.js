/**
 * create by zhangzhenfei
 * plugins.js：输出web使用插件
 */
import webpack from 'webpack';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {postCSSConfig} from './utils';

// 开发模式，获取命令行NODE_ENV环境变量,默认为development
const NODE_ENV = process.env.NODE_ENV || 'development';

// 独立模式
const TARGET = process.env.TARGET || 'standalone';

// 判断当前是否处于开发状态下
const __DEV__ = NODE_ENV === 'development';

// 通用插件组
export const commonPlugins = [

  // 自动分割Vendor代码
  new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),

  // 定义环境变量，全局变量，直接使用
  new webpack.DefinePlugin({
    'process.env': {
      // 因为使用热加载，所以在开发状态下可能传入的环境变量为空
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
    // 判断当前是否处于开发状态
    __DEV__: JSON.stringify(__DEV__),
    __SSR__: TARGET === 'ssr'
      ? JSON.stringify(true)
      : JSON.stringify(false)
  })
];

// 开发时使用插件
export const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: '/',
      postcss: postCSSConfig
    }
  })
];
// 判断是否为开发模式,如果为开发模式则添加WebpackDashboard
if (__DEV__) {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const dashboard = new Dashboard();
  // 通过nodejs的exports接口抛出插件
  devPlugins.push(new DashboardPlugin(dashboard.setData));
}


// 生产环境下使用插件
export const prodPlugins = [
  // 提取出所有的CSS代码
  new ExtractTextPlugin('[name].css'),
  // 提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: '/',
      postcss: postCSSConfig
    }
  }),
  // 代码压缩插件
  new webpack
    .optimize
    .UglifyJsPlugin({sourceMap: true})
];
