import React from "react";
// import "./ActionBar.css"; // Optional for additional custom styles
import { Link } from "react-router-dom";

const ActionBar = () => {
  return (
    // <div className="container mb-5 py-5  text-center bg-white  shadow-sm"
    // style={{ borderRadius: "10px" }}>
    //   <h2 className="mb-4 fw-bold">
    //     Enterprises &gt; 500 employees, Marketing Agencies
    //     <br /> & Educational Institutions
    //   </h2>
    //   <p className="mb-4 web-font-size">
    //     If you represent a large enterprise, a marketing agency, or an educational institution
    //     and you are interested in custom contracts and dedicated services, please contact us.
    //     <br />
    //     <br />
    //     We would be happy to discuss how we can meet your specific needs and help you achieve your
    //     goals.
    //   </p>
    //   <Link
    //     to="https://ar-code.com/contact"
    //     className="btn btn-custom btn-lg rounded-pill"
    //   >
    //     Get in Touch
    //   </Link>
    // </div>


    <div>
      {/* New Heading and Paragraph Section */}
      <div className="container my-5 text-center">

        <h3 className="mb-3 fw-bold">
          Can I cancel my subscription at any time?
        </h3>
        <p className="mb-4 web-font-size">
          Yes, you can cancel your subscription anytime. Upon request, we will process the cancellation before your next payment period, allowing you to enjoy premium features until the end of your current subscription.
        </p>

      </div>

      {/* Existing ActionBar Section */}
      <div
        className="container mb-5 py-5 text-center bg-white shadow-sm"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="mb-4 fw-bold">
          Enterprises with 500+ Employees, Marketing Agencies, <br /> & Educational Institutions
        </h2>

        <p className="mb-4 web-font-size">
          If you represent a large enterprise, marketing agency, or educational institution
          and are interested in custom contracts and dedicated services, please contact us.
          <br />
          <br />
          We’re happy to explore how we can support your needs and help you achieve your goals.
        </p>

        <Link
          to="/contact-us"
          className="btn btn-custom btn-lg rounded-pill"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default ActionBar;
