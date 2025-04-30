import React from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div className="container my-5">
      {/* Heading */}
      <h2 className="fw-bold text-center mb-4">Contact Us</h2>

      {/* Description */}
      <p className="text-center mb-4">
        Can't find the answer in our{" "}
        <Link to="/faq" className="text-decoration-none">FAQ</Link>?
        Send us a message, and we'll get back to you as soon as possible.
      </p>


      {/* Form */}
      <div className="bg-white p-4 shadow-sm rounded">
        <form>
          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category: <span className="text-danger">*</span>
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              required
            >
              <option value="">- Please select -</option>
              <option value="3D FILE UPLOAD - USER">3D FILE UPLOAD</option>
              <option value="TECHNICAL SUPPORT - USER">TECHNICAL SUPPORT</option>
              <option value="ACCOUNT MANAGEMENT - USER">
                BILLING AND ACCOUNT MANAGEMENT
              </option>
              <option value="UPGRADE PLAN - USER">UPGRADE PLAN</option>
              <option value="OTHER - USER">OTHER</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <p id="email" className="form-control bg-light">
              arcodemagic@gmail.com
            </p>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message: <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              className="form-control"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
