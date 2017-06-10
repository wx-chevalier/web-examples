// @flow
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

//基于Babel的JS/JSX Loader
exports.jsx = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: ["babel-loader"]
};

//对于JS与JSX的格式校验
exports.jslint = {
  enforce: "pre",
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: ["eslint-loader"]
};

//对于TS与TSX的Loader
exports.tsx = {
  test: /\.ts|tsx?$/,
  exclude: /node_modules/,
  use: ["awesome-typescript-loader"]
};

//对于TS与TSX的校验
exports.tslint = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: ["tslint-loader"]
};

//根据不同的环境开发设置不同的样式加载的Loader
const moduleCSSLoader = {
  loader: "css-loader",
  query: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
  }
};

exports.styles = {
  css: {
    test: /\.css$/,
    use: __DEV__
      ? ["style-loader", moduleCSSLoader, "postcss-loader"]
      : ExtractTextPlugin.extract({
          use: [moduleCSSLoader, "postcss-loader"]
        })
  },
  scss: {
    test: /\.(scss|sass)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
  },
  less: {
    test: /\.(less)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader", "less-loader"]
        })
  }
};

//对于图片与字体文件的导入工具,并且设置默认的dist中存放方式
// inline base64 URLs for <=8k images, direct URLs for the rest
exports.assets = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
  loader: "url-loader?limit=8192&name=assets/[hash].[ext]"
};

//对于JSON文件的导入
exports.json = {
  test: /\.json$/,
  loader: "json"
};
