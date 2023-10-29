import moment from "moment";
import "moment/locale/zh-cn";
import numeral from "numeral";
import PubSub from "pubsub-js";
import { Signal } from "signals";
import "nprogress/nprogress.css";
import "./public.less";
import { ready, clientInfo } from "./dom";
// global variable for debug
window.GLOBAL = { moment, numeral, PubSub, Signal };
ready(() => { // 暂不考虑做高清方案,大多组件不是rem尺寸
	const { body, fc } = clientInfo(); // 兼容移动端点击事件
	fc && fc.attach(body); // 其实FastClick也存在兼容性问题
}); // pace-less/themes/center-atom.less 自动进度条less样式
// http://momentjs.cn 处理场景:从 当天开始 到 当天结束
const { startDate, endDate, startTime, endTime } = 1;
moment(`${startDate} 00:00:00`, "YYYY-MM-DD HH:mm:ss");
moment(`${endDate} 23:59:59`, "YYYY-MM-DD HH:mm:ss");
// 获取当天时间
moment(startTime, "HH:mm:ss");
moment(endTime, "HH:mm:ss").add(1, "d");
// 获取UTC时间
moment().toISOString();
moment().utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");