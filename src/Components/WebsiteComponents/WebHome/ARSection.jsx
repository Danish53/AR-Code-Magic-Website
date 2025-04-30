import React from "react";
import "./ARSection.css";
import { Link } from "react-router-dom";
import ar1 from "../../../assets/WebIMG/ar-code-f1.webp";
import ar2 from "../../../assets/WebIMG/ar-code-piston.webp";
import ar3 from "../../../assets/WebIMG/ar-code-woman.webp";
import ar4 from "../../../assets/WebIMG/ar-code-horse-statue.webp";
import ar5 from "../../../assets/WebIMG/ar-code-trex.webp";
// import ar6 from "../../../assets/WebIMG/herosection.jpg";

const ARSection = () => {
  const data = [
    {
      qrCode: ar1, // Image path
      link: "#", // Unique link
    },
    {
      qrCode: ar2,
      link: "#",
    },
    {
      qrCode: ar3,
      link: "#",
    },
    {
      qrCode: ar4,
      link: "#",
    },
    {
      qrCode: ar5,
      link: "#",
    },
    {
      qrCode: ar5,
      link: "#",
    },
   
  ];

  return (
  <div className="primary-light py-2">
      <div className="container pt-5">
      <h2 className="text-center text-capitalize text-white fw-bold mb-4">
        Android OS, IOS/iPadOS, Meta Horizon OS & VisionOS
      </h2>
      <div className="row justify-content-center">
        {data.map((item, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6 text-center mb-4" key={index}>
            <div className="qr-card p-3 border shadow bg-white rounded">
              {/* Wrap image in a link */}
              <Link to={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.qrCode}
                  alt={`QR Code ${index + 1}`}
                  className="img-fluid"
                  // style={{ maxHeight: "200px", objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ARSection;
