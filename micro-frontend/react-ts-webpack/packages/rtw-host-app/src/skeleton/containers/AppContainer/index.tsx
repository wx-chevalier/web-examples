import { Spin } from 'antd';
import cn from 'classnames';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import React, { PureComponent, Suspense, lazy } from 'react';

import styles from './index.less';
import Exception from '../../components/decorators/Exception';
import { ResolvedModule } from '../../../manifest';

export interface IProps extends RouteComponentProps {
  appName: string;
  appLoader: () => Promise<ResolvedModule>;
  className?: string;
  fallback: JSX.Element;
  onAppendReducer: (reducer: { [key: string]: object | undefined }) => void;
}

class AppContainer extends PureComponent<IProps> {
  defaultProps = {
    fallback: <Spin />
  };

  state = {
    appError: null
  };

  getAppComponent() {
    const { appLoader, appName, onAppendReducer } = this.props;

    return lazy(() =>
      appLoader().then(appModule => {
        if ('reducer' in appModule) {
          onAppendReducer({
            [appName]: appModule.reducer
          });
        }
        return appModule;
      })
    );
  }

  componentDidCatch(error: object, errorInfo: object) {
    this.setState({ appError: { error, errorInfo } });
  }

  renderErrorPage() {
    const { appError } = this.state;

    return <Exception type="-1" {...appError} />;
  }

  render() {
    const { className, fallback, appName } = this.props;
    const { appError } = this.state;

    if (appError) {
      return this.renderErrorPage();
    }

    const AppComponent = this.getAppComponent();

    return (
      <div className={cn(styles.container, className)}>
        <Suspense fallback={fallback}>
          <AppComponent appName={appName} />
        </Suspense>
      </div>
    );
  }
}

export default withRouter(AppContainer);
