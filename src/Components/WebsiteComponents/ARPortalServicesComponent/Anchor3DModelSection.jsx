import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          AR Virtual Tours No App needed Just Scan & Explore
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            Now users can explore virtual spaces just by scanning AR Code Magic via the AR Portal without using any
            app.
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
                    These AR Portal experiences are good for real estate businesses, restaurants, tourism, etc. Virtual tours
                    are likely to be easier and sufficient through a smartphone or AR headsets without going anywhere
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    To view a 360 preview of the place you have to simply scan the AR QR Code of your AR Portal
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
            <span>
              AR Portals are helpful in exploring captivating scenes of nature without going anywhere. This is an ideal
              feature for real estate, virtual tours, tourism, museum advertising, and for educational purposes.
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
          Making digital interactions more immersive and Enhancing your reality with AR QR Codes. 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
