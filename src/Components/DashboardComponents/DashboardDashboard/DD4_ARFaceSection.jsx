import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // React Icons
import arFace from "../../../assets/dashboardIMG/arface3D.png";
const DD4_ARFaceSection = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [arFilterURL, setArFilterURL] = useState("");
  const [showDropdownContent, setShowDropdownContent] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
  };

  const toggleDropdownContent = () => {
    setShowDropdownContent((prev) => !prev);
  };

  return (
    <div className="row custom-row">
      {/* Property Side */}
      <div className="col-md-6 custom-col">
        <div className="property-side">
          <h6 className="fw-bold">Create a custom AR Face filter using your own image or logo.</h6>
          <label htmlFor="file-upload" className="form-label mt-3">
            Drop a .png or .jpg - 5MB max
          </label>
          <input
            type="file"
            id="file-upload"
            className="form-control mb-2"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
          />
          {uploadProgress > 0 && (
            <div className="progress my-2" style={{ height: "5px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          {uploadProgress === 100 && (
            <small className="text-success">100% has been uploaded.</small>
          )}
          <p className="text-muted mt-3">
            Recommended image size: 1000px (width) x 660px (height).
          </p>

          {/* Dropdown for AR Filter URL */}
          <div className="dropdown mt-4">
            <button
              className="btn btn-light w-100 d-flex align-items-center justify-content-between"
              onClick={toggleDropdownContent}
            >
              <span>Use an already created Social Media AR Filter (optional)</span>
              {showDropdownContent ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {showDropdownContent && (
              <div className="dropdown-content mt-3">
                <p className="text-muted">
                  AR Filter support 3 AR ecosystems: Snapchat, Facebook, and
                  Instagram. Please indicate your AR filter URL:
                </p>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter AR filter URL"
                  value={arFilterURL}
                  onChange={(e) => setArFilterURL(e.target.value)}
                />
                <small className="d-block text-muted" style={{ wordWrap: "break-word" }}>
                  Examples:
                  <br />
                  https://www.instagram.com/ar/799387080697110
                  <br />
                  https://www.facebook.com/fbcameraeffects/tryit/1090970611762642
                  <br />
                  https://lens.snapchat.com/f27d28c01a2240ee9154b8832cf3cd73
                  <br />
                  https://t.snapchat.com/6XFjeaaK
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Result Side */}
      <div className="col-md-6 text-center custom-col">
        <div className="result-side">
          {image ? (
            <img
              src={image}
              alt="Uploaded Image"
              style={{
                width: "100%",
                maxWidth: "300px",
                maxHeight: "300px",
                filter: "brightness(100%)",
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "300px",
                border: "1px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f0f0f0",
              }}
            >
              <span>Your AR Face</span>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default DD4_ARFaceSection;
