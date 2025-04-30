
import React from "react";
import "./HeroSection.css"; // Import CSS for styles
import arvideo from "../../../assets/WebVideos/AR-Code-demo.mp4";
import arposter from "../../../assets/WebIMG/arcode-videoPoster.webp"
import qrnike from "../../../assets/WebIMG/qr-nike.webp";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero">
      <svg id="wave" viewBox="0 0 100 30" preserveAspectRatio="none">
        <path fill="#fff" opacity="0.5" d="M0 30 V15 Q25 5 50 15 T100 15 V30z"></path>
        <path fill="#fff" opacity="0.5" d="M0 30 V18 Q25 8 50 18 T100 18 V30z"></path>
        <path fill="#fff" opacity="0.5" d="M0 30 V21 Q25 11 50 21 T100 21 V30z"></path>
        <path fill="#fff" opacity="0.5" d="M0 30 V15 Q30 3 60 15 V30z"></path>
        <path fill="#fff" opacity="0.7" d="M0 30 V12 Q30 17 55 12 T100 11 V30z"></path>
        <path fill="#fff" d="M0 30 V14 Q30 19 55 14 T100 13 V30z"></path>
      </svg>
      <div className="container my-5">

        <div className="row promo d-flex align-items-center justify-content-center gap-5">
          {/* Left Column: iPhone with Video */}
          <div className="col-md-6 d-flex justify-content-center text-center">
            <div className="iphone-x">
              <div className="side">
                <div className="screen">
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    poster={arposter}
                  >
                    <source
                      src={arvideo}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
              {/* <div className="line"></div> */}
              <div className="volume-button"></div>
              <div className="power-button"></div>
            </div>
          </div>

          {/* Right Column: Text and QR Code */}
          <div className="col-md-5 text-center z-1">
            <h1
              className="font-weight-bold fw-bold ar-hero-heading"
              style={{ fontSize: "32px" }}>
              Augmented Reality Code
            </h1>
            <br />
            <div>
              <Link to="https://ar-code.com/mw3QkGasX" target="_blank" rel="noopener noreferrer">
                <img
                  src={qrnike}
                  width="260"
                  height="260"
                  alt="AR QR Code"
                  className="mainimage"
                />
              </Link>
            </div>
            <br />
            <h2 className="font-weight-bold fw-bold">No need for an app.</h2>
            {/* <p className="maindescription text-center web-font-size">
          It's an AR Code, a sort of barcode that holds the necessary information to generate an Augmented
          Reality 3D experience. This can easily perform action on various devices such as smartphones and{" "}
            <Link className="text-decoration-none" to="/blog">AR/VR headsets</Link>{" "}
            like the{" "}
            <Link className="text-decoration-none" to="/blog">
              Apple Vision Pro
            </Link>
            . So let's start creating, managing, and tracking your AR experiences. with our enhanced AR Codes. 
          </p> */}
            <p className="maindescription text-center web-font-size">
              It's an AR Code, a sort of barcode that holds the necessary information to generate an Augmented
              Reality 3D experience. This can easily perform action on various devices such as smartphones and AR/VR headsets like the Apple Vision Pro
              . So let's start creating, managing, and tracking your AR experiences. with our enhanced AR Codes.
            </p>
          </div>
        </div>
      </div>
      <hr className="hero-divider" />
    </section>
  );
};

export default HeroSection;


