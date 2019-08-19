/* loadable 使用范例
import Loadable from "react-loadable";
import btn from "!svg-url-loader?noquotes!./btn.svg";
import pmHome from "promise-loader?global,home!./Home";
import cbHome from "bundle-loader?lazy&name=home!./Home";
import { pending } from "./fns";
const fnHome = () => import(|* webpackChunkName: "home" *| "./Home");
const LoadableHome = Loadable({
	delay: 200, timeout: 3000,
	loader: fnHome || pmHome || () => pending(cbHome),
	render(loaded, props) { return <loaded.default {...props} />; },
	loading({ pastDelay, timedOut, error, retry }) { return <Spin />; },
});
LoadableHome.preload();
Loadable.preloadReady();
*/
import createHistory from "history/createHashHistory";
// https://npmjs.com/package/history history官方api文档
const history = createHistory();
export default history;
/* TODO LIST
了解ReactRouterDomSwitch的组件工作原理,见官方文档
实现类似beforeEach和afterEach的功能,封装路由鉴权和跳转钩子
实现无权限跳转至403,有权限刷新跳转至对应页面 */