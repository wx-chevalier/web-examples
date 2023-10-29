const { PROD, WK, dpv } = require("./basic");

const urlRel = false; // 是否使用样式的相对路径解析
// https://npmjs.com/package/style-loader#options
const styleLoader = {
	loader: "style-loader",
	options: { sourceMap: !PROD },
};
// https://npmjs.com/package/css-loader#options
const cssStyleLoader = {
	loader: "css-loader",
	options: {
		sourceMap: !PROD,
		import: urlRel,
		url: urlRel,
		modules: false,
	},
};
const localIdentName = "[name]_[local]_[hash:base64:5]";
const cssModuleLoader = {
	loader: "css-loader",
	options: {
		sourceMap: !PROD,
		import: urlRel,
		url: urlRel,
		modules: { localIdentName },
	},
};
// https://npmjs.com/package/sass-loader
const scssStyleLoader = {
	loader: "sass-loader",
	options: { sourceMap: !PROD },
}; // loader 在调用的时候才会去执行,不安装不调用时不会出错的
// https://npmjs.com/package/less-loader
const lessStyleLoader = {
	loader: "less-loader",
	options: { // 默认主题 antd/lib/style/themes/default.less
		sourceMap: !PROD,
		relativeUrls: urlRel,
		javascriptEnabled: true,
		globalVars: { "@up": "red" }, // 变量写入文件顶部
		modifyVars: { "@to": "tan" }, // 变量写入文件底部
	}, // "@hack": `true; @import "${dir("src/mixin")}"`,
}; // https://github.com/less/less.js/blob/master/bin/lessc
const loaders = {
	scssStyleLoader, lessStyleLoader,
	styleLoader, cssStyleLoader, cssModuleLoader,
};
// webpack1打包样式css压缩对于less文件有效,但是css文件莫名失败
if (WK < 2) { // webpack1仅支持字符串形式的loader
	lessStyleLoader.options.ieCompat = true;
	const shimLoader = key => {
		const { loader, options } = loaders[key] || {};
		loader && (loaders[key] = loader);
		const query = "?" + JSON.stringify(options);
		options && (loaders[key] += query);
	};
	shimLoader("styleLoader");
	shimLoader("cssStyleLoader");
	shimLoader("cssModuleLoader");
	shimLoader("scssStyleLoader");
	shimLoader("lessStyleLoader");
} else if (dpv("vue-loader")) {
	styleLoader.loader = "vue-style-loader";
} // https://npmjs.com/package/vue-style-loader
module.exports = loaders;