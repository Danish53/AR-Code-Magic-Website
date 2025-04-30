
import React, { useState, useEffect } from "react";
import "./DD1_ArTextSection.css";
import axios from "axios";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

// const socket = io(import.meta.env.VITE_DOMAIN);

const DD1_ArTextSection = () => {
  const navigate = useNavigate();

  // States for form input
  const [text, setText] = useState("");
  const [font, setFont] = useState("ArchitectsDaughter-Regular");
  const [color, setColor] = useState("#0000ff");
  const [depth, setDepth] = useState(3);
  const [gloss, setGloss] = useState(4);
  const [scale, setScale] = useState(3);
  const [orientation, setOrientation] = useState("X");
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("model/46f2fc9f.glb");
  const [dimensions, setDimensions] = useState({
    width: 93.5,
    height: 20.0,
    weight: 0.29,
    loading: 6,
  });

  // Font list from the file
  const fontList = [
    "ArchitectsDaughter-Regular",
    "ZCOOLKuaiLe-Regular",
    "MaShanZheng-Regular",
    "ZhiMangXing-Regular",
    "LongCang-Regular"
  ];

  // Convert hex to normalized RGB (0-1 range)
  const hexToNormalizedRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return `${r} ${g} ${b}`;
  };

  // Form data state
  const [formData, setFormData] = useState({
    type_name: text,
    ar_type: "AR Text",
    font: font,
    color: color,
    depth: depth / 20,
    gloss: gloss / 10,
    scale: scale / 2,
    orientation: orientation,
    reference_name: text,
    content: "",
    url: "",
    password: "",
    tracking_pixel: "",
    custom_page: "",
    user_id: "7",
  });

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update local states
    // if (name === "font") setFont(value);
    if (name === "font") {
      setFont(value); // Update font state
      setFormData((prev) => ({
        ...prev,
        font, // Ensure font is updated in formData
      }));
    }
    // if (name === "color") setColor(hexToNormalizedRgb(value));
    if (name === "color") {
      setColor(value);
      setFormData((prev) => ({
        ...prev,
        color: hexToNormalizedRgb(value),
      }));
    }

    if (name === "depth") setDepth(parseFloat(value));
    if (name === "gloss") setGloss(parseFloat(value));
    if (name === "scale") setScale(parseFloat(value));
    if (name === "orientation") setOrientation(value);

    // Trigger API call for specific fields (except color)
    if (["depth", "gloss", "scale", "orientation", "font"].includes(name)) {
      debouncedSendUpdatedData();
    }


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fontStyle = {
    fontFamily: font, // Dynamically apply the selected font family
  };

  // Handle color picker blur (when color picker is closed)
  const handleColorPickerBlur = () => {
    debouncedSendUpdatedData();
  };

  // Send updated data to the server
  const sendUpdatedData = async () => {
    try {
      setLoading(true);
      const updatedFormData = {
        ...formData,
        font: font,
        depth: depth / 20,
        gloss: gloss / 100,
        scale: scale / 2,
        color: hexToNormalizedRgb(color), // Normalized RGB in 0-1 range
      };
      console.log(updatedFormData, "updated form....")
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/update-model`,
        updatedFormData
      );
      // console.log(response, "ok ker yar") 
      if (response.data.success) {
        console.log("Model updated successfully", response);

        setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      } else {
        console.error("Failed to update model");
      }
    } catch (error) {
      console.error("Error updating model:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced send updated data function
  const debouncedSendUpdatedData = debounce(sendUpdatedData, 1000);

  // Handle form submission
  const [dataa, setDataa] = useState({});
  console.log(dataa, "......dataaaa")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      font: font,
      depth: depth / 20,
      gloss: gloss / 10,
      scale: scale / 2,
      color: hexToNormalizedRgb(color), // RGB color
    };
    // console.log(updatedFormData, "updated data form..")

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcode`,
        updatedFormData
      );
      setDataa(response.data.data);
      console.log(response, "response ok wala")
      if (response.data.success) {
        setQrCodeUrl(response.data.data.qr_code);
        // const qrId = response.data.data.id; // ✅ ID jo API se mili
        // navigate(`/ar-text/${qrId}`); 
      } else {
        alert("Failed to generate QR code. Please try again.");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("An error occurred while generating the QR code.");
    } finally {
      setLoading(false);
    }
  };

  const handleOkClick = () => {
    setText(formData.type_name);
    sendUpdatedData();
  };


  return (
    <>
      {
        qrCodeUrl ? (<div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>) : (
          <form onSubmit={handleSubmit}>
            <div className="row custom-row">
              <div className="col-md-6 custom-col">
                {/* Input fields for text, font, color, depth, gloss, scale, and orientation */}
                <div className="mb-3">
                  <div className="d-flex">
                    <input
                      type="text"
                      id="arTextInput"
                      className="form-control me-2"
                      name="type_name"
                      placeholder="Your text"
                      value={formData.type_name}
                      onChange={handleChange}
                    />
                    <button type="button" onClick={handleOkClick} className="btn btn-primary text-white">
                      ok
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <select
                    id="fontSelector"
                    className="form-select"
                    name="font"
                    value={formData.font}
                    onChange={handleChange}
                  >
                    {fontList.map((fontName, index) => (
                      <option key={index} value={fontName}>
                        {fontName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 w-100">
                  <input
                    type="color"
                    id="colorPicker"
                    className="form-control form-control-color w-100"
                    name="color"
                    value={color}
                    onChange={handleChange}
                    onBlur={handleColorPickerBlur} // Trigger API call when color picker is closed

                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="depthRange" className="form-label">
                    Depth: {depth}
                  </label>
                  <input
                    type="range"
                    id="depthRange"
                    className="form-range"
                    min="1"
                    max="8"
                    name="depth"
                    value={depth}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="glossRange" className="form-label">
                    Gloss: {gloss}
                  </label>
                  <input
                    type="range"
                    id="glossRange"
                    className="form-range"
                    min="1"
                    max="6"
                    name="gloss"
                    value={gloss}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="scaleRange" className="form-label">
                    Scale: {scale}
                  </label>
                  <input
                    type="range"
                    id="scaleRange"
                    className="form-range"
                    min="1"
                    max="8"
                    name="scale"
                    value={scale}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="orientationDropdown" className="form-label">
                    Orientation
                  </label>
                  <select
                    id="orientationDropdown"
                    className="form-select"
                    name="orientation"
                    value={formData.orientation}
                    onChange={handleChange}
                  >
                    <option value="X">Vertical</option>
                    <option value="Z">Horizontal</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 custom-col d-flex flex-column align-items-center">
                {/* 3D Text Display */}
                <div
                  className="p-3 mb-3 fixed-text-container"
                  style={{
                    textAlign: "center",
                    fontStyle, // Apply font dynamically
                  }}
                >
                  {loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    modelUrl && (
                      <model-viewer
                        src={modelUrl}
                        alt="3D Text Model"
                        auto-rotate
                        camera-controls
                        style={{ width: "280px", height: "280px", padding: "20px" }}
                      ></model-viewer>
                    )
                  )}
                </div>

                {/* Dimensions Display */}
                <div className="artext-analysis w-100 p-3 border rounded bg-light">
                  <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
                  <p className="mb-1">Width: {dimensions.width} cm</p>
                  <p className="mb-1">Height: {dimensions.height} cm</p>
                  <p className="mb-1">Depth: {depth * 2} cm</p>
                  <p className="mb-1">Weight: {dimensions.weight} Mo</p>
                  <p className="mb-0">Loading: {dimensions.loading} s</p>
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
              <button type="submit" className="btn btn-success w-100">
                {loading ? "Loading...." : "Create"}
              </button>
            </div>
          </form>)
      }
    </>
  );
};

export default DD1_ArTextSection;








