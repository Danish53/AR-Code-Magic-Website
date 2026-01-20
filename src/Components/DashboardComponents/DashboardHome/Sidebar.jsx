import React from "react";
import { AiOutlineQrcode, AiOutlineFile, AiOutlineStar, AiOutlineTool, AiOutlineLock } from "react-icons/ai";
import { FiCompass, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Import custom CSS for hover/active effects
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="d-flex flex-column p-3 bg-white shadow" style={{ height: "100%" }}>
      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column dashboardsb-links gap-2">
        <li>
          <Link
            to="/user"
            className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user") && !location.pathname.includes("/user/") ? "active" : ""
              }`}
          >
            <AiOutlineQrcode className="me-2 sidebar-icons" size={20} />
            <span className="d-none d-md-inline fw-bold ">Dashboard</span>
          </Link>
        </li>
        <li>
          {
            user?.user?.plan?.package_name !== "Trial" && user?.user?.role === "user" ? <Link
              to="/user/custom-pages"
              className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user/custom-pages") ? "active" : ""
                }`}
            >
              <AiOutlineFile className="me-2 sidebar-icons" size={20} />
              <span className="d-none d-md-inline fw-bold">Custom Pages</span>
            </Link> : <Link
              to="/user/team-work"
              className="nav-link navlink-custom sidebar-link d-flex align-items-center text-secondary disabled"
            >
              <AiOutlineFile className="me-2 sidebar-icons" size={20} />
              <span className="d-none d-md-inline fw-bold">Custom Pages</span> <AiOutlineLock className="ms-1" size={16} />
            </Link>
          }
        </li>
        <li>
          {
            user?.user?.plan?.package_name !== "Trial" && user?.user?.role === "user" ?
              <Link
                to="/user/tracking"
                className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user/tracking") ? "active" : ""
                  }`}
              >
                <FiCompass className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">Tracking</span>
              </Link> : <Link
                to="/user/team-work"
                className="nav-link navlink-custom sidebar-link d-flex align-items-center text-secondary disabled"
              >
                <FiCompass className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">Tracking</span> <AiOutlineLock className="ms-1" size={16} />
              </Link>
          }
        </li>
        {/* <li>
          <Link
            to="/user/ar-code-studio"
            className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user/ar-code-studio") ? "active" : ""
              }`}
          >
            <AiOutlineStar className="me-2 sidebar-icons" size={20} />
            <span className="d-none d-md-inline fw-bold">AR Code Magic Studio</span>
          </Link>
        </li> */}
        <li>
          {
            user?.user?.plan?.package_name !== "Trial" && user?.user?.role === "user" ?
              <Link
                to="/user/api-key"
                className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user/api-key") ? "active" : ""
                  }`}
              >
                <AiOutlineTool className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">API Key / Object Capture</span>
              </Link> :
              <Link
                to="/user/team-work"
                className="nav-link navlink-custom sidebar-link d-flex align-items-center text-secondary disabled"
              >
                <AiOutlineTool className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">API Key / Object Capture</span> <AiOutlineLock className="ms-1" size={16} />
              </Link>
          }
        </li>
        <li>
          {
            user?.user?.plan?.package_name !== "Trial" && user?.user?.role === "user" ?
              <Link
                to="/user/team-work"
                className={`nav-link navlink-custom sidebar-link d-flex align-items-center ${isActive("/user/team-work") ? "active" : ""
                  }`}
              >
                <FiUsers className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">Team Work</span>
              </Link> :
              <Link
                to="/user/team-work"
                className="nav-link navlink-custom sidebar-link d-flex align-items-center text-secondary disabled"
              >
                <FiUsers className="me-2 sidebar-icons" size={20} />
                <span className="d-none d-md-inline fw-bold">Team Work</span> <AiOutlineLock className="ms-1" size={16} />
              </Link>
          }
        </li>
      </ul>

      {/* Membership and STANDARD Links */}
      <div className="membership-section mt-4">
        <Link to="/user/membership" className="membership-link">
          Membership
        </Link>
        {
          user?.user?.role === "user" ?
            <Link to="pricing" className="standard-link ms-2 px-2">{user?.user?.plan?.package_name}</Link> : <Link className="standard-link ms-2 px-2">{user?.owner?.plan?.package_name}</Link>
        }

      </div>

      {/* Stats Section */}
      <div className="stats-section mt-3">
        <p className="mb-1">
          <strong>1/{
            user?.user?.role === "user" ? user?.user?.plan?.ar_codes : user?.owner?.plan?.ar_codes
          }</strong> AR Codes
        </p>
        <p className="mb-1">
          <strong>3/{
            user?.user?.role === "user" ? user?.user?.plan?.scans : user?.owner?.plan?.scans
          }</strong> Monthly scans
        </p>
        <p className="mb-1">
          <strong>0/{
            user?.user?.role === "user" ? user?.user?.plan?.pages : user?.owner?.plan?.pages
          }</strong> Custom Pages
        </p>
        <p className="mb-0">
          <strong>1/{
            user?.user?.role === "user" ? user?.user?.plan?.tracking : user?.owner?.plan?.tracking
          }</strong> Tracking
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
