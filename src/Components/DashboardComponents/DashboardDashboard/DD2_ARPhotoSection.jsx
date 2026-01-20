import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import DD_OptionsForm from "./DD_OptionsForm";
import useToken from "../../../hooks/useToken";
import { generateArPhoto } from "../../../redux/arTextSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const DD2_ARPhotoSection = () => {
  const token = useToken();
  const { user } = useSelector((state) => state.auth);
  const { arPhotoData } = useSelector((state) => state.arText);
  const user_id = user?.user?.id;
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [orientation, setOrientation] = useState("X");
  const [border, setBorder] = useState(1);
  const [scale, setScale] = useState(10);
  const [color, setColor] = useState("#0000ff");
  const [modelUrl, setModelUrl] = useState("model/ae18c4c5.glb");
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [dimensions, setDimensions] = useState({
    width: 50.00,
    height: 66.67,
    depth: 2.55,
  });
  const [formData, setFormData] = useState({
    reference_name: "",
    content: "",
    url: "",
    password: "",
    tracking_pixel: "",
    custom_page: "",
  });

  // Convert hex color to RGB format (0-1 range)
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return `${r} ${g} ${b}`;
  };

  // Upload image and model
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setImage(file);
    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("orientation", orientation);
    formData.append("scale", scale);
    formData.append("border", border);
    formData.append("color", hexToRgb(color));
    formData.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/photo-model`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );

      setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      if (response.data.data.dimensions) {
        setDimensions(response.data.data.dimensions);
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("Failed to create AR model. Please try again.");
    } finally {
      setIsLoading(false);
      setUploadProgress(100);
    }
  };

  // Auto-update model when settings change
  useEffect(() => {
    if (image) {
      const timer = setTimeout(() => {
        handleImageUpload({ target: { files: [image] } });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [orientation, border, color, scale]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image first!");
      return;
    }
    if (!formData.reference_name) {
      toast.error("Please enter refrence name!");
      return;
    }

    setLoading(true);

    try {
      // Create a FormData object
      const formDataToSend = new FormData();

      // Append regular fields
      formDataToSend.append("color", hexToRgb(color));
      formDataToSend.append("orientation", orientation);
      formDataToSend.append("border", border);
      formDataToSend.append("scale", scale);
      formDataToSend.append("arPhoto", image);
      formDataToSend.append("ar_type", "AR Photo");
      formDataToSend.append("user_id", user_id);

      // Append all fields from your existing formData object (if any)
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Dispatch Redux API call
      const result = await dispatch(
        generateArPhoto({ formData: formDataToSend, token })
      ).unwrap();

      if (result.qr_code) setQrCodeUrl(result.qr_code);

      toast.success("AR Photo generated successfully!");
    } catch (err) {
      console.error("❌ AR Photo Generation Error:", err);
      toast.error("Failed to generate AR Photo");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {arPhotoData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={arPhotoData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{arPhotoData?.data?.reference_name}</h3>
              {arPhotoData?.data?.createdAt
                ? new Date(arPhotoData.data.createdAt).toLocaleString("en-US", {
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
        <form action="" onSubmit={onSubmit}>
          <div className="row custom-row">
            {/* Property Side */}
            <div className="col-md-6 custom-col">
              <div className="property-side">
                {/* Upload Section */}
                <div className="upload-container">
                  <label htmlFor="file-upload" className="form-label">
                    {image ? "Change Image" : "Upload Image (.png or .jpg - 5MB max)"}
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="form-control"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                  {uploadProgress > 0 && (
                    <div className="progress mt-2" style={{ height: "5px" }}>
                      <div
                        className={`progress-bar ${uploadProgress === 100 ? "" : "progress-bar-striped progress-bar-animated"
                          }`}
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <small className="text-success">Upload complete!</small>
                  )}
                </div>

                {/* Orientation Selector */}
                <label>Orientation</label>
                <select
                  className="form-control mb-3"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                >
                  <option value="X">Vertical</option>
                  <option value="Y">Horizontal</option>
                </select>

                <label>Border</label>
                <select
                  className="form-control mb-3"
                  value={border}
                  onChange={(e) => setBorder(parseInt(e.target.value))}
                >
                  <option value={1}>With Border</option>
                  <option value={0}>No Border</option>
                </select>

                {/* Scale Slider */}
                <div className="mt-3">
                  <label className="form-label">
                    Scale
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="4"
                    max="20"
                    step="5"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                  />
                </div>

                {/* Color Picker */}
                <div className="mt-3">
                  <label className="form-label">
                    Color
                  </label>
                  <input
                    type="color"
                    className="form-control form-control-color mt-1 w-100"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="col-md-6 text-center custom-col">
              <div className="result-side">
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "280px" }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <model-viewer
                      src={modelUrl}
                      alt="3D Photo Model"
                      ar
                      auto-rotate
                      camera-controls
                      style={{ width: "280px", height: "280px", padding: "20px" }}
                    ></model-viewer>

                    <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
                      <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
                      <p className="mb-1">Width: {dimensions.width.toFixed(2)} cm</p>
                      <p className="mb-1">Height: {dimensions.height.toFixed(2)} cm</p>
                      <p className="mb-1">Depth: {dimensions.depth.toFixed(2)} cm</p>
                      <p className="mb-1">Weight: 0.07 MB</p>
                      <p className="mb-0">Loading: 0.1 s</p>
                    </div>
                  </>
                )}
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

export default DD2_ARPhotoSection;
