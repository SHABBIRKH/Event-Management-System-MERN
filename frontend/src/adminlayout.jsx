import { Outlet } from 'react-router-dom';
import React from 'react';
import AdminNav from './a/adminNav';

export default function Layout() {
  return (
    <>
      <div className="container-scroller bg-dark">
    <AdminNav></AdminNav>
    <Outlet />
    </div>
    </>
  )
}
