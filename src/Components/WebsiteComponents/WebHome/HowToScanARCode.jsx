import React from "react";
import "./HowToScanARCode.css";
import { Link } from "react-router-dom";
const HowToScanARCode = () => {
  return (
    <div className="primary-light">
      <div className="container py-5">
        <h2 className="text-center fw-bold">
          {/* <Link
            to="/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <u>How to Scan an AR Code Magic?</u>
          </Link> */}
          
            <u className="text-white text-decoration-none">How to Scan an AR Code Magic?</u>
        </h2>
        <br />
        <p className="text-center text-white web-font-size">
          <strong>
            An AR Code Magic is built to be universally rendered, without any app on all mobile devices including AR/VR
            headsets.
          </strong>{" "}
          Immersive AR rendering is also supported on iOS, Android OS, visionOS, and Meta Horizon OS.
          Also, older Android devices will still get access to immersive WebAR because of our low-power SLAM
          rendering technology. Furthermore, AR Code Magics supports advanced AR and AI capabilities through our
          solutions, such as AR Face Filters and AI Codes, which improve AR experiences on a wide range of
          compatible smartphone devices.
        </p>
        <br />
        <p className="text-center">
          <Link
            to="/user/register"
            className="btn btn-custom btn-lg btn-success rounded-pill"
            rel="noopener noreferrer"
          >
            Get Started
          </Link>
        </p>
        <div className="text-center mt-4">
          <p className="text-white">
          Let’s start creating, editing, managing, and monitoring your AR experiences with our enhanced features. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToScanARCode;
