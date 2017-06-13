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

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: path.join(__dirname, "../tool/postcss.config.js")
    }
  }
};

exports.styles = {
  css: {
    test: /\.css$/,
    use: __DEV__
      ? ["style-loader", moduleCSSLoader, postCSSLoader]
      : ExtractTextPlugin.extract({
          use: [moduleCSSLoader, postCSSLoader]
        })
  },
  scss: {
    test: /\.(scss|sass)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", postCSSLoader, "sass-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", postCSSLoader, "sass-loader"]
        })
  },
  less: {
    test: /\.(less)$/,
    use: __DEV__
      ? ["style-loader", "css-loader", postCSSLoader, "less-loader"]
      : ExtractTextPlugin.extract({
          use: ["css-loader", postCSSLoader, "less-loader"]
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
