const { PROD } = require("./basic");
// https://github.com/postcss/postcss-loader#options
const plugins = {
	autoprefixer: {},
	cssnano: { safe: true },
	"postcss-preset-env": {},
	"postcss-plugin-px2rem": {
		rootValue: 100,
		minPixelValue: 2,
	},
}; // postcss.config.js 生效需要 postcss-loader 无 options
delete plugins["postcss-plugin-px2rem"];
delete plugins["postcss-preset-env"];
PROD || (delete plugins.cssnano);
module.exports = {
	plugins,
	minimize: PROD,
	sourceMap: !PROD,
};