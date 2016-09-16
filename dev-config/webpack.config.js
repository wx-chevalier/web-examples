var path = require('path');
var webpack = require('webpack');

//PostCSS plugins
var autoprefixer = require('autoprefixer');

//webpack plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var validate = require("webpack-validator"); //用于webpack配置验证

//设置NODE_ENV的环境变量
var NODE_ENV = process.env.NODE_ENV || "development";//获取命令行变量

//@region 可配置区域

//定义统一的Application，不同的单页面会作为不同的Application
/**
 * @function 开发状态下默认会把JS文本编译为main.bundle.js,然后使用根目录下dev.html作为调试文件.
 * @type {*[]}
 */
var apps = require("./apps.config.js").apps;

//定义非直接引用依赖
//定义第三方直接用Script引入而不需要打包的类库
//使用方式即为var $ = require("jquery")
const externals = {
  window: "window",
  jquery: "jQuery",
  pageResponse: 'pageResponse'
};


/*********************************************************/
/*********************************************************/
/*下面属于静态配置部分，修改请谨慎*/
/*********************************************************/
/*********************************************************/

//开发时的入口考虑到热加载，只用数组形式，即每次只会加载一个文件
var devEntry = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client',
];

//配置依赖库性质的编译环境
var libraryEntry = [];

//生产环境下考虑到方便编译成不同的文件名，所以使用数组
var proEntry = {
  "vendors": "./dev-config/vendors.js"//存放所有的公共文件
};


//@endregion 可配置区域

//基本配置
var config = {
  devtool: 'source-map',
  //所有的出口文件，注意，所有的包括图片等本机被放置到了dist目录下，其他文件放置到static目录下
  output: {
    path: path.join(__dirname, '../dist'),//生成目录
    filename: '[name].bundle.js',//文件名,不加chunkhash,以方便调试时使用
    sourceMapFilename: '[name].bundle.map',//映射名
    chunkFilename: '[name].[chunkhash].chunk.js',//块文件索引
  },
  //配置插件
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        //因为使用热加载，所以在开发状态下可能传入的环境变量为空
        'NODE_ENV': process.env.NODE_ENV === undefined ? JSON.stringify('development') : JSON.stringify(NODE_ENV)
      },
      //判断当前是否处于开发状态
      __DEV__: process.env.NODE_ENV === undefined || process.env.NODE_ENV === "development" ? JSON.stringify(true) : JSON.stringify(false)
    }),

    //提取出所有的CSS代码
    new ExtractTextPlugin('[name].css'),

    //自动分割Vendor代码
    new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(libs|node_modules)/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(libs|node_modules)/,
        loader: "babel"
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=8192&name=assets/imgs/[hash].[ext]'
      },// inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }
    ]
  },
  eslint: {
    // TODO: consider separate config for production,
    // e.g. to enable no-console and no-debugger only in prod.
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  postcss: [
    autoprefixer({browsers: ['last 10 versions', "> 1%"]}),
    require('postcss-flexibility')
  ],//使用postcss作为默认的CSS编译器
};

//进行脚本组装
config.externals = externals;

//配置额外需要的插件
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
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


//为开发状态下添加插件
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === "development") {

  //添加调试入口
  devEntry.push(require("./apps.config.js").devServer.appEntrySrc);

  //配置SourceMap
  config.devtool = 'cheap-module-eval-source-map';

  //设置入口为调试入口
  config.entry = devEntry;

  //設置公共目錄名
  config.output.publicPath = '/dist/'//公共目录名

  //调试状态下的CSS,不进行CSS导出
  config.module.loaders.push({
    test: /\.(scss|sass|css)$/,
    loader: 'style-loader!css-loader!postcss-loader!sass'
  });


  //添加插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());

} else if (process.env.NODE_ENV === "library") {

  const library = require("./apps.config.js").library;

  //如果是要编译Library性质的项目
  libraryEntry.push(library.entry);

  config.entry = libraryEntry;

  //添加生成项的依赖库名
  config.output.library = library.library;

  //添加全局挂载名
  config.output.libraryTarget = library.libraryTarget;

  //如果是生成环境下，将文件名加上hash
  config.output.filename = `${library.name}.library.js`;

  //設置公共目錄名
  config.output.publicPath = './'//公共目录名

  //添加代码压缩插件
  config.plugins.push(uglifyJSPlugin);

  //添加MD5计算插件

  //判断是否需要进行检查
  if (process.env.CHECK === "true") {
    config.module.loaders[0].loaders.push("eslint-loader");
  }

} else {

  //定义HTML文件入口,默认的调试文件为src/index.html
  var htmlPages = [];

  //遍历定义好的app进行构造
  apps.forEach(function (app) {

    //判断是否加入编译
    if (app.compiled === false) {
      //如果还未开发好,就设置为false
      return;
    }

    //添加入口
    proEntry[app.entry.name] = app.entry.src;

    //判断是否设置了HTML页面,如果设置了则添加
    if (!!app.indexPage) {
      //构造HTML页面
      htmlPages.push({
        filename: app.id + ".html",
        title: app.title,
        // favicon: path.join(__dirname, 'assets/images/favicon.ico'),
        template: 'underscore-template-loader!' + app.indexPage, //默认使用underscore
        inject: false, // 使用自动插入JS脚本,
        chunks: ["vendors", app.entry.name], //选定需要插入的chunk名,
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
    }

  });

  //自动创建HTML代码
  htmlPages.forEach(function (p) {
    config.plugins.push(new HtmlWebpackPlugin(p));
  });

  //如果是生产环境下
  config.entry = proEntry;

  //如果是生成环境下，将文件名加上hash
  config.output.filename = '[name].bundle.[hash:8].js';

  //設置公共目錄名
  config.output.publicPath = './'//公共目录名

  //发布状态下添加Loader
  config.module.loaders.push({
    test: /\.(scss|sass|css)$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass')
  });

  //添加代码压缩插件
  config.plugins.push(uglifyJSPlugin);
}


module.exports = validate(config);
