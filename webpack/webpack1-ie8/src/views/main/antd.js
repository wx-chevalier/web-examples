import { verIE } from "../../utils/fns";

const horizontalScroll = e => {
	const ev = e || window.event;
	const $el = $(ev.target || ev.srcElement);
	const left = $el.scrollLeft();
	$el.siblings(".ant-table-header,.ant-table-body").scrollLeft(left);
};
const verticalScroll = e => {
	const ev = e || window.event;
	const $el = $(ev.target || ev.srcElement);
	const $table = $el.parents(".ant-table").eq(0);
	const top = $el.scrollTop();
	$table.find(".ant-table-fixed-left .ant-table-body-inner,.ant-table-scroll .ant-table-body,.ant-table-fixed-right .ant-table-body-inner").scrollTop(top);
};
const checkBind = (ev, fn) => (_idx, el) => {
	// 检查是否已绑定事件, 未绑定则进行绑定
	const { events = {} } = $._data(el) || {};
	const res = (events[ev] || []).find(v => v.handler === fn);
	!res && $(el).on(ev, fn);
};
export const shimAntdTable = () => {
	const { mod, ver } = verIE();
	if ((mod || ver) < 9) {
		$(".ant-table-scroll .ant-table-header,.ant-table-scroll .ant-table-body").each(checkBind("scroll", horizontalScroll));
		$(".ant-table-fixed-left .ant-table-body-inner,.ant-table-scroll .ant-table-body,.ant-table-fixed-right .ant-table-body-inner").each(checkBind("scroll", verticalScroll));
	}
};