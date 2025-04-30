import React from 'react';
import { AiOutlineLink, AiOutlineLock, AiOutlineEdit } from 'react-icons/ai';
import { BiTargetLock } from 'react-icons/bi';

function DD_OptionsForm() {
  return (
    <div className="bg-white p-4 mt-4 rounded shadow-sm">
      {/* Reference Name Input */}
      <div className="mb-4">
        <label htmlFor="referenceName" className="form-label-dash fw-bold">
          2) Type a reference name*
        </label>
        <input
          type="text"
          id="referenceName"
          className="form-control"
          placeholder="e.g. Product 56754"
        />
      </div>

      {/* Options Section */}
      <h5 className='fw-bold'>3) Options</h5>
      <div className="mt-3">

        {/* Custom Link */}
        <div className="mb-3">
          <label className="form-label-dash">
            <strong>- Custom Link (optional):</strong> Add a custom link to display a banner at the bottom of your augmented reality rendering.
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text">
              <AiOutlineEdit size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Type your text here (Max 40 chars)"
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <AiOutlineLink size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Type your URL here (https://...)"
            />
          </div>
        </div>

        {/* Password Restriction */}
        <div className="mb-3">
          <label className="form-label-dash">
            <strong>- Password Restriction (optional):</strong> By adding a password, you can restrict access to your AR Code Magic; leave it blank for no restriction.
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <AiOutlineLock size={20} />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Type your password here"
            />
          </div>
        </div>

        {/* Tracking Pixels */}
        <div className="mb-3">
          <label className="form-label-dash">
            <strong>- Tracking Pixels (optional):</strong> Add your targeting pixels below from the list. Please make sure to enable them in the pixels settings.
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <BiTargetLock size={20} />
            </span>
            <select className="form-select">
              <option value="">None</option>
              <option value="pixel1">Pixel 1</option>
              <option value="pixel2">Pixel 2</option>
            </select>
          </div>
        </div>

        {/* Custom Page */}
        <div className="mb-3">
          <label className="form-label-dash">
            <strong>- Custom Page (optional):</strong> Please make sure to enable it in the custom pages settings.
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <AiOutlineEdit size={20} />
            </span>
            <select className="form-select">
              <option value="">None</option>
              <option value="page1">Custom Page 1</option>
              <option value="page2">Custom Page 2</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DD_OptionsForm;
