import React from "react";

function DS_AccountSettingsForm() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <h5 className="fw-bold mb-3">Account Settings</h5>
      <form>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            defaultValue="arcodemagic@gmail.com"
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
            defaultValue="arcodemagic"
            disabled
          />
          <small className="text-muted">A username is required.</small>
        </div>
        {/* New Password */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New password
          </label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            placeholder=""
          />
          <small className="text-muted">Leave blank to keep current one.</small>
        </div>
        {/* Confirm New Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm new Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder=""
          />
          <small className="text-muted">Leave blank to keep current one.</small>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </form>
    </div>
  );
}

export default DS_AccountSettingsForm;
