import { gcs, create, loadJs } from "./dom";
import { keys, over, getCache } from "./fns";
// 单行文字自适应大小
export const fitText = (target, text, rdx = 3) => {
	const div = create("div", text, { parent: target, attrs: { style: "display:none;border:0;margin:0;padding:0;width:auto;min-width:unset;max-width:unset;overflow:visible;position:relative;visibility:hidden;white-space:nowrap;font:inherit;columns:inherit;transform:inherit;text-indent:inherit;word-spacing:inherit;letter-spacing:inherit;text-transform:inherit;" } });
	const limit = parseFloat(gcs(target).width) || 0;
	const width = parseFloat(gcs(div).width) || 0;
	const sfs = parseFloat(gcs(div).fontSize) || 0;
	target.innerText = text;
	if (limit && width && sfs) {
		rdx = rdx > 0 && rdx < 9 ? rdx >> 0 : 0;
		const tfs = (sfs * limit / width).toFixed(rdx);
		target.style.fontSize = tfs + "px";
	}
};
// 用来手动加载excel导出依赖的js
export const xlsxOk = () => getCache("xlsxOk",
	() => over([ // npmh xlsx;npmh file-saver;
		"npm/xlsx/dist/xlsx.full.min.js",
		"npm/file-saver/dist/FileSaver.min.js",
	].map(v => loadJs("https://cdn.jsdelivr.net/" + v))));
export const rows2list = (rows, cols) => {
	cols || (cols = keys(rows[0]));
	return rows.map(v => cols.map(k => v[k]));
}; // rows:列表数组 cols:列名数组
export const list2html = (list, id, editable) => {
	const { utils } = window.XLSX;
	const sheet = utils.aoa_to_sheet(list);
	return utils.sheet_to_html(sheet, { id, editable });
}; // list:二维数组[[1,2],[2,4]] 返回table的html字符串
export const html2file = (html, opts) => {
	const type2name = {
		biff8: ".xls",
		xlsx: ".xlsx",
		xlsb: ".xlsb",
		fods: ".fods",
		ods: ".ods",
		csv: ".csv",
	}; // bookType 和 name 后缀对应关系
	const { writeFile, write, utils } = window.XLSX;
	const { onlydata, sheet = "sheet", bookType = "xlsx",
		name = sheet + type2name[bookType] } = opts || {};
	const book = utils.table_to_book(html, { sheet });
	return !onlydata ? writeFile(book, name) : write(
		book, { bookType, bookSST: true, type: "base64" });
};
export const downBySwf = (html, opts, btn) => {
	// TODO SOME UI 监测当前低版本浏览器
	opts = { ...opts, onlydata: true };
	window.Downloadify.create(btn, {
		width: 80,
		height: 20,
		append: false,
		transparent: false,
		dataType: "base64",
		filename: opts.name,
		swf: "downloadify.swf",
		downloadImage: "download.png",
		data: () => html2file(html, opts),
		onComplete: () => "文件保存成功!",
		onCancel: () => "文件保存取消!",
		onError: () => "文件保存错误!",
	});
};