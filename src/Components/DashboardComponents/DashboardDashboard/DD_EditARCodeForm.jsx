import React, { useState } from "react";
import { FiLink, FiLock, FiFileText, FiBarChart, } from "react-icons/fi";
import { AiOutlineLink, AiOutlineLock, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { BiTargetLock } from 'react-icons/bi';
function DD_EditARCodeForm() {
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
        <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="mb-4">Edit this AR Code Magic</h3>
            <form>
                {/* Reference Name */}
                <div className="mb-3">
                    <label htmlFor="referenceName" className="form-label">
                        Reference name:
                    </label>
                    <input
                        type="text"
                        id="referenceName"
                        className="form-control"
                        placeholder=""
                    />
                </div>

                {/* AI Code Prompt */}
              <div className=" mb-3">
                      <div>
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

                {/* AI Button Title */}
                <div className="mb-3">
                    <label htmlFor="aiButtonTitle" className="form-label">
                        AI button title (optional):
                    </label>
                    <input
                        type="text"
                        id="aiButtonTitle"
                        className="form-control"
                        placeholder=""
                    />
                </div>

                {/* Custom Link */}
                <div className="mb-3">
                    <label className="form-label">
                        <FiLink className="me-1" /> Custom Link (optional):
                    </label>
                    {/* <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your text here (Max 40 chars)"
            />
            <input
              type="url"
              className="form-control"
              placeholder="https://rankupmagic.com"
              defaultValue="https://rankupmagic.com"
            />
          </div> */}
                    <div className="input-group mb-2">
                        <span className="input-group-text">
                            <AiOutlineEdit size={20} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your text here (Max 40 chars)"
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">
                            <AiOutlineLink size={20} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your URL here (https://...)"
                        />
                    </div>
                </div>

                {/* Password Restriction */}
                <div className="mb-3">
                    <label className="form-label">
                        <FiLock className="me-1" /> Password restriction (optional):
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <AiOutlineLock size={20} />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Type your password here"
                        />
                    </div>
                </div>

                {/* Custom Page */}
                <div className="mb-3">
                    <label className="form-label">
                        <FiFileText className="me-1" /> Custom Page (optional):
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <AiOutlineEdit size={20} />
                        </span>
                        <select className="form-select">
                            <option value="">None</option>
                            <option value="page1">Custom Page 1</option>
                            <option value="page2">Custom Page 2</option>
                        </select>
                    </div>
                </div>

                {/* Tracking Pixels */}
                <div className="mb-3">
                    <label className="form-label">
                        <FiBarChart className="me-1" /> Tracking Pixels (optional):
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BiTargetLock size={20} />
                        </span>
                        <select className="form-select">
                            <option value="">None</option>
                            <option value="pixel1">Pixel 1</option>
                            <option value="pixel2">Pixel 2</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-danger me-2">
                        Delete
                    </button>
                    <button type="button" className="btn btn-secondary me-2">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DD_EditARCodeForm;
