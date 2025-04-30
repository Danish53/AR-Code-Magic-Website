import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          3D modeling can be done without any efforts
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            AR Text is a user-friendly feature. Here you can experience the magic of turning your words into unique
            3D models.
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
                    You can start by typing a few words. Select colors and fonts according to your taste and instantly get a
                    3D preview of your text.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Your selected message or text will appear in augmented reality within a few seconds in the color and
                    font of your choice when you scan the AR/VR Code.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
            <span>
              This AR Text technology changes the whole process of interacting with words in a unique way. Whether
              it is for personal use, branding, or creating interactive content AR text transforms the interaction with
              words with captivating 3D styles
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
            These AR QR Codes are a user-friendly gateway for augmented reality.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
