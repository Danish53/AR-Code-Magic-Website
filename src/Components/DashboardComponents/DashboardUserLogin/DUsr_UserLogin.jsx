import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { fetchProfile, loginUser } from "../../../redux/authSlice";
import axios from "axios";

function DUsr_UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState("login"); // login | reset-password | otp | new-password
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.type === "auth/loginUser/fulfilled") {
        dispatch(fetchProfile());
        navigate("/user");
      }
    });
  };

  // ✅ STEP 1: SEND OTP
  const handleSendOtp = async () => {
    setLoader(true);
    if (!resetEmail) return toast.error("Please enter your email");
    try {
      const res = await axios.post(import.meta.env.VITE_DOMAIN + "/api/v1/user/forgot-password", {
        email: resetEmail,
      });
      toast.success(res.data.message || "OTP sent to your email");
      setFormState("otp");
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoader(false);
    }
  };

  // ✅ STEP 2: VERIFY OTP
  const handleVerifyOtp = async () => {
    setLoader(true);
    if (!otp) return toast.error("Enter OTP");
    try {
      const res = await axios.post(import.meta.env.VITE_DOMAIN + "/api/v1/user/verify-otp", {
        otp: otp,
      });
      toast.success(res.data.message || "OTP verified successfully");
      setFormState("new-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoader(false);
    }
  };

  // ✅ STEP 3: RESET PASSWORD
  const handleResetPassword = async () => {
    setLoader(true);
    if (!newPassword) return toast.error("Enter new password");
    try {
      const res = await axios.post(import.meta.env.VITE_DOMAIN + "/api/v1/user/reset-password", {
        email: resetEmail,
        password: newPassword,
        confirm_password: confirmPassword
      });
      toast.success(res.data.message || "Password reset successfully");
      setFormState("login");
      setResetEmail("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-4">AR Code Magic</h1>

        {/* ✅ LOGIN FORM */}
        {formState === "login" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <Link to="/user/register" className="text-primary text-decoration-none">
                  Create an account
                </Link>
              </div>
              <input
                type="text"
                id="email"
                name="emailOrUsername"
                className="form-control mb-3"
                placeholder="Email"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
              />

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary text-decoration-none"
                  onClick={() => setFormState("reset-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                id="password"
                name="password"
                className="form-control mb-3"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success mb-3 d-flex align-items-center justify-content-center w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ✅ STEP 1: ENTER EMAIL */}
        {formState === "reset-password" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label htmlFor="forgot-email" className="form-label fw-bold">Email Address</label>
                <input
                  type="email"
                  id="forgot-email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-success mb-3 w-100" onClick={handleSendOtp}>
                  {loader ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link text-primary text-decoration-none"
                  onClick={() => setFormState("login")}
                >
                  Back to Log In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ✅ STEP 2: OTP VERIFICATION */}
        {formState === "otp" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <h5 className="text-center mb-3">Enter OTP sent to your email</h5>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="text-center">
              <button className="btn btn-success w-100 mb-3" onClick={handleVerifyOtp}>
                {loader ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
              <button
                className="btn btn-link text-primary text-decoration-none"
                onClick={() => setFormState("reset-password")}
              >
                Change Email
              </button>
            </div>
          </div>
        )}

        {/* ✅ STEP 3: RESET PASSWORD */}
        {formState === "new-password" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <h5 className="text-center mb-3">Set New Password</h5>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <div className="text-center">
              <button className="btn btn-success w-100 mb-3" onClick={handleResetPassword}>
                {loader ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DUsr_UserLogin;
