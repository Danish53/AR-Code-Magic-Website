// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function FAQ() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const questions = [
//     {
//       question: "What is AR Code?",
//       answer:
//         "AR Code is a platform that allows you to create and share augmented reality (AR) experiences using 3D models, videos, and other multimedia content.",
//     },
//     {
//       question: "How do I upload 3D files to AR Code?",
//       answer:
//         "You can upload 3D files to AR Code by logging into your account and selecting the upload option in your dashboard. Supported file formats include .GLB, .USDZ, .FBX, .OBJ, and more.",
//     },
//     {
//       question: "What file formats are supported by AR Code?",
//       answer:
//         "AR Code supports a variety of 3D file formats including .GLB, .USDZ, .FBX, .OBJ, .STL, .PLY, and .X3D. Additional file formats can be uploaded with support assistance.",
//     },
//     {
//       question: "How can I optimize my 3D models for AR?",
//       answer:
//         "To optimize your 3D models for AR, reduce the model complexity, compress textures, and make sure that the models are properly centered within the scene.",
//     },
//     {
//       question: "Can I customize the AR experiences created on AR Code?",
//       answer:
//         "Yes, you can customize the AR experiences by adjusting the position, scale, and rotation of your 3D models, as well as adding interactive elements like buttons and text.",
//     },
//     {
//       question: "What are the subscription plans available for AR Code?",
//       answer:
//         "AR Code offers several subscription plans, including a free tier with limited features and paid plans with additional storage, support, and customization options.",
//     },
//   ];

//   const filteredQuestions = questions.filter((item) =>
//     item.question.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container py-5">
//     {/* Header Section */}
//     <h2 className="text-center fw-bold text-primary-color mb-4">AR Code FAQ</h2>
//     <p className="text-center text-muted web-font-size mb-5">
//       Below are the Frequently Asked Questions about the AR Code service. If you cannot find the answer to your query, please{" "}
//       <Link to="/contact-us" className="text-decoration-none">
//         contact us
//       </Link>
//       .
//     </p>

//     {/* Search Bar */}
//     <div className="mb-4 text-center">
//       <input
//         type="text"
//         className="form-control  w-100 mx-auto"
//         placeholder="Search for a question..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>

//     {/* FAQ Section */}
//     <div className="accordion" id="faqAccordion">
//       {filteredQuestions.map((item, index) => (
//         <div className="accordion-item mb-3 shadow-sm" key={index}>
//           <h2 className="accordion-header" id={`heading${index}`}>
//             <button
//               className={`accordion-button fw-bold text-primary-color web-font-size ${activeIndex === index ? "" : "collapsed"}`}
//               type="button"
//               data-bs-toggle="collapse"
//               aria-expanded={activeIndex === index}
//               aria-controls={`collapse${index}`}
//               onClick={() => toggleAnswer(index)}
//             >
//               {item.question}
//               <span className="ms-auto">
//                 <i
//                   className={`bi ${activeIndex === index ? "bi-chevron-up" : "bi-chevron-down"}`}
//                 ></i>
//               </span>
//             </button>
//           </h2>
//           <div
//             id={`collapse${index}`}
//             className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}
//             aria-labelledby={`heading${index}`}
//             data-bs-parent="#faqAccordion"
//           >
//             <div className="accordion-body text-muted">{item.answer}</div>
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Footer Note */}
//     {/* <div className="text-center mt-3">
//       <p className="text-muted">
//         If you have questions not covered in our{" "}
//         <Link to="/faq" className="text-decoration-none">
//           FAQ
//         </Link>
//         , feel free to reach out to us for assistance.
//       </p>
//     </div> */}
//   </div>
//   );
// }

// export default FAQ;










