import React from "react";
import qrCodeImage from '../../../assets/dashboardIMG/ar-code.png';
function DD_QRCodeWithLogo() {
  return (
    <div className="text-center bg-white p-3 rounded">
      {/* QR Code Container */}
      <div className="position-relative d-inline-block">
        {/* QR Code */}
        <img
          src={qrCodeImage} // Replace with the actual QR code image path
          alt="QR Code"
          className="img-fluid rounded"
          style={{ width: "200px", height: "200px" }}
        />
        {/* Center Logo */}
        <div
          className="position-absolute top-50 start-50 translate-middle bg-primary d-flex justify-content-center align-items-center rounded"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="text-white fw-bold">AI</span>
        </div>
      </div>

      {/* Text Below QR Code */}
      <p className="mt-3 text-muted">
        <strong className="fw-bold">5 scans</strong> since December 18, 2024
      </p>
    </div>
  );
}

export default DD_QRCodeWithLogo;
