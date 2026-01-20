import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrackingPixels,
  createTrackingPixel,
  deleteTrackingPixel,
} from "../../../redux/trackingSlice";
import toast from "react-hot-toast";
import ConfirmModal from "../../ConfirmModal";

function DT_TrackingTab() {
  const dispatch = useDispatch();
  const { pixels, loading } = useSelector((state) => state.trackingPixels);

  const [formData, setFormData] = useState({
    provider: "Facebook Ads",
    name: "",
    code: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchTrackingPixels());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.code)
      return toast.error("All fields required!");
    dispatch(createTrackingPixel(formData));
    setFormData({ provider: "Facebook Ads", name: "", code: "" });
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTrackingPixel(selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <div className="text-center mb-4">
        <AiOutlineEdit size={30} className="text-dark" />
        <h4 className="fw-bold mt-2">Retargeting Tracking</h4>
      </div>

      {/* Add New Tracking Pixel */}
      <div className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label className="form-label">Tracking Provider</label>
            <select
              id="provider"
              className="form-select"
              value={formData.provider}
              onChange={handleChange}
            >
              <option>Facebook Ads</option>
              <option>Google Ads</option>
              <option>LinkedIn Ads</option>
              <option>Twitter Ads</option>
              <option>AdRoll</option>
              <option>Quora Ads</option>
              <option>Instagram Ads</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Tracking Name</label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="e.g. AR Campaign 14"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Tracking Tag/Code</label>
            <input
              id="code"
              value={formData.code}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="e.g. AW-12345678901/ABCDE"
            />
          </div>
        </div>
        <div className="text-end mt-3">
          <button onClick={handleAdd} className="btn btn-dark btn-sm">
            Add Tracking Pixel
          </button>
        </div>
      </div>

      <hr />

      {/* Show All Pixels */}
      <h5 className="fw-bold mb-3">All Tracking Pixels</h5>
      {loading ? (
        <p>Loading...</p>
      ) : pixels.length === 0 ? (
        <p className="text-muted">No tracking pixels added yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Provider</th>
                <th>Name</th>
                <th>Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pixels.map((pixel) => (
                <tr key={pixel.id}>
                  <td>{pixel.provider}</td>
                  <td>{pixel.name}</td>
                  <td>{pixel.code}</td>
                  <td>
                    <button
                      onClick={() => openDeleteModal(pixel.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this Pixel?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}

export default DT_TrackingTab;
