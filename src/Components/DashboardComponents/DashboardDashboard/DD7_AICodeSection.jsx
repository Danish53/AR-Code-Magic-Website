// import React, { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
// import "./DD7_AICodeSection.css";

// const DD7_AICodeSection = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyActivity: "",
//     intendedUse: "",
//   });
//   const [generatedPrompt, setGeneratedPrompt] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleTextareaChange = (e) => {
//     setGeneratedPrompt(e.target.value);
//   };

//   const handleGeneratePrompt = () => {
//     const { companyName, companyActivity, intendedUse } = formData;
//     const prompt = `Company name: ${companyName}\nCompany activity: ${companyActivity}\nAI Code intended use: ${intendedUse}`;
//     setGeneratedPrompt(prompt);
//     setShowPopup(false); // Close the popup
//   };

//   return (
//     <div className="row custom-row">
//       <div className="custom-col">
//         <label htmlFor="aiCodePrompt" className="form-label">
//           Your AI Code prompt:
//         </label>
//         <textarea
//           id="aiCodePrompt"
//           className="form-control"
//           rows="3"
//           placeholder="Type your prompt or use the prompt generator..."
//           value={generatedPrompt}
//           onChange={handleTextareaChange} // Enable editing in the textarea
//         ></textarea>
//         <button
//           type="button"
//           className="btn btn-secondary mt-3"
//           onClick={() => setShowPopup(true)}
//         >
//           Prompt generator
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <div className="popup-header">
//               <h6>Generate Your AI Code Prompt</h6>
//               <button
//                 type="button"
//                 className="btn btn-close-custom"
//                 onClick={() => setShowPopup(false)}
//               >
//                 <AiOutlineClose size={20} /> {/* React Icon for close */}
//               </button>
//             </div>
//             <div className="popup-body">
//               <div className="mb-3">
//                 <label htmlFor="companyName" className="form-label">
//                   Company name:
//                 </label>
//                 <input
//                   type="text"
//                   id="companyName"
//                   name="companyName"
//                   className="form-control"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="companyActivity" className="form-label">
//                   Company activity:
//                 </label>
//                 <input
//                   type="text"
//                   id="companyActivity"
//                   name="companyActivity"
//                   className="form-control"
//                   value={formData.companyActivity}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="intendedUse" className="form-label">
//                   AI Code intended use:
//                 </label>
//                 <textarea
//                   id="intendedUse"
//                   name="intendedUse"
//                   className="form-control"
//                   rows="3"
//                   value={formData.intendedUse}
//                   onChange={handleInputChange}
//                 ></textarea>
//               </div>
//             </div>
//             <div className="popup-footer">
//               <button
//                 type="button"
//                 className="btn btn-success"
//                 onClick={handleGeneratePrompt}
//               >
//                 Generate your AI Code prompt
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DD7_AICodeSection;


import React, { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import "./DD7_AICodeSection.css";
import { useSelector } from "react-redux";

const DD7_AICodeSection = () => {
  const { user } = useSelector((state) => state.auth);
  const user_id = user?.user?.id;
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyActivity: "",
    intendedUse: "",
  });

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState(null);

  // handle inputs for popup form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle manual textarea editing
  const handleTextareaChange = (e) => {
    setGeneratedPrompt(e.target.value);
  };

  // 🧠 Combine input fields into a clean prompt
  const handleGeneratePrompt = async () => {
    const { companyName, companyActivity, intendedUse } = formData;

    if (!companyName || !companyActivity || !intendedUse) {
      toast.error("Please fill all fields before generating the prompt");
      return;
    }

    const prompt = `Company name: ${companyName}\nCompany activity: ${companyActivity}\nAI Code intended use: ${intendedUse}`;
    setGeneratedPrompt(prompt);
    setShowPopup(false);

    await handleGenerateAICode(prompt);
  };

  // 🧠 Function to call backend API
  const handleGenerateAICode = async (promptText) => {
    setLoading(true);
    try {
      const payload = {
        reference_name: formData.companyName,
        type_name: promptText,
        ar_type: "AI Code",
        user_id: user_id,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcodeAICode`,
        payload
      );

      setQrData(res.data.data);
      toast.success("AI Code QR generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to generate AI Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row custom-row">
      <div className="custom-col">
        <label htmlFor="aiCodePrompt" className="form-label">
          Your AI Code prompt:
        </label>
        <textarea
          id="aiCodePrompt"
          className="form-control"
          rows="3"
          placeholder="Type your prompt or use the prompt generator..."
          value={generatedPrompt}
          onChange={handleTextareaChange}
        ></textarea>

        <div className="d-flex align-items-center mt-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => setShowPopup(true)}
          >
            Prompt generator
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleGenerateAICode(generatedPrompt)}
            disabled={loading || !generatedPrompt}
          >
            {loading ? "Generating..." : "Create AI Code"}
          </button>
        </div>
      </div>

      {/* Popup for generating prompt */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h6>Generate Your AI Code Prompt</h6>
              <button
                type="button"
                className="btn btn-close-custom"
                onClick={() => setShowPopup(false)}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <div className="popup-body">
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company name:
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="form-control"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyActivity" className="form-label">
                  Company activity:
                </label>
                <input
                  type="text"
                  id="companyActivity"
                  name="companyActivity"
                  className="form-control"
                  value={formData.companyActivity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="intendedUse" className="form-label">
                  AI Code intended use:
                </label>
                <textarea
                  id="intendedUse"
                  name="intendedUse"
                  className="form-control"
                  rows="3"
                  value={formData.intendedUse}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="popup-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleGeneratePrompt}
              >
                Generate your AI Code prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Show generated QR */}
      {qrData && (
        <div className="text-center mt-4">
          <h5>Your AI Code QR</h5>
          <img
            src={qrData.qr_code}
            alt="AI Code QR"
            style={{ width: "200px", height: "200px" }}
          />
          {/* <p className="mt-2">
            <strong>Open link:</strong>{" "}
            <a href={qrData.qr_code_url} target="_blank" rel="noreferrer">
              {qrData.qr_code_url}
            </a>
          </p> */}
        </div>
      )}
    </div>
  );
};

export default DD7_AICodeSection;

