// @flow

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

const Foo = asyncComponent(() =>
  System.import('./Foo').then(module => module.default)
);
const Bar = asyncComponent(() =>
  System.import('./Bar').then(module => module.default)
);

const App = () =>
  <BrowserRouter>
    <Link to="/foo">Foo</Link>
    <Link to="/bar">Bar</Link>

    <Match pattern="/foo" component={Foo} />
    <Match pattern="/bar" component={Bar} />
  </BrowserRouter>;

export default App;
