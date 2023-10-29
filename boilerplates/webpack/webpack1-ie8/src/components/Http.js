import React from "react";
import { Input, Select } from "antd";
import { formatUrl } from "../utils/fns";

const [A, B] = ["http://", "https://"];
// 受控组件, value 和 onChange 必须结合使用, 否则组件永远为空
const Http = props => {
	const { addonProps, onChange, value, ...res } = props;
	const { httpDefault, ...more } = addonProps || {};
	const prefix = httpDefault === B ? B : A;
	let { http, link } = formatUrl(value, -1);
	[A, B].includes(http) || (http = prefix);
	const updateSelect = (v = prefix) => onChange(v + link);
	const updateInput = e => {
		const url = e.target.value;
		const format = formatUrl(url, -1);
		format.http && (http = format.http);
		link = format.link;
		onChange(http + link);
	};
	const selector = <Select {...more} value={http}
		disabled={res.disabled} onChange={updateSelect}>
		<Select.Option value={A}>{A}</Select.Option>
		<Select.Option value={B}>{B}</Select.Option>
	</Select>;
	return <Input {...res} value={link}
		addonBefore={selector} onChange={updateInput} />;
};
export default Http;