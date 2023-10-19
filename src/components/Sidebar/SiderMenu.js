import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
// import { pathToRegexp } from 'path-to-regexp';

import { arrayToTree, queryAncestors } from '@/utils';
import iconMap from '@/utils/iconMap.jsx';
import { Link, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

function SiderMenu({
  menus,
}) {
  const location = useLocation();

  const generateMenus = data => data.map(item => {
    if (item.children) {
      return (
        <SubMenu
          key={item.id}
          title={
            <>
              {item.icon && iconMap[item.icon]}
              <span>{item.name}</span>
            </>
          }
        >
          {generateMenus(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id} >
        <Link to={item.route || '#'}>
          <span role="img" className="anticon anticon-bar-chart ant-menu-item-icon">
            {item.icon && iconMap[item.icon]}
          </span>
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  });

  // Generating tree-structured data for menu content.
  const menuTree = arrayToTree(menus, 'id', 'menuParentId');

  // Find a menu that matches the pathname.
  // const currentMenu = menus.find(
  //   _ => _.route && pathToRegexp(_.route).exec(location.pathname)
  // );

  const currentMenuPath = menus.find(
    _ => _.route && location.pathname.startsWith(_.route)
  );

  // Find the key that should be selected according to the current menu.
  const selectedKeys = currentMenuPath
    ? queryAncestors(menus, currentMenuPath, 'menuParentId').map(_ => _.id)
    : [];

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
    >
      {generateMenus(menuTree)}
    </Menu>
  );
};

SiderMenu.propTypes = {
  menus: PropTypes.array,
};

export default SiderMenu;
