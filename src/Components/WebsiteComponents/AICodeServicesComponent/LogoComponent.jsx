import React from "react";

function LogoComponent() {
  const logos = [
    {
      src: "https://ar-code.com/images/siemens-logo.webp",
      alt: "Siemens logo",
    },
    {
      src: "https://ar-code.com/images/CBS-logo.webp",
      alt: "CBS logo",
    },
    {
      src: "https://ar-code.com/images/adidas-logo.webp",
      alt: "Adidas logo",
    },
    {
      src: "https://ar-code.com/images/berkley-logo.webp",
      alt: "Berkley logo",
    },
    {
      src: "https://ar-code.com/images/harvard-logo.webp",
      alt: "Harvard logo",
    },
    {
      src: "https://ar-code.com/images/nanjing-university.webp",
      alt: "Nanjing university logo",
    },
  ];

  return (
    <div className="py-5"
    // style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* Logo Section */}
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {logos.map((logo, index) => (
            <div
              className="col-6 col-md-4 col-lg-2 mb-4 text-center"
              key={index}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="img-fluid"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
        {/* Text Section */}
        {/* <p className="text-center web-font-size mt-4">
          AR Code is being used by over <strong>1,000 companies</strong> and{" "}
          <strong>100 universities</strong>. Join them today!
        </p> */}
        <p className="text-center web-font-size mt-4">
          Trusted by <strong>1,000+ companies</strong> and <strong>100 universities</strong>. Join them today!
        </p>

      </div>
    </div>
  );
}

export default LogoComponent;
