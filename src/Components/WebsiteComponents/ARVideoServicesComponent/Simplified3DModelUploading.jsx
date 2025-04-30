import React from "react";
// import "./Simplified3DModelUploading.css";
import { Link } from "react-router-dom";

const Simplified3DModelUploading = () => {
  // Data Array
  const uploadData = [
    {
      title: "Innovate & Engage with AR QR Code Videos ",
      description: [
        'Creating an AR video on AR code is the simplest and most user-friendly way. Simply, you have to select the experience "AR Video," select the.mp4 or.mov video file within 100MB, and click "Create" to obtain your AR Code.',
        "A larger printed AR Code Magic offers the best AR video experience.  ",
      ],
      link: "/user/register",
      image: "https://ar-code.com/images/interface-upload-3d-models.webp",
      alt: "3D Model Uploading AR Code",
    },
  ];

  return (
    <div className="container pt-5">
      {/* Section Heading */}
      <h2 className="fw-bold text-center text-capitalize text-primary-color mb-4">
        Innovate & Engage with AR QR Code Videos 
      </h2>

      {/* Description Text */}
      <center>
        <span className="web-font-size">
        Get a view into your future with AR Videos. Begin your transition to a digital AR life today. 
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
                Start creating your augmented reality videos effortlessly with AR Code.
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
        Join the AR revolution with AR Code.
      </p>
    </div> */}
    </div>
  );
};

export default Simplified3DModelUploading;
