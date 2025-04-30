import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          AR Code Magic Object Capture for Museums
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          Revolutionize your collections and unlock the future of exhibitions.
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
                You can convert artifacts in museums into 3D models with our advanced AR Code  Magic Object Capture. This
                app will automatically generate an AR QR Code by following the guided 3D scanning process. Visitors can
                then scan this code (without needing an app) to explore your objects in augmented reality, thus
                reaching a broader audience.
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
                Generate AR Codes Magic and experience the displays come to life. Get people engaging and discovering like
                never before.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              3D scan your artwork
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
            Explore analytics to monitor user interaction and enhance your visitors' AR experience with a custommade link URL directly in your AR display, while creating your museum's AR QR Codes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
