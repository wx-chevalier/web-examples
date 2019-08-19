import React, { Component } from "react";
import { Form, Input } from "antd";
import classnames from "classnames";
import { validator, isArray } from "../utils/fns";

const optional = ["any"];
// https://ant.design/components/form-cn/#Form.Item
const formItemProps = {
	labelCol: {
		className: "label-col",
		lg: { span: 3, offset: 0 },
		md: { span: 5, offset: 0 },
	},
	wrapperCol: {
		className: "wrapper-col",
		lg: { span: 18, offset: 1 },
		md: { span: 16, offset: 1 },
	},
};
class FormEntry extends Component {
	renderFormItem = (id, label, ipt, opt, addon) => {
		// https://ant.design/components/form-cn/#校验规则
		let { rules = [], ...config } = opt || {};
		rules = isArray(rules) ? rules.slice() : [];
		rules.push({ validator, ...config, id, label });
		const { data = {} } = this.state || {};
		const initialValue = data[id] || void 0;
		config = { initialValue, ...config, rules };
		const { props, before, after } = addon || {};
		const res = props || {};
		res.label || (res.label = label);
		res.className = classnames({
			"optional-label": optional.includes(id),
			[res.className || ""]: true,
		});
		const { getFieldDecorator } = this.props.form;
		const content = !ipt || typeof ipt === "string"
			? <span className="text">{ipt}</span>
			: getFieldDecorator(id, config)(ipt);
		return <Form.Item {...formItemProps} {...res}>
			{before} {content} {after}
		</Form.Item>;
	};
	render() {
		const { getFieldsValue } = this.props.form;
		const current = getFieldsValue();
		return <Form>
			{this.renderFormItem("any", "任意",
				<Input />, { required: true })}
			<div>{current.any}</div>
		</Form>;
	}
}
const WrapForm = Form.create()(FormEntry);
export default WrapForm;