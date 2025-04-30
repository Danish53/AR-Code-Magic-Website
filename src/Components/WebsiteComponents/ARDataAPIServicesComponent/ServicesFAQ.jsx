// import React from 'react'

// function ServicesFAQ() {
//   return (
// <div className='bg-primary-light'>
// <div className="container py-5">
//   {/* <!-- Header Section --> */}
//   <h2 className="text-center fw-bold text-primary-color mb-4">Frequently Asked Questions</h2>
//   <p className="text-center text-muted mb-5">
//     Explore how to bring your words to life with AR Code's 3D Text feature in this brief FAQ.
//   </p>

//   {/* <!-- FAQ Section --> */}
//   <div className="row">
//     {/* <!-- Left Column --> */}
//     <div className="col-md-6 mb-4">
//       <div className="p-4 shadow-sm rounded bg-light">
//         <h4 className="text-primary-color text-center mb-3">
//           <strong>What are the size limitations for uploading 3D files to AR Code?</strong>
//         </h4>
//         <p className="text-muted">
//           There are no file size restrictions for 3D file uploads via our support. For uploading through our interface, you need to maintain a file size of under 15MB to ensure the auto-generation of an optimized AR experience. Files exceeding 15MB require assistance from our dedicated support team to ensure the optimization of your 3D file for correct AR rendering.
//         </p>
//       </div>
//       <div className="p-4 shadow-sm rounded bg-light mt-4">
//         <h4 className="text-primary-color text-center mb-3">
//           <strong>Which 3D file formats can be directly uploaded to AR Code?</strong>
//         </h4>
//         <p className="text-muted">
//           AR Code supports a wide range of 3D file formats for direct upload, including .GLB, .USDZ, .PLY, .STL, .FBX, .OBJ, .X3D, .GLTF, and .ZIP files that contain both the 3D model and its associated texture paths. For BIM formats (STEP, IFC, IGES, BREP, JT, IFC) or other classNameic formats such as .DAE or .ABC, they can be uploaded via our support as they require specific optimization for AR.
//         </p>
//       </div>
//     </div>

//     {/* <!-- Right Column --> */}
//     <div className="col-md-6 mb-4">
//       <div className="p-4 shadow-sm rounded bg-light">
//         <h4 className="text-primary-color text-center mb-3">
//           <strong>How can I optimize my 3D models for AR display on AR Code?</strong>
//         </h4>
//         <p className="text-muted">
//           To ensure your 3D models load quickly and display correctly in AR, we advise compressing texture files and reducing model complexity by decreasing the number of vertices. Our video tutorial offers step-by-step instructions for optimizing your 3D models before upload.
//         </p>
//       </div>
//       <div className="p-4 shadow-sm rounded bg-light mt-4">
//         <h4 className="text-primary-color text-center mb-3">
//           <strong>How do I ensure my 3D model appears correctly positioned in AR?</strong>
//         </h4>
//         <p className="text-muted">
//           Before uploading, center your 3D model within your scene to prevent it from appearing too distant in AR view. This may involve adjusting the model's origin to its geometry and setting its position parameters to the scene's center coordinates (0,0,0).
//         </p>
//       </div>
//     </div>
//   </div>

//   {/* <!-- Call-to-Action Section --> */}
//   <div className="text-center mt-5">
//     <a href="https://ar-code.com/contact" className="btn btn-custom btn-lg rounded-pill">Contact Us</a>
//   </div>

//   {/* <!-- Footer Note --> */}
//   <div className="text-center mt-3">
//     <p classNameName="text-muted">
//       If you have questions not covered in our <a href="https://ar-code.com/page/FAQ" className="text-primary">FAQ</a>, feel free to reach out to us for assistance.
//     </p>
//   </div>
// </div>

// </div>
//   )
// }

// export default ServicesFAQ






import React, { useState } from "react";
import { Link } from "react-router-dom";

function ServicesFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "What is the feature of AR Data?",
      answer:
        "The AR Data feature creates immersive experiences by enabling text to be dynamically displayed on AR QR Codes using state-of-the-art AR technology. Its purpose is to discreetly display remote data in auser's surroundings.",
    },
    {
      question: "How can you create AR Data in AR Code using the API? ",
      answer:
        "You can add your required parameters and set the password for further edits. Upon successful creation, you will receive a JSON with the reference ID and AR Code URL. ",
    },
    {
      question: "Can I edit AR Data after creating the AR Code Magic?",
      answer:
        "Yes, possible through the AR Code web interface for quick updates or API for detailed changes, using the reference ID and password. ",
    },
    {
      question: "Where can the AR Data feature be applied? ",
      answer:
        "Its applications include industries in logistics, urban development, marketing, and education where realtime information display and interactive content updates are possible. ",
    },
  ];

  return (
    <div className="bg-primary-light">
      <div className="container py-5">
        {/* Header Section */}
        <h2 className="text-center fw-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-white web-font-size mb-5">
        Discover the FAQs related to the AR Data feature and learn to improve AR experiences in multiple apps. 
        </p>

        {/* FAQ Section */}
        <div className="accordion" id="faqAccordion">
          {questions.map((item, index) => (
            <div className="accordion-item mb-3 shadow-sm" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button fw-bold text-primary-color web-font-size ${activeIndex === index ? "" : "collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded={activeIndex === index}
                  aria-controls={`collapse${index}`}
                  onClick={() => toggleAnswer(index)}
                >
                  {item.question}
                  <span className="ms-auto">
                    <i
                      className={`bi ${
                        activeIndex === index ? "bi-chevron-up" : "bi-chevron-down"
                      }`}
                    ></i>
                  </span>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center mt-5">
          <Link to="/contact-us" className="btn btn-custom btn-lg rounded-pill">
            Contact Us
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-3">
          <p className="text-white">
            If you have questions not covered in our{" "}
            <Link to="/faq" className="text-decoration-none">
              FAQ
            </Link>
            , feel free to reach out to us for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesFAQ;
