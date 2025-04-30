import React, { useState } from "react";
import { Link } from "react-router-dom";
const DD3_ARPortalSection = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  return (

      <div className="row custom-row">
        {/* Property Side */}
        <div className="col-md-6 custom-col">
          <div className="property-side">
            <div className="upload-container">
              <label htmlFor="file-upload" className="form-label">
                Drop a .png or .jpg - 25MB max
              </label>
              <input
                type="file"
                id="file-upload"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
              />
              <Link
                to="/user"
                className="d-block mt-2 text-decoration-none"
              >
                360° photos examples
              </Link>

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className="progress mt-2" style={{ height: "5px" }}>
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
            </div>
          </div>
        </div>

        {/* Result Side */}
        <div className="col-md-6 text-center custom-col">
          <div className="result-side">
            {image ? (
              <div className="immersive-image-container">
                <img
                  src={image}
                  alt="Uploaded Preview"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  background: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  color: "#666",
                  margin: "auto",
                }}
              >
                Your 360 photo
              </div>
            )}

            {/* <div className="mt-3">
              <h5>Immersive AR</h5>
              <p>
                Width: 339.99 cm <br />
                Height: 339.99 cm <br />
                Depth: 340.00 cm <br />
                Weight: 2.13 Mo <br />
                Loading: 2.1 s
              </p>
            </div> */}
               <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
            <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
            <p className="mb-1">Width: 339.99 cm</p>
            <p className="mb-1">Height: 339.99 cm</p>
            <p className="mb-1">Depth: 340.00 cm</p>
            <p className="mb-1">Weight: 2.13 Mo</p>
            <p className="mb-0">Loading: 2.1 s</p>
          </div>
          </div>
        </div>
      </div>

  );
};

export default DD3_ARPortalSection;
