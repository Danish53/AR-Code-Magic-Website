import React from "react";
import { Link } from "react-router-dom";
import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          You May Anchor Your 3D Model Anywhere
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          {/* <span className="textmaincenter">
            AR Code Magics will perfectly integrate the digital and physical space so that you can deliver an augmented
            reality experience simply by scanning a
            <Link to="/blog" className="text-decoration-none"> QR Code</Link>.
          </span> */}
          <span className="textmaincenter">
            AR Code Magics will perfectly integrate the digital and physical space so that you can deliver an augmented reality experience simply by scanning a QR Code.
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
                  {/* <span>
                    Now you can maximize the interaction of your clients, and employees with {" "}
                    <Link
                      to="/blog"
                      className="text-decoration-none"
                    >
                      AR rendering of your 3D Models
                    </Link>
                    . Also, you can change the overall environment of your surroundings through these rendered 3D
                    Models.
                  </span> */}
                  <span>

                    Now you can maximize the interaction of your clients, and employees with AR rendering of your 3D Models. Also, you can change the overall environment of your surroundings through these rendered 3D Models.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    You can clearly view your items and other marketing materials in three dimensions by using an AR/QR
                    Code scan for AR experience on your smartphones and AR/VR headset.
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
          {/* <div className="textmainS text-white text-center">
            By immediately uploading your 3D models into {" "}
            <Link to="/blog" className="text-decoration-none">
              AR Code Magics
            </Link>
            , you can enhance your digital environment and
            provide your audience with engaging AR experiences.
          </div> */}
          <div className="textmainS text-white text-center">
            By immediately uploading your 3D models into AR Code Magics, you can enhance your digital environment and provide your audience with engaging AR experiences.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
