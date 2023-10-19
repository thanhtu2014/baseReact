import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

function GuestLayout() {
  return (
    <div className="guest-layout">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
