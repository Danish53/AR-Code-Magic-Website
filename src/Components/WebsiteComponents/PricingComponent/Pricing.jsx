// import React, { useState } from "react";
// import "./Pricing.css";
// import { Link } from "react-router-dom";
// const Pricing = () => {
//   const [activePlan, setActivePlan] = useState("monthly");

//   const plans = {
//     monthly: [
//       {
//         name: "Trial",
//         price: "Free",
//         features: ["3 AR Code Magics", "100 Scans per month", "AR Text Demo", "Personal use"],
//         buttonText: "Get Started",
//         promo: false,
//         ribbonText: null,
//       },
//       {
//         name: "Standard",
//         price: "$9.99",
//         features: ["10 AR Code Magics", "1,000 Scans per month", "AR Portal Access", "For individuals"],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "POPULAR",
//       },
//       {
//         name: "Pro",
//         price: "$19.99",
//         features: ["Unlimited AR Code Magics", "Unlimited Scans", "Priority Support", "For businesses"],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "SAVE 17%",
//       },
//     ],
//     yearly: [
//       {
//         name: "Trial",
//         price: "Free",
//         features: ["3 AR Code Magics", "100 Scans per month", "AR Text Demo", "Personal use"],
//         buttonText: "Get Started",
//         promo: false,
//         ribbonText: null,
//       },
//       {
//         name: "Standard",
//         price: "$99.99",
//         features: ["10 AR Code Magics", "1,000 Scans per month", "AR Portal Access", "For individuals"],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "POPULAR",
//       },
//       {
//         name: "Pro",
//         price: "$199.99",
//         features: ["Unlimited AR Code Magics", "Unlimited Scans", "Priority Support", "For businesses"],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "SAVE 17%",
//       },
//     ],
//   };

//   return (
//     <div className="container my-5">
//       <div className="text-center">
//         <h1>Choose your AR Code Magic plan</h1>
//         <p className="text-center featureH" style={{ fontSize: "19px" }}>
//           Our four iOS apps{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Code Magic Object Capture
//           </Link>
//           ,{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Text
//           </Link>
//           ,{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Portal
//           </Link>
//           , and{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Frame
//           </Link>
//           {' '}offer dedicated in-app plans.
//         </p>


