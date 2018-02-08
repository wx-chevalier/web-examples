/**
 * 功能：声明所有的 Loaders
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const __DEV__ = require('./utils').__DEV__;
const config = require('../apps.config');

//对于JS与JSX的格式校验
exports.jslint = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: ['eslint-loader'],
};

//基于Babel的JS/JSX Loader
exports.jsx = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: ['babel-loader'],
};

exports.vue = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
      // the "scss" and "sass" values for the lang attribute to the right configs here.
      // other preprocessors should work out of the box, no loader config like this necessary.
      scss: 'vue-style-loader!css-loader!sass-loader',
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
    },
    // other vue-loader options go here
  },
};

//对于TS与TSX的校验
exports.tslint = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: ['tslint-loader'],
};

//对于TS与TSX的Loader
exports.tsx = {
  test: /\.ts|tsx?$/,
  exclude: /node_modules/,
  use: ['awesome-typescript-loader'],
};

exports.wasm = {
  test: /\.wasm$/,
  use: ['wasm-loader'],
};

// 根据不同的环境开发设置不同的样式加载的 Loader

const moduleCSSLoader = config.preference.useCSSModules
  ? {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
      },
    }
  : {
      loader: 'css-loader',
    };

const postCSSLoader = {
  loader: 'postcss-loader',
};

exports.styles = {
  css: {
    test: /\.css$/,
    use: __DEV__
      ? ['style-loader', moduleCSSLoader, postCSSLoader]
      : ExtractTextPlugin.extract({
          use: [moduleCSSLoader, postCSSLoader],
        }),
  },
  scss: {
    test: /\.(scss|sass)$/,
    use: __DEV__
      ? ['style-loader', 'css-loader', postCSSLoader, 'sass-loader']
      : ExtractTextPlugin.extract({
          use: ['css-loader', postCSSLoader, 'sass-loader'],
        }),
  },
  less: {
    test: /\.(less)$/,
    use: __DEV__
      ? ['style-loader', 'css-loader', postCSSLoader, 'less-loader']
      : ExtractTextPlugin.extract({
          use: ['css-loader', postCSSLoader, 'less-loader'],
        }),
  },
};

//对于图片与字体文件的导入工具,并且设置默认的dist中存放方式
// inline base64 URLs for <=8k images, direct URLs for the rest
exports.assets = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
  loader: 'url-loader?limit=8192&name=assets/[hash].[ext]',
};

//对于JSON文件的导入
exports.json = {
  test: /\.json$/,
  loader: 'json',
};
