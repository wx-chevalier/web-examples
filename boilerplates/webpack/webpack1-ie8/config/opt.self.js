const { MY_PKG, MY_SVC, PROD,
	bootcdn, pkgcdn } = require("./basic");
/* *** file and folder *** */
const buildFolder = "build";
const outputFolder = "dist";
const staticFolder = "static";
const mockApiFolder = "src/mock";
const compileFolder = "src/views";
const templateFile = "src/index.html";
/* *** file merge config *** */
const LIB = { // 纯文本拼接,无编译过程
	/* "ie8.lib.js": ["./ie8.js", "./dom4.js"],
	"style.css": ["normalize/normalize.min.css",
		"./editor/wangeditor.min.css"],
	"jquery.js": "jquery/dist/jquery.min.js", */
};
/* *** module entry config *** */
const IPT = {};
/* *** html title config *** */
const title = "";
/* *** html ico config *** */
const ico = "favicon.ico";
/* *** html css resource *** */
const css = [
	!"fa/fa-5.x.min.css",
	"antd/antd-1.11.6.css",
	"editor/wangeditor.min.css",
	!`${bootcdn}antd/1.11.6/antd.min.css`,
	`${bootcdn}normalize/7.0.0/normalize.min.css`,
	// highlight.js
	!`${pkgcdn}highlight.js/lib/highlight.min.js`,
	!`${pkgcdn}highlight.js/styles/atom-one-dark.min.css`,
	!`${pkgcdn}highlight.js/styles/atom-one-light.min.css`,
	// antd-mobile
	!`${pkgcdn}antd-mobile/dist/antd-mobile.min.js`,
	!`${pkgcdn}antd-mobile/dist/antd-mobile.min.css`,
	// antd
	!`${pkgcdn}antd/dist/antd.min.js`,
	!`${pkgcdn}antd/dist/antd.min.css`,
];
/* *** html js resource *** */
const js = [
	!`${pkgcdn}@ant-design/icons/lib/umd.js`,
	`${bootcdn}jquery/1.12.4/jquery.min.js`,
	"editor/wangeditor.min.js",
	!"js/wangeditor.min.js",
	!"js/fastclick.min.js",
	!"js/pace.min.js",
];
/* *** html entry config *** */
const page = ["index"];
/* *** below whole config *** */
const optSelf = {
	buildFolder, outputFolder, staticFolder,
	mockApiFolder, compileFolder, templateFile,
	LIB, IPT, title, ico, css, js, page,
}; // 生产包做静态服务器 MY_SVC=dist npm start
if (!PROD && MY_SVC) {
	+MY_SVC || (optSelf.staticFolder = MY_SVC);
	optSelf.IPT = { fns: "@/utils/fns" };
	delete optSelf.page; // 仅启动静态文件服务
} else if (PROD && MY_PKG) {
	optSelf.IPT = { ...MY_PKG.split(",") };
	delete optSelf.page; // 单独编译一些文件
} // MY_PKG=a.js,b.css,c.less npm run app
/* *** modify final configuration *** */
optSelf.modify = config => !config;
/* *** 对于ie8,直接用babel-polyfill的cdn报错,需转码 *** */
module.exports = optSelf;