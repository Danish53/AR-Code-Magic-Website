import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function DT_TrackingTab() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <div className="text-center mb-4">
        <AiOutlineEdit size={30} className="text-dark" />
        <h4 className="fw-bold mt-2">Retargeting Tracking</h4>
      </div>

      {/* Tracking Provider Section */}
      <div className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label htmlFor="tracking-provider" className="form-label">
              Tracking provider
            </label>
            <select id="tracking-provider" className="form-select">
              <option>Facebook Ads</option>
              <option>Google Ads</option>
              <option>LinkedIn Ads</option>
              <option>Twitter Ads</option>
              <option>AdRoll</option>
              <option>Quora Ads</option>
              <option>Instagram</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tracking-name" className="form-label">
              Tracking name
            </label>
            <input
              type="text"
              id="tracking-name"
              className="form-control"
              placeholder="e.g. AR Campaign 14"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="tracking-tag" className="form-label">
              Tracking Tag/Code
            </label>
            <input
              type="text"
              id="tracking-tag"
              className="form-control"
              placeholder="e.g. Numerical or alphanumeric"
            />
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-dark btn-sm">Add Tracking pixel</button>
        </div>
      </div>

      <hr />

      {/* Google Adwords Section */}
      <h5 className="fw-bold">Tracking Google Adwords</h5>
      <div className="row g-3 align-items-center mt-3">
        <div className="col-md-6">
          <label htmlFor="google-name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="google-name"
            className="form-control"
            placeholder="e.g. AR Campaign 14"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="google-tag" className="form-label">
            Tag/Code
          </label>
          <input
            type="text"
            id="google-tag"
            className="form-control"
            placeholder="e.g. AW-12345678901/ABCDE"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-success btn-sm">Save</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
}

export default DT_TrackingTab;
