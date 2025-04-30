import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        AR Videos Success Stories
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Video technology can be used for multiple purposes like marketing, learning, or education.
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
                AR Videos for Customer
                Engagement
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "We used AR Videos at our booth
              with the Meta Quest 3 headset,
              this has increased our customer
              engagement and interaction."
            </p>
            <p className="fw-bold web-font-size">Alex R., Sales Manager</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AR Videos for Interactive
                Marketing
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Videos technology changes
              our marketing material to a
              whole new level. This helps us in
              creating interactive and
              engaging brochures.
              "
            </p>
            <p className="fw-bold web-font-size">Samantha L., Marketing Director</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
               AR Videos for Educational Content 
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Videos make learning fun for
              my students. "
            </p>
            <p className="fw-bold web-font-size">Michael T., Science Teacher</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Video Applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
        Explore the power of AR Code Magic Creation Tools, including AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model uploads. 
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
