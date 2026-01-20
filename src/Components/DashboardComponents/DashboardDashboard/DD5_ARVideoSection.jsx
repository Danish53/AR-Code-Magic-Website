import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DD_OptionsForm from "./DD_OptionsForm";
import { generateArVideo } from "../../../redux/arTextSlice";

const DD5_ARVideoSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { arVideoData } = useSelector((state) => state.arText);
  const user_id = user?.user?.id;

  const [video, setVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("/model/VID-20240812-WA0001.mp4");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      toast.error("Please upload a video first!");
      return;
    }
    if (!formData.reference_name) {
      toast.error("Please enter a reference name!");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("arVideo", video);
      formDataToSend.append("user_id", user_id);
      formDataToSend.append("ar_type", "AR Video");

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await dispatch(
        generateArVideo({ formData: formDataToSend, setUploadProgress })
      ).unwrap();

      if (result.qr_code) setQrCodeUrl(result.qr_code);
      if (result.video_url) setVideoUrl(result.video_url);

      toast.success("AR Video generated successfully!");
    } catch (err) {
      console.error("❌ AR video Generation Error:", err);
      toast.error("Failed to generate AR video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {arVideoData?.data ? (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Scan this QR Code:</h2>
          <div className="d-flex gap-2">
            <img src={arVideoData?.data?.qr_code} alt="QR Code" />
            <div className="mt-2">
              <h3>{arVideoData?.data?.reference_name}</h3>
              {arVideoData?.data?.createdAt
                ? new Date(arVideoData.data.createdAt).toLocaleString("en-US", {
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
            {/* Upload Section */}
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
                  onChange={(e) => setVideo(e.target.files[0])}
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
                  <small className="text-success">100% uploaded.</small>
                )}

                <div className="mt-4">
                  <small>
                    Having difficulty? Please follow our{" "}
                    <Link to="/user" className="text-decoration-none">
                      tutorial
                    </Link>{" "}
                    or{" "}
                    <Link
                      to="mailto:support@example.com"
                      className="text-decoration-none"
                    >
                      send us your video
                    </Link>.
                  </small>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="col-md-6 text-center custom-col">
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                videoUrl && (
                  <video
                    src={videoUrl}
                    muted
                    controls
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "0px",
                    }}
                  ></video>
                )
              )}
            </div>
          </div>

          <DD_OptionsForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />

          <div className="text-center w-25 mx-auto">
            <button
              type="submit"
              className="btn btn-success text-center mt-3"
              disabled={loading}
            >
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

export default DD5_ARVideoSection;
