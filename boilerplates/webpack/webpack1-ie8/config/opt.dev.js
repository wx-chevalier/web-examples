const webpack = require("webpack");
const ErrFmt = require("friendly-errors-webpack-plugin");
const { scssStyleLoader, lessStyleLoader, cssStyleLoader,
	cssModuleLoader, styleLoader } = require("./loader");
const { FOR_IE, WK, dir } = require("./basic");
const { httpMock } = require("./mock");
const optSelf = require("./opt.self");
const optDev = {
	devtool: !FOR_IE && "cheap-module-eval-source-map",
	module: {},
	plugins: [
		new ErrFmt(),
		// new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		watchContentBase: true,
		disableHostCheck: true,
		compress: true,
		hotOnly: true,
		noInfo: true,
		inline: !FOR_IE, // ie11以下不支持inline
		https: false,
		quiet: false,
		open: false,
		hot: true, // 热重载inline必须为true
		port: 8888,
		host: "0.0.0.0",
		publicPath: "/",
		clientLogLevel: "error",
		contentBase: dir(optSelf.staticFolder),
		[WK < 2 ? "setup" : "before"]: app =>
			httpMock(app, dir(optSelf.mockApiFolder)),
	},
};
if (WK < 2) {
	optDev.plugins.push(new webpack.NamedModulesPlugin());
	optDev.module.loaders = [{
		test: /_\.css(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssModuleLoader,
			"postcss-loader",
		],
	}, {
		test: /[^_]\.css(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssStyleLoader,
			"postcss-loader",
		],
	}, {
		test: /_\.less(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssModuleLoader,
			"postcss-loader",
			lessStyleLoader,
		],
	}, {
		test: /[^_]\.less(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssStyleLoader,
			"postcss-loader",
			lessStyleLoader,
		],
	}, {
		test: /_\.scss(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssModuleLoader,
			"postcss-loader",
			scssStyleLoader,
		],
	}, {
		test: /[^_]\.scss(\?.*)?$/i,
		loaders: [
			styleLoader,
			cssStyleLoader,
			"postcss-loader",
			scssStyleLoader,
		],
	}];
} else if (WK < 4) {
	optDev.plugins.push(new webpack.NamedModulesPlugin());
	optDev.module.rules = [{
		test: /\.css(\?.*)?$/i,
		oneOf: [{
			resourceQuery: /\bmodule\b/i,
			use: [
				styleLoader,
				cssModuleLoader,
				"postcss-loader",
			],
		}, {
			use: [
				styleLoader,
				cssStyleLoader,
				"postcss-loader",
			],
		}],
	}, {
		test: /\.less(\?.*)?$/i,
		oneOf: [{
			resourceQuery: /\bmodule\b/i,
			use: [
				styleLoader,
				cssModuleLoader,
				"postcss-loader",
				lessStyleLoader,
			],
		}, {
			use: [
				styleLoader,
				cssStyleLoader,
				"postcss-loader",
				lessStyleLoader,
			],
		}],
	}, {
		test: /\.scss(\?.*)?$/i,
		oneOf: [{
			resourceQuery: /\bmodule\b/i,
			use: [
				styleLoader,
				cssModuleLoader,
				"postcss-loader",
				scssStyleLoader,
			],
		}, {
			use: [
				styleLoader,
				cssStyleLoader,
				"postcss-loader",
				scssStyleLoader,
			],
		}],
	}];
}

module.exports = optDev;