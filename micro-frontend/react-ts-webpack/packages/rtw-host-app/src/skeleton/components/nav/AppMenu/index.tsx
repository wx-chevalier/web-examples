import { Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IMenu {
  key: string;
  title: string;
  path: string;
}

export interface IProps {
  menus: IMenu[];
  currentMenu?: IMenu;
}

export default class AppMenu extends React.PureComponent<IProps> {
  public render() {
    const { menus, currentMenu } = this.props;

    return (
      <Menu theme="dark" mode="inline" selectedKeys={[(currentMenu && currentMenu.key) as string]}>
        {menus.map(menuItem => (
          <Menu.Item key={menuItem.key}>
            <Link to={menuItem.path}>{menuItem.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
