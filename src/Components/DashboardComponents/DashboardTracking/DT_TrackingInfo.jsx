import React from "react";

function DT_TrackingInfo() {
  return (
    <>
      {/* Retargeting Tracking Pixels Section */}
      <div className="mb-4 p-3 rounded shadow-sm bg-white">
        <h5 className="fw-bold">What are Retargeting tracking pixels?</h5>
        <p className="mt-2">
          Ad platforms such as Facebook and Adwords provide a conversion
          tracking tool that allows you to gather data on your customers and
          how they behave on your website. By adding your pixel ID from either
          of these platforms, you can get more detailed statistics on the scans
          of your AR Code Magics and set up retargeting campaigns.
        </p>
      </div>

      {/* Facebook Pixel Section */}
      <div className="p-3 rounded shadow-sm bg-white">
        <h5 className="fw-bold">Facebook Pixel</h5>
        <p className="mt-2">
          The Facebook pixel ID is usually composed of 16 digits. Please make
          sure to add the correct value; otherwise, events will not be tracked!
        </p>
        <p className="text-danger bg-light px-3 py-2 rounded">
          <code>e.g. 1234567890123456</code>
        </p>
      </div>
    </>
  );
}

export default DT_TrackingInfo;
