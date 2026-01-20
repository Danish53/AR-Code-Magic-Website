import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DD_OptionsForm from "./DD_OptionsForm";
import useToken from "../../../hooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { generateAr3dFile } from "../../../redux/arTextSlice";
import toast from "react-hot-toast";

const DD9_File3DSection = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const user_id = user?.user?.id;
  const { ar3dFileData } = useSelector((state) => state.arText);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modelUrl, setModelUrl] = useState("model/Player.glb");
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

  const allowedExtensions = [
    ".glb", ".usdz", ".ply", ".stl", ".fbx", ".obj", ".x3d", ".gltf", ".zip"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setError("Only 3D files (.glb, .usdz, .ply, .stl, .fbx, .obj, .x3d, .gltf, .zip) are allowed.");
      setSuccess("");
      setFile(null);
      return;
    }

    setError("");
    setSuccess("");
    setFile(file);
    setUploadProgress(0);
    setLoading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/3dfile-model`,
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

    if (!file) {
      toast.error("Please upload an 3d model first!");
      return;
    }
    if (!formData.reference_name) {
      toast.error("Please enter refrence name!");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("arFile", file);
      formDataToSend.append("user_id", user_id);
      formDataToSend.append("ar_type", "AR File");

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await dispatch(
        generateAr3dFile({ formData: formDataToSend })
      ).unwrap();

      if (result.qr_code) setQrCodeUrl(result.qr_code);

      toast.success("3D File generated successfully!");
    } catch (err) {
      console.error("❌ AR file Generation Error:", err);
      toast.error("Failed to generate AR file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {ar3dFileData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={ar3dFileData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{ar3dFileData?.data?.reference_name}</h3>
              {ar3dFileData?.data?.createdAt
                ? new Date(ar3dFileData.data.createdAt).toLocaleString("en-US", {
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
            {/* Upload Section */}
            <div className="col-md-6 custom-col">
              <div className="upload-container">
                <label htmlFor="file-upload" className="form-label">
                  Drop a .GLB, .GLTF, .USDZ, .PLY, .STL, .FBX, .OBJ, .X3D, or .ZIP file - 15MB max
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="form-control"
                  accept={allowedExtensions.join(",")}
                  onChange={handleFileUpload}
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
                {error && <small className="text-danger mt-2">{error}</small>}
                {success && <small className="text-success mt-2">{success}</small>}
                <div className="mt-4">
                  <small>
                    Need help?{" "}
                    <Link to="/user" className="text-decoration-none">
                      reduce 3D file size
                    </Link>{" "}
                    or{" "}
                    <Link to="/user" className="text-decoration-none">
                      optimize 3D for AR
                    </Link>
                    . <Link to="mailto:support@example.com">Contact us</Link> for assistance.
                  </small>
                </div>
              </div>
            </div>

            {/* Model Preview */}
            <div className="col-md-6 text-center custom-col">
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "280px" }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                modelUrl && (
                  <model-viewer
                    src={modelUrl}
                    alt="3D Model"
                    ar
                    auto-rotate
                    camera-controls
                    style={{ width: "280px", height: "280px", padding: "20px" }}
                  ></model-viewer>
                )
              )}
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

export default DD9_File3DSection;




