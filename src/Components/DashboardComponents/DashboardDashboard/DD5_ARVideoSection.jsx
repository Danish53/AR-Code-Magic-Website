import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineLink, AiOutlineLock } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import axios from "axios";

const DD5_ARVideoSection = () => {
  const [video, setVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("model/VID-20240812-WA0001.mp4");
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  // const [modelUrl, setModelUrl] = useState("model/7_04a23ce0.glb");
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

  // const handleVideoUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setVideo(URL.createObjectURL(file));
  //     setUploadProgress(100); // Simulate the upload process
  //   }
  // };
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["video/mp4", "video/quicktime"]; // quicktime = .mov
    if (!validTypes.includes(file.type)) {
      setError("Only MP4 or MOV videos are allowed.");
      setVideo(null);
      return;
    }

    setError("");
    setSuccess("");
    setVideo(file);
    setUploadProgress(0);
    setLoading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("user_id", "7");
    formDataUpload.append("type_name", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/video-model`,
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

      console.log(response)

      if (response.data && response.data.data && response.data.data.model_path) {
        setSuccess("Upload and model creation successful!");
        // setModelUrl(`${import.meta.env.VITE_DOMAIN}/${response.data.data.model_path}`);
        setVideoUrl(`${import.meta.env.VITE_DOMAIN}/uploads/${response.data.data.type_name}`);
      } else {
        throw new Error("Invalid response structure");
      }
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
    formDataQR.append("ar_type", "AR Video");
    formDataQR.append("reference_name", reference_name);
    formDataQR.append("content", content);
    formDataQR.append("url", url);
    formDataQR.append("password", password);
    formDataQR.append("tracking_pixel", tracking_pixel);
    formDataQR.append("custom_page", custom_page);
    formDataQR.append("arPhoto", video);

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


  // const modelViewerRef = useRef(null);
  // const videoRef = useRef(null);

  // Adjust video size when model zooms in or out
  // const handleZoomChange = () => {
  //   if (modelViewerRef.current && videoRef.current) {
  //     const zoom = modelViewerRef.current.getCameraOrbit().radius; // Get zoom level
  //     const scale = zoom * 0.2; // Adjust scale based on zoom level

  //     // Dynamically scale the video size
  //     videoRef.current.style.width = `${scale}px`;
  //     videoRef.current.style.height = `${scale * 0.5}px`; // Keep aspect ratio
  //   }
  // };

  // useEffect(() => {
  //   if (modelViewerRef.current) {
  //     modelViewerRef.current.addEventListener('camera-change', handleZoomChange);
  //   }

  //   // Clean up event listener on component unmount
  //   return () => {
  //     if (modelViewerRef.current) {
  //       modelViewerRef.current.removeEventListener('camera-change', handleZoomChange);
  //     }
  //   };
  // }, []);

  return (
    <>
      {
        qrCodeUrl ? (<div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>) : (
          <form>
            <div className="row custom-row">
              {/* Select Video Section */}
              <div className="col-md-6 custom-col">
                <div className="upload-container">
                  <label htmlFor="file-upload" className="form-label">
                    Drop a .mp4 or .mov - 100MB max
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="form-control"
                    accept=".mp4, .mov"
                    onChange={handleVideoUpload}
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

                  <div className="mt-4">
                    <small>
                      Are you having difficulty getting your AR Code Magic or working with other video file
                      formats? Please follow our{" "}
                      {/* belog link add krana hai               */}
                      <Link to="/user" className="text-decoration-none">
                        tutorial
                      </Link>{" "}
                      or{" "}
                      <Link to="mailto:support@example.com" className="text-decoration-none">
                        send us your video file
                      </Link>.
                    </small>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="col-md-6 text-center custom-col">
                <div className="">
                  {loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    videoUrl && (
                      <video
                        // ref={videoRef}
                        src={videoUrl}
                        // autoPlay
                        muted
                        // loop
                        controls
                        style={{
                          width: "200px", // Adjust width according to model's zoom
                          height: "200px",
                          // pointerEvents: "none",
                          marginTop:"0px",
                          marginLeft:"0px"
                        }}
                      ></video>
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

export default DD5_ARVideoSection;
