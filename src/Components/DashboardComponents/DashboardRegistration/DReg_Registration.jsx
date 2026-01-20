import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function DReg_Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_DOMAIN + "/api/v1/user/register",
        formData
      );

      const successMessage = response?.data?.message || "Signup Successful";
      toast.success(successMessage);
      navigate("/user/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center fw-bold mb-4">AR Code Magic</h1>
        {/* Registration Form */}
        <div
          className="bg-white p-4 shadow-sm rounded mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <Link to="/user/login" className="text-primary text-decoration-none">
                Log in
              </Link>
            </div>
            <input
              type="text"
              id="username"
              className="form-control mb-3"
              placeholder="Please enter a username"
              name="user_name"
              onChange={handleChange}
              required
            />

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Please enter a valid email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="At least 8 characters, 1 letter, 1 number"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                placeholder="Please confirm your password"
                name="confirm_password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label htmlFor="terms" className="form-check-label">
                I agree to the{" "}
                <Link to="#terms" className="text-primary text-decoration-none">
                  terms and conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success mb-3 d-flex align-items-center justify-content-center w-100"
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
                  "Continue"
                )}
              </button>
            </div>

            {/* Already Registered */}
            <div className="text-center">
              Already registered?{" "}
              <Link
                to="/user/login"
                className="text-primary text-decoration-none"
              >
                Please Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DReg_Registration;
