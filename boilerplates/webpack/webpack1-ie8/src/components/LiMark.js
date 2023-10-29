import React, { Component } from "react";
import SimpleMDE from "simplemde";

class LiMark extends Component {
	componentDidMount() {
		const { config, update, content } = this.props;
		const opts = {
			spellChecker: false,
			autoDownloadFontAwesome: false,
			element: this.dom, ...(config || {}),
		};
		opts.previewRender = (text, preview) => {
			const { className, style } = preview;
			/\smarkdown-body\s/.test(` ${className} `) ||
				(preview.className += " markdown-body");
			style.backgroundColor = "#fff";
			return SimpleMDE.prototype.markdown(text);
		};
		const editor = new SimpleMDE(opts);
		editor.codemirror.on("change", () =>
			typeof update === "function" &&
			update(editor.value())
		);
		editor.value(content);
		this.editor = editor;
	}
	componentWillUnmount() {
		this.editor.toTextArea();
		this.editor = void 0;
	}
	shouldComponentUpdate(nextProps, _nextState) {
		const { editor } = this;
		if (editor) {
			const { content } = nextProps;
			const html = editor.value();
			content !== html && editor.value(content);
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
/* markdown编辑器:
https://npmjs.com/package/simplemde
	不含预览样式,预览容器.editor-preview
	SimpleMDE.prototype.markdown=marked=md=>html
https://npmjs.com/package/github-markdown-css
	markdown预览样式,样式容器.markdown-body
https://npmjs.com/package/turndown
	new TurndownService().turndown=html=>md
*/
export default LiMark;