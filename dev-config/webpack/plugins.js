/**
 * Created by apple on 16/10/9.
 */
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
var OfflinePlugin = require('offline-plugin');
const utils = require('./utils');

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

// 判断当前的编译目标
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
  new DashboardPlugin(),

];


//生产环境下使用插件
let prodPlugins = [
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

  new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
];


//定义HTML文件入口,默认的调试文件为src/index.html
if (!__DEV__) {

  let htmlPages = [];

  let offlineExternals = [];

  const apps = require('../apps.config').apps;

  //遍历定义好的app进行构造
  apps.forEach(function (app) {

    //判断是否加入编译
    if (app.compiled === false) {
      //如果还未开发好,就设置为false
      return;
    }

    //判断是否设置了HTML页面,如果设置了则添加
    if (!!app.indexPage) {
      //构造HTML页面
      htmlPages.push({
        filename: app.id + ".html",
        // favicon: path.join(__dirname, 'assets/images/favicon.ico'),
        template: 'underscore-template-loader!' + app.indexPage, //默认使用underscore作为模板
        inject: false, // 使用自动插入JS脚本,
        chunks: ["vendors", app.id], //选定需要插入的chunk名,

        //设置压缩选项
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      });

      offlineExternals.push('/' + app.id + ".html");
    }

  });

  //自动创建HTML代码
  htmlPages.forEach(function (p) {
    prodPlugins.push(new HtmlWebpackPlugin(p));
  });

  // 添加离线插件
  prodPlugins.push(new OfflinePlugin({
    externals: offlineExternals
  }));
}


exports.prodPlugins = prodPlugins;