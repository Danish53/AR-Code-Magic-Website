import React from "react";
import { Link } from "react-router-dom";

function DM_Membership() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <p>
        Your <strong>STANDARD AR Code Magic Plan</strong> is active. For any questions
        or requests, please contact the support team at{" "}
        <a className="text-decoration-none" href="mailto:support@ar-code.com">support@ar-code.com</a>. Thank you
        for your trust!
      </p>
      <p>
        Follow this link to access your{" "}
        <Link to="/user/settings" className="fw-bold text-decoration-none">
          settings
        </Link>.
      </p>
      <Link to="/user/membership" className="btn btn-dark mt-3">
        Manage your membership (Invoices, Card,..)
      </Link>
    </div>
  );
}

export default DM_Membership;
