import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          Can be Accessible on Multiple Devices
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          You can access AR Portals on multiple devices like Android, iOS, iPadOS, Meta HorizonOS, and Apple
          visionOS devices.
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
                By using AR Code Magic technology you can adjust AR Portals into your space with the Apple Vision Pro
                and the Meta Quest 3. AR Portal offers a unique level of augmented reality experience with detailed
                vision in AR/VR headsets.
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
                Direct QR code scanning with the Apple Vision Pro and the Meta Quest 3 will be possible with future OS
                updates. Meantime, use the “AR” button to access the AR Code experience.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              Craft AR Portals
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
            Track and watch engagement with detailed scan statistics of your AR Portal with AR Code Magic. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
