import React from "react";
import { Link } from "react-router-dom";
import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
        <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center text-white fw-bold mb-4">
        Anchor Your 3D Model Anywhere
      </h2>

      {/* Description Text */}
      <p className="text-center text-white web-font-size">
        <span className="textmaincenter">
          AR Codes seamlessly blend digital and physical spaces, allowing you to deploy augmented reality experiences simply by scanning a
          <Link to="/blog/qr-code" className="text-decoration-none"> QR Code</Link>.
        </span>
      </p>

      {/* Feature Section */}
      <div className=" mt-4">
        <div className="row align-items-center">
          {/* Left Column: Image */}
          <div className="col-md-7 mb-4 mb-lg-0 text-center">
            <Link to="/geS2L5URK" className="feature-link">
              <img
                src="https://ar-code.com/images/ar-code-piston.webp"
                className="img-fluid rounded shadow feature-img"
                alt="AR QR Code 3D model"
              />
            </Link>
          </div>

          {/* Right Column: Information */}
          <div className="col-md-5">
            <div className="text-center">
              <p className="web-font-size text-white">
                <span>
                  Transform the environments of your prospects, customers, or employees with {" "}  
                  <Link
                    to="/blog/boost-user-engagement-with-custom-links-on-ar-code"
                    className="text-decoration-none"
                  >
                    AR renders of your 3D models for optimal interaction and engagement
                  </Link>
                  .
                </span>
              </p>
              <p className="web-font-size text-white">
                <span>
                  Simplify the 3D visualization of your products or marketing materials by using an AR QR Code scan to access AR experiences on any smartphone or AR/VR headset.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center my-4">
          <Link to="/user/register" className="btn btn-custom btn-lg btn-success rounded-pill">
            Get Started Now
          </Link>
        </div>

        {/* Footer Text */}
        <div className="textmainS text-white text-center">
          Start enriching your digital landscape by uploading your 3D models directly into {" "}
          <Link to="/blog/what-is-the-difference-between-a-qr-code-and-an-ar-code" className="text-decoration-none">
            AR Codes
          </Link>
          , and bring immersive augmented reality experiences to your audience today.
        </div>
      </div>
    </div>
    </div>
  );
};

export default Anchor3DModelSection;
