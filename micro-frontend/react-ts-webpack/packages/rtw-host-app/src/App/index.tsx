import { Switch } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

import * as styles from './index.less';
import { manifest, Module } from '../manifest';
import AppContainer from '../skeleton/containers/AppContainer';
import store from '../skeleton/redux/store';
import Exception from '../skeleton/components/decorators/Exception';

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  renderRoute(appId: string, app: Module) {
    if (!app.loader || typeof app.loader !== 'function') {
      throw new Error(`${app.name} loader is not defined or defined wrongly`);
    }

    return (
      <Route
        key={appId}
        path={`/${appId}`}
        component={() => (
          <AppContainer
            appId={appId}
            appLoader={app.loader}
            onAppendReducer={store.appendReducer}
          />
        )}
      />
    );
  }

  render() {
    const routes = Object.keys(manifest);

    return (
      <section className={styles.container}>
        <Switch>
          <Route exact={true} path="/">
            <Redirect to={routes[0]} />
          </Route>
          {routes.map(r => this.renderRoute(r, manifest[r]))}
          <Route component={() => <Exception />} />
        </Switch>
        {routes.map(r => this.renderRoute(r, manifest[r]))}
      </section>
    );
  }
}

export default connect(
  state => ({ ...state }),
  {}
)(withRouter(App));
