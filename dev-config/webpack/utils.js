/**
 * Created by apple on 16/10/9.
 */
const path = require("path");

//定义非直接引用依赖
//定义第三方直接用Script引入而不需要打包的类库
//使用方式即为var $ = require("jquery")
exports.externals = {
  window: "window",
  jquery: "$"
};

//配置ESLint
exports.eslintConfig = {
  // TODO: consider separate config for production,
  // e.g. to enable no-console and no-debugger only in prod.
  configFile: path.join(__dirname, "../tool/eslint.js"),
  useEslintrc: false
};
