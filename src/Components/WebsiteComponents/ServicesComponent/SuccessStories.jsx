import React from "react";
// import "./SuccessStories.css"; // Optional: For additional styling if needed
import { Link } from "react-router-dom";
const SuccessStories = () => {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <h2 className="text-center fw-bold text-primary mb-4">
        3D Model Upload Success Stories
      </h2>

      {/* Description */}
      <p className="text-center web-font-size mb-5">
        Discover how AR Code's 3D model upload feature is revolutionizing the
        way industries engage with their audiences, offering immersive
        augmented reality experiences that leave a lasting impression.
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
              <Link
                to="https://ar-code.com/blog/3d-models-of-museum-art-gallery-objects-and-their-ar-codes"
                className="text-decoration-none"
              >
                Museum AR Immersion
              </Link>
            </h4>
            <p className="web-font-size">
              "Leveraging AR Code, we've successfully uploaded and anchored our
              entire 3D collection behind AR QR Codes, transforming the museum
              visit into an interactive journey through time."
            </p>
            <p className="fw-bold web-font-size">Dr. Elena M., Museum Curator</p>
          </div>

          {/* Story 2 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              <Link
                to="https://ar-code.com/blog/here-is-how-ar-code-is-going-to-transform-industrial-companies-and-manufacturing"
                className="text-decoration-none"
              >
                Industrial AR Innovation
              </Link>
            </h4>
            <p className="web-font-size">
              "AR Code has been instrumental in animating our machinery models
              for display at industry salons, enhancing our booth's appeal and
              engaging potential clients in unprecedented ways."
            </p>
            <p className="fw-bold web-font-size">Marco P., CEO Manufacturing Company</p>
          </div>

          {/* Story 3 */}
          <div className="col-md-4 mb-4">
            <h4 className="text-primary fw-bold">
              <Link
                to="https://ar-code.com/blog/educational-3d-models-and-their-ar-qr-codes-enhancing-learning-for-students"
                className="text-decoration-none"
              >
                Educational Breakthrough
              </Link>
            </h4>
            <p className="web-font-size">
              "Our university has embraced AR Code to upload educative 3D
              models, making complex subjects more accessible and engaging for
              students through AR displays."
            </p>
            <p className="fw-bold web-font-size">Samira K., Digital Strategist</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center mt-4">
          <Link
            to="https://ar-code.com/blog"
            className="btn btn-success btn-lg btn-custom rounded-pill"
          >
            AR Code Applications
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-4">
          Expand your reach beyond traditional methods and dive into a world of
          interactive possibilities with AR Code's {''}
          <Link to="https://ar-code.com/page/ai-code" className="text-decoration-none">AI Code</Link>,{' '}
          <Link to="https://ar-code.com/page/object-capture" className="text-decoration-none">Object Capture</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-text" className="text-decoration-none">AR Text</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-photo" className="text-decoration-none">AR Photo</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-portal" className="text-decoration-none">AR Portal</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-video" className="text-decoration-none">AR Video</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-face-filter" className="text-decoration-none">AR Face</Link>,{' '}
          <Link to="https://ar-code.com/page/ar-data-api" className="text-decoration-none">AR Data</Link>,{' '}
          and the{' '}
          <Link to="https://ar-code.com/page/3d-file-upload" className="text-decoration-none">3D model upload</Link>{' '}
          tool, unlocking new dimensions in digital engagement.
        </p>
      </div>
    </div>
  );
};

export default SuccessStories;
