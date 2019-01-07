const path = require('path');
const process = require('process');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const rootPath = process.cwd();
const packageName = require(path.resolve(rootPath, 'package.json'));

const buildEnv = {
  rootPath,
  packageName,
  src: path.resolve(rootPath, './src'),
  public: path.resolve(rootPath, './public'),
  build: path.resolve(rootPath, './build')
};

const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: false,
    importLoaders: 2,
    localIdentName: '[path][name]__[local]__[hash:base64:5]'
  }
};

const lessLoader = {
  loader: 'less-loader',
  options: {
    modifyVars: {
      'primary-color': '#5d4bff'
    },
    javascriptEnabled: true,
    paths: [path.resolve(rootPath, './node_modules')]
  }
};

const fontsOptions = {
  limit: 8192,
  mimetype: 'application/font-woff',
  name: 'fonts/[name].[ext]'
};

module.exports = {
  context: rootPath,
  entry: {
    main: path.resolve(buildEnv.rootPath, './src/index.tsx')
  },
  resolve: {
    alias: {
      systemjs: path.resolve(rootPath, './node_modules/systemjs/dist/system-production.js')
    },
    extensions: ['.ts', '.tsx', '.js', '.css'],
    plugins: [new TSConfigPathsPlugin()]
  },
  output: {
    path: buildEnv.build,
    // 设置所有资源的默认公共路径，Webpack 会自动将 import 的资源改写为该路径
    publicPath: '/',
    filename: '[name].js', // 文件名,不加 chunkhash,以方便调试时使用，生产环境下可以设置为 [name].bundle.[hash:8].js
    sourceMapFilename: '[name].map', // 映射名
    globalObject: 'this' // 避免全局使用 window
  },
  module: {
    rules: [
      {
        test: /.*ts-worker.*/,
        use: ['workerize-loader', 'ts-loader']
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useBabel: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: fontsOptions
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: fontsOptions
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/node_modules/, buildEnv.src]
      },
      {
        test: /\.less$/,
        use: ['style-loader', moduleCSSLoader, lessLoader],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', lessLoader],
        include: /node_modules/
      },
      {
        test: /\.wasm$/,
        exclude: /node_modules/,
        loader: 'wasm-loader'
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true, tslint: true }),
    new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
    new webpack.IgnorePlugin(/\.js\.map$/)
  ],

  // 定义非直接引用依赖，使用方式即为 var $ = require("jquery")
  externals: {
    window: 'window',
    jquery: '$'
  },
  extra: {
    moduleCSSLoader,
    lessLoader,
    buildEnv
  }
};
