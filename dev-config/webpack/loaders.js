/**
 * Created by apple on 16/10/9.
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// 获取命令行NODE_ENV环境变量,默认为development
const NODE_ENV = process.env.NODE_ENV || 'development';
// 判断当前是否处于开发状态下
const __DEV__ = NODE_ENV === 'development';

const exportLoaders = {};

// 基于Babel的JS/JSX Loader
exportLoaders.jsx = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  loaders: ['babel-loader']
};

// 对于JS与JSX的格式校验
exportLoaders.jslint = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  loader: 'eslint-loader'
};

// 对于TS与TSX的Loader
exportLoaders.tsx = {
  test: /\.ts|tsx?$/,
  exclude: /node_modules/,
  loader: 'awesome-typescript-loader'
};

// 对于TS与TSX的校验
exportLoaders.tslint = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: 'tslint-loader'
};

// 根据不同的环境开发设置不同的样式加载的Loader
if (NODE_ENV === 'development') {
  // 如果当前为开发环境,则封装内联的CSS
  exportLoaders.style = {
    test: /\.(scss|sass|css)$/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules'
  };
} else {
  // 如果当前为编译环境,则抽取出CSS代码
  exportLoaders.style = {
    test: /\.(scss|sass|css)$/,
    loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules')
  };
}
// 对于图片与字体文件的导入工具,并且设置默认的dist中存放方式
// inline base64 URLs for <=8k images, direct URLs for the rest
exportLoaders.assets = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
  loader: 'url-loader?limit=8192&name=assets/imgs/[hash].[ext]'
};

// 对于JSON文件的导入
exportLoaders.json = {
  test: /\.json$/,
  loader: 'json-loader'
};

export default exportLoaders;
