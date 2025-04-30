// import React from "react";
// import { BiWorld } from "react-icons/bi"; // React Icon for translator

// function Footer() {
//   return (
//     <footer className="bg-light py-4 mt-5 shadow-sm">
//       <div className="container text-center">
//         {/* Footer Links */}
//         <ul className="list-inline mb-3">
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-decoration-none text-dark">
//               Terms & Conditions
//             </a>
//           </li>
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-decoration-none text-dark">
//               Privacy Policy
//             </a>
//           </li>
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-decoration-none text-dark">
//               FAQ
//             </a>
//           </li>
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-decoration-none text-dark">
//               Blog
//             </a>
//           </li>
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-decoration-none text-dark">
//               Contact
//             </a>
//           </li>
//           {/* Translator Icon */}
//           <li className="list-inline-item mx-3">
//             <a href="#" className="text-dark">
//               <BiWorld size={24} /> {/* Translator icon */}
//             </a>
//           </li>
//         </ul>

//         {/* Copyright Text */}
//         <p className="text-muted mb-0">
//           &copy; 2024 AR Code Magic. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
  const languages = [
    'English', '中文', 'Čeština', 'Dansk', 'Deutsch', 'Español', 'Suomi', 'Français',
    'हिन्दी', 'Hrvatski', 'Magyar', 'Indonesia', 'Italiano', '日本語', '한국어', 
    'Melayu', 'Norsk', 'Nederlands', 'Polski', 'Português', 'Română', 'Русский', 
    'Svenska', 'ไทย', 'Türkçe', '台灣', 'Tiếng Việt'
  ];

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Footer Links */}
          <div className="col-md-6">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/terms-conditions" className="text-white text-decoration-none">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
              <li><Link to="/blog" className="text-white text-decoration-none">Blog</Link></li>
              <li><Link to="/contact-us" className="text-white text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Footer Languages */}
          <div className="col-md-6">
            <h5 className="fw-bold mb-3">Languages</h5>
            <ul className="list-unstyled d-flex flex-wrap">
              {languages.map((language, index) => (
                <li key={index} className="me-3 mb-2">
                  <a href="#" className="text-white text-decoration-none">{language}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="mb-0">
              2025 &copy; AR Code Magic, Augmented Reality Code by AR Code Magic LLC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
