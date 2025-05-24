import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

const DD6_ARLogoSection = () => {
const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [depth, setDepth] = useState(2);
  const [gloss, setGloss] = useState(3);
  const [scale, setScale] = useState(2);
  const [orientation, setOrientation] = useState("x");
  const [overlay, setOverlay] = useState(0);
  const [modelUrl, setModelUrl] = useState("model/7_fb6c9b8a.glb");
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");


    const [formData, setFormData] = useState({
    reference_name: "",
    content: "",
    url: "",
    password: "",
    tracking_pixel: "",
    custom_page: "",
  });

  const debounceTimeout = useRef(null);
  const hasUploaded = useRef(false);

  // Upload the file initially
  const handleLogoUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setUploadProgress(0);
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", "7");
    formData.append("depth", depth/200);
    formData.append("gloss", gloss/10);
    formData.append("scale", scale/2);
    formData.append("orientation", orientation);
    formData.append("overlay", overlay);
    formData.append("type_name", uploadedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/logo-model`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      if (response.data?.data?.model_path) {
        setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
        hasUploaded.current = true; // Allow further debounced updates
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced update after file uploaded
  useEffect(() => {
    if (!file || !hasUploaded.current) return;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      updateModelAfterSettingsChange();
    }, 800); // Debounce 800ms
  }, [depth, gloss, scale, orientation, overlay]);

  // Function to call logo-model update again
  const updateModelAfterSettingsChange = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("user_id", "7");
    formData.append("depth", depth/200);
    formData.append("gloss", gloss/10);
    formData.append("scale", scale/2);
    formData.append("orientation", orientation);
    formData.append("overlay", overlay);
    formData.append("type_name", file);

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/logo-model`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.data?.model_path) {
        setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      }
    } catch (error) {
      console.error("Error updating model:", error);
    } finally {
      setLoading(false);
    }
  };

    const handleGenerateQRCode = async () => {
    const { reference_name, content, url, password, tracking_pixel, custom_page } = formData;

    if (!reference_name) {
      alert("Please provide a reference name.");
      return;
    }

    const formDataQR = new FormData();
    formDataQR.append("user_id", "7");
    formDataQR.append("ar_type", "AR Logo");
    formDataQR.append('depth', depth/200);
    formDataQR.append('gloss', gloss/10);
    formDataQR.append('scale', scale/2);
    formDataQR.append('orientation', orientation);
    formDataQR.append('overlay', overlay);
    formDataQR.append("reference_name", reference_name);
    formDataQR.append("content", content);
    formDataQR.append("url", url);
    formDataQR.append("password", password);
    formDataQR.append("tracking_pixel", tracking_pixel);
    formDataQR.append("custom_page", custom_page);
    formDataQR.append("arPhoto", file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcode`, formDataQR, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      if (response.data.success) {
        setQrCodeUrl(response.data.data.qr_code);
      } else {
        alert("Failed to generate QR code. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error generating QR code:", error);
      alert("Failed to generate QR Code. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {qrCodeUrl ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      ) : (
        <form> 
          <div className=" container mt-4"> 
      <div className="row  custom-row">
        <div className="col-lg-6  custom-col">
          <div className="mb-3">
        <label htmlFor="file-upload" className="form-label">Upload Logo (.svg)</label>
        <input
          type="file"
          className="form-control"
          accept=".svg"
          onChange={handleLogoUpload}
        />
        {uploadProgress > 0 && (
          <div className="progress mt-2" style={{ height: "5px" }}>
            <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div> 

      {/* Sliders */}
      <div className="mb-3">
        <label>Depth: {depth}</label>
        <input type="range" min="1" max="8" step="1"value={depth} onChange={(e) => setDepth(parseFloat(e.target.value))} className="form-range" />
      </div>
      <div className="mb-3">
        <label>Gloss: {gloss}</label>
        <input type="range" min="1" max="8" step="1"value={gloss} onChange={(e) => setGloss(parseFloat(e.target.value))} className="form-range" />
      </div>
      <div className="mb-3">
        <label>Scale: {scale}</label>
        <input type="range" name="scale" min="1" max="5" step="1"value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="form-range" />
      </div>

      {/* Selects */}
      <div className="mb-3">
        <label>Orientation</label>
        <select className="form-select" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
          <option value="x">X</option>
          <option value="y">Y</option>
          <option value="z">Z</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Overlay</label>
        <select className="form-select" value={overlay} onChange={(e) => setOverlay(e.target.value)}>
          <option value="overlay+">Overlay +</option>
          <option value="overlay-">Overlay -</option>
        </select>
      </div>
        </div>
        <div className="col-lg-6 custom-col d-flex flex-column align-items-center">
          
      {/* Model Viewer */}
      {loading ? (
        <p>Loading model...</p>
      ) : modelUrl ? (
        <model-viewer
          src={modelUrl}
          alt="3D Model"
          ar
          auto-rotate
          camera-controls
          style={{ width: "300px", height: "300px" }}
        ></model-viewer>
      ) : (
        <p>No model uploaded</p>
      )}

            {/* Dimensions Display */}
                <div className="artext-analysis w-100 p-3 border rounded bg-light">
                  <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
                  <p className="mb-1">Width:  cm</p>
                  <p className="mb-1">Height:cm</p>
                  <p className="mb-1">Depth: {depth * 2} cm</p>
                  <p className="mb-1">Weight:  Mo</p>
                  <p className="mb-0">Loading: 6 s</p>
                </div>
        </div>
        
      </div>

    </div>
          {/* Additional Form Fields */}
          <div className="bg-white p-4 mt-4 rounded shadow-sm">
            <div className="mb-4">
              <label htmlFor="referenceName" className="form-label-dash fw-bold">
                2) Type a reference name*
              </label>
              <input
                type="text"
                id="referenceName"
                className="form-control"
                placeholder="e.g. Product 56754"
                name="reference_name"
                value={formData.reference_name}
                onChange={handleChange}
              />
            </div>

            <h5 className="fw-bold">3) Options</h5>
            <div className="mt-3">
              <div className="mb-3">
                <label className="form-label-dash">
                  <strong>- Custom Link (optional):</strong> Add a custom link to
                  display a banner at the bottom of your augmented reality
                  rendering.
                </label>
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <AiOutlineEdit size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your text here (Max 40 chars)"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
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
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-dash">
                  <strong>- Password Restriction (optional):</strong> By adding a
                  password, you can restrict access to your AR Code Magic; leave
                  it blank for no restriction.
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiOutlineLock size={20} />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Type your password here"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-dash">
                  <strong>- Tracking Pixels (optional):</strong> Add your
                  targeting pixels below from the list. Please make sure to enable
                  them in the pixels settings.
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <BiTargetLock size={20} />
                  </span>
                  <select
                    className="form-select"
                    name="tracking_pixel"
                    value={formData.tracking_pixel}
                    onChange={handleChange}
                  >
                    <option value="">None</option>
                    <option value="pixel1">Pixel 1</option>
                    <option value="pixel2">Pixel 2</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-dash">
                  <strong>- Custom Page (optional):</strong> Please make sure to
                  enable it in the custom pages settings.
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <AiOutlineEdit size={20} />
                  </span>
                  <select
                    className="form-select"
                    name="custom_page"
                    value={formData.custom_page}
                    onChange={handleChange}
                  >
                    <option value="">None</option>
                    <option value="page1">Custom Page 1</option>
                    <option value="page2">Custom Page 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4 mb-4 w-25 mx-auto">
            <button type="button" onClick={handleGenerateQRCode} className="btn btn-success w-100">
              {loading ? "Loading...." : "Create"}
            </button>
          </div>
        </form>)
      }
    </>
  );
};

export default DD6_ARLogoSection;
