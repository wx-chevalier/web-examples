import React from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
// antd 3.x 默认语言英文
const enUS = null;
const LocaleUS = props => {
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
export default LocaleUS;