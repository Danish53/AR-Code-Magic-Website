import React from "react";
import {Link} from "react-router-dom";
function StatisticsComponent() {
  const stats = [
    {
      title: "Powering",
      number: "114,120",
      description: "AR experiences",
    },
    {
      title: "Serving",
      number: "317,218",
      description: "Scans per day",
    },
    {
      title: "Trusted by",
      number: "89,246",
      description: "Creators",
    },
  ];

  return (
    <div className="container my-5">
      <div
        className="panel panel-body panel-default p-4 shadow-sm"
        style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}
      >
        {/* Statistics Section */}
        <div className="row text-center mb-4">
          {stats.map((stat, index) => (
            <div className="col-12 col-md-4 mb-4 mb-md-0" key={index}>
              <div>
                <h4 className="fw-bold text-primary">{stat.title}</h4>
                <p className="mb-0 web-font-size">
                  <span className="display-6 fw-bold">{stat.number}</span>
                  <br />
                  <span className="text-muted">{stat.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center">
          <Link
            to="/user/register"
            className="btn btn-lg btn-custom rounded-pill text-white"
            // style={{
            //   backgroundColor: "#fd0035",
            //   backgroundImage: "linear-gradient(45deg, #fd0035 0%, #9C27B0 100%)",
            //   border: "none",
            // }}
          >
            Get Started for Free
          </Link>
          <p className="mt-3 text-muted">No credit card required.</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsComponent;
