import React from "react";
// import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center fw-bold text-white mb-4">
          Elevate Your Brand on Multiple Devices with AR Logo
        </h2>

        {/* Description */}
        <p className="text-center text-white web-font-size mb-4">
          Users can Transform the brand's identity and engagement strategy through several devices such as
          smartphones and AR headsets like the Meta Quest 3 and the Apple Vision Pro.
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
                AR Logo feature enhances your brand identity and you can get the viewer's attention with these
                interactive experiences. you can also differentiate your brand on different devices.
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
                    alt="AR Code Magic 3D model industrial"
                    className="img-fluid imagemainlogo rounded shadow"
                  />
                </Link>
              </div>
              <p className="web-font-size text-center mt-3">
                The application of AR Logo means an enhanced presence of your brand is not restricted to any single
                platform or medium. From business cards and product packaging, across a myriad of other digital
                channels, your augmented reality logo makes sure it is differentiated and remembered by viewers.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center my-4">
            <Link
              to="https://ar-code.com/user/register"
              className="btn btn-success btn-custom btn-lg rounded-pill"
            >
              Craft AR Logos
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-center text-white mt-4">
            Understanding your audience's engagement with your AR Logo is possible with our platform's statistics
            and tracking feature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Optimized3DModels;
