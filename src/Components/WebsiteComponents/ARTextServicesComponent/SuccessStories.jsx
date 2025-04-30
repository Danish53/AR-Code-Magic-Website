import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        AR Text success stories
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Text transforms various fields of life with these inspiring and captivating AR text experiences
        including entertainment, marketing, and education.
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
                AR for Marketing Agencies
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Leveraging AR Text to display 3D
              text information about our
              products has not only improved
              our marketing strategies but
              also significantly increased
              customer engagement and
              understanding.
              "
            </p>
            <p className="fw-bold web-font-size">Morgan J., Marketing Specialist</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AR for Interactive
                Entertainment
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "This way, AR Text has produced
              really beautiful, but simple, AR
              experiences with a magic touch
              to our entertainment offering
              and mesmerizing our audiences.
              "
            </p>
            <p className="fw-bold web-font-size">Eli T., Entertainment Director</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AR for Educational Projects
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "Introducing this sort of AR
              technology to young minds
              through words and colors in an
              AR environment was not only
              great as an educational tool but
              also a primer in something that's
              really coming into our near
              future-so ubiquitous.
              "
            </p>
            <p className="fw-bold web-font-size">Nicole H., Educator</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Text Applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Unlock the potential of AR Code Magic Creation Tools, including AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model uploads.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
