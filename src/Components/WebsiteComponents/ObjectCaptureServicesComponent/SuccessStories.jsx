import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        Success Stories of Capturing AR Code Magic Object Capture
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        Discover how AR Code Magic Object Capture is transforming industries with success stories in dining, design, and museums.
      </p>

      {/* Featurette Section */}
      <div className="featurette mb-5">
        {/* Centered Image with Link */}
        <div className="text-center mb-5">
          <Link to="https://ar-code.com/k8bVJhgtS">
            <img
              src="https://ar-code.com/images/k8bVJhgtS.webp"
              alt="AR Code 3D model statue"
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
                Object Capture for Restaurant
                Menus
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Thanks to AR QR Codes that link
              to in-depth scans of our meals,
              guests can now experience our
              culinary masterpieces in 3D
              right from their tables.
              "
            </p>
            <p className="fw-bold web-font-size">Kim L., Culinary Director</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Object Capture for Product
                Design
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Clients are now able to view my
              designs in augmented reality,
              expanding the scope of my
              design work beyond the screen.
              This raises the bar for portfolio
              displays!
              "
            </p>
            <p className="fw-bold web-font-size">Taylor M., Innovation Director </p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Object Capture for Museums
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Our museum tours have been
              transformed with augmented
              reality (AR) representations of
              our historical objects, which
              make history interesting and
              approachable for anyone,
              wherever.
              "
            </p>
            <p className="fw-bold web-font-size">Jamie K., Museum Digital Strategist</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
         Object Capture Applications 
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
        Discover the possibilities of the 3D model upload tools, AI code, object capture, AR text, AR photo, AR
        portal, AR logo, AR video, AR face, AR data, and AR code creation tools
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
