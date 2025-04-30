import React from "react";
function DC_CustomCreate() {
  return (
    <div className="bg-white shadow-sm p-4 rounded">
      {/* Header */}
      <h5 className="fw-bold mb-4 text-center">Create a Custom Page</h5>

      {/* Form */}
      <form>
        {/* Reference Name */}
        <div className="mb-3">
          <label htmlFor="referenceName" className="form-label">
            Reference name
          </label>
          <input
            type="text"
            id="referenceName"
            className="form-control"
            placeholder="e.g. Campaign 1"
          />
        </div>

        {/* Website URL */}
        <div className="mb-3">
          <label htmlFor="websiteUrl" className="form-label">
            Website URL
          </label>
          <input
            type="url"
            id="websiteUrl"
            className="form-control"
            placeholder="e.g. https://customlink.com/"
          />
        </div>

        {/* Upload Logo */}
        <div className="mb-3">
          <label htmlFor="uploadLogo" className="form-label">
            Upload Logo
          </label>
          <input type="file" id="uploadLogo" className="form-control" />
          <small className="form-text text-muted">
            100x100px, PNG or JPG, Max size 300KB.
          </small>
        </div>

        {/* Upload Banner */}
        <div className="mb-3">
          <label htmlFor="uploadBanner" className="form-label">
            Upload Banner
          </label>
          <input type="file" id="uploadBanner" className="form-control" />
          <small className="form-text text-muted">
            Min width 980px, height between 250px and 500px, PNG or JPG, Max size 500KB.
          </small>
        </div>

        {/* Custom Title */}
        <div className="mb-3">
          <label htmlFor="customTitle" className="form-label">
            Custom Title
          </label>
          <input
            type="text"
            id="customTitle"
            className="form-control"
            placeholder="e.g. Enjoy our AR experience"
          />
        </div>

        {/* Custom Message */}
        <div className="mb-3">
          <label htmlFor="customMessage" className="form-label">
            Custom Message
          </label>
          <textarea
            id="customMessage"
            className="form-control"
            rows="3"
            placeholder="e.g. A 3D view of our product with a nice animation"
          ></textarea>
          <small className="form-text text-muted">Max 140 chars</small>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default DC_CustomCreate;
