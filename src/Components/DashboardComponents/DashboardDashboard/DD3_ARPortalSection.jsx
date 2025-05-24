// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// const DD3_ARPortalSection = () => {
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setUploadProgress(0);

//       // Simulate upload progress
//       const interval = setInterval(() => {
//         setUploadProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             return 100;
//           }
//           return prev + 20;
//         });
//       }, 300);
//     }
//   };

//   return (

//       <div className="row custom-row">
//         {/* Property Side */}
//         <div className="col-md-6 custom-col">
//           <div className="property-side">
//             <div className="upload-container">
//               <label htmlFor="file-upload" className="form-label">
//                 Drop a .png or .jpg - 25MB max
//               </label>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="form-control"
//                 accept="image/png, image/jpeg"
//                 onChange={handleImageUpload}
//               />
//               <Link
//                 to="/user"
//                 className="d-block mt-2 text-decoration-none"
//               >
//                 360° photos examples
//               </Link>

//               {/* Upload Progress */}
//               {uploadProgress > 0 && (
//                 <div className="progress mt-2" style={{ height: "5px" }}>
//                   <div
//                     className="progress-bar"
//                     role="progressbar"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}
//               {uploadProgress === 100 && (
//                 <small className="text-success">100% has been uploaded.</small>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Result Side */}
//         <div className="col-md-6 text-center custom-col">
//           <div className="result-side">
//             {image ? (
//               <div className="immersive-image-container">
//                 <img
//                   src={image}
//                   alt="Uploaded Preview"
//                   style={{
//                     width: "250px",
//                     height: "250px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                   }}
//                 />
//               </div>
//             ) : (
//               <div
//                 style={{
//                   width: "250px",
//                   height: "250px",
//                   borderRadius: "50%",
//                   background: "#f0f0f0",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "16px",
//                   color: "#666",
//                   margin: "auto",
//                 }}
//               >
//                 Your 360 photo
//               </div>
//             )}

//             {/* <div className="mt-3">
//               <h5>Immersive AR</h5>
//               <p>
//                 Width: 339.99 cm <br />
//                 Height: 339.99 cm <br />
//                 Depth: 340.00 cm <br />
//                 Weight: 2.13 Mo <br />
//                 Loading: 2.1 s
//               </p>
//             </div> */}
//                <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
//             <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
//             <p className="mb-1">Width: 339.99 cm</p>
//             <p className="mb-1">Height: 339.99 cm</p>
//             <p className="mb-1">Depth: 340.00 cm</p>
//             <p className="mb-1">Weight: 2.13 Mo</p>
//             <p className="mb-0">Loading: 2.1 s</p>
//           </div>
//           </div>
//         </div>
//       </div>

//   );
// };

// export default DD3_ARPortalSection;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

const DD3_ARPortalSection = () => {
  const [image, setImage] = useState(null);
  // console.log(image, "ooooooooooo")
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
    formDataUpload.append("user_id", "7");
    formDataUpload.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/portal-model`,
        formDataUpload,
        {
          headers: {
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

  const handleGenerateQRCode = async () => {
    const { reference_name, content, url, password, tracking_pixel, custom_page } = formData;

    if (!reference_name) {
      alert("Please provide a reference name.");
      return;
    }

    const formDataQR = new FormData();
    formDataQR.append("user_id", "7");
    formDataQR.append("ar_type", "AR Portal");
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
      console.log(response, "resss....")

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
      {qrCodeUrl ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
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

            <div className="mb-3">
              <label className="form-label-dash">
                <strong>- Custom Link (optional):</strong>
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
                <strong>- Password Restriction (optional):</strong>
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
                <strong>- Tracking Pixels (optional):</strong>
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
                <strong>- Custom Page (optional):</strong>
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

          <div className="text-center mt-4 mb-4 w-25 mx-auto">
            <button className="btn btn-primary w-100" type="button" onClick={handleGenerateQRCode}>
              Generate QR Code
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default DD3_ARPortalSection;


