import React, { Component, version } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Icon, Breadcrumb } from "antd";
import { keys, join, tree } from "../utils/fns";
import { LiText } from "./LiText";
import "./Menu.less";

const oldReact = parseFloat(version) < 16.3;
const MENU_MAP = {}; // key: { type, to, href, target, label, icon, disabled },
const MENU_SET = []; // { key, type, hidden, children: [{ key, type, children, hidden }] },

const renderAllMenu = (menus, maps) => tree(menus, (rest, children, key) => {
	const { type, ...props } = rest || {};
	let item = maps[props.key];
	if (item) { item = join({ tag: item.type, to: props.key }, item); }
	const { disabled = false, hidden = false } = item || {};
	if (hidden) { return null; }
	if (/sub/i.test(type) && children && children.length) {
		return <Menu.SubMenu key={key} disabled={disabled} {...props}
			title={<LiText key={key} {...item} />}
		>{children}</Menu.SubMenu>;
	} else if (/group/i.test(type) && children && children.length) {
		return <Menu.ItemGroup key={key} disabled={disabled} {...props}
			title={<LiText key={key} {...item} />}
		>{children}</Menu.ItemGroup>;
	} else {
		return <Menu.Item key={key} disabled={disabled} {...props}>
			<LiText key={key} {...item} />
		</Menu.Item>;
	}
});

const matchPath = path => {
	const { origin, href } = window.location;
	return href.slice(origin.length).indexOf(path) === 0;
};
const getList = arr => {
	if (!arr) { return []; }
	const res = [];
	for (let i = 1; i <= arr.length; i++) {
		res.push(arr.slice(0, i).join(""));
	}
	return res;
};
const getKeys = (pro, sta) => {
	const { maps = MENU_MAP, fold, location } = pro || {};
	const { pathname } = location || {};
	if (sta && sta.pathname === pathname) { return sta || {}; }
	let key;
	keys(maps).find(x => {
		const { type, to = x, href } = maps[x] || {};
		if (/^(link|navlink)$/i.test(type) && pathname === to) {
			key = x; return true;
		} else if (/^a$/i.test(type) && matchPath(href)) {
			key = x; return true;
		} else {
			const idx = (pathname || "").indexOf(to);
			idx === 0 && (!key || key < x) && (key = x);
		}
	});
	if (!key) { return sta || {}; }
	const res = key.match(/\/[^/]+/g) || [];
	return {
		openKeys: fold ? [] : getList(res.slice(0, -1)),
		selectedKeys: getList(res), pathname,
	};
};
class WrapMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		if (oldReact) {
			this.state = getKeys(props);
			this.componentWillReceiveProps = nextProps =>
				this.setState(getKeys(nextProps));
		}
	};
	keySwitch = newKeys => {
		const { openKeys = [] } = this.state;
		const newKey = newKeys.find(
			v => !openKeys.includes(v)
		);
		const menu = this.props.menus.find(
			v => v.key === newKey
		);
		this.setState({
			openKeys: !menu ? newKeys
				: newKey ? [newKey] : [],
		});
	};
	render() {
		const { selectedKeys, openKeys } = this.state;
		const {
			menus = MENU_SET,
			maps = MENU_MAP,
			staticContext,
			...res
		} = this.props;
		return <Menu
			onOpenChange={this.keySwitch}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			{...res}
		>
			{renderAllMenu(menus, maps)}
		</Menu>;
	};
};
if (!oldReact) {
	WrapMenu.getDerivedStateFromProps = getKeys;
}
const RouteMenu = withRouter(WrapMenu);
const WrapBread =
	({ list = [], ...res }) =>
		<Breadcrumb {...res}>
			{list.map(
				(v, i) => {
					v && !(i || v.icon) &&
						(v.icon = " fa fa-map-marker");
					return <Breadcrumb.Item key={i}>
						<LiText gap={8} {...v} />
					</Breadcrumb.Item>;
				}
			)}
		</Breadcrumb>;
const TitleBar =
	({ list, btns, separator }) =>
		<div className="title-bar-wrap">
			<WrapBread list={list || []} separator={separator || "/"} />
			<div className="right-btns">
				{btns.map((v, i) => {
					const { icon, label, className = "", ...res } = v;
					const link = {
						className: className + " right-btn",
						label: [
							<span key="icon" className="btn-icon">
								<Icon type={icon} />
							</span>,
							label,
						],
						...res,
					};
					return <LiText key={i} gap={6} {...link} />;
				})}
			</div>
		</div>;
export { WrapMenu, RouteMenu, WrapBread, TitleBar };