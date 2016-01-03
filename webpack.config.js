var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var NODE_ENV = process.env.NODE_ENV;//获取命令行变量

//开发时的入口考虑到热加载，只用数组形式
var devEntry = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client',
  './src/index.js'
];
//开发时默认的文件名为main_bundle.js

//生产环境下考虑到方便编译成不同的文件名，所以使用数组
var proEntry = {
  "index":"./src/index.js"
};

var config = {
  devtool: 'source-map',
  //所有的出口文件，注意，所有的包括图片等本机被放置到了dist目录下，其他文件放置到static目录下
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    publicPath: '/dist/'
  },
  //配置插件
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        //因为使用热加载，所以在开发状态下可能传入的环境变量为空
        'NODE_ENV': process.env.NODE_ENV === undefined ? JSON.stringify('develop') : JSON.stringify(NODE_ENV)
      },
      __DEV__:process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop" ? JSON.stringify(true) : JSON.stringify(false)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
            {test: /\.jsx$/, exclude: /(libs|node_modules)/, loader: 'babel'},
            {test: /\.js$/, exclude: /(libs|node_modules)/, loader: 'babel'},
            {test: /\.(png|jpg|ttf|woff|svg|eot)$/, loader: 'url-loader?limit=8192'},// inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(scss|sass)$/,
                loader: 'style-loader!css-loader!postcss-loader!sass?sourceMap'
            },
            {test: /\.vue$/, loader: 'vue'}
          ]
  },
  postcss: [ autoprefixer({ browsers: ['last 10 versions',"> 1%"] }) ],
  externals: {
    jquery: "jQuery",
    pageResponse: 'pageResponse'
  },
  resolve: {
      alias: {
          libs: path.resolve(__dirname, 'libs'),
          nm: path.resolve(__dirname, "node_modules"),
          assets: path.resolve(__dirname, "assets"),
      }
  }
};

//为开发状态下添加插件
if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop"){

  config.devtool = 'cheap-module-eval-source-map';

  config.entry = devEntry;

  //添加插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}else {
  config.entry = proEntry;
}

module.exports = config;
