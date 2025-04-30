import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import "./DD7_AICodeSection.css";

const DD7_AICodeSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyActivity: "",
    intendedUse: "",
  });
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e) => {
    setGeneratedPrompt(e.target.value);
  };

  const handleGeneratePrompt = () => {
    const { companyName, companyActivity, intendedUse } = formData;
    const prompt = `Company name: ${companyName}\nCompany activity: ${companyActivity}\nAI Code intended use: ${intendedUse}`;
    setGeneratedPrompt(prompt);
    setShowPopup(false); // Close the popup
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
          onChange={handleTextareaChange} // Enable editing in the textarea
        ></textarea>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={() => setShowPopup(true)}
        >
          Prompt generator
        </button>
      </div>

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
                <AiOutlineClose size={20} /> {/* React Icon for close */}
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
    </div>
  );
};

export default DD7_AICodeSection;
