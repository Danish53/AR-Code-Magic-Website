// import React from 'react';
// import './WebNavbar.css';
// import { Link } from 'react-router-dom';
// import logo from '../../../assets/logo/arlogo.png';

// function WebNavbar() {
//   const services = [
//     { name: '3D Files Upload', path: '/services/3d-files-upload' },
//     { name: 'Object Capture', path: '/services/object-capture' },
//     { name: 'AR Face', path: '/services/ar-face' },
//     { name: 'AR Logo', path: '/services/ar-logo' },
//     { name: 'AR Photo', path: '/services/ar-photo' },
//     { name: 'AR Portal', path: '/services/ar-portal' },
//     { name: 'AR Text', path: '/services/ar-text' },
//     { name: 'AR Video', path: '/services/ar-video' },
//     { name: 'AI Code', path: '/services/ai-code' },
//     { name: 'AR Data API', path: '/services/ar-data-api' },
//   ];

//   const navLinks = [
//     { name: 'Pricing', path: '/pricing' },
//     { name: 'Blog', path: '/blog' },
//     { name: 'FAQ', path: 'faq' },
//     { name: 'Log in', path: '/user/login' },
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-2">
//       <div className="container custom-container">
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
//             {/* Services Dropdown */}
//             <li className="nav-item dropdown">
//               <Link
//                 className="nav-link dropdown-toggle fw-bold text-uppercase"
//                 to="#"
//                 id="servicesDropdown"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Services
//               </Link>
//               <ul
//                 className="dropdown-menu border-0 shadow-sm"
//                 aria-labelledby="servicesDropdown"
//                 style={{ minWidth: '200px' }}
//               >
//                 {/* {services.map((service, index) => (
//                   <li key={index}>
//                     <Link className="dropdown-item py-2" to="/services/:slug">
//                       {service}
//                     </Link>
//                   </li>
//                 ))} */}
//                 {services.map((service, index) => (
//                   <li key={index}>
//                     <Link className="dropdown-item py-2" to={service.path}>
//                       {service.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>

//             {/* Other Nav Links */}
//             {navLinks.map((link, index) => (
//               <li className="nav-item" key={index}>
//                 <Link className="nav-link fw-bold text-uppercase" to={link.path}>
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             {/* Get Started Button */}
//             <li className="nav-item">
//               <Link
//                 className="btn fw-bold text-white px-4 py-2 text-uppercase btn-success nav-get-started"
//                 to="/user/register"
//               >
//                 Get Started
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default WebNavbar;









import React, { useState, useEffect } from 'react';
import './WebNavbar.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/arlogo.png';

function WebNavbar() {
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

  // If switching to desktop, close the mobile nav
  useEffect(() => {
    if (isDesktop) {
      setIsNavOpen(false);
    }
  }, [isDesktop]);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  const services = [
    { name: '3D Files Upload', path: '/services/3d-files-upload' },
    { name: 'Object Capture', path: '/services/object-capture' },
    { name: 'AR Face', path: '/services/ar-face' },
    { name: 'AR Logo', path: '/services/ar-logo' },
    { name: 'AR Photo', path: '/services/ar-photo' },
    { name: 'AR Portal', path: '/services/ar-portal' },
    { name: 'AR Text', path: '/services/ar-text' },
    { name: 'AR Video', path: '/services/ar-video' },
    { name: 'AI Code', path: '/services/ai-code' },
    { name: 'AR Data API', path: '/services/ar-data-api' },
  ];

  const navLinks = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Log in', path: '/user/login' },
  ];

  // Compute collapse classes:
  // On desktop, always show the navbar (with Bootstrap’s "show").
  // On mobile, apply our custom fade classes.
  const collapseClasses = isDesktop
    ? 'collapse navbar-collapse justify-content-end show'
    : `collapse navbar-collapse justify-content-end ${isNavOpen ? 'fade-in' : 'fade-out'}`;

  return (
    <nav className="navbar webNav navbar-expand-lg navbar-light bg-white px-4 py-2">
      <div className="container custom-container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
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

        {/* Navbar Links with Smooth Transition */}
        <div className={collapseClasses} id="navbarNav">
          <ul className="navbar-nav gap-4 align-items-center">
            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-bold text-uppercase"
                to="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </Link>
              <ul
                className="dropdown-menu border-0 shadow-sm"
                aria-labelledby="servicesDropdown"
                style={{ minWidth: '200px' }}
              >
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item py-2"
                      to={service.path}
                      onClick={closeNavbar}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Other Nav Links */}
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

            {/* Get Started Button */}
            <li className="nav-item">
              <Link
                className="btn fw-bold text-white px-4 py-2 text-uppercase btn-success nav-get-started"
                to="/user"
                onClick={closeNavbar}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default WebNavbar;
