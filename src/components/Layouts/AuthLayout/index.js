import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { useAuth } from '@/hooks';
import Sidebar from '@/components/Sidebar';
import HeaderComponent from '@/components/Header';

import './index.scss';
import { ROUTES } from '@/constants';

function AuthLayout() {
  const { isAuth } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="auth-layout">
      {!isAuth &&
        <Navigate
          to={{
            pathname: ROUTES.LOGIN_PATH,
          }}
        />}
      {isAuth &&
        <Layout hasSider>
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <Layout className="site-layout">
            <HeaderComponent />
            <div className="main-content">
              <Outlet />
            </div>
          </Layout>
        </Layout>
      }
    </div>
  );
}

export default AuthLayout;
