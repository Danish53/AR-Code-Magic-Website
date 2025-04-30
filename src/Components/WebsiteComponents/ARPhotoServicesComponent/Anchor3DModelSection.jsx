import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          Discover your creativity with AR Photos
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            Now, it is easier to make a 3D AR photo. Whether art paintings, personal snapshots, documents, or
            restaurant menus, our AR Photo tool offers endless opportunities to transform images into augmented
            reality experiences.
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
                    Our high-performance 3D processing server automatically takes care of the heavy lifting and generates
                    and converts your.jpg or.png images into visually striking 3D models for rendering AR.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    The result: A photo experience that leaps off your screen and into the real world, displayed when your
                    AR QR Code is scanned.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
                  <span>
                  AR Photo transforms images into interactive experiences with the digital and the real. Unlocking this
                  integration is our innovative future, the AR Code Magic. 
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
          AR QR Codes act as an accessible and versatile entry point to the augmented reality realm. 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
