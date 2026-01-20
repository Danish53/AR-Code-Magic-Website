import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import DD_OptionsForm from "./DD_OptionsForm";
import useToken from "../../../hooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { generateArLogo } from "../../../redux/arTextSlice";
import toast from "react-hot-toast";

const DD6_ARLogoSection = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { arLogoData } = useSelector((state) => state.arText);
  const user_id = user?.user?.id;
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
    formData.append("depth", depth / 200);
    formData.append("gloss", gloss / 10);
    formData.append("scale", scale / 2);
    formData.append("orientation", orientation);
    formData.append("overlay", overlay);
    formData.append("type_name", uploadedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/logo-model`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      if (response.data?.data?.model_path) {
        setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
        hasUploaded.current = true;
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
    formData.append("depth", depth / 200);
    formData.append("gloss", gloss / 10);
    formData.append("scale", scale / 2);
    formData.append("orientation", orientation);
    formData.append("overlay", overlay);
    formData.append("type_name", file);

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/v1/user/logo-model`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload an image first!");
      return;
    }
    if (!formData.reference_name) {
      toast.error("Please enter refrence name!");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("user_id", user_id);
      formDataToSend.append("ar_type", "AR Logo");
      formDataToSend.append('depth', depth / 200);
      formDataToSend.append('gloss', gloss / 10);
      formDataToSend.append('scale', scale / 2);
      formDataToSend.append('orientation', orientation);
      formDataToSend.append('overlay', overlay);
      formDataToSend.append("logoFile", file);

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await dispatch(
        generateArLogo({ formData: formDataToSend })
      ).unwrap();

      if (result.qr_code) setQrCodeUrl(result.qr_code);

      toast.success("AR Logo generated successfully!");
    } catch (err) {
      console.error("❌ AR Logo Generation Error:", err);
      toast.error("Failed to generate AR Logo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {arLogoData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={arLogoData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{arLogoData?.data?.reference_name}</h3>
              {arLogoData?.data?.createdAt
                ? new Date(arLogoData.data.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "—"}
            </div>
          </div>
        </div>) : (
        <form onSubmit={onSubmit}>
          <div className=" container mt-4">
            <div className="row  custom-row">
              <div className="col-lg-6  custom-col">
                <div className="mb-3">
                  <label htmlFor="file-upload" className="form-label">Upload Logo (.svg)</label>
                  <p>Please upload a vector SVG logo — not a photo.
                    The image should be black or single-color, clean, and made with paths or shapes (not pixels).
                    Avoid PNG, JPG, or raster images — only upload .svg files created from tools like Illustrator, Figma, or Inkscape.</p>
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
                  <input type="range" min="1" max="8" step="1" value={depth} onChange={(e) => setDepth(parseFloat(e.target.value))} className="form-range" />
                </div>
                <div className="mb-3">
                  <label>Gloss: {gloss}</label>
                  <input type="range" min="1" max="8" step="1" value={gloss} onChange={(e) => setGloss(parseFloat(e.target.value))} className="form-range" />
                </div>
                <div className="mb-3">
                  <label>Scale: {scale}</label>
                  <input type="range" name="scale" min="1" max="5" step="1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="form-range" />
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
          <DD_OptionsForm formData={formData} setFormData={setFormData} handleChange={handleChange} />

          {/* Submit Button */}
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
        </form>)
      }
    </>
  );
};

export default DD6_ARLogoSection;
