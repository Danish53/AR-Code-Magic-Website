import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Improved Engagement and Interaction with AR
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            Simply, upload your logo/image, generate an AR Face filter in seconds, and enjoy your tailor-made AR
            Filter experience to enhance branding efforts, engage sports club fans, or promote company events.
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
                    Raise your brand engagement to the next level with a simple scan of an AR QR Code. Make your logo
                    come alive on user’s faces across any device, anywhere.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Our AR Face Filters are created without any app and work universally on smartphones via a web
                    browser. They make use easier and more accessible.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="web-font-size text-center mt-4 text-white">
            <span>
              Integrate your digital branding with real-life interactions and expand your reach without needing
              specialized apps.
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
          Create your own personalized AR face filters today!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
