import { keys, join, pending, dmt } from "./fns";
export const attachEvt = (ele, evt, listener, capture) => {
	const target = ele || document;
	const handler = e => {
		const event = e || window.event;
		const src = event.srcElement || event.target;
		const [touch] = event.targetTouches || [];
		const { prototype } = window.Touch || {};
		touch && keys(prototype).forEach(k =>
			(k in event) || (event[k] = touch[k]));
		listener(event, src); // touch坐标属性扩展到事件上
	};
	if (target.addEventListener) {
		target.addEventListener(evt, handler, capture);
	} else if (target.attachEvent) {
		target.attachEvent("on" + evt, handler);
	} else {
		target["on" + evt] = handler;
	}
	return handler;
};
export const detachEvt = (ele, evt, listener, capture) => {
	const target = ele || document;
	if (target.removeEventListener) {
		target.removeEventListener(evt, listener, capture);
	} else if (target.detachEvent) {
		target.detachEvent("on" + evt, listener);
	} else {
		target["on" + evt] = void 0;
	}
};
export const stopEvt = e => {
	e.stopPropagation && e.stopPropagation();
	e.cancelBubble = true;
};
export const prevent = e => {
	e.preventDefault && e.preventDefault();
	e.returnValue = false;
};
/*
mousedown  -->  touchstart
mousemove  -->  touchmove
mouseup    -->  touchend
<-- click dblclick -->
mouseover  -->  touchstart
mouseout   -->  touchend
<-- touchcancel -->
querySelector querySelectorAll
elementFromPoint elementsFromPoint
*/
export const query = k => (s, e = document) => e[k](s);
export const q = query("querySelector");
export const qId = query("getElementById");
export const qs = query("querySelectorAll");
export const qsTag = query("getElementsByTagName");
export const qsClass = query("getElementsByClassName");
export const create = (tag, html, opts) => {
	/^[a-z]+[1-6]?$/i.test(tag) || (tag = "span");
	const el = document.createElement(tag);
	el.innerHTML = html || "";
	const { attrs, props, parent } = opts || {};
	keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
	join(el, props); parent && parent.appendChild(el);
	return el;
};
export const load = (tag, attrs) => pending((res, rej) => {
	const el = create(tag, null, { attrs });
	const done = () => res({ target: el });
	el.onload = done; el.onerror = rej;
	el.onreadystatechange = () => "complete,loaded"
		.indexOf(el.readyState) > -1 && done();
	document.body.appendChild(el);
	const { src, href, data, complete } = el;
	const isImg = src && /^img$/i.test(tag);
	const isCss = href && /^link$/i.test(tag);
	const isData = data && /^object$/i.test(tag);
	isImg && complete && done();
	src || isCss || isData || done();
});
export const loadImg = src => load("img", { src });
export const loadCss = href =>
	load("link", { rel: "stylesheet", href });
export const loadJs = src =>
	load("script", { type: "text/javascript", src });
export const gcs = el => {
	const { getComputedStyle: calc } = window;
	return calc ? calc(el) : el.currentStyle;
};
export const hd = (baseFontSize, sketchWidth) => {
	baseFontSize = baseFontSize > 0 ? baseFontSize : 100;
	const { document, navigator } = window;
	const { documentElement: html, head, body } = document;
	const dpr = window.devicePixelRatio || 1;
	const ua = navigator.userAgent;
	const android = ua.match(/android/i);
	const webkit = ua.match(/applewebkit\/(\d{3})/i);
	// webkit[1]>534代表安卓4.4以上的系统
	const isNew = android && webkit && webkit[1] > 534;
	const uchd = ua.match(/u3\/([.\d]{5,})/i);
	const isUCHD = uchd && uchd[1].split(".") > [0, 8, 0];
	const ios = ua.match(/(iphone|ipad|ipod)/i);
	const scale = ios || isNew || isUCHD ? 1 / dpr : 1;
	let rate = 1;
	if (isNew || isUCHD) {
		html.style.fontSize = baseFontSize + "px";
		const div = create("div", null, { parent: body });
		div.style.width = "1rem";
		rate = baseFontSize / parseFloat(gcs(div).width);
		div.remove();
	} // 清除当前meta配置
	[...qs("meta[name=viewport]")].forEach(d => d.remove());
	let content = "width=device-width,";
	if (isNew && !uchd) { // UC内核不能设置target-densitydpi
		content += "target-densitydpi=device-dpi,";
	} // 安卓4.4以上webview支持dpi和scale,但不会同时支持,都写上
	const hd = `-scale=${(scale * rate).toFixed(3)},`;
	content += `initial${hd}maximum${hd}minimum${hd}`;
	content += "user-scalable=no,viewport-fit=cover";
	const attrs = { name: "viewport", content };
	create("meta", null, { attrs, parent: head });
	const resize = window.requestAnimationFrame(() => {
		const zoom = rate * (sketchWidth > 0
			? html.clientWidth / sketchWidth : 1);
		html.style.fontSize = (baseFontSize * zoom) + "px";
	}); // 移动端组件大多不支持rem,需要自己写组件
	return [resize(), attachEvt(window, "resize", resize)];
};
export const hasCls = (el, cls) => {
	const list = dmt(el.className); const has = dmt(cls);
	return !has.filter(v => !list.includes(v)).length;
};
export const addCls = (el, cls) => {
	const list = dmt(el.className); const add = dmt(cls);
	el.className = dmt(list.concat(add)).join(" ");
};
export const delCls = (el, cls) => {
	const list = dmt(el.className); const del = dmt(cls);
	const result = list.filter(v => !del.includes(v));
	el.className = dmt(result).join(" ");
};
export const ready = f => pending(res => attachEvt(
	document, "DOMContentLoaded", res, false)).then(f);
export const clientInfo = () => {
	const { documentElement: html, head, body } = document;
	const { clientWidth: vw, clientHeight: vh } = html;
	const { FastClick: fc, devicePixelRatio: dpr,
		navigator: { userAgent: ua } } = window;
	return { html, head, body, vw, vh, fc, dpr, ua };
};
export const getScroll = () => {
	const { documentElement: html, body } = document;
	const wrap = html.scrollHeight >= body.scrollHeight ||
		html.scrollWidth >= body.scrollWidth ? html : body;
	return document.scrollingElement || wrap;
}; // scrollingElement标准模式是html,怪异模式是body
export const scrollLock = (cls = "fixed-scroll-lock") => {
	const { documentElement: html, body } = document;
	const db = { top: null, left: null };
	const isLock = () =>
		hasCls(html, cls) || hasCls(body, cls);
	const openLock = () => {
		if (isLock()) { return; }
		const ele = getScroll();
		db.top = ele.scrollTop || 0;
		db.left = ele.scrollLeft || 0;
		addCls(html, cls) || addCls(body, cls);
		ele.style.top = -db.top + "px";
		ele.style.left = -db.left + "px";
	};
	const closeLock = () => {
		if (!isLock()) { return; }
		html.style.top = ""; html.style.left = "";
		body.style.top = ""; body.style.left = "";
		delCls(html, cls) || delCls(body, cls);
		html.scrollTop = db.top; html.scrollLeft = db.left;
		body.scrollTop = db.top; body.scrollLeft = db.left;
	}; // 样式更新放一起,实时渲染放一起
	return { isLock, openLock, closeLock };
};