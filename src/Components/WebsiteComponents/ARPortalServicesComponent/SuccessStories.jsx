import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        Success Stories of AR Portals with AR Code Magic
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Portal technology is useful in several domains like cinema, real estate, and gaming by offering
        captivating AR experiences to the users.
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
                Marketing in Gaming
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "As a result of using AR Portals in
              game marketing strategies, the
              immersion for our potential
              players has increased. "
            </p>
            <p className="fw-bold web-font-size">Jordan C., Lead Game
              Developer</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Showcases in Real Estate
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Portals have completely
              transformed the property
              businesses. Buyers can visit
              their properties from anywhere
              in the country in a few minutes"
            </p>
            <p className="fw-bold web-font-size">Taylor M., Innovation Director</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                Cultural AR Immersion
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Portal technology brings life
              into our cinema culture. This
              allows the viewers to step into
              the movie world."
            </p>
            <p className="fw-bold web-font-size">Casey H., Curator </p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Portal applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Discover the endless possibilities with AR Code Magic Magic technology tools including AI Code, Object
          Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model upload tools
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
