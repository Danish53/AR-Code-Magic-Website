import React from "react";

function DA_ARDataAPIInfo() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <h5 className="fw-bold">AR Data API</h5>
      <p className="mb-3">
        The AR Data feature associated with its API allows companies to display remote, real-time text information on an AR Code Magic.
      </p>
      <h6 className="fw-bold">To create an AR Code Magic</h6>
      <p className="mb-3">
        Fill all the customizable parameters + add a password for a future edition.
      </p>
      <pre className="bg-light p-3 rounded">
        {`{"error":0,"referenceid":"WtDwi93x","arcode":"https://ar-code.com/WtDwi93x/ar","msg":"generated"}`}
      </pre>
      <h6 className="fw-bold mt-3">To edit an AR Code Magic</h6>
      <p className="mb-3">
        Fill all the customizable parameters + referenceid + password.
      </p>
      <pre className="bg-light p-3 rounded">
        {`{"error":0,"referenceid":"WtDwi93x","arcode":"https://ar-code.com/WtDwi93x/ar","msg":"updated"}`}
      </pre>
      <h6 className="fw-bold mt-3">To get the statistics of an AR Code Magic</h6>
      <p className="mb-3">Fill the referenceid + password.</p>
      <pre className="bg-light p-3 rounded">
        {`{"error":0,"referenceid":"WtDwi93x","scans":124}`}
      </pre>
    </div>
  );
}

export default DA_ARDataAPIInfo;
