import React, { useState } from "react";
import { Link } from "react-router-dom";
const DD6_ARLogoSection = () => {
  const [logo, setLogo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [depth, setDepth] = useState(5);
  const [gloss, setGloss] = useState(5);
  const [scale, setScale] = useState(5);
  const [orientation, setOrientation] = useState("vertical");
  const [overlay, setOverlay] = useState("overlay+");

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
      setUploadProgress(100); // Simulate the upload process
    }
  };

  return (
    <div className="row custom-row">
      {/* Property Side */}
      <div className="col-md-6 custom-col">
        <div className="property-side">
          {/* Upload Section */}
          <div className="upload-container">
            <label htmlFor="file-upload" className="form-label">
              Drop a .svg file - 200Ko max
            </label>
            <input
              type="file"
              id="file-upload"
              className="form-control"
              accept=".svg"
              onChange={handleLogoUpload}
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
          </div>

          {/* Range Sliders */}
          <div className="mt-3">
            <label className="form-label" htmlFor="depth-range">Depth: {depth}</label>
            <input
              type="range"
              id="depth-range"
              className="form-range mt-1"
              min="1"
              max="30"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
            />
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="gloss-range">Gloss: {gloss}</label>
            <input
              type="range"
              id="gloss-range"
              className="form-range mt-1"
              min="1"
              max="10"
              value={gloss}
              onChange={(e) => setGloss(Number(e.target.value))}
            />
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="scale-range">Scale: {scale}</label>
            <input
              type="range"
              id="scale-range"
              className="form-range mt-1"
              min="1"
              max="30"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>

          {/* Dropdowns */}
          <div className="mt-3">
            <label className="form-label" htmlFor="orientation-select">Orientation:</label>
            <select
              id="orientation-select"
              className="form-select mt-1"
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="overlay-select">Overlay:</label>
            <select
              id="overlay-select"
              className="form-select mt-1"
              value={overlay}
              onChange={(e) => setOverlay(e.target.value)}
            >
              <option value="overlay+">Overlay +</option>
              <option value="overlay-">Overlay -</option>
            </select>
          </div>

          {/* Help Links */}
          <div className="mt-4">
            <small>
              Are you having difficulty getting your AR Logo? Please follow our{" "}
              {/* belog link add krna hai yahan */}
              <Link to="/user" className="text-decoration-none">
                tutorial
              </Link>{" "}
              or{" "}
              <Link to="mailto:support@example.com" className="text-decoration-none">
                send us your SVG file
              </Link>.
            </small>
          </div>
        </div>
      </div>

      {/* Result Side */}
      <div className="col-md-6 text-center custom-col">
        <div className="result-side">
          {logo ? (
            <img
              src={logo}
              alt="Uploaded Logo"
              style={{
                width: `${scale * 5}%`,
                maxWidth: "100%",
                maxHeight: "100%",
                filter: `brightness(${gloss * 10}%)`,
                transform: orientation === "vertical" ? "rotate(0deg)" : "rotate(90deg)",
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
              <span>Your AR Logo</span>
            </div>
          )}

          {/* Immersive AR Properties */}
          <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
            <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
            <p className="mb-1">Width: 10.52 cm</p>
            <p className="mb-1">Height: 4.85 cm</p>
            <p className="mb-1">Depth: {depth / 10} cm</p>
            <p className="mb-1">Weight: 0.08 Mo</p>
            <p className="mb-0">Loading: 0.1 s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DD6_ARLogoSection;
