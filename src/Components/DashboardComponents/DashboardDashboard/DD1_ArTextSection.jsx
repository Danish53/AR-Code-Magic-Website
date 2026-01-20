import React, { useState } from "react";
import "./DD1_ArTextSection.css";
import axios from "axios";
import DD_OptionsForm from "./DD_OptionsForm";
import useToken from "../../../hooks/useToken.js";
import { useDispatch, useSelector } from "react-redux";
import { generateArText } from "../../../redux/arTextSlice.js";
import toast from "react-hot-toast";

const DD1_ArTextSection = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const { arTextData } = useSelector((state) => state.arText);
  const { user } = useSelector((state) => state.auth);
  const user_id = user?.user?.id;
  // --- State ---
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
  const [dimensions] = useState({
    width: 93.5,
    height: 20.0,
    weight: 0.29,
    loading: 6,
  });

  const fontList = [
    "ArchitectsDaughter-Regular",
    "ZCOOLKuaiLe-Regular",
    "MaShanZheng-Regular",
    "ZhiMangXing-Regular",
    "LongCang-Regular",
  ];

  // --- Convert hex to normalized RGB ---
  const hexToNormalizedRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return `${r} ${g} ${b}`;
  };

  // --- Form Data ---
  const [formData, setFormData] = useState({
    type_name: text,
    ar_type: "AR Text",
    font,
    color: hexToNormalizedRgb(color),
    depth: depth / 20,
    gloss: gloss / 10,
    scale: scale / 2,
    orientation,
    reference_name: text,
    content: "",
    url: "",
    password: "",
    tracking_pixel: [],
    custom_page: "",
  });

  // --- Debounce ---
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // --- Live update API ---
  const sendUpdatedData = async (updatedData = {}) => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        ...updatedData,
        font: updatedData.font || font,
        orientation: updatedData.orientation || orientation,
        depth: depth / 20,
        gloss: gloss / 100,
        scale: scale / 2,
        color: hexToNormalizedRgb(color),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/update-model`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      }
    } catch (error) {
      console.error("Error updating model:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSendUpdatedData = debounce(sendUpdatedData, 800);

  // --- Handle input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "font") setFont(value);
    if (name === "orientation") setOrientation(value);
    if (name === "color") setColor(value);
    if (name === "depth") setDepth(parseFloat(value));
    if (name === "gloss") setGloss(parseFloat(value));
    if (name === "scale") setScale(parseFloat(value));
    if (name === "type_name") setText(value);

    setFormData((prev) => ({
      ...prev,
      [name]: ["color"].includes(name) ? hexToNormalizedRgb(value) : value,
      ...(name === "type_name" && { reference_name: value }),
    }));

    // Update formData
    setFormData((prev) => ({
      ...prev,
      [name]: ["color"].includes(name) ? hexToNormalizedRgb(value) : value,
    }));

    // Live API update only for these fields
    if (["depth", "gloss", "scale", "orientation", "font"].includes(name)) {
      debouncedSendUpdatedData({ [name]: value });
    }
  };

  const handleColorPickerBlur = () => debouncedSendUpdatedData();

  const handleOkClick = () => sendUpdatedData();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type_name) return;

    setLoading(true);
    try {
      await dispatch(
        generateArText({
          ...formData,
          font,
          orientation,
          depth: depth / 20,
          gloss: gloss / 100,
          scale: scale / 2,
          color: hexToNormalizedRgb(color),
          user_id,
        })
      ).unwrap();

      toast.success("AR Text generated successfully!");
    } catch (err) {
      toast.error("Failed to generate AR Text");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {arTextData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={arTextData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{arTextData?.data?.reference_name}</h3>
              {arTextData?.data?.createdAt
                ? new Date(arTextData.data.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "—"}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="row custom-row">
            <div className="col-md-6 custom-col">
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  name="type_name"
                  placeholder="Your text"
                  value={formData.type_name}
                  onChange={handleChange}
                />
                <button type="button" onClick={handleOkClick} className="btn btn-primary">
                  ok
                </button>
              </div>

              <select name="font" className="form-select mb-3" value={formData.font} onChange={handleChange}>
                {fontList.map((f, i) => (
                  <option key={i} value={f}>{f}</option>
                ))}
              </select>

              <input
                type="color"
                name="color"
                className="form-control form-control-color mb-3"
                value={color}
                onChange={handleChange}
                onBlur={handleColorPickerBlur}
              />

              <label>Depth: {depth}</label>
              <input type="range" min="1" max="8" name="depth" value={depth} className="form-range mb-3" onChange={handleChange} />

              <label>Gloss: {gloss}</label>
              <input type="range" min="1" max="6" name="gloss" value={gloss} className="form-range mb-3" onChange={handleChange} />

              <label>Scale: {scale}</label>
              <input type="range" min="1" max="8" name="scale" value={scale} className="form-range mb-3" onChange={handleChange} />

              <label>Orientation</label>
              <select name="orientation" className="form-select mb-3" value={formData.orientation} onChange={handleChange}>
                <option value="X">Vertical</option>
                <option value="Z">Horizontal</option>
              </select>
            </div>

            <div className="col-md-6 custom-col d-flex flex-column align-items-center">
              <div className="p-3 mb-3 fixed-text-container" style={{ textAlign: "center", fontFamily: font }}>
                {loading ? (
                  <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                ) : (
                  modelUrl && <model-viewer src={modelUrl} alt="3D Text Model" ar auto-rotate camera-controls style={{ width: "280px", height: "280px", padding: "20px" }} />
                )}
              </div>

              <div className="artext-analysis w-100 p-3 border rounded bg-light">
                <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
                <p>Width: {dimensions.width} cm</p>
                <p>Height: {dimensions.height} cm</p>
                <p>Depth: {depth * 2} cm</p>
                <p>Weight: {dimensions.weight} Mo</p>
                <p>Loading: {dimensions.loading} s</p>
              </div>
            </div>
          </div>

          <DD_OptionsForm formData={formData} setFormData={setFormData} handleChange={handleChange} />

          <div className="text-center w-25 mx-auto">
            <button type="submit" className="btn btn-success text-center mt-3" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Generating...
              </>
            ) : (
              "Create"
            )}
          </button>
          </div>
        </form>
      )}
    </>
  );
};

export default DD1_ArTextSection;
