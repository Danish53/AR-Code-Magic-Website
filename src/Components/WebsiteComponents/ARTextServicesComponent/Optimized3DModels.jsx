import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          AR Text Compatible Devices & Options
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
        Experience the full potential of AR Texts across Android, iOS, iPadOS, Meta Horizon OS, and Apple visionOS.
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
                Converting your text into 3D AR is simple. You only have to type your message and choose the font and
                its color. You have provided more than 155 fonts. Thus you can instantly see a 3D preview of your AR
                words.
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
                Join the AR Code technology right now and start experiencing your environment of augmented reality
                with AR Code Magic.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              Craft AR Texts
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
          Track your AR experiences, boost user engagement, and analyze AR Text usage with detailed scan statistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
