// import React from 'react';
// import './DashboardNavbar.css';
// import logo from '../../../assets/logo/arlogo.png';
// import { FaCog, FaUserFriends, FaCogs, FaSignOutAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// function DashboardNavbar() {
//   const navLinks = [
//     { name: 'Dashboard', path: '/user' },
//     { name: 'Blog', path: '/blog' },
//     { name: 'FAQ', path: '/faq' },
//   ];

//   const settingsDropdown = [
//     { name: 'Membership', path: '/user/membership', icon: <FaUserFriends className="me-2" size={18} /> },
//     { name: 'Settings', path: '/user/settings', icon: <FaCogs className="me-2" size={18} /> },
//     { name: 'Logout', path: '/user/login', icon: <FaSignOutAlt className="me-2" size={18} />, className: 'text-danger fw-bold' },
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white px-4">
//       <div className="container">
//         {/* Logo */}
//         <Link className="navbar-brand fw-bold" to="/">
//           <img src={logo} className="logo" alt="AR Code Magic" />
//         </Link>

//         {/* Toggle Button for Mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav gap-4 align-items-center">
//             {/* Navigation Links */}
//             {navLinks.map((link, index) => (
//               <li className="nav-item" key={index}>
//                 <Link className="nav-link fw-bold text-uppercase" to={link.path}>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             {/* Settings Dropdown */}
//             <li className="nav-item dropdown">
//               <Link
//                 className="nav-link dropdown-toggle d-flex align-items-center"
//                 to="/"
//                 id="settingsDropdown"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <FaCog size={24}/>
//               </Link>
//               <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="settingsDropdown">
//                 {settingsDropdown.map((item, index) => (
//                   <li key={index}>
//                     {item.name === 'Logout' ? <hr className="dropdown-divider" /> : null}
//                     <Link className={`dropdown-item ${item.className || ''}`} to={item.path}>
//                       {item.icon} {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default DashboardNavbar;







// import React, { useState } from 'react';
// import './DashboardNavbar.css';
// import logo from '../../../assets/logo/arlogo.png';
// import { FaCog, FaUserFriends, FaCogs, FaSignOutAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// function DashboardNavbar() {
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   const navLinks = [
//     { name: 'Dashboard', path: '/user' },
//     { name: 'Blog', path: '/blog' },
//     { name: 'FAQ', path: '/faq' },
//   ];

//   const settingsDropdown = [
//     { name: 'Membership', path: '/user/membership', icon: <FaUserFriends className="me-2" size={18} /> },
//     { name: 'Settings', path: '/user/settings', icon: <FaCogs className="me-2" size={18} /> },
//     { name: 'Logout', path: '/user/login', icon: <FaSignOutAlt className="me-2" size={18} />, className: 'text-danger fw-bold' },
//   ];

//   // Toggle Navbar Function
//   const toggleNavbar = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   // Close Navbar when clicking a link
//   const closeNavbar = () => {
//     setIsNavOpen(false);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white px-4">
//       <div className="container">
//         {/* Logo */}
//         <Link className="navbar-brand fw-bold" to="/">
//           <img src={logo} className="logo" alt="AR Code Magic" />
//         </Link>

//         {/* Toggle Button for Mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleNavbar}
//           aria-controls="navbarNav"
//           aria-expanded={isNavOpen}
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links with Smooth Transition */}
//         <div className={`navbar-collapse ${isNavOpen ? 'show fade-in' : 'fade-out'}`} id="navbarNav">
//           <ul className="navbar-nav gap-4 align-items-center">
//             {navLinks.map((link, index) => (
//               <li className="nav-item" key={index}>
//                 <Link className="nav-link fw-bold text-uppercase" to={link.path} onClick={closeNavbar}>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             {/* Settings Dropdown */}
//             <li className="nav-item dropdown">
//               <Link
//                 className="nav-link dropdown-toggle d-flex align-items-center"
//                 to="/"
//                 id="settingsDropdown"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <FaCog size={24}/>
//               </Link>
//               <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="settingsDropdown">
//                 {settingsDropdown.map((item, index) => (
//                   <li key={index}>
//                     {item.name === 'Logout' ? <hr className="dropdown-divider" /> : null}
//                     <Link className={`dropdown-item ${item.className || ''}`} to={item.path} onClick={closeNavbar}>
//                       {item.icon} {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default DashboardNavbar;






import React, { useState, useEffect } from 'react';
import './DashboardNavbar.css';
import logo from '../../../assets/logo/arlogo.png';
import { FaCog, FaUserFriends, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function DashboardNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  // Update isDesktop state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the mobile nav when switching to desktop view
  useEffect(() => {
    if (isDesktop) {
      setIsNavOpen(false);
    }
  }, [isDesktop]);

  const navLinks = [
    { name: 'Dashboard', path: '/user' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  const settingsDropdown = [
    {
      name: 'Membership',
      path: '/user/membership',
      icon: <FaUserFriends className="me-2" size={18} />,
    },
    {
      name: 'Settings',
      path: '/user/settings',
      icon: <FaCogs className="me-2" size={18} />,
    },
    {
      name: 'Logout',
      path: '/user/login',
      icon: <FaSignOutAlt className="me-2" size={18} />,
      className: 'text-danger fw-bold',
    },
  ];

  // Toggle mobile navbar
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close mobile navbar on link click
  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  // Compute collapse classes:
  // On desktop, always show the collapse (adding Bootstrap's "show").
  // On mobile, add fade-in/fade-out classes based on isNavOpen.
  const collapseClasses =
    isDesktop
      ? 'collapse navbar-collapse justify-content-end show'
      : `collapse navbar-collapse justify-content-end ${isNavOpen ? 'show fade-in' : 'fade-out'}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img src={logo} className="logo" alt="AR Code Magic" />
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links with conditional fade classes */}
        <div className={collapseClasses} id="navbarNav">
          <ul className="navbar-nav gap-4 align-items-center">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link fw-bold text-uppercase"
                  to={link.path}
                  onClick={closeNavbar}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Settings Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle d-flex align-items-center"
                to="#"
                id="settingsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaCog size={24} />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="settingsDropdown">
                {settingsDropdown.map((item, index) => (
                  <li key={index}>
                    {item.name === 'Logout' ? <hr className="dropdown-divider" /> : null}
                    <Link
                      className={`dropdown-item ${item.className || ''}`}
                      to={item.path}
                      onClick={closeNavbar}
                    >
                      {item.icon} {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
