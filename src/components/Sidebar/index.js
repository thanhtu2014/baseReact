/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import SiderMenu from '@/components/Sidebar/SiderMenu';

import './index.scss';

const { Sider } = Layout;

function Sidebar({ collapsed, setCollapsed, ...props }) {
  const { t } = useTranslation();
  const MenuList = [
    {
      id: '1',
      icon: 'dashboard-menu',
      name: t('sidebar.dashboard'),
      route: '/dashboard',
    },
    {
      id: '2',
      icon: 'reports-menu',
      name: t('sidebar.reports'),
      route: '/reports',
    },
    {
      id: '3',
      icon: 'contact-us-menu',
      name: t('sidebar.contact_us'),
      route: '/contact-us',
    },
  ];

  return (
    <Sider
      {...props}
      collapsible
      width={280}
      breakpoint="xl"
      className="sider-bar"
      collapsed={collapsed}
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sider-bar__logo">
        <img src="#" alt="sider-bar__logo" width="100%" height="100%" />
      </div>
      <SiderMenu menus={MenuList} />
    </Sider>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
