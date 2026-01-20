import React, { useEffect } from 'react';
import { AiOutlineLink, AiOutlineLock, AiOutlineEdit } from 'react-icons/ai';
import { BiTargetLock } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackingPixels } from '../../../redux/trackingSlice';
import { fetchCustomPages } from '../../../redux/customPagesSlice';
import Select from "react-select";

function DD_OptionsForm({ formData, setFormData, handleChange }) {
    const dispatch = useDispatch();
  const { pixels } = useSelector((state) => state.trackingPixels);
  const { pages } = useSelector((state) => state.customPages);
  useEffect(() => {
    dispatch(fetchTrackingPixels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomPages());
  }, [dispatch]);

  return (
    <>
      {/* Additional Form Fields */}
      <div className="bg-white p-4 mt-4 rounded shadow-sm">
        <div className="mb-4">
          <label htmlFor="referenceName" className="form-label-dash fw-bold">
            2) Type a reference name*
          </label>
          <input
            type="text"
            id="referenceName"
            className="form-control"
            placeholder="e.g. Product 56754"
            name="reference_name"
            value={formData.reference_name}
            onChange={handleChange}
          />
        </div>

        <h5 className="fw-bold">3) Options</h5>
        <div className="mt-3">
          <div className="mb-3">
            <label className="form-label-dash">
              <strong>- Custom Link (optional):</strong> Add a custom link to
              display a banner at the bottom of your augmented reality
              rendering.
            </label>
            <div className="input-group mb-2">
              <span className="input-group-text">
                <AiOutlineEdit size={20} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Type your text here (Max 40 chars)"
                name="content"
                value={formData.content}
                onChange={handleChange}
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
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label-dash">
              <strong>- Password Restriction (optional):</strong> By adding a
              password, you can restrict access to your AR Code Magic; leave
              it blank for no restriction.
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <AiOutlineLock size={20} />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Type your password here"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="mb-3">
            <label className="form-label-dash">
              <strong>- Tracking Pixels (optional):</strong> Add your targeting pixels
              below from the list. Please make sure to enable them in the pixels settings.
            </label>

            <div className="input-group">
              <span className="input-group-text bg-light">
                <BiTargetLock size={20} />
              </span>

              <div style={{ width: "93%" }}>
                <Select
                  // components={animatedComponents}
                  isMulti
                  closeMenuOnSelect={false}
                  name="tracking_pixel"
                  options={
                    pixels && pixels.length > 0
                      ? pixels.map((pixel) => ({
                        value: pixel.id,
                        label: `${pixel.name} (${pixel.provider})`,
                      }))
                      : []
                  }
                  value={
                    pixels
                      ?.filter((p) => formData.tracking_pixel?.includes(p.id))
                      .map((p) => ({
                        value: p.id,
                        label: `${p.name} (${p.provider})`,
                      })) || []
                  }
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map((opt) => opt.value);
                    setFormData({
                      ...formData,
                      tracking_pixel: selectedValues,
                    });
                  }}
                  placeholder={
                    pixels.length === 0
                      ? "No tracking pixels found"
                      : "Select pixels..."
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#ced4da",
                      boxShadow: "none",
                      "&:hover": { borderColor: "#adb5bd" },
                    }),
                  }}
                />
              </div>
            </div>

            {/* Show selected pixels badges (optional, for clarity) */}
            {formData.tracking_pixel?.length > 0 && (
              <div className="mt-2">
                {formData.tracking_pixel.map((id) => {
                  const selectedPixel = pixels.find((p) => p.id === id);
                  return (
                    <span
                      key={id}
                      className="badge bg-primary me-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {selectedPixel
                        ? `${selectedPixel.name} (${selectedPixel.provider})`
                        : id}
                    </span>
                  );
                })}
              </div>
            )}
          </div>


          <div className="mb-3">
            <label className="form-label-dash">
              <strong>- Custom Page (optional):</strong> Please make sure to
              enable it in the custom pages settings.
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <AiOutlineEdit size={20} />
              </span>
              <select
                className="form-select"
                name="custom_page"
                value={formData.custom_page}
                onChange={handleChange}
              >
                <option value="">Select Page...</option>

                {pages && pages.length > 0 ? (
                  pages.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.reference_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No pages found</option>
                )}
              </select>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DD_OptionsForm;
