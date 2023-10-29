const example = {
	ONLINE: false, // true则全局禁用mock
	"ALL /api": {
		name: "api",
		fork: "github",
	},
	"GET /api": "api name fork github",
	"PUT /user/:id"(req, res) {
		const { body, query, params, cookies } = req;
		res.cookie("testName", "testValue");
		res.json({ body, query, cookies, ...params });
	},
	"POST /api": () => ({
		target: "https://proxy.io",
		changeOrigin: true,
		secure: true,
		pathRewrite: { "^/api": "/mock" },
		bypass: (req, _res, _proxyOptions) =>
			/\.html/.test(req.url) && req.originalUrl,
		onProxyReq: (proxyReq, _req, _res) =>
			proxyReq.setHeader("x-auth-token", "forever"),
		onProxyRes: (proxyRes, _req, _res) =>
			proxyRes.setHeader("location", "/login.html"),
	}),
};
/* require在webpack和nodejs中差异很大,状态码`http-status`
webpack中require.resolve返回的是模块id,cache里键也是模块id
https://webpack.js.org/guides/dependency-management/
https://webpack.docschina.org/configuration/dev-server/
https://webpack.docschina.org/guides/dependency-management/
https://github.com/chimurai/http-proxy-middleware#options */
const multer = require("multer");
const chokidar = require("chokidar");
const { resolve: dir } = require("path");
const bodyParser = require("body-parser");
const debounce = require("lodash/debounce");
const cookieParser = require("cookie-parser");
const pathToRegExp = require("path-to-regexp");
const requireEsModule = require("esm")(module);
const proxy = require("http-proxy-middleware");
const { keys, values: vals, assign: join } = Object;
const isFn = v => typeof v === "function";
const isSt = v => typeof v === "string";
const { log } = console; /* 路由与页面的路径匹配 返回匹配或空
route: 路由路径,如/user/:id       page: 页面路径,如/user/12
opt: 路径匹配规则设置[可选]     文档见npm包path-to-regexp */
const routeMatch = (route, page, opt) => {
	const args = []; const result = {};
	const cfg = join({ sensitive: true }, opt);
	const reg = pathToRegExp(route, args, cfg);
	const match = reg.exec(page); if (!match) { return; }
	args.forEach((k, i) => (result[k.name] = match[i + 1]));
	return result;
};
const tryEXEC = (func, ...args) => {
	try {
		return isFn(func) ? func(...args) : func;
	} catch (error) {
		log("tryEXEC error:", { func, args, error });
	}
};
const clearRequireCache = file => {
	const data = require.cache[file] || {};
	const list = data.parent && data.parent.children;
	list && list.splice(list.indexOf(data), 1);
	delete require.cache[file];
};
const clearRequireEsModule = mo => tryEXEC(() => {
	clearRequireCache(mo);
	const file = require.resolve(mo);
	file !== mo && clearRequireCache(file);
	return requireEsModule(file);
}); // 拦截express的application路由,mock http response
const httpMock = (app, mockFolder) => {
	let routeMap = {}; const moduleMap = {};
	const calc = debounce(() => { // 防抖,0.5s内无触发执行
		const routes = join({}, ...vals(moduleMap));
		routeMap = { ONLINE: routes.ONLINE }; // 重置映射
		routes.ONLINE || keys(routes).forEach(k => {
			let [, method, route] = // 请求方式,路由地址
				/^\s*(\S+)\s+(\S.*)$/.exec(k) || [];
			route = (route || "").replace(/\s+/g, "");
			method = (method || "all").toLowerCase();
			method === "method" && (method = "all");
			route && (routeMap[route] = join({}, // 增量更新
				routeMap[route], { [method]: routes[k] }));
		});
	}, 500);
	const addModule = file => {
		const esm = clearRequireEsModule(file) || {};
		moduleMap[file] = esm.default || esm; calc();
	};
	const delModule = file => {
		clearRequireCache(file);
		delete moduleMap[file]; calc();
	};
	const findCallBack = (req, res, next) => {
		let params; if (routeMap.ONLINE) { return; }
		const route = keys(routeMap).find(routePath =>
			(params = routeMatch(routePath, req.path)));
		const method = req.method.toLowerCase();
		const cbs = routeMap[route] || {};
		const cb = method in cbs ? cbs[method] : cbs.all;
		const isProxy = isFn(cb) && !cb.length;
		return isProxy ? tryEXEC(proxy, cb) : cb ? () => {
			req.params = params || {};
			isFn(cb) ? tryEXEC(cb, req, res, next)
				: res[isSt(cb) ? "send" : "json"](cb);
		} : null; // send|json|next三者同时使用会有问题
	};
	const parser = [ // 解析Cookie和FormData
		cookieParser(), multer().any(),
		bodyParser.raw({ limit: "5mb" }),
		bodyParser.urlencoded({ extended: true }),
		bodyParser.json({ limit: "5mb", strict: false }),
		bodyParser.text({ limit: "5mb", type: "text/*" }),
	];
	app.all("*", (req, res, next) => {
		const cb = findCallBack(req, res, next);
		if (!cb) { return next(); }
		log(new Date(), req.method, req.path);
		cb.length ? cb(req, res, next) : Promise.all(
			parser.map(h => new Promise(resolve =>
				h(req, res, resolve)))).then(cb);
	}); // 响应(字符|对象);函数(带参-手动处理|无参-配置代理)
	chokidar.watch(dir(mockFolder)).on("all", (ev, pa) =>
		["add", "change"].includes(ev) ? addModule(pa)
			: ev === "unlink" ? delModule(pa) : null);
}; // 文档见npm包chokidar
module.exports = { example, httpMock };