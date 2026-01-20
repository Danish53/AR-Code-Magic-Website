import React from "react";
import "./ConfirmModal.css"; // optional external CSS for styling

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal-content">
        <h5 className="fw-bold mb-3">{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
