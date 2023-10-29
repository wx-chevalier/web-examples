import React from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
// antd 1.x 默认语言中文
const zhCN = null;
const LocaleCN = props => {
	const { lang, children, ...res } = props;
	if (lang === "en") {
		res.locale = enUS;
		moment.locale("en");
	} else {
		res.locale = zhCN;
		moment.locale("zh-cn");
	}
	return <LocaleProvider {...res}>
		{children}
	</LocaleProvider>;
};
export default LocaleCN;