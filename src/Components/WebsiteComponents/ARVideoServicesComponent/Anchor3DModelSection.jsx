import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Instant AR Videos, No Apps Needed
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            You can watch AR Videos instantly on any platform with AR Code technology. There is no need for any
            extra apps just scan the AR QR Code and enjoy.
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
                    AR Code technology allows you to view AR Videos on Android, iOS, iPadOS, and Meta Horizon OS
                    devices without requiring extra apps.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Just scan the AR QR Code and immerse yourself in the Augmented Reality Video experience.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
            <span>
              Experience thrilling, interactive video content with our AR Video, powered by low-powered SLAM
              technology through WebAR. AR Videos are great for businesses that would like to include Augmented
              Reality easily for advertising or education purposes.
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
            Enhance your world with AR QR Codes, bringing futuristic digital interactions to life.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
