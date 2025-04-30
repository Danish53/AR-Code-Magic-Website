import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Live remote Text data to AR
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            Live and customizable updates for AR Data, which would allow vital information to be displayed on top
            of the AR QR Codes.
          </span>
        </p>

        {/* Feature Section */}
        <div className=" mt-4">
          <div className="row align-items-center">
            {/* Left Column: Image */}
            <div className="col-md-7 mb-4 mb-lg-0 text-center">
              <Link to="#" className="feature-link">
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
                    The AR Data function has a wide range of applications, from smart cities to industrial settings.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Enhance equipment upkeep, expedite cargo monitoring, include residents in smart city projects, and
                    much more. Find out how AR is altering the rules in several industries.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
            <span>
              Your AR Data experiences can change as necessary thanks to safe editing tools and adjustable settings.
            </span>
          </p>

          {/* Call to Action Button */}
          <div className="text-center my-4">
            <Link to="/user/register" className="btn btn-custom btn-lg btn-success rounded-pill">
              Get Started Now
            </Link>
          </div>

          {/* Footer Text */}
          <div className="textmainS text-white text-center">
          AR QR Codes provide a seamless and user-friendly gateway to augmented reality.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
