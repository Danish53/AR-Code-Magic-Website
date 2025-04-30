import React, { useState } from "react";
import { Link } from "react-router-dom";
const DD5_ARVideoSection = () => {
  const [video, setVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
      setUploadProgress(100); // Simulate the upload process
    }
  };

  return (
    <div className="row custom-row">
      {/* Select Video Section */}
      <div className="col-md-6 custom-col">
        <div className="upload-container">
          <label htmlFor="file-upload" className="form-label">
            Drop a .mp4 or .mov - 100MB max
          </label>
          <input
            type="file"
            id="file-upload"
            className="form-control"
            accept=".mp4, .mov"
            onChange={handleVideoUpload}
          />
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

          <div className="mt-4">
            <small>
              Are you having difficulty getting your AR Code Magic or working with other video file
              formats? Please follow our{" "}
              {/* belog link add krana hai               */}
              <Link to="/user" className="text-decoration-none">
                tutorial
              </Link>{" "}
              or{" "}
              <Link to="mailto:support@example.com" className="text-decoration-none">
                send us your video file
              </Link>.
            </small>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="col-md-6 text-center custom-col">
        <div className="result-container">
          {video ? (
            <video
              src={video}
              controls
              style={{
                width: "100%",
                height: "300px",
                objectFit: "contain",
                border: "1px solid #ccc",
              }}
            ></video>
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
              <span>Your AR Video</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DD5_ARVideoSection;
