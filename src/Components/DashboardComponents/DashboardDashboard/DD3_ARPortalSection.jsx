import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import DD_OptionsForm from "./DD_OptionsForm";
import useToken from "../../../hooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { generateArPortal } from "../../../redux/arTextSlice";
import toast from "react-hot-toast";

const DD3_ARPortalSection = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { arPortalData } = useSelector((state) => state.arText);
  const user_id = user?.user?.id;
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modelUrl, setModelUrl] = useState("model/7_d3d632a7.glb");
  const [isLoading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

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
    formDataUpload.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/portal-model`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
      const formDataToSend = new FormData();

      formDataToSend.append("arPortal", image);
      formDataToSend.append("user_id", user_id);
      formDataToSend.append("ar_type", "AR Portal");

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await dispatch(
        generateArPortal({ formData: formDataToSend })
      ).unwrap();

      if (result.qr_code) setQrCodeUrl(result.qr_code);

      toast.success("AR Portal generated successfully!");
    } catch (err) {
      console.error("❌ AR Portal Generation Error:", err);
      toast.error("Failed to generate AR Portal");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {arPortalData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={arPortalData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{arPortalData?.data?.reference_name}</h3>
              {arPortalData?.data?.createdAt
                ? new Date(arPortalData.data.createdAt).toLocaleString("en-US", {
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
          <div className="row custom-row">
            <div className="col-md-6 custom-col">
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
                <Link to="/user" className="d-block mt-2 text-decoration-none">
                  360° photos examples
                </Link>

                {uploadProgress > 0 && (
                  <div className="progress mt-2" style={{ height: "5px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {uploadProgress === 100 && <small className="text-success">100% uploaded.</small>}
                {error && <small className="text-danger">{error}</small>}
                {success && <small className="text-success">{success}</small>}
              </div>
            </div>

            <div className="col-md-6 text-center custom-col">
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "280px" }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <model-viewer
                  src={modelUrl}
                  alt="3D Photo Model"
                  ar
                  auto-rotate
                  camera-controls
                  style={{ width: "280px", height: "280px", padding: "20px" }}
                ></model-viewer>
              )}

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

          <DD_OptionsForm formData={formData} setFormData={setFormData} handleChange={handleChange} />

          {/* Submit Button */}
          <div className="text-center w-25 mx-auto">
            <button type="submit" className="btn btn-success text-center mt-3" disabled={isLoading}>
              {isLoading ? (
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

export default DD3_ARPortalSection;


