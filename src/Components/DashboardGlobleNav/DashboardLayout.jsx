import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardNavbar from '../DashboardComponents/DashboardHome/DashboardNavbar';

function DashboardLayout() {
  const location = useLocation();

  // Define routes where the navbar should not be displayed
  const noNavbarRoutes = ['/user/login', '/user/register'];

  // Check if the current path matches any of the noNavbarRoutes
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <DashboardNavbar />}
      <Outlet /> {/* Render child routes */}
    </>
  );
}

export default DashboardLayout;
