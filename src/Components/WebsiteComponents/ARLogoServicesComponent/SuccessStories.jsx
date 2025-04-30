import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        Success Stories with AR Logos
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Logo is changing marketing and branding strategies by offering immersive and interactive augmented
        reality experiences that capture and engage audiences like never before.
      </p>

      {/* Featurette Section */}
      <div className="featurette mb-5">
        {/* Centered Image with Link */}
        <div className="text-center mb-5">
          <Link to="https://ar-code.com/k8bVJhgtS">
            <img
              src="https://ar-code.com/images/k8bVJhgtS.webp"
              alt="AR Code Magic 3D model statue"
              className="img-fluid imagemainlogo rounded shadow"
            //   style={{ maxWidth: "80%" }}
            // style={{ maxWidth: "400px" }}
            />
          </Link>
        </div>

        {/* Success Stories */}
        <div className="row text-center">
          {/* Story 1 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Branding with AR
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "It has transformed the way
              customers perceive our brand
              by introducing AR Logo into our
              packaging, making unboxing an
              unforgettable experience that
              significantly increases brand
              loyalty."
            </p>
            <p className="fw-bold web-font-size">Alex R., Brand Manager</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Interactive Marketing
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR logo feature offers a new
              and modern way to get
              engagement by transforming
              our logo into an interactive AR
              experience at our events."
            </p>
            <p className="fw-bold web-font-size">Jamie L., Marketing Director</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Enhanced Social Media AR
                Presence
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "we utilize AR Logos on our social
              media channels and have seen a
              huge raise in user interaction on
              our marketing campaigns."
            </p>
            <p className="fw-bold web-font-size">Samira K., Digital Strategist</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Logo applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Let’s discover a wide range of AR experiences designed to revolutionize your digital strategy including AI
          Code, Object Capture, AR Text, AR Photo, AR Portal, AR Video, AR Face, AR Data, and 3D model upload
          tools.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
