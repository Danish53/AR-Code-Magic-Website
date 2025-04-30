import React from 'react';
// import DashboardNavbar from '../../Components/DashboardComponents/DashboardHome/DashboardNavbar'
import Sidebar from '../../Components/DashboardComponents/DashboardHome/Sidebar';
import { Outlet } from "react-router-dom"; // For rendering child routes
function DashboardHomePage() {
  return (
    <>
    {/* <DashboardNavbar/> */}
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section */}
        <div className="col-lg-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div className="col-lg-10">
          <div className="py-4">
          <Outlet /> {/* This will render the child components based on the route */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default DashboardHomePage;
