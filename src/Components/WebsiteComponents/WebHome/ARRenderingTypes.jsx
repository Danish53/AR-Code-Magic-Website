import React from "react";
import "./ARRenderingTypes.css";
import { Link } from "react-router-dom";
// import ar6 from "../../../assets/WebIMG/herosection.jpg";

const ARRenderingTypes = () => {
  // Array of AR rendering types
  const arTypes = [
    {
      id: 1,
      title: "Immersive AR",
      description:
        "It displays AR experiences in your surroundings such as movies, 3D models, and photogrammetric 3D scans.",
      imgSrc: "https://ar-code.com/images/ar-code-immersive-ar-video.webp",
      imgAlt: "Immersive AR rendering",
      link: "#",
    },
    {
      id: 2,
      title: "Face Filters AR",
      description:
        "these offers filters with your photos and branding by utilizing the AR Code Magic platform.",
      imgSrc: "https://ar-code.com/images/ar-code-ar-face-filters.webp",
      imgAlt: "AR Face Filters",
      link: "#",
    },
    {
      id: 3,
      title: "AI Assistance AR",
      description:
        " This app invites users to click a picture or use any prompts that are later given to AI for further processing. AI provide various recommendations with custom AR experiences.",     imgSrc: "https://ar-code.com/images/ai-code-assistant.webp",
      imgAlt: "AI Assistance AR",
      link: "#",
      blogLink:
        "/blog",
    },
  ];

  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Heading */}
        <h2 className="text-center text-capitalize text-white fw-bold mb-4">
        We Offer Three Types of Rendering
        </h2>

        {/* Introductory Text */}
        <p className="text-center text-white web-font-size">
        AR Code Magics can be used for several AR renderings such as Face Filters AR, AI Assistance AR, and Immersive AR. 
        </p>

        <div className="row mt-5">
          {/* Left Column: Images */}
          <div className="col-md-6 d-flex flex-column gap-4 mb-5 mb-lg-0">
            {arTypes.map((type) => (
              <Link
                key={type.id}
                to={type.link}
                // target="_blank"
                rel="noopener noreferrer"
                className="rendering-type-link"
              >
                <img
                  src={type.imgSrc}
                  alt={type.imgAlt}
                  className="img-fluid rounded shadow rendering-type-img"
                />
              </Link>
            ))}
          </div>

          {/* Right Column: Information */}
          <div className="col-md-6 d-flex flex-column text-white gap-0 gap-lg-5">
            <h2 className="text-center text-white mb-4">
              <strong>
                {/* <Link
                  to={arTypes[2].blogLink} // Link for AI Assistance AR blog
                  className="text-decoration-none"
                >
                  AI Assistant
                </Link> */}
             AI Assistant   , AR Face Filters &amp; Immersive AR Rendering
              </strong>
            </h2>

            <ul className="d-flex flex-column web-font-size custom-gap">
              {arTypes.map((type) => (
                <li className="mb-4" key={type.id}>
                  <u>{type.title}:</u> {type.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARRenderingTypes;
