import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Get the instant 3D modeling on iPhone Pro & iPad Pro
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            AR Code Magic Object Capture is an application that allows 3D scanning. It bridges reality and digital worlds,
            offering this tool to everyone from the simplest user to a perfectionist creating lifelike 3D models
            effortlessly
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
                    The app streamlines capturing processes. The app will tell you which angles to take images for an ideal
                    3D model. It's easy 3D modeling and makes your objects come to life in AR.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Share your 3D scans in AR with instant QR code generation. Your creations are now ready to be explored
                    by anyone, anywhere.
                  </span>
                </p>
             
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
                  <span>
                    AR Code Magic Object Capture is an innovative way of 3D modeling and instant display of your creations in
                    Augmented Reality.
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
       Make everyday interactions more immersive with our enhanced AR QR Codes. 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
