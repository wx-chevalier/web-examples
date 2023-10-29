export const NAV_MENUS = [
	{
		key: "/home", type: "sub",
		children: [
			{
				key: "/home/buttons", type: "sub",
				children: [
					{ key: "/home/buttons/spins" },
					{ key: "/home/buttons/modals" },
				],
			},
			{ key: "/home/icons" },
		],
	},
	{ key: "/hello" },
	{
		key: "/test", type: "sub",
		children: [
			{
				key: "/test/cloud", type: "group",
				children: [
					{ key: "/test/cloud/spins" },
					{ key: "/test/cloud/modals" },
				],
			},
			{
				key: "/test/icons", type: "group",
				children: [
					{ key: "/test/icons/spins" },
					{ key: "/test/icons/modals" },
				],
			},
		],
	},
	{ key: "/appstore" },
	{ key: "/laptop" },
	{ key: "/inbox" },
	{ key: "/user" },
];
export const NAV_MAPS = {
	"/home": { label: "首页", icon: "home" },
	"/home/buttons": { label: "按钮", icon: "mobile" },
	"/home/buttons/spins": { label: "加载中", icon: "pause", type: "Link" },
	"/home/buttons/modals": { label: "对话框", icon: "question", type: "Link" },
	"/home/icons": { label: "图标", icon: "scan", type: "Link" },
	"/hello": { label: "你好", icon: "smile", type: "Link" },
	"/test": { label: "测试", icon: "notification" },
	"/test/cloud": { label: "按钮", icon: "cloud" },
	"/test/cloud/spins": { label: "加载中", icon: "folder", type: "Link" },
	"/test/cloud/modals": { label: "对话框", icon: "meh", type: "Link" },
	"/test/icons": { label: "图标", icon: "lock" },
	"/test/icons/spins": { label: "加载中", icon: "desktop", type: "Link" },
	"/test/icons/modals": { label: "对话框", icon: "download", type: "Link" },
	"/appstore": { label: "应用商店", icon: "appstore", type: "Link", disabled: true },
	"/laptop": { label: "平板电脑", icon: "laptop", type: "Link" },
	"/inbox": { label: "收件箱", icon: "inbox", type: "Link" },
	"/user": { label: "用户", icon: "user", type: "Link" },
};