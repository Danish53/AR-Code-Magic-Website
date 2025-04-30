import React from "react";
import { Link } from "react-router-dom";
// import "./Anchor3DModelSection.css";

const Anchor3DModelSection = () => {
  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Section Heading */}
        <h2 className="text-center text-white fw-bold mb-4">
          No Apps are Needed for Instant AI Insights
        </h2>

        {/* Description Text */}
        <p className="text-center text-white web-font-size">
          <span className="textmaincenter">
            Engage with AI-driven assistance instantly across any platform. you just have to click a photo and AI will
            provide you the personalized feedback according to your suggestions or information.
          </span>
        </p>

        {/* Feature Section */}
        <div className=" mt-4">
          <div className="row align-items-center">
            {/* Left Column: Image */}
            <div className="col-md-7 mb-4 mb-lg-0 text-center">
              <Link to="#" className="feature-link">
                <img
                  src="https://ar-code.com/images/ar-code-piston.webp"
                  className="img-fluid rounded shadow feature-img"
                  alt="AR QR Code 3D model"
                />
              </Link>
            </div>

            {/* Right Column: Information */}
            <div className="col-md-5">
              <div className="text-center">
                <p className="web-font-size text-white">
                  <span>
                    AI-Powered QR Codes to Customize User's Interaction with Technology.
                  </span>
                </p>
                <p className="web-font-size text-white">
                  <span>
                    Customized AR AI Experiences by Analyzing Photos through QR Codes Based on Your Set Prompts for
                    Delivered Customized Responses or Advice.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 web-font-size text-white">
            <span>
              Prompt: Examine the subject's attire to include color coordination, appropriateness of style for the
              occasion, and fashion relevance to current trends. Offer an option to enhance with one piece of clothing
              or accessory that would improve the overall look based on body type and personal style. Indicate it is
              available at the FASHION NET store. If the full outfit of the subject cannot be seen, instruct them to
              reshoot the image so the entire outfit can be seen.
            </span>
          </p>

          {/* Call to Action Button */}
          <div className="text-center my-4">
            <Link to="/user/register" className="btn btn-custom btn-lg btn-success rounded-pill">
              Get Started Now
            </Link>
          </div>

          {/* Footer Text */}
          <div className="textmainS text-white text-center">
          Enhance every interaction with AI QR Codes, adding personalized intelligence to user experiences.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anchor3DModelSection;
