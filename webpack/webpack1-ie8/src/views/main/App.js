import { hot } from "react-hot-loader";
import React from "react";
import { Spin } from "antd";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { RouteMenu } from "../../components/Menu";
import { NAV_MENUS, NAV_MAPS } from "../../constants/columns";
import "./App.less";

import Loadable from "react-loadable";
import pmHome from "promise-loader?global,home!./Home";
const Home = Loadable({ loader: pmHome, loading: Spin });

const NoAu = () => <div><Spin />页面出小差,呜呜呜...</div>;
const App = () => <HashRouter><div>
	<RouteMenu
		theme="dark"
		mode="horizontal"
		menus={NAV_MENUS}
		maps={NAV_MAPS}
	/>
	<div className="main">
		<Switch>
			<Redirect exact strict from="/" to="/home" />
			<Route path="/home" component={Home} />
			<Route component={NoAu} />
		</Switch>
	</div>
</div></HashRouter>;

export default hot(module)(App);