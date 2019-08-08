```js
export default class MenuList extends Component {
    // ...
    componentDidMount() {
        // ...
        MenuStore.addModeChangeListener(this._onModeChange);
        MenuStore.addChangeListener(this._onChange);
        MenuStore.addSearchChangeListener(this._onSearchChange);
        MenuStore.addChangeOnePayListener(this._onOnePayChange);
        CartStore.addCartChangeListener(this._onCartChange);
        // ...
    }

    componentWillUnmount() {
        // ...
        MenuStore.removeModeChangeListener(this._onModeChange);
        MenuStore.removeSearchChangeListener(this._onSearchChange);
        MenuStore.removeChangeListener(this._onChange);
        MenuStore.removeOnePayChangeListener(this._onOnePayChange);
        CartStore.removeCartChangeListener(this._onCartChange);
        RetryStore.removeChangeListenerFailer(this._onChangeFailer);
        // ...
    }

    // ...
    _onOnePayChange = () => {
        this.setState({onePay: MenuStore.getOnePayData()});
    }

    _onModeChange = () => {
        this.setState({
            isSimpleMode: sessionInfo.getIsSimpleMode(),
            isSearchMode: MenuStore.getIsSearchMode()
        })
    };

    render() {
        // ...
        const {carts, isSearchMode} = this.state;
        let menuList = [];
        let tipView = null;
        if (isSearchMode) {
            menuList = this.state.searchMenuList
        } else {
            menuList = this.state.menuList
        }
        return (
          <div>
            <List menuList={menuList} isSearchMode={isSearchMode} carts={carts} isSimpleMode={isSimpleMode}/>
          </div>
        )
    }
}
```

```js
import mobx from mobx;
class MenuList extends Component {
    render() {
        // ...
        const isSearchMode = MenuStore.getIsSearchMode()
        const carts = CartStore.getAllCarts()

        let menuList = [];
        if (isSearchMode) {
            menuList = MenuStore.getSearchMenuList()
        } else {
            menuList = MenuStore.getMenuList()
        }
        return (
          <div>
            <List menuList={menuList} isSearchMode={isSearchMode} carts={carts} isSimpleMode={isSimpleMode}/>
          </div>
        )
    }
}
export default mobx.observer(MenuList)
```
