import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../redux/authSlice";

function DS_AccountSettingsForm() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Sync form data whenever user updates in Redux
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user?.user?.email || "",
        username: user?.user?.user_name || "",
      }));
    }
  }, [user]); // 🔁 runs again when Redux user changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        user_name: formData.username,
        email: formData.email,
        password: formData.newPassword || undefined,
        confirm_password: formData.confirmPassword || undefined,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/v1/user/profile-settings`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Account updated successfully!");
        dispatch(fetchProfile()); // ✅ refresh user data in Redux

        setFormData({
          ...formData,
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.data?.message || "Failed to update account.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <Toaster position="top-right" />
      <h5 className="fw-bold mb-3">Account Settings</h5>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          />
          <small className="text-muted">A username is required.</small>
        </div>

        {/* New Password */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <small className="text-muted">
            Leave blank to keep the current one.
          </small>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default DS_AccountSettingsForm;
