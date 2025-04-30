import React from "react";
// import "./Simplified3DModelUploading.css";
import { Link } from "react-router-dom";

const Simplified3DModelUploading = () => {
  // Data Array
  const uploadData = [
    {
      title: "Generate captivating photogrammetry and AR QR Codes effortlessly",
      description: [
        "With the free AR Code Magic Object Capture software, which was created to simplify photogrammetry, see how easy it is to create 3D models. This program, which is specifically designed for iPhone Pro and iPad Pro users, allows you to utilize augmented reality to bring 3D scans of items to life. ",
        "Our special AR QR Codes provide an interactive display of your produced 3D models in augmented surroundings, bridging the gap between digital material and the physical world. ",
      ],
      link: "/user/register",
      image: "https://ar-code.com/images/interface-upload-3d-models.webp",
      alt: "3D Model Uploading AR Code Magic",
    },
  ];

  return (
    <div className="container pt-5">
      {/* Section Heading */}
      <h2 className="fw-bold text-center text-capitalize text-primary-color mb-4">
        Generate captivating photogrammetry and AR QR Codes effortlessly
      </h2>

      {/* Description Text */}
      <center>
        <span className="web-font-size">
          Users can easily share their photogrammetric scans with custom-made AR Code Magics for a lifetime AR
          viewing experience on several devices such as Android, iOS, iPadOS, Meta Horizon OS, and Apple
          visionOS devices.
        </span>
      </center>

      {/* Feature Section */}
      <div className="feature mt-5">
        {uploadData.map((item, index) => (
          <div className="row align-items-center mb-5" key={index}>
            {/* Image Section */}
            <div className="col-md-7 mb-5 mb-lg-0 text-center">
              <img
                src={item.image}
                alt={item.alt}
                className="img-fluid imagemain rounded shadow"
              //   style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Info Section */}
            <div className="col-md-5">
              <div className="actionbar">
                <center>
                  {/* <h3 className="mb-3">
                  <strong>
                    <Link to={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </Link>
                  </strong>
                </h3> */}
                  {item.description.map((desc, i) => (
                    <span className="web-font-size d-block mb-2" key={i}>
                      {desc}
                    </span>
                  ))}
                </center>
              </div>
              <div className="text-center my-4">
                <Link
                  to="/user/register"
                  className="btn btn-success btn-custom btn-lg rounded-pill"
                >
                  Get Started
                </Link>
                <p className="mt-3 text-secondary">
                Start creating your AR experiences with our advanced AR Code Magic platform. 
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      {/* <div className="text-center my-4">
      <Link
        to="/user/register"
        className="btn btn-success btn-lg rounded-pill"
      >
        Get Started
      </Link>
      <p className="mt-3 text-secondary">
        Join the AR revolution with AR Code Magic.
      </p>
    </div> */}
    </div>
  );
};

export default Simplified3DModelUploading;
