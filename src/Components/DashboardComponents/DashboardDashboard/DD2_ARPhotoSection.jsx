// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DD2_ARPhotoSection = () => {
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [orientation, setOrientation] = useState("vertical");
//   const [border, setBorder] = useState(1);
//   const [scale, setScale] = useState(1);
//   const [color, setColor] = useState("#003C5E");
//   const [modelUrl, setModelUrl] = useState("model/ae18c4c5.glb");
//   const [isLoading, setIsLoading] = useState(false);
//   const [dimensions, setDimensions] = useState({
//     width: 50.00,
//     height: 66.67,
//     depth: 2.55
//   });

//   // Convert hex color to RGB format (0-1 range)
//   const hexToRgb = (hex) => {
//     const r = parseInt(hex.slice(1, 3), 16) / 255;
//     const g = parseInt(hex.slice(3, 5), 16) / 255;
//     const b = parseInt(hex.slice(5, 7), 16) / 255;
//     return `${r} ${g} ${b}`;
//   };

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file
//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size must be less than 5MB");
//       return;
//     }

//     setImage(URL.createObjectURL(file));
//     setIsLoading(true);
//     setUploadProgress(0);

//     const formData = new FormData();
//     formData.append("type_name", file);
//     formData.append("orientation", orientation);
//     formData.append("border", border);
//     formData.append("color", hexToRgb(color)); // Pass RGB values
//     formData.append("scale", scale);
//     formData.append("user_id", "7");

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/v1/user/photo-model`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               setUploadProgress(
//                 Math.round((progressEvent.loaded * 100) / progressEvent.total)
//               );
//             }
//           },
//         }
//       );

//       setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
//       // Update dimensions if provided by API
//       if (response.data.data.dimensions) {
//         setDimensions(response.data.data.dimensions);
//       }
//       console.log("✅ AR Photo model created successfully!", response.data);
//     } catch (error) {
//       console.error("❌ Error uploading image:", error);
//       alert("Failed to create AR model. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setUploadProgress(100);
//     }
//   };

//   // Auto-update model when settings change (debounced)
//   useEffect(() => {
//     if (image) {
//       const timer = setTimeout(() => {
//         handleImageUpload({ target: { files: [image] } });
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [orientation, border, color, scale]);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("File size must be less than 5MB");
//       return;
//     }

//     setImage(URL.createObjectURL(file));
//     setIsLoading(true);
//     setUploadProgress(0);

//     const formData = new FormData();
//     formData.append("ar_type", "AR Photo");
//     formData.append("orientation", orientation);
//     formData.append("scale", scale);
//     formData.append("border", border);
//     formData.append("color", color);
//     formData.append("user_id", "7"); // replace with actual user ID
//     formData.append("arPhoto", file); // backend expects this
//     formData.append("reference_name", "");
//     formData.append("content", "");
//     formData.append("url", "");
//     formData.append("password", "");
//     formData.append("tracking_pixel", "");
//     formData.append("custom_page", "");

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/v1/user/generate-qrcode`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               setUploadProgress(
//                 Math.round((progressEvent.loaded * 100) / progressEvent.total)
//               );
//             }
//           },
//         }
//       );

//       setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
//       console.log("✅ AR Photo model created successfully!", response.data);
//     } catch (error) {
//       console.error("❌ Error uploading image:", error);
//       alert("Failed to create AR model. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setUploadProgress(100);
//     }
//   };

//   return (
//     <form action="">
//       <div className="row custom-row">
//         {/* Property Side */}
//         <div className="col-md-6 custom-col">
//           <div className="property-side">
//             {/* Upload Section */}
//             <div className="upload-container">
//               <label htmlFor="file-upload" className="form-label">
//                 {image ? "Change Image" : "Upload Image (.png or .jpg - 5MB max)"}
//               </label>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="form-control"
//                 accept="image/png, image/jpeg"
//                 onChange={handleImageUpload}
//                 disabled={isLoading}
//               />
//               {uploadProgress > 0 && (
//                 <div className="progress mt-2" style={{ height: "5px" }}>
//                   <div
//                     className={`progress-bar ${uploadProgress === 100 ? "" : "progress-bar-striped progress-bar-animated"
//                       }`}
//                     role="progressbar"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}
//               {uploadProgress === 100 && (
//                 <small className="text-success">Upload complete!</small>
//               )}
//             </div>

//             {/* Orientation Selector */}
//             <div className="mt-3">
//               <label className="form-label">Orientation:</label>
//               <div className="btn-group w-100">
//                 <button
//                   className={`btn ${orientation === "vertical" ? "btn-primary" : "btn-outline-primary"
//                     }`}
//                   onClick={() => setOrientation("vertical")}
//                 >
//                   Vertical
//                 </button>
//                 <button
//                   className={`btn ${orientation === "horizontal" ? "btn-primary" : "btn-outline-primary"
//                     }`}
//                   onClick={() => setOrientation("horizontal")}
//                 >
//                   Horizontal
//                 </button>
//               </div>
//             </div>

//             {/* Border Selector */}
//             <div className="mt-3">
//               <label className="form-label">Border:</label>
//               <div className="btn-group w-100">
//                 <button
//                   className={`btn ${border === "border" ? "btn-primary" : "btn-outline-primary"
//                     }`}
//                   onClick={() => setBorder("border")}
//                 >
//                   With Border
//                 </button>
//                 <button
//                   className={`btn ${border === "no-border" ? "btn-primary" : "btn-outline-primary"
//                     }`}
//                   onClick={() => setBorder("no-border")}
//                 >
//                   No Border
//                 </button>
//               </div>
//             </div>

//             {/* Scale Slider */}
//             <div className="mt-3">
//               <label className="form-label">
//                 Scale: {scale}x
//               </label>
//               <input
//                 type="range"
//                 className="form-range"
//                 min="0.5"
//                 max="3"
//                 step="0.1"
//                 value={scale}
//                 onChange={(e) => setScale(parseFloat(e.target.value))}
//               />
//             </div>

//             {/* Color Picker */}
//             <div className="mt-3">
//               <label className="form-label">
//                 Border Color: <small>(RGB: {hexToRgb(color)})</small>
//               </label>
//               <input
//                 type="color"
//                 className="form-control form-control-color mt-1"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Result Side */}
//         <div className="col-md-6 text-center custom-col">
//           <div className="result-side">
//             {isLoading ? (
//               <div className="d-flex justify-content-center align-items-center"
//                 style={{ height: "280px" }}>
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <model-viewer
//                   src={modelUrl}
//                   alt="3D Photo Model"
//                   auto-rotate
//                   camera-controls
//                   style={{ width: "280px", height: "280px", padding: "20px" }}
//                 ></model-viewer>

//                 <div className="artext-analysis w-100 p-3 border rounded bg-light mt-3">
//                   <h6 className="text-center fw-bold mb-2">Immersive AR</h6>
//                   <p className="mb-1">Width: {dimensions.width.toFixed(2)} cm</p>
//                   <p className="mb-1">Height: {dimensions.height.toFixed(2)} cm</p>
//                   <p className="mb-1">Depth: {dimensions.depth.toFixed(2)} cm</p>
//                   <p className="mb-1">Weight: 0.07 MB</p>
//                   <p className="mb-0">Loading: 0.1 s</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* Additional Form Fields */}
//       <div className="bg-white p-4 mt-4 rounded shadow-sm">
//         <div className="mb-4">
//           <label htmlFor="referenceName" className="form-label-dash fw-bold">
//             2) Type a reference name*
//           </label>
//           <input
//             type="text"
//             id="referenceName"
//             className="form-control"
//             placeholder="e.g. Product 56754"
//             name="reference_name"
//             value={formData.reference_name}
//             onChange={handleChange}
//           />
//         </div>

//         <h5 className="fw-bold">3) Options</h5>
//         <div className="mt-3">
//           <div className="mb-3">
//             <label className="form-label-dash">
//               <strong>- Custom Link (optional):</strong> Add a custom link to
//               display a banner at the bottom of your augmented reality
//               rendering.
//             </label>
//             <div className="input-group mb-2">
//               <span className="input-group-text">
//                 <AiOutlineEdit size={20} />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type your text here (Max 40 chars)"
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <AiOutlineLink size={20} />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type your URL here (https://...)"
//                 name="url"
//                 value={formData.url}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label-dash">
//               <strong>- Password Restriction (optional):</strong> By adding a
//               password, you can restrict access to your AR Code Magic; leave
//               it blank for no restriction.
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <AiOutlineLock size={20} />
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Type your password here"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label-dash">
//               <strong>- Tracking Pixels (optional):</strong> Add your
//               targeting pixels below from the list. Please make sure to enable
//               them in the pixels settings.
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <BiTargetLock size={20} />
//               </span>
//               <select
//                 className="form-select"
//                 name="tracking_pixel"
//                 value={formData.tracking_pixel}
//                 onChange={handleChange}
//               >
//                 <option value="">None</option>
//                 <option value="pixel1">Pixel 1</option>
//                 <option value="pixel2">Pixel 2</option>
//               </select>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="form-label-dash">
//               <strong>- Custom Page (optional):</strong> Please make sure to
//               enable it in the custom pages settings.
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <AiOutlineEdit size={20} />
//               </span>
//               <select
//                 className="form-select"
//                 name="custom_page"
//                 value={formData.custom_page}
//                 onChange={handleChange}
//               >
//                 <option value="">None</option>
//                 <option value="page1">Custom Page 1</option>
//                 <option value="page2">Custom Page 2</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="text-center mt-4 mb-4 w-25 mx-auto">
//         <button type="submit" className="btn btn-success w-100">
//           {/* {loading ? "create.." : "Create"} */} Create
//         </button>
//       </div>
//     </form>

//   );
// };

// export default DD2_ARPhotoSection;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

const DD2_ARPhotoSection = () => {
  const [image, setImage] = useState(null);
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
    // formData.append("type_name", "AR Photo");
    formData.append("orientation", orientation);
    formData.append("scale", scale);
    formData.append("border", border);
    formData.append("color", hexToRgb(color));
    formData.append("user_id", "7");
    formData.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/photo-model`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );
      console.log(response.data, "000000000")

      setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
      if (response.data.data.dimensions) {
        setDimensions(response.data.data.dimensions);
      }
      console.log("✅ AR Photo model created successfully!", response.data);
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("Failed to create AR model. Please try again.");
    } finally {
      setIsLoading(false);
      setUploadProgress(100);
    }
  };

  // Handle QR Code generation
  const handleGenerateQRCode = async () => {
    const { reference_name, content, url, password, tracking_pixel, custom_page } = formData;

    if (!reference_name) {
      alert("Please provide a reference name.");
      return;
    }

    const formDataQR = new FormData();
    formDataQR.append("orientation", orientation);
    formDataQR.append("scale", scale);
    formDataQR.append("border", border);
    formDataQR.append("color", hexToRgb(color));
    formDataQR.append("user_id", "7");
    // formDataQR.append("type_name", file);
    formDataQR.append("ar_type", "AR Photo");
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

      console.log(response, "ar photo qr")

      if (response.data.success) {
        setQrCodeUrl(response.data.data.qr_code);
        // const qrId = response.data.data.id; // ✅ ID jo API se mili
        // navigate(`/ar-text/${qrId}`); 
      } else {
        alert("Failed to generate QR code. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error generating QR code:", error);
      alert("Failed to generate QR Code. Please try again.");
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

  return (
    <>
      {
        qrCodeUrl ? (<div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>) : (
          <form action="">
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
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateQRCode}
            >
              Create AR Model and QR Code
            </button> */}
            {/* Submit Button */}
            <div className="text-center mt-4 mb-4 w-25 mx-auto">
              <button type="button" className="btn btn-success w-100" 
              onClick={handleGenerateQRCode}>
                {isLoading ? "create.." : "Create"}
              </button>
            </div>
          </form>)
      }
    </>
  );
};

export default DD2_ARPhotoSection;
