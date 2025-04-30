import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        Witness Success Stories with the Uploading of 3D Models
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        Learn how the upload of 3D models through AR Code Magic is transforming the way industries connect with
        their audience and are offering a memorable augmented reality experience.
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
                Museum AR Immersion
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "By taking advantage of AR Code Magic,
              we have successfully secured
              and uploaded the collection of
              our 3D Models behind AR QR
              Codes. This step will transform
              the whole visit of the museum
              into an interactive journey with
              time"
            </p>
            <p className="fw-bold web-font-size">Dr. Elena M., Museum Curator</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Industrial AR Innovation
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "This AR Code Magic plays a pivotal role
              in the display of animated
              machinery models at industry
              salons, enhances the value of
              our booth, and engages our
              valuable clients in such
              remarkable ways."
            </p>
            <p className="fw-bold web-font-size">Marco P., CEO Manufacturing Company</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Educational Breakthrough
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "We utilize this AR Code Magic in our
              university to upload various
              educating 3D Models. This AR
              display will help the students to
              engage in complex subjects
              ."
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
           Explore AR Face
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
        Unlock the power of AR Code Magic Creation Tools, including AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model upload tools.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
