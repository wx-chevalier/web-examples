/**
 * Created by apple on 16/10/9.
 */
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
const utils = require('./utils');

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

const TARGET = process.env.TARGET || "standalone";

//通用插件组
exports.commonPlugins = [

  //自动分割Vendor代码
  new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: 2}),

  //定义环境变量
  new webpack.DefinePlugin({
    'process.env': {
      //因为使用热加载，所以在开发状态下可能传入的环境变量为空
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development")
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
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: '/',
      postcss: utils.postCSSConfig
    }
  }),
  new DashboardPlugin()
];

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

  new BundleAnalyzerPlugin({
    analyzerMode: 'static'
  }),

  //代码压缩插件
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }),

  new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
];