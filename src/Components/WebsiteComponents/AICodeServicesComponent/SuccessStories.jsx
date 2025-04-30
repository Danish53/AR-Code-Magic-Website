import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        AI Codes Success Stories
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        Across all industries, businesses are using AI Codes for marketing, education, and engagement. That
        means AI-driven personalization is available at every touchpoint.
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
                Museum AI Experiences
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "We introduced AI to art and
              gave visitors a more
              personalized experience by
              integrating AI Code into our
              museum tours."
            </p>
            <p className="fw-bold web-font-size">Mia F., Museum Manager</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AI for Real Estate Assistance
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AI Code has transformed the
              way our customers perceive
              properties by delivering realtime, in-depth details about
              apartments and houses through
              a picture.
              "
            </p>
            <p className="fw-bold web-font-size">Carlos T., Real Estate Marketer</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AI for Smart City Urbanism
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Our green spaces and parks
              seem to be more creative and
              enjoyable with AI Code."
            </p>
            <p className="fw-bold web-font-size">Priya P., City Urban Planner</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AI Code Applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Unlock the power of AR and AI Code Creation Tools, including AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model uploads.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
