// @flow
import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Private from "./private/Private";
import { ShowcaseHeader } from "../../../showcase/showcase_decorator";
import { validateUserTokenSync } from "../../../../shared/api/auth";

/**
 * @function HOC 方式保护路由
 * @param Component
 * @param rest
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      (validateUserTokenSync()
        ? <Component {...renderProps} />
        : <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: renderProps.location }
            }}
          />)}
  />
);

/**
 * @function 展示登录
 */
export default class Auth extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <section className="Auth__container">
        <div className="Showcase__case_header">
          <ShowcaseHeader title={"权限认证"} description={"登录之后才能进入隐私页面"} />
        </div>

        <Switch>
          {/*登录时用的路由*/}
          <Route exact path={`${match.url}/`} component={Home} />
          <Route exact path={`${match.url}/login`} component={Login} />
          <PrivateRoute
            exact
            path={`${match.url}/private`}
            component={Private}
          />
        </Switch>
      </section>
    );
  }
}
