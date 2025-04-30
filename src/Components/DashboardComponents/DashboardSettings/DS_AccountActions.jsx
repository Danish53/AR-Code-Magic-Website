import React from "react";
import { Link } from "react-router-dom";

function DS_AccountActions() {
  return (
    <>
      {/* Export Section */}
      <div className="bg-white shadow-sm mb-4 p-3 text-center rounded">
        <h5 className="fw-bold">Export</h5>
        <p>
          You can export your AR Code Magics along with a summary of the stats as CSV.
          Simply click the following button to create it.
        </p>
        <Link to="/user/settings" className="btn btn-success">
          Export
        </Link>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white shadow-sm p-3 mb-4 rounded">
        <h5 className="fw-bold">Delete your account</h5>
        <p>
          We respect your privacy and as such you can delete your account
          permanently and remove all your data from our server. Please note that
          this action is permanent and cannot be reversed.
        </p>
        <Link to="/contact-us" className="btn btn-dark">
          Contact us to delete your account
        </Link>
      </div>
    </>
  );
}

export default DS_AccountActions;
