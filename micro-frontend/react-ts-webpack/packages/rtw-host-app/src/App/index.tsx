import * as React from 'react';

export interface AppProps {}

export interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <div>App</div>;
  }
}
