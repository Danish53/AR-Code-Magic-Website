import React from "react";
import { Link } from "react-router-dom";

const RevolutionizeSection = () => {
  // Use cases data
  const useCases = [
    {
      text: "Real estate companies may use AR codes to let potential buyers tour homes inside and out.",
      link: "/blog",
    },
    {
      text: "AR codes can enable an advertisement agency to design very interactive and engaging commercials",
      link: "/blog",
    },
    {
      text: "The use of AR code in the field of education would help produce dynamic and fascinating learning environments.",
      link: "/blog",
    },
    {
      text: "Museums",
      link: "/blog",
      extraText: " and sports centers can use it to enhance the visitor experience.",
      extraLink: {
        text: "sports centers",
        link: "/blog",
      },
    },
    {
      text: "AR QR codes can be used in the manufacturing industry to enhance accuracy and efficiency in production.",
      link: "/blog",
    },
  ];

  // Statistics data
  const statistics = [
    { title: "Powering", value: "112,938", subtitle: "AR experiences" },
    { title: "Serving", value: "315,000", subtitle: "Scans per day" },
    { title: "Trusted by", value: "88,420", subtitle: "Creators" },
  ];

  return (
    <div className="primary-light">
      <div className="container py-5">
        {/* Section Title */}
        <h3 className="text-center text-capitalize text-white">
          <strong>Transform Every Business</strong>
        </h3>

        {/* Introductory Text */}
        <p className="web-font-size text-white text-center mt-4">
          Many jobs are projected to be highly affected by this application of <strong>AR Code technology</strong> including real estate companies, advertising companies, schools, museums, sports businesses, and industrial organizations. We are therefore developing special solutions to incorporate <strong>AR Code technology</strong> into their business practices.
        </p>



        {/* List of Use Cases */}
        <ul className="web-font-size text-white mt-4">
          {useCases.map((caseItem, index) => (
            <li className="mb-2" key={index}>
              {/* <Link className="text-decoration-none" to={caseItem.link}>{caseItem.text}</Link> */}
              {caseItem.text}
              {caseItem.extraText && caseItem.extraLink && (
                <>
                  {caseItem.extraText.split(caseItem.extraLink.text)[0]}
                  {/* <Link className="text-decoration-none" to={caseItem.extraLink.link}>{caseItem.extraLink.text}</Link> */}
                {caseItem.extraLink.text}
                  {caseItem.extraText.split(caseItem.extraLink.text)[1]}
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Statistics Section */}
        <div className="row text-center mt-5">
          {statistics.map((stat, index) => (
            <div key={index} className="col-12 col-sm-4 mb-4">
              <div className="numberstlitle">
                <h4 className="fw-bold text-white">{stat.title}</h4>
              </div>
              <div className="numberstext">
                <h4 className="fw-bold text-light">{stat.value} <span>{stat.subtitle}</span></h4>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <Link
            to="/user/register"
            className="btn btn-success btn-custom btn-lg rounded-pill"
          >
            Get Started
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-4 text-white">
          Start creating and managing your Augmented Reality Code experiences.
        </p>
      </div>
    </div>
  );
};

export default RevolutionizeSection;
