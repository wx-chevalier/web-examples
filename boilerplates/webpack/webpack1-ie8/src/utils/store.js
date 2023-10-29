import React from "react";
import { Provider } from "react-redux";
import { render as draw } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import {
	isArray, isObject, isFunction, join, vals,
	log, fdata, split, dolock, unlock, trigger,
} from "./fns";

const STATE_MAP = {}; const MODEL_MAP = {};
const AFTER_INIT = []; const BEFORE_INIT = [];
// async/sync action type
export const ASYNC = "ASYNC";
export const UPDATE = "UPDATE";
// middleware and reducer
export const print = store => next => action => {
	const { type = new Date().toJSON() } = action || {};
	const result = next(action);
	log.group("PrintAction " + type);
	log("\tDispatchAction:\t", action);
	log("\tGetStoreState:\t", store.getState());
	log.groupEnd("PrintAction " + type); return result;
};
export const update = (state, action) => {
	const { type, payload, path } = action || {};
	const types = split(type);
	const [func] = types.splice(-1, 1, ...split(path));
	if (func !== UPDATE || !types.length) { return state; }
	const data = isObject(payload) ? payload
		: { [types.splice(-1, 1)]: payload };
	types.splice(0, 0, state);
	join(types.reduce((prev, now) => {
		if (!now) { return prev; }
		const val = prev[now] || {};
		prev[now] = isArray(val) ? val.slice() : { ...val };
		return prev[now];
	}), data); return ({ ...state });
};
// 模仿dva且自动加载model的封装实现
const reducer = (st, ac) => update(st || STATE_MAP, ac);
const middleware = store => next => action => {
	const { type, fn, args, prefix, lock } = action || {};
	if (type === ASYNC) {
		const error = []; // 中间件处理异步
		fn || error.push("ASYNC missing `fn`!");
		prefix || error.push("ASYNC missing `prefix`!");
		const err = error.join(" ");
		err && log.error(err, action);
		if (err || dolock(lock)) { return next(action); }
		store.dispatch({ type: `${prefix}_REQ`, action });
		const end = success => payload =>
			unlock(lock) || store.dispatch({
				type: `${prefix}_RES`,
				success, payload, action,
			});
		return fdata(fn, args).then(end(true), end(false));
	} // 针对二级结构type执行对应model的effect
	const [name, method, more] = split(type);
	if (more || !method) { return next(action); }
	trigger(name + "/" + method, action);
	const { effects } = MODEL_MAP[name] || {};
	const { [method]: effect } = effects || {};
	return isFunction(effect) ? effect(action, store)
		: isFunction(action) ? action(store) : next(action);
};
export const set = model => {
	const { name, state, before, after } = model || {};
	if (!name || !/^\S+$/.test(name)) { return; }
	STATE_MAP[name] = state; MODEL_MAP[name] = model;
	(isObject(before) ? vals(before) : [before]).forEach(
		f => isFunction(f) && BEFORE_INIT.push(f));
	(isObject(after) ? vals(after) : [after]).forEach(
		f => isFunction(f) && AFTER_INIT.push(f));
};
export const init = (...args) => {
	BEFORE_INIT.forEach(f => f(STATE_MAP));
	const store = createStore(reducer, STATE_MAP,
		applyMiddleware(middleware, ...args));
	AFTER_INIT.forEach(f => f(store)); return store;
};
export const render = (App, store) => draw(
	<Provider store={store}><App /></Provider>,
	document.getElementById("app"));
/* redux中文api文档 http://cn.redux.js.org/docs/api
const r = require.context("./", true,
	/\/(models\/.*|model)\.jsx?$/i);
r.keys().map(r).forEach(v => vals(v).forEach(set));
render(App, init()); */