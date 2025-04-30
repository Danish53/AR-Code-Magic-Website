import React from "react";
import { Link } from "react-router-dom";

function DM_ExpiryInfo() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <h5 className="fw-bold">Period Expiry: January 18, 2025</h5>
      <hr />
      <p>
        You can cancel your membership whenever you want. Upon request, your
        membership will be canceled right before your next payment period. This
        means you can still enjoy premium features until the end of your
        membership.
      </p>
      <Link to="/user/contact-us" className="btn btn-dark">
        Contact us
      </Link>
    </div>
  );
}

export default DM_ExpiryInfo;