import React, { useState } from "react";
import { Link } from "react-router-dom";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "SUBSCRIPTION – Can we cancel our subscription to AR Code Magic?",
      answer:
        "Yes, as a user you are free to cancel your subscription from our services at any time. After canceling your subscription, you can use our services till the next payment period. Similarly, users can use our premium features until the end of their subscription period.",
    },
    {
      question:
        "SUBSCRIPTION – What type of payment methods are accepted by AR Code Magic?",
      answer:
        "You can easily subscribe to our AR Code Magic account by using international bank cards like Discover, Master card, Visa, and American Express. Once you subscribe to our premium account, an amount for the monthly or yearly billing cycle will automatically be charged from your credit card. You will be notified after each transaction by an invoice or an e-mail.",
    },
    {
      question:
        "SUBSCRIPTION - Is there any other licensing process for marketing agencies that are using AR Code Magic for commercial purposes?",
      answer:
        "Marketing agencies that want to use AR Code Magic services for their commercial use will start by signing up for the AR Code Magic PRO Plan. This PRO plan includes a reseller license which can be used for commercial purposes. This reseller license allows the agencies to resell and manage AR Code Magic for their clients, provided that their clients have their own commercial license. License type can be completely based on the client’s companies. The STANDARD Plan is enough for those who have fewer than 100 employees, the PRO Plan can be used for over 500 employees, and the Dedicated Plan is suitable for larger companies.",
    },
    {
      question: "SUBSCRIPTION - Who owns the AR Code Magic content?",
      answer:
        "If a user creates a 3D model on our platform, he completely owns that content. On the other hand, if he uploads content such as images, videos, or 3D models from a third party, he should follow the licensing terms set by that company because it remains their property.",
    },
    {
      question:
        "SUBSCRIPTION - Can I use premium features after canceling my premium subscription and what will happen to my AR Code Magic?",
      answer:
        "If you cancel your subscription, you can use your premium features until the next payment cycle. However, your premium account will convert into a free trial account after cancellation. Our company does not guarantee your content on our AR Cloud servers during free trials. After a few weeks, your AR codes will be deactivated from our website. If you re-subscribe to our STANDARD or PRO Plan, your codes will be reactivated.",
    },
    {
      question:
        "SUBSCRIPTION – Does AR Code Magic offer a premium plan with unlimited scans?",
      answer:
        "AR Code Magic does not offer any plan with unlimited scans because the server infrastructure requires resources to support AR codes.",
    },
    {
      question:
        "SUBSCRIPTION – What If I exceed the limits of scans in my premium plan?",
      answer:
        "Our company will remind you via e-mail when you approach your scan limits. Whether you decide to re-subscribe or not, extra scans will incur additional charges. In the STANDARD plan, you are charged $0.10 per scan, and in the PRO plan you are charged $0.05 per scan for every scan that exceeds your limit.",
    },
    {
      question: "AR RENDER – How can I control where an AR experience appears?",
      answer:
        "You cannot control where an AR experience appears because it is based on your location and environment. The placement is determined by these factors and cannot be explicitly specified.",
    },
    {
      question:
        "AR RENDER - Can I use my domain URL or host AR Code technology locally?",
      answer:
        "AR Code experiences are hosted on the arcodemagic.com cloud server and cannot be localized on your own server or URL. However, we do offer a Custom Page solution where you can add your business details alongside the AR experience. For more information, please see our guide to custom pages.",
    },
    {
      question:
        "AR RENDER - Can I view AR Code Magic Apple Vision headsets or experiences using Meta Quest?",
      answer:
        "Yes, both Meta Quest headsets and Apple Vision headsets are capable of viewing 3D models and AR Video experiences.",
    },
    {
      question:
        "AR RENDER – Can users modify the lighting settings for an immersive AR experience?",
      answer:
        "Users cannot directly change the lighting settings for an immersive AR experience. They can only improve the texture of the object to make it appear brighter. AR experiences use natural lighting from your environment for rendering. However, users should keep their operating systems up to date, as both Apple and Android frequently update their AR rendering capabilities.",
    },
    {
      question: "AR RENDER - How is AI Code different from traditional AR Codes?",
      answer:
        "AI Codes are the latest and most advanced AR Codes integrated with artificial intelligence. They offer a more personalized experience by providing an AI-driven AR experience compared to traditional AR Codes.",
    },
    {
      question:
        "AR RENDER – Can I prepare 3D models for mobile AR display?",
      answer:
        "Yes, you can optimize 3D models for mobile AR display, which is essential for a smooth AR experience. For more details, please refer to our guide on 3D model optimization for AR.",
    },
    {
      question:
        "ACCOUNT - If I delete my AR Code account, what will happen to my data?",
      answer:
        "If you delete your AR Code account, all of your data will be permanently removed from our website and your subscription will be canceled.",
    },
    {
      question:
        "ACCOUNT - Can I add any kind of sound or audio to an AR Code experience?",
      answer:
        "You cannot add sound to the 3D model AR experience at AR Code Magic. Audio is only available with the AR video experience.",
    },
    {
      question:
        "ACCOUNT - Can I customize the AR experience or attach it to other images?",
      answer:
        "AR Code Magic does not allow or support custom AR rendering beyond the provided features.",
    },
    {
      question:
        "ACCOUNT – What type of 3D file formats are allowed by AR Code Magic?",
      answer:
        "AR Code Magic supports .GLB, .USDZ, .PLY, .STL, .FBX, .OBJ, .X3D, and .GLTF formats, as well as .ZIP files containing 3D models and texture paths. For other formats like .DAE, .ABC, .USDZ, .STP, and .IGS, please contact our support team or watch our tutorial.",
    },
    {
      question:
        "What should be the maximum file size for 3D model uploads on AR Code Magic?",
      answer:
        "If you need to upload a file larger than 15 MB, please contact our support team. You can also refer to our tutorials on optimizing AR experience sizes. Reducing image texture size and changing file formats can automatically decrease file sizes.",
    },
    {
      question:
        "ACCOUNT - Can I customize the design of an AR Code Magic?",
      answer:
        "Yes, you can customize the design of an AR Code using our latest code design tool, which is available with a premium subscription. This tool allows you to resize and modify colors, frames, or logos to suit your needs.",
    },
    {
      question:
        "ACCOUNT – How can I display multiple 3D models within one AR Code Magic experience?",
      answer:
        "AR Code Magic can only display a single 3D model at a time. If you want to show multiple 3D models in one scan, you must create a 3D scene that incorporates all the models.",
    },
    {
      question:
        "ACCOUNT – By what means will I be able to update the video or 3D model content of an AR Code Magic?",
      answer:
        "You can update your content directly from your dashboard by clicking the edit button to access the content update field.",
    },
    {
      question:
        "ACCOUNT - Can I keep my AR Code active after 24 hours with AR Code Object Capture?",
      answer:
        "If you want your AR Code to remain active after creating it with AR Code Object Capture, you must use the “Save on AR Code” button while entering your API Key. For further assistance, please contact our support team.",
    },
  ];

  const filteredQuestions = questions.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* Header Section */}
      <h2 className="text-center fw-bold text-primary-color mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-muted web-font-size mb-5">
        Here are the frequently asked questions about the AR Code Magic services
        and features. If you cannot find the answer to your query, please{" "}
        <Link to="/contact-us" className="text-decoration-none">
          contact us
        </Link>
        .
      </p>

      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-100 mx-auto"
          placeholder="Search for a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FAQ Section */}
      <div className="accordion" id="faqAccordion">
        {filteredQuestions.map((item, index) => (
          <div className="accordion-item mb-3 shadow-sm" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button fw-bold text-primary-color web-font-size ${
                  activeIndex === index ? "" : "collapsed"
                }`}
                type="button"
                aria-expanded={activeIndex === index}
                aria-controls={`collapse${index}`}
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
                <span className="ms-auto">
                  <i
                    className={`bi ${
                      activeIndex === index
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    }`}
                  ></i>
                </span>
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
