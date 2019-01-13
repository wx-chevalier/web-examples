import { Spin } from 'antd';
import cn from 'classnames';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import * as React from 'react';

// import styles from './index.less';
import Exception from '../../components/decorators/Exception';
import { ResolvedModule } from '../../../manifest';

const { PureComponent, Suspense, lazy } = React;

export interface IProps extends RouteComponentProps {
  appId: string;
  appLoader: () => Promise<ResolvedModule>;
  className?: string;
  fallback?: JSX.Element;
  onAppendReducer: (reducer: { [key: string]: object | undefined }) => void;
}

// 应用缓存
const appCache = {};

/**
 * 应用懒加载与容错的容器
 */
class AppContainer extends PureComponent<IProps> {
  defaultProps = {
    fallback: <Spin />
  };

  state = {
    appError: null
  };

  loadApp() {
    const { appLoader, appId, onAppendReducer } = this.props;

    if (appCache[appId]) {
      return appCache[appId];
    }

    const app = lazy(() =>
      appLoader().then(appModule => {
        if ('reducer' in appModule) {
          onAppendReducer({
            [appId]: appModule.reducer
          });
        }

        return appModule;
      })
    );

    appCache[appId] = app;

    return app;
  }

  componentDidCatch(error: object, errorInfo: object) {
    this.setState({ appError: { error, errorInfo } });
  }

  renderErrorPage() {
    const { appError } = this.state;

    return <Exception type="-1" {...appError} />;
  }

  render() {
    const { className, fallback, appId } = this.props;
    const { appError } = this.state;

    if (appError) {
      return this.renderErrorPage();
    }

    const App = this.loadApp();

    return (
      <div className={cn(className)}>
        <Suspense fallback={fallback || <Spin />}>
          <App appId={appId} />
        </Suspense>
      </div>
    );
  }
}

export default withRouter(AppContainer);
