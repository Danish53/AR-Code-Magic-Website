import React from "react";
// import "./Simplified3DModelUploading.css";
import { Link } from "react-router-dom";

const Simplified3DModelUploading = () => {
  // Data Array
  const uploadData = [
    {
      title: "AR Data API ",
      description: [
        "You can create, change, and manage your AR Codes in no time with our strong API and user-friendly interface by keeping your material relevant. ",
        "AR Code Magic AR Data offers a unique platform for marketing, event participation, and education. You can use our augmented reality experience feature to add event data on a vast scale in real time. ",
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
        AR Data API
      </h2>

      {/* Description Text */}
      <center>
        <span className="web-font-size">
          look at our API connection for unmatched flexibility and control in real-time data display.
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
                  Start configuring your AR Data with AR Code.
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
