// @flow
import React, { Component } from "react";
import { Menu, Icon, Switch } from "antd";
const SubMenu = Menu.SubMenu;

export default class Navigator extends Component {
  state = {
    current: ""
  };

  handleClick = (e: Event) => {
    const { history } = this.props;

    this.setState({
      current: e.key
    });

    history.push(e.key);
  };

  render() {
    const { history } = this.props;

    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 240 }}
          defaultOpenKeys={["designpattern", "styleguide", "performance"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="designpattern"
            title={<span><Icon type="smile-o" /><span>开发模式</span></span>}
          >
            <Menu.Item key="/auth">权限认证</Menu.Item>
          </SubMenu>
          <SubMenu
            key="styleguide"
            title={<span><Icon type="smile-o" /><span>代码风格</span></span>}
          >
            <Menu.Item key="/setState">setState</Menu.Item>
          </SubMenu>
          <SubMenu
            key="performance"
            title={<span><Icon type="smile-o" /><span>性能优化</span></span>}
          >
            <Menu.Item key="/lazy">组件懒加载</Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    );
  }
}