//         <div className="toggle-container my-4">
//           <div className="btn-group">
//             <button
//               className={`btn ${activePlan === "monthly" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActivePlan("monthly")}
//             >
//               Monthly
//             </button>
//             <button
//               className={`btn ${activePlan === "yearly" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActivePlan("yearly")}
//             >
//               Yearly
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {plans[activePlan].map((plan, index) => (
//           <div className="col-md-4" key={index}>
//             <div className="card price-table text-center mb-4">
//               {/* <div className={`card price-table text-center ${plan.promo ? "border-success" : ""} mb-4`}> */}
//               {plan.ribbonText && (
//                 <div className="corner-ribbon top-left text-white">{plan.ribbonText}</div>
//               )}
//               <div className="card-body">
//                 <h3 className="card-title text-primary-color fw-bold">{plan.name}</h3>
//                 <h4 className="card-price text-secondary my-3 fw-bold">{plan.price}</h4>
//                 <ul className="list-unstyled">
//                   {plan.features.map((feature, i) => (
//                     <li key={i}>{feature}</li>
//                   ))}
//                 </ul>
//                 <Link to="/user/register" className="btn btn-custom btn-lg btn-success rounded-pill mt-3">
//                   {plan.buttonText}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pricing;









// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Pricing.css";

// // PriceCard component with independent "expanded" state for each card.
// const PriceCard = ({ plan }) => {
//   const [expanded, setExpanded] = useState(false);

//   // These values set the height for the features container.
//   const collapsedHeight = "100px"; // Show roughly 4 features initially
//   const expandedHeight = "500px";  // High enough to display full list when expanded

//   return (
//     <div className="col-md-4">
//       {/* Removed h-100 so each card's height is determined by its content and CSS */}
//       <div className={`card price-table text-center mb-4 ${plan.promo ? "border-success" : ""}`}>
//         {plan.ribbonText && (
//           <div className="corner-ribbon top-left text-white">{plan.ribbonText}</div>
//         )}
//         <div className="card-body d-flex flex-column">
//           <h3 className="card-title text-primary-color fw-bold">{plan.name}</h3>
//           <h4 className="card-price text-secondary my-3 fw-bold">{plan.price}</h4>
//           {/* Features container with a smooth transition */}
//           <div
//             className="features-container mb-3"
//             style={{
//               maxHeight: expanded ? expandedHeight : collapsedHeight,
//               overflow: "hidden",
//               transition: "max-height 0.3s ease"
//             }}
//           >
//             <ul className="list-unstyled mb-0">
//               {plan.features.map((feature, i) => (
//                 <li key={i}>{feature}</li>
//               ))}
//             </ul>
//           </div>
//           {/* Subscribe now button */}
//           <Link
//             to="/user/register"
//             className="btn btn-custom btn-lg btn-success rounded-pill"
//           >
//             {plan.buttonText}
//           </Link>
//           {/* "Show More/Less" toggle appears below the subscribe button */}
//           {plan.features.length > 4 && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="btn btn-link mt-2"
//               style={{ textDecoration: "underline" }}
//             >
//               {expanded ? "Show Less" : "Show More"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Pricing = () => {
//   const [activePlan, setActivePlan] = useState("monthly");

//   const plans = {
//     monthly: [
//       {
//         name: "Trial",
//         price: "Free",
//         features: [
//           "3 AR Code Magics",
//           "100 Scans per month",
//           "AR Text Demo",
//           "Personal use",
//         ],
//         buttonText: "Get Started",
//         promo: false,
//         ribbonText: null,
//       },
//       {
//         name: "Standard",
//         price: "$9.99",
//         features: [
//           "100 AR Codes",
//           "10,000 Scans per month",
//           "Detailed Scan Statistics",
//           "3D Files Upload",
//           "AR Face, AR Photo",
//           "AR Portal",
//           "AR Logo",
//           "AR Text",
//           "AR Video",
//           "AR Code Object Capture",
//           "AI Code & AR Data API",
//           "3D Models Download",
//           "Custom Links",
//           "100 Custom Pages",
//           "100 Retargeting Tracking",
//           "Advanced AR Code design customization",
//           "Export Data",
//           "AR Code Studio",
//           "API Key",
//           "Password Restriction",
//           "Premium Support",
//           "Commercial Licence",
//         ],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "POPULAR",
//       },
//       {
//         name: "Pro",
//         price: "$19.99",
//         features: [
//           "1,000 AR Codes",
//           "100,000 Scans per month",
//           "10 Team Members",
//           "Detailed Scan Statistics",
//           "3D Files Upload",
//           "AR Face, AR Photo",
//           "AR Portal",
//           "AR Logo",
//           "AR Text",
//           "AR Video",
//           "AR Code Object Capture",
//           "AI Code & AR Data API",
//           "3D Models Download",
//           "Custom Links",
//           "1,000 Custom Pages",
//           "1,000 Retargeting Tracking",
//           "Advanced AR Code design customization",
//           "Export Data",
//           "AR Code Studio",
//           "API Key",
//           "Password Restriction",
//           "Dedicated Support",
//           "Commercial Licence",
//           "Reseller Licence",
//         ],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "SAVE 17%",
//       },
//     ],
//     yearly: [
//       {
//         name: "Trial",
//         price: "Free",
//         features: [
//           "3 AR Code Magics",
//           "100 Scans per month",
//           "AR Text Demo",
//           "Personal use",
//         ],
//         buttonText: "Get Started",
//         promo: false,
//         ribbonText: null,
//       },
//       {
//         name: "Standard",
//         price: "$99.99",
//         features: [
//           "100 AR Codes",
//           "10,000 Scans per month",
//           "Detailed Scan Statistics",
//           "3D Files Upload",
//           "AR Face, AR Photo",
//           "AR Portal",
//           "AR Logo",
//           "AR Text",
//           "AR Video",
//           "AR Code Object Capture",
//           "AI Code & AR Data API",
//           "3D Models Download",
//           "Custom Links",
//           "100 Custom Pages",
//           "100 Retargeting Tracking",
//           "Advanced AR Code design customization",
//           "Export Data",
//           "AR Code Studio",
//           "API Key",
//           "Password Restriction",
//           "Premium Support",
//           "Commercial Licence",
//         ],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "POPULAR",
//       },
//       {
//         name: "Pro",
//         price: "$199.99",
//         features: [
//           "1,000 AR Codes",
//           "100,000 Scans per month",
//           "10 Team Members",
//           "Detailed Scan Statistics",
//           "3D Files Upload",
//           "AR Face, AR Photo",
//           "AR Portal",
//           "AR Logo",
//           "AR Text",
//           "AR Video",
//           "AR Code Object Capture",
//           "AI Code & AR Data API",
//           "3D Models Download",
//           "Custom Links",
//           "1,000 Custom Pages",
//           "1,000 Retargeting Tracking",
//           "Advanced AR Code design customization",
//           "Export Data",
//           "AR Code Studio",
//           "API Key",
//           "Password Restriction",
//           "Dedicated Support",
//           "Commercial Licence",
//           "Reseller Licence",
//         ],
//         buttonText: "Subscribe Now",
//         promo: true,
//         ribbonText: "SAVE 17%",
//       },
//     ],
//   };

//   return (
//     <div className="container my-5">
//       <div className="text-center">
//         <h1>Choose your AR Code Magic plan</h1>
//         <p className="text-center featureH" style={{ fontSize: "19px" }}>
//           Our four iOS apps{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Code Magic Object Capture
//           </Link>
//           ,{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Text
//           </Link>
//           ,{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Portal
//           </Link>
//           , and{" "}
//           <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
//             AR Frame
//           </Link>{" "}
//           offer dedicated in-app plans.
//         </p>

//         <div className="toggle-container my-4">
//           <div className="btn-group">
//             <button
//               className={`btn ${activePlan === "monthly" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActivePlan("monthly")}
//             >
//               Monthly
//             </button>
//             <button
//               className={`btn ${activePlan === "yearly" ? "btn-success" : "btn-outline-success"}`}
//               onClick={() => setActivePlan("yearly")}
//             >
//               Yearly
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {plans[activePlan].map((plan, index) => (
//           <PriceCard key={index} plan={plan} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pricing;











import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

// PriceCard component with independent "expanded" state for each card.
const PriceCard = ({ plan }) => {
  const [expanded, setExpanded] = useState(false);

  // These values set the height for the features container.
  const collapsedHeight = "100px"; // Show roughly 4 features initially
  const expandedHeight = "500px";  // High enough to display full list when expanded

  return (
    <div className="col-md-6 col-lg-4">
      {/* Removed the conditional border-success class */}
      <div className="card price-table text-center mb-4">
        {plan.ribbonText && (
          <div className="corner-ribbon top-left text-white">{plan.ribbonText}</div>
        )}
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-primary-color fw-bold">{plan.name}</h3>
          <h4 className="card-price text-secondary my-3 fw-bold">{plan.price}</h4>
          {/* Features container with a smooth transition */}
          <div
            className="features-container mb-3"
            style={{
              maxHeight: expanded ? expandedHeight : collapsedHeight,
              overflow: "hidden",
              transition: "max-height 0.3s ease"
            }}
          >
            <ul className="list-unstyled mb-0">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Subscribe now button */}
          <Link
            to="/user/register"
            className="btn btn-custom btn-lg btn-success rounded-pill"
          >
            {plan.buttonText}
          </Link>
          {/* "Show More/Less" toggle appears below the subscribe button */}
          {plan.features.length > 4 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn btn-link btn-link-custom-price mt-2"
              style={{ textDecoration: "underline" }}
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("monthly");

  const plans = {
    monthly: [
      {
        name: "Trial",
        price: "Free",
        features: [
          "3 AR Code Magics",
          "100 Scans per month",
          "AR Text Demo",
          "Personal use",
        ],
        buttonText: "Get Started",
        promo: false,
        ribbonText: null,
      },
      {
        name: "Standard",
        price: "$89.99",
        features: [
          "100 AR Codes",
          "10,000 Scans per month",
          "Detailed Scan Statistics",
          "3D Files Upload",
          "AR Face, AR Photo",
          "AR Portal",
          "AR Logo",
          "AR Text",
          "AR Video",
          "AR Code Object Capture",
          "AI Code & AR Data API",
          "3D Models Download",
          "Custom Links",
          "100 Custom Pages",
          "100 Retargeting Tracking",
          "Advanced AR Code design customization",
          "Export Data",
          "AR Code Studio",
          "API Key",
          "Password Restriction",
          "Premium Support",
          "Commercial Licence",
        ],
        buttonText: "Subscribe Now",
        promo: true,
        ribbonText: "POPULAR",
      },
      {
        name: "Pro",
        price: "$989.99",
        features: [
          "1,000 AR Codes",
          "100,000 Scans per month",
          "10 Team Members",
          "Detailed Scan Statistics",
          "3D Files Upload",
          "AR Face, AR Photo",
          "AR Portal",
          "AR Logo",
          "AR Text",
          "AR Video",
          "AR Code Object Capture",
          "AI Code & AR Data API",
          "3D Models Download",
          "Custom Links",
          "1,000 Custom Pages",
          "1,000 Retargeting Tracking",
          "Advanced AR Code design customization",
          "Export Data",
          "AR Code Studio",
          "API Key",
          "Password Restriction",
          "Dedicated Support",
          "Commercial Licence",
          "Reseller Licence",
        ],
        buttonText: "Subscribe Now",
        promo: true,
        ribbonText: "SAVE 17%",
      },
    ],
    yearly: [
      {
        name: "Trial",
        price: "Free",
        features: [
          "3 AR Code Magics",
          "100 Scans per month",
          "AR Text Demo",
          "Personal use",
        ],
        buttonText: "Get Started",
        promo: false,
        ribbonText: null,
      },
      {
        name: "Standard",
        price: "$889.99",
        features: [
          "100 AR Codes",
          "10,000 Scans per month",
          "Detailed Scan Statistics",
          "3D Files Upload",
          "AR Face, AR Photo",
          "AR Portal",
          "AR Logo",
          "AR Text",
          "AR Video",
          "AR Code Object Capture",
          "AI Code & AR Data API",
          "3D Models Download",
          "Custom Links",
          "100 Custom Pages",
          "100 Retargeting Tracking",
          "Advanced AR Code design customization",
          "Export Data",
          "AR Code Studio",
          "API Key",
          "Password Restriction",
          "Premium Support",
          "Commercial Licence",
        ],
        buttonText: "Subscribe Now",
        promo: true,
        ribbonText: "POPULAR",
      },
      {
        name: "Pro",
        price: "$9,899.99",
        features: [
          "1,000 AR Codes",
          "100,000 Scans per month",
          "10 Team Members",
          "Detailed Scan Statistics",
          "3D Files Upload",
          "AR Face, AR Photo",
          "AR Portal",
          "AR Logo",
          "AR Text",
          "AR Video",
          "AR Code Object Capture",
          "AI Code & AR Data API",
          "3D Models Download",
          "Custom Links",
          "1,000 Custom Pages",
          "1,000 Retargeting Tracking",
          "Advanced AR Code design customization",
          "Export Data",
          "AR Code Studio",
          "API Key",
          "Password Restriction",
          "Dedicated Support",
          "Commercial Licence",
          "Reseller Licence",
        ],
        buttonText: "Subscribe Now",
        promo: true,
        ribbonText: "SAVE 17%",
      },
    ],
  };

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1>Choose your AR Code Magic plan</h1>
        <p className="text-center featureH" style={{ fontSize: "19px" }}>
          Our four iOS apps{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Code Magic Object Capture
          </Link>
          ,{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Text
          </Link>
          ,{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Portal
          </Link>
          , and{" "}
          <Link className="text-decoration-none" to="#" rel="noopener noreferrer">
            AR Frame
          </Link>{" "}
          offer dedicated in-app plans.
        </p>

        <div className="toggle-container my-4">
          <div className="btn-group">
            <button
              className={`btn ${activePlan === "monthly" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActivePlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn ${activePlan === "yearly" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActivePlan("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="row ">
        {plans[activePlan].map((plan, index) => (
          <PriceCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
