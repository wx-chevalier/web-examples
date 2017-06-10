// @flow
import React, { Component } from "react";
import { Menu, Icon, Switch } from "antd";

const SubMenu = Menu.SubMenu;
// 子菜单标题
const SubMenuTitle = ({ title }) => (
  <span><Icon type="menu-fold" /><span>{title}</span></span>
);

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
          <SubMenu key="designpattern" title={<SubMenuTitle title="开发模式" />}>
            <Menu.Item key="/auth">权限认证</Menu.Item>
          </SubMenu>
          <SubMenu key="styleguide" title={<SubMenuTitle title="代码风格" />}>
            <Menu.Item key="/setState">setState</Menu.Item>
          </SubMenu>
          <SubMenu key="performance" title={<SubMenuTitle title="性能优化" />}>
            <Menu.Item key="/lazy">组件懒加载</Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    );
  }
}
