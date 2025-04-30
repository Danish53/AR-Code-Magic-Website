import React from "react";

const ARDescription = () => {
  // Array of potential uses
  const uses = [
    {
      text: "Enhance packaging, signage, and other materials with interactive, 3D digital content.",
      // linkText: "3D digital content",
      linkHref: "/blog",
    },
    {
      text: "Create immersive, interactive AR experiences for customers or users such as virtual tours, product demos, and other experiences.",
    },
    {
      text: "Offer information, instructions, or how-to guidance in Augmented Reality.",
    },
    {
      text: "Add AR to games or other entertainment experiences.",
    },
    {
      text: "It would mean creating attention-driven engagement with AR marketing campaigns.",
    },
  ];

  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Main Description */}
        <p className="text-center fw-bold text-white web-font-size">
          Augmented Reality Codes are an incredible tool in the hands of businesses, organizations, and
          individuals. They can use these codes to create and share interactive digital experiences.
        </p>
        <p className="text-center text-white web-font-size">
          Here are some potential applications of AR QR Codes:
        </p>

        {/* List of Uses */}
        <ul className="ms-0 text-white ms-md-5 web-font-size">
          {uses.map((use, index) => (
            <li key={index} className="mb-2">
              {use.text}
              {use.linkHref && (
                <a
                  href={use.linkHref}
                  className=" text-decoration-none"
                >
                  {use.linkText}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Additional Description */}
        <p className="text-center text-white web-font-size">
          Creating distinctive, impressive, and captivating experiences may now make it possible in an expanded
          range of products, services, and even materials with the help of AR Code Magics. Even today, getting content
          via accessing augmented reality itself has become highly trendy, mainly during the recently launched
          Apple Vision Pro headgear.
        </p>

        {/* Get Started Button */}
        <div className="text-center my-4">
          <a href="/user/register" className="btn btn-custom btn-success btn-lg rounded-pill">
            Get Started
          </a>
        </div>

        {/* Tools Description */}
        <div className="text-center mt-4">
          {/* <p className="fst-italic"> */}
          <p className="text-white">
            Here you can easily get access to unique AR 3D modeling tools such as AR Text, AR Photos, AR Faces, AR
            Logos, AR Portals, and AR Videos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ARDescription;
