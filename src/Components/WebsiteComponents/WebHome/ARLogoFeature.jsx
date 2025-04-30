import React from "react";
import { Link } from "react-router-dom";
import "./ARLogoFeature.css";
const ARLogoFeature = () => {
  return (
    <div className="container pb-5">
      <center>
        {/* <span className="web-font-size"> Our {' '}
          <Link className="text-decoration-none"
            to="/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            AR Logo
          </Link>{" "}
          is available on our web interface. This feature allows users to{" "}
          <Link className="text-decoration-none"
            to="/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            create captivating 3D AR logos from SVG image files
          </Link>
          .  Later, this 3D logo can be easily accessible with AR Code Magic. Users can view
          their 3D logos on their smartphones and other electronic devices. There are also various tools provided
          by our site to preview the finished look of the 3D AR Logo.
        </span> */}
        <span className="web-font-size"> Our {' '}
          Our AR Logo is available on our web interface. This feature allows users to create captivating 3D AR logos from SVG image files. Later, this 3D logo can be easily accessible with AR Code Magic. Users can view their 3D logos on their smartphones and other electronic devices. There are also various tools provided by our site to preview the finished look of the 3D AR Logo.
        </span>
      </center>
      <div className="arlogomain text-center mt-4">
        <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
          <img
            src="https://ar-code.com/images/ar-logo-suzuki.webp"
            alt="AR Logo Suzuki"
            className="img-fluid imagemainlogo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default ARLogoFeature;
