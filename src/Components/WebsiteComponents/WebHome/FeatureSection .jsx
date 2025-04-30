import React from "react";
import { FaStar, FaEdit, FaChartBar, FaTachometerAlt, FaQrcode, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
    { icon: <FaQrcode />, title: "AR Code Magic Management" },
    { icon: <FaStar />, title: "3D Creation" },
    { icon: <FaEdit />, title: "AR Code Magic Edition" },
    { icon: <FaChartBar />, title: "Tracking and Statistics" },
    { icon: <FaTachometerAlt />, title: "Powerful Dashboard" },
    { icon: <FaCogs />, title: "API" },
];

const arCloudFeatures = [
    "Generation, maintenance, sharing, and edition of AR codes.",
    "A web interface and applications (AR Text, AR Portal, and AR Frame) make it simple to create 3D models.",
    "Comprehensive tracking statistics, including web browser, operating system, and location. ",
    {
        text: "Retargeting for Twitter, LinkedIn, Google AdWords, and Facebook/Meta advertisements. ",
        link: "/blog",
    },
    {
        beforeLink: "Using ",
        linkText: "AR Code Magic Studio",
        link: "/blog",
        afterLink: ", 3D models may be edited, converted, and compressed.",
    },
    "High-performance, scalable cloud infrastructure is offered by AR Cloud Hosting.",
    "Teamwork designed for big businesses.",
];

const FeatureSection = () => {
    return (
        <div className="container text-center my-5">
            <h3 className="fw-bold mb-5 text-capitalize">Now you can create, edit, manage, and track your AR QR Code any time</h3>

            {/* Features Section */}
            <div className="row">
                <div className="col-md-7 d-flex flex-wrap justify-content-center">
                    {features.map((feature, index) => (
                        <div key={index} className="col-6 col-sm-4 mb-4">
                            <div className="d-flex flex-column align-items-center">
                                <div className="icon mb-2" style={{ fontSize: "2rem",  color: "var(--primary-color)"}}>
                                    {feature.icon}
                                </div>
                                <h5 className="fw-bold">{feature.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AR Cloud Features Section */}
                <div className="col-md-5 text-start">
                    <h4 className="mb-3"><strong>Dedicated AR Cloud platform</strong></h4>
                    <ul className="web-font-size">
                        {arCloudFeatures.map((item, index) =>
                            typeof item === "string" ? (
                                <li className="mb-2" key={index}>{item}</li>
                            ) : item.beforeLink ? (
                                // <li className="mb-2" key={index}>
                                //     {item.beforeLink}
                                //     <Link className="text-decoration-none" to={item.link}>{item.linkText}</Link>
                                //     {item.afterLink}
                                // </li>
                                <li className="mb-2" key={index}>
                                    {item.beforeLink}
                                    {item.linkText}
                                    {item.afterLink}
                                </li>
                            ) : (
                                // <li className="mb-2" key={index}>
                                //     <Link className="text-decoration-none" to={item.link}>{item.text}</Link>
                                // </li>
                                <li className="mb-2" key={index}>
                                 {item.text}
                                </li>
                            )
                        )}
                    </ul>

                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-5">
                <p className="web-font-size mb-3" style={{ fontSize: "1.1rem" }}>
                Over 1000 companies and 100 universities already use our AR Code Magics. Join our AR Family now! 
                </p>
                <Link
                    to="/user/register"
                    className="btn btn-custom btn-success btn-lg rounded-pill"
                >
                    Get Started
                </Link>
            </div>

            <p className="mt-4">
            Quickly start creating, managing, and tracking your AR Code Magic experiences. 
            </p>
        </div>
    );
};

export default FeatureSection;
