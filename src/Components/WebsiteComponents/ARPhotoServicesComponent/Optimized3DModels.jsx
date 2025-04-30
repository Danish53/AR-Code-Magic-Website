import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          AR Photos can be Accessible on multiple devices
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          AR Photos can be created with AR Code Magic and displayed on various devices such as iOS, iPadOS,
          Meta Horizon OS, and Apple visionOS devices, just with a simple scan of an AR QR Code without using
          any app.
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
                Simply, you can start by choosing your .JPG or .PNG photo format. Decide borders and the colours of the
                frames.
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
                When you are satisfied with the preview of your AR Photo you can create the AR Code with a click to
                display it in AR.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
             Create AR Photos
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
          Once your AR Code Magic is created, you can easily track its scanners and access scan statistics on the
          platform. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
