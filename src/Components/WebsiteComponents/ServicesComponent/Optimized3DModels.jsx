import React from "react";
import "./Optimized3DModels.css";
import { Link } from "react-router-dom";

const Optimized3DModels = () => {
  return (
   <div className="bg-primary-light">
     <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-white mb-4">
        Optimizing 3D Models for AR Across Multiple Devices
      </h2>

      {/* Description */}
      <p className="text-center text-white web-font-size mb-4">
        We specialize in accommodating a wide array of 3D file formats and
        provide dedicated support for optimizing your models for AR rendering
        across multiple devices.
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
              AR Codes are universally accessible and can be opened by default
              on devices running Android, iOS, iPadOS,{" "}
              <Link
                to="https://ar-code.com/blog/ar-videos-on-the-meta-quest-3-with-ar-code-a-new-dimension-of-immersive-advertising"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                Meta Horizon OS
              </Link>
              , and{" "}
              <Link
                to="https://ar-code.com/blog/ar-codes-are-automatically-compatible-with-the-apple-vision-pro-and-its-visionos"
                target="_blank"
                 className="text-decoration-none"
                rel="noopener noreferrer"
              >
                Apple visionOS
              </Link>
              . Whether you own an iPhone, an Apple Vision Pro, or a Google
              Pixel Android phone, you can now seamlessly showcase your 3D
              models in augmented reality.
            </p>
            <div className="text-center">
              <Link
                to="https://ar-code.com/0tXMaqYSG"
                target="_blank"
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
              AR Code's future-proof SaaS ensures compatibility with emerging AR
              devices from leading tech companies, promising that experiences
              created today remain engaging and relevant into the future.
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
          Gain insights into how your audience interacts with your 3D models in
          AR through our platform's{" "}
          <Link
            to="https://ar-code.com/blog/how-to-track-and-retarget-users-from-your-ar-qr-code-experiences"
            target="_blank"
             className="text-decoration-none"
            rel="noopener noreferrer"
          >
            statistics and tracking feature
          </Link>
          , and enhance engagement using our{" "}
          <Link
            to="https://ar-code.com/blog/boost-user-engagement-with-custom-links-on-ar-code"
            target="_blank"
             className="text-decoration-none"
            rel="noopener noreferrer"
          >
            custom links feature
          </Link>
          .
        </p>
      </div>
    </div>
   </div>
  );
};

export default Optimized3DModels;
