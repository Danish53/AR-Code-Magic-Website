import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        Success Stories of AR Photos
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        AR Photo is transforming the way we interact with commonplace photos by transforming menus from
        restaurants, artwork from museums, and instructional posters into interactive experiences that educate,
        amuse, and enlighten in previously unthinkable ways.
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
                AR Photo for Menus
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "We employed the AR Photos
              application in designing our
              restaurant menu displays as a
              revolution to be chosen by the
              customer through interactive
              means. "
            </p>
            <p className="fw-bold web-font-size">Riley K., Restaurant Owner</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AR Photo for Museum Exhibits
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "AR Photo brings the paintings to
              life and enriches the museum
              experience. The interactive 3D
              visuals will make each visit
              unforgettable while revealing
              the stories of the artworks."
            </p>
            <p className="fw-bold web-font-size">Morgan P., Museum Curator</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              {/* <Link
                to="/blog"
                className="text-decoration-none"
              > */}
                AR Photo for Educational
                Posters
              {/* </Link> */}
            </h4>
            <p className="web-font-size">
              "The educative posters will be
              placed anywhere, scaled up to
              any size, making it interactive
              learning that enhances the
              understanding of students of all
              ages about the topic and also
              contributes to better retention in
              memory."
            </p>
            <p className="fw-bold web-font-size">Sam T., Educator </p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            More About AR Photo
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Explore the versatility of AR Code Creation Tools, featuring AI Code, Object Capture, AR Text, AR Photo, AR Portal, AR Logo, AR Video, AR Face, AR Data, and 3D model upload capabilities.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
