import React from "react";
import "./ARDataAPI.css";
import { Link } from "react-router-dom";
const ARDataAPI = () => {
  // Data Array
  const apiData = [
    {
      title: "AR Code Magic AR Data API v1.0",
      description: [
        "The previous version only offered “Flying Over” codes. On the other hand, this API offers proper AR Code Magic scan statistics. ",
        " It also offers several ways to display remote anywhere such as IoT data, member card info, price display, etc. ",
      ],
      link: "/blog",
      image: "https://ar-code.com/images/api-ar-code.webp",
      alt: "AR Code Magic AR Data API",
    },
  ];

  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        <h2 className="fw-bold text-center text-capitalize text-white mb-4">AR Data: Augmented Reality API</h2>

        <center>
          <span className="web-font-size text-white">
            The AR Data API enables users to access text data from a different server in AR overlying text data from
            an AR QR Code from the user’s real-world perspective. Thus the API utilizes AR Code Magic rendering
            technologies to access data from a different cloud server.
          </span>
        </center>

        <div className="feature mt-5">
          {apiData.map((item, index) => (
            <div className="row align-items-center mb-5" key={index}>
              {/* Image Section */}
              <div className="col-md-7 text-center">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="img-fluid imagemain rounded shadow"
                // style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              {/* Info Section */}
              <div className="col-md-5">
                <div className="actionbar">
                  <center>
                    <h3 className="mb-3 text-white">
                      <strong>
                        {/* <Link to={item.link} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </Link> */}
                          {item.title}
                      </strong>
                    </h3>
                    {item.description.map((desc, i) => (
                      <span className="web-font-size text-white d-block mb-2" key={i}>
                        {desc}
                      </span>
                    ))}
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ARDataAPI;
