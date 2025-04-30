import React from "react";
// import "./Simplified3DModelUploading.css";
import { Link } from "react-router-dom";

const Simplified3DModelUploading = () => {
  // Data Array
  const uploadData = [
    {
      title: "Simplified uploading 3D models",
      description: [
        'Your AR Code Magic transforms your logo within a few minutes and with no great effort. upload your logo under the "AR Logo" section in SVG format. ',
        "That means you can preview your depth and texture glossiness adjustments so easily. With a simple click, your 3D logo becomes an interactive masterpiece of AR, bringing about the best branding impact through multiple platforms. ",
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
        Ready to transform your logo?
      </h2>

      {/* Description Text */}
      <center>
        <span className="web-font-size">
          The use of AR Logo in marketing materials is as simple as it is effective with AR Code Magic. Whether on a
          website, within an email signature, or on social media, your AR Logos are interactive and worth
          exploring.
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
                Enhance your brand’s identity with our AR Logo feature. 
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
