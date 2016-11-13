/**
 * Created by apple on 16/10/9.
 */
var path = require('path');

//定义非直接引用依赖
//定义第三方直接用Script引入而不需要打包的类库
//使用方式即为var $ = require("jquery")
exports.externals = {
  window: "window",
  jquery: "jQuery",
  pageResponse: 'pageResponse'
};

//配置ESLint
exports.eslintConfig = {
  // TODO: consider separate config for production,
  // e.g. to enable no-console and no-debugger only in prod.
  configFile: path.join(__dirname, '../lint/eslint.js'),
  useEslintrc: false
};

//PostCSS plugins
var autoprefixer = require('autoprefixer');

//使用postcss作为默认的CSS编译器
exports.postCSSConfig = [
  autoprefixer({
    browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  }), require('postcss-flexibility')];