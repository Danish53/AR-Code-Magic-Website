import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          Customize and Track Your AR Experiences
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          AR Data is a unique way of engagement in our digital-physical world.
        </p>

        {/* Feature Section */}
        <div className="feature">
          <div className="row mb-4">
            {/* Video Section */}
            <div className="col-md-6 text-center">
              <div className="div-round overflow-hidden">
                <iframe
                  className="iframe-round rounded"
                  width="100%"
                  // height="315"
                  height="400"
                  src="https://www.youtube.com/embed/OYI3BVM30AQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Info Section */}
            <div className="col-md-6 text-white">
              <p className="web-font-size text-white text-center mb-3">
                Simply, you can adjust the font, size, text, background, and color of your product to match your brand
                and theme seamlessly.
              </p>
              <div className="text-center">
                <Link
                  to="#"
                  // target="_blank"
                  className="text-decoration-none"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://ar-code.com/images/ar-code-woman.webp"
                    alt="AR Code 3D model industrial"
                    className="img-fluid imagemainlogo rounded shadow"
                  />
                </Link>
              </div>
              <p className="web-font-size text-center mt-3">
                You can boost operational efficiency and user interaction by displaying the already generated AR QR
                Code anywhere.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              Craft AR Codes
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
            Available for premium accounts, our tracking feature offers insights into user interactions with your AR Codes, helping you optimize strategies and content effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
