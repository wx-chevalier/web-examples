import React, { Component } from "react";
import E from "wangeditor";
import { isFunction, join } from "../utils/fns";

let key = "$textElem";
if (E.config) {
	key = "$txt";
	E.config.printLog = false;
}
class LiRich extends Component {
	componentDidMount() {
		const editor = new E(this.dom);
		const { config, update, content } = this.props;
		if (E.config) {
			join(editor.config, {
				jsFilter: false,
				pasteText: false,
				pasteFilter: false,
				withCredentials: false,
			}, config);
			editor.onchange = () =>
				isFunction(update) &&
				update(editor[key].html());
		} else {
			join(editor.customConfig, {
				debug: false,
				pasteIgnoreImg: false,
				pasteFilterStyle: false,
				uploadImgShowBase64: false,
			}, config);
			editor.customConfig.onchange = () =>
				isFunction(update) &&
				update(editor[key].html());
		}
		editor.create();
		editor[key].html(content);
		this.editor = editor;
	}
	componentWillUnmount() {
		this.editor = void 0;
	}
	shouldComponentUpdate(nextProps, _nextState) {
		const { editor } = this;
		if (editor) {
			const { content } = nextProps;
			const $con = editor[key];
			const html = $con.html();
			content !== html && $con.html(content);
		}
		return false;
	}
	getDOM = v => (this.dom = v);
	render() {
		const { config, update, content,
			staticContext, ...rst } = this.props;
		return <div ref={this.getDOM} {...rst} />;
	}
}
/*
https://npmjs.com/package/wangeditor
	2.x样式预览容器 .wangEditor-txt **
	3.x样式预览容器 .w-e-text **
自定义配置说明:
wangeditor@2.1.23/wangeditor.js#超时时间
	editor.$txt是jquery封装的div,编辑器的可编辑区域
wangeditor@3.1.1/wangeditor.js#是否开启
	editor.$textElem是jquery封装的div,编辑器的可编辑区域
*/
export default LiRich;