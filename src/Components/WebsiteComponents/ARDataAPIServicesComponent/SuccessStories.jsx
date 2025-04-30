import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        AR Data Success Highlights
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Data is making real-time data display over the AR QR Code across various sectors, enabling real-time
        efficiency in operations and customer satisfaction while being the most tech-forward transparency.
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
                Package Status Display
              {/* </Link/> */}
            </h4>
            <p className="web-font-size">
              "This integration of AR data with
              package status has
              revolutionized our logistics.
              Clients receive real-time updates
              directly on the package, which
              improves transparency and
              confidence."
            </p>
            <p className="fw-bold web-font-size">Chris T., Logistics Innovations
              Manager
            </p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Server Maintenance Assistance
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Our maintenance team now
              receives instant access to server
              status through AR Data, hence
              speeding up decision-making
              and reducing downtime
              dramatically.
              "
            </p>
            <p className="fw-bold web-font-size">Alexa D., IT Operations Chief</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Smart City Prepaid Card Info
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Data has transformed our
              Quotes Book to enable readers
              to directly access a daily famous
              quote by way of interactive AR
              displays. "
            </p>
            <p className="fw-bold web-font-size">Jordan K., Book Editor</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Data Applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
        Explore the vast capabilities of AR Code Magic Creation Tools, including AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model uploads.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
