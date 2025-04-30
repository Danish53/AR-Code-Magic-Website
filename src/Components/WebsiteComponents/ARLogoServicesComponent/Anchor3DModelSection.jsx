import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Creating 3D AR logos instantly
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            In an era where an Augmented Reality presence forms the backbone, AR Logo is groundbreaking in the
            way it changes everything about the way brands will interact with their audience, through an AR QR
            code.
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
                    Forget the complicated procedures and long hours of work to create 3D content. With AR Logo, you can
                    transform your SVG image files into fantastic 3D logos in under 10 seconds.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Seamless integration will set you apart from your competition while taking your marketing and branding
                    game to a whole new level.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center web-font-size text-white">
            <span>
              Creating a 3D AR Logo using AR Code Magic requires no expertise in any technical field because our userfriendly platform is designed to be used by anyone with no experience in technology or design matters.
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
            Start creating your AR QR Codes today and join the brands that already are part of our AR Code Magic family.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
