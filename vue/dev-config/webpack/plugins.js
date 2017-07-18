// @flow

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const DashboardPlugin = require("webpack-dashboard/plugin");
const OfflinePlugin = require("offline-plugin");
const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const path = require("path");

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";
// 判断是否需要编译成服务端渲染模式
const __SSR__ = (process.env.NODE_ENV || "development") === "ssr";

//通用插件组
exports.commonPlugins = [
  //定义环境变量
  new webpack.DefinePlugin({
    // 这里将 Node 中使用的变量也传入到 Web 环境中，以方便使用
    "process.env": {
      //因为使用热加载，所以在开发状态下可能传入的环境变量为空
      NODE_ENV: JSON.stringify(__DEV__ ? "development" : "production")
    },
    //判断当前是否处于开发状态
    __DEV__: JSON.stringify(__DEV__),
    __SSR__: JSON.stringify(__SSR__),
    __SERVER__: JSON.stringify(false)
  })
];

//开发时使用插件
exports.devPlugins = [

  // 启用 HMR
  new webpack.HotModuleReplacementPlugin(),

  // 在控制台中输出可读的模块名
  new webpack.NamedModulesPlugin(),

  // 避免发出包含错误的模块
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
      context: "/"
    }
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, "../../public/dll/manifest.json")
  }),
  new DashboardPlugin()
];

//生产环境下使用插件
let prodPlugins = [
  // 将全部 node_modules 中的代码移入
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js",
    minChunks: ({ resource }) =>
      resource &&
      resource.indexOf("node_modules") >= 0 &&
      resource.match(/\.(js|less|scss)$/)
  }),

  // 使用 Scope Hositing 特性
  new webpack.optimize.ModuleConcatenationPlugin(),

  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: "/"
    }
  }),

  //提取出所有的CSS代码
  new ExtractTextPlugin("[name].css"),

  // 使用 Prepack 优化包体大小
  // 暂时存在 Bug,等待修复
  // 使用前 21 - 425
  // 使用后 21 - 433
  new PrepackWebpackPlugin({
    mathRandomSeed: "0"
  }),

  //代码压缩插件
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: true
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: "static"
  }),

  new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
];

//定义HTML文件入口,默认的调试文件为src/index.html
if (!__DEV__) {
  let htmlPages = [];

  let offlineExternals = [];

  const apps = require("../apps.config").apps;

  //遍历定义好的app进行构造
  apps.forEach(function(app) {
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
        template: "underscore-template-loader!" + app.indexPage, //默认使用underscore作为模板
        inject: false, // 使用自动插入JS脚本,
        chunks: ["vendor", app.id], //选定需要插入的chunk名,

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

      offlineExternals.push("/" + app.id + ".html");
    }
  });

  //自动创建HTML代码
  htmlPages.forEach(function(p) {
    prodPlugins.push(new HtmlWebpackPlugin(p));
  });

  // 添加离线插件
  prodPlugins.push(
    new OfflinePlugin({
      externals: offlineExternals
    })
  );
}

exports.prodPlugins = prodPlugins;
