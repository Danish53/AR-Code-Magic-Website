import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { authFail, loginSuccess } from "../../../redux/authSlice";

function DUsr_UserLogin() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [formState, setFormState] = useState("login");

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     import.meta.env.VITE_DOMAIN + "api/v1/user/login",
    //     formData
    //   );
    //   const successMessage = response?.data?.message || "Login Successful";

    //   // dispatch(loginSuccess(successMessage));
    //   toast.success(successMessage);

    //   navigate("/pricing");

    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || "Login failed";
    //   // dispatch(authFail(errorMessage));
    //   toast.error(errorMessage);
    // }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-4">AR Code Magic</h1>

        {/* ✅ LOGIN FORM */}
        {formState === "login" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="email" className="form-label fw-bold">Email or Username</label>
                <Link to="/user/register" className="text-primary text-decoration-none">
                  Create an account
                </Link>
              </div>
              <input
                type="text"
                id="email"
                name="emailOrUsername"
                className="form-control mb-3"
                placeholder="Email or username"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
              />

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <button type="button" className="btn btn-link p-0 text-primary text-decoration-none"
                  onClick={() => setFormState("reset-password")}>
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
                <button type="submit" className="btn btn-success">
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ✅ RESET PASSWORD FORM */}
        {formState === "reset-password" && (
          <div className="bg-white p-4 shadow-sm rounded mx-auto" style={{ maxWidth: "400px" }}>
            <form>
              <div className="mb-3">
                <label htmlFor="forgot-email" className="form-label fw-bold">Email Address</label>
                <input type="email" id="forgot-email" className="form-control"
                  placeholder="Enter your email address" required />
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-success mb-3"
                  onClick={() => setFormState("otp")}>
                  Reset Password
                </button>
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-link text-primary text-decoration-none"
                  onClick={() => setFormState("login")}>
                  Back to Log In
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default DUsr_UserLogin;
