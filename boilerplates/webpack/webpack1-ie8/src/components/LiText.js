import React from "react";
import classnames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { Icon, Button, Tooltip, Popconfirm } from "antd";
import { isString, join } from "../utils/fns";

export const LiIcon = ({ type, className, ...rest }) => {
	const pre = /\s/.test(type) ? "" : "anticon anticon-";
	rest.className = classnames({
		[className]: className, [pre + type]: true,
	});
	return <i {...rest} />;
};
const TagMap = { Icon, Button, Link, NavLink };
export const LiText = props => {
	const { tag, icon, label, title, confirm, gap = 10,
		disabled, onClick, children, ...rest } = props;
	const Tag = tag && /^[a-z]+[1-6]?$/.test(tag)
		? tag : TagMap[tag] || "span";
	const tip = isString(title) ? { title } : title || {};
	const pop = join({ okText: "确定", cancelText: "取消" },
		isString(confirm) ? { title: confirm } : confirm);
	rest.onClick = disabled || pop.title
		? e => e.preventDefault() : onClick;
	let ele = <Tag {...rest}>
		{icon ? <Icon type={icon}
			style={label ? { marginRight: gap } : null}
		/> : icon || null}
		{icon && isString(label)
			? <span>{label}</span>
			: label || null}
	</Tag>;
	if (title) { ele = <Tooltip {...tip}>{ele}</Tooltip>; }
	if (pop.title) {
		pop.onConfirm = onClick || (() => false);
		ele = <Popconfirm {...pop}>{ele}</Popconfirm>;
	}
	return ele;
};