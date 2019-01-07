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

class AppContainer extends PureComponent<IProps> {
  defaultProps = {
    fallback: <Spin />
  };

  state = {
    appError: null
  };

  getAppComponent() {
    const { appLoader, appId, onAppendReducer } = this.props;

    return lazy(() =>
      appLoader().then(appModule => {
        if ('reducer' in appModule) {
          onAppendReducer({
            [appId]: appModule.reducer
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
    const { className, fallback, appId } = this.props;
    const { appError } = this.state;

    if (appError) {
      return this.renderErrorPage();
    }

    const AppComponent = this.getAppComponent();

    return (
      <div className={cn(className)}>
        <Suspense fallback={fallback || <Spin />}>
          <AppComponent appId={appId} />
        </Suspense>
      </div>
    );
  }
}

export default withRouter(AppContainer);
