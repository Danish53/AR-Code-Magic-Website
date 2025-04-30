import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function DC_Custom() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold d-flex align-items-center">
          <AiOutlineEdit className="me-2" size={24} />
          Custom Pages
        </h4>
        <Link to="/user/custom-create" className="btn btn-success btn-sm">Add new</Link>
      </div>
      <p className="text-muted text-center">
        You don't have any active Custom Pages.
      </p>
    </div>
  );
}

export default DC_Custom;
