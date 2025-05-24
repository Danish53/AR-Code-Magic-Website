import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import axios from "axios";
import arFace from "../../../assets/dashboardIMG/arface3D.png";

const DD4_ARFaceSection = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [arFilterURL, setArFilterURL] = useState("");
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  const [modelUrl, setModelUrl] = useState("model/ee3eaf70.glb");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    reference_name: "",
    content: "",
    url: "",
    password: "",
    tracking_pixel: "",
    custom_page: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDropdownContent = (e) => {
    e.preventDefault();
    setShowDropdownContent((prev) => !prev);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG or PNG images are allowed.");
      setImage(null);
      return;
    }

    setError("");
    setSuccess("");
    setImage(file);
    setUploadProgress(0);
    setLoading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("user_id", "7");
    formDataUpload.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/face-model`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      setSuccess("Upload and model creation successful!");
      setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
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
    formDataQR.append("ar_type", "AR Face");
    formDataQR.append("reference_name", reference_name);
    formDataQR.append("content", content);
    formDataQR.append("url", url);
    formDataQR.append("password", password);
    formDataQR.append("tracking_pixel", tracking_pixel);
    formDataQR.append("custom_page", custom_page);
    formDataQR.append("arPhoto", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcode`,
        formDataQR,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response)

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


  return (
    <>
      {
        qrCodeUrl ? (<div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>) : (
          <form>
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

                  {loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    modelUrl && (
                      <model-viewer
                        src={modelUrl}
                        alt="3D Text Model"
                        ar
                        auto-rotate
                        camera-controls
                        style={{ width: "280px", height: "280px", padding: "20px" }}
                      ></model-viewer>
                    )
                  )}
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
              <button type="button" className="btn btn-success w-100" onClick={handleGenerateQRCode}>
                {loading ? "Loading...." : "Create"}
              </button>
            </div>
          </form>)
      }
    </>
  );
};

export default DD4_ARFaceSection;
