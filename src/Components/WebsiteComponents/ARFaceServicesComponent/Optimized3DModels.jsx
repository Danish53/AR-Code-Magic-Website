import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          Optimization of 3D Models for AR across Multi-Devices
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          We specialize in accommodating a wide array of 3D file formats and provide dedicated support to
          optimize your models for AR rendering across a variety of devices.
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
                AR Codes are universally accessible; they can be opened as a default on devices run by Android, iOS,
                iPadOS, {" "}
                <Link
                  to="/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  Meta Horizon OS
                </Link>
                , and{" "}
                <Link
                  to="/blog"
                  target="_blank"
                  className="text-decoration-none"
                  rel="noopener noreferrer"
                >
                  Apple visionOS
                </Link>
                . Whether you have an iPhone, an Apple Vision Pro, or a
                Google Pixel Android phone, you can now easily display your 3D models in augmented reality.
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
                Henceforth, AR Code's forward-coming SaaS ensures AR-device support from future AR releases of
                leading tech companies will maintain the engagement and validity into the future for experiences
                conceived of today.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              Generate Your AR Experiences
            </Link>
          </div>
         
          {/* Additional Info */}
          <p className="text-center text-white mt-4">
          you can learn more about how users can connect with your 3D Models to AR functionality using our
          platform through tracking statistics, and{" "}
            <Link
              to="/blog"
              target="_blank"
              className="text-decoration-none"
              rel="noopener noreferrer"
            >
              unique links
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
