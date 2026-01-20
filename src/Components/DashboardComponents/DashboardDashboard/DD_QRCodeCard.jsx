import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteArModel, fetchArModels } from "../../../redux/arModelsQrSlice";
import ConfirmModal from "../../ConfirmModal";

function DD_QRCodeCard() {
  const dispatch = useDispatch();
  const { models, loading } = useSelector((state) => state.arModelsQr);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const user_id = user?.user?.id;

  // ✅ Fetch all AR models for the user
  useEffect(() => {
    if (user_id) {
      dispatch(fetchArModels(user_id));
    }
  }, [dispatch, user_id]);

  // ✅ Handle delete click (open confirm modal)
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // ✅ Handle actual delete
  const handleProceed = () => {
    if (!selectedId) return;

    dispatch(deleteArModel(selectedId))
      .unwrap()
      .then(() => {
        toast.success("Model deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete model!");
      })
      .finally(() => {
        setShowModal(false);
        setSelectedId(null);
      });
  };

  // ✅ Filter by search
  const filteredModels = models.filter((model) =>
    model.reference_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-fluid bg-white p-3 mt-3 rounded shadow-sm">
      {/* 🔍 Search + Sort */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <AiOutlineSearch size={20} />
          </button>
        </div>

        <div>
          <select className="form-select" style={{ width: "150px" }}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* 🧩 Models list */}
      {filteredModels.length > 0 ? (
        filteredModels.map((model) => (
          <div className="card mb-3" key={model.id}>
            <div className="card-body d-flex justify-content-between align-items-center">
              {/* Left side — QR details */}
              <Link
                to={`/qr/${model.id}`}
                className="d-flex align-items-center text-decoration-none"
              >
                <img
                  src={model.qr_code || "/default-qr.png"}
                  alt="QR Code"
                  style={{ width: "100px", height: "100px" }}
                  className="me-3 rounded"
                />
                <div>
                  <h5 className="mb-0 text-primary">
                    {model.reference_name || "Untitled Model"}
                  </h5>
                  <small className="text-muted">
                    Created:{" "}
                    {new Date(model.createdAt).toLocaleDateString("en-GB")}
                  </small>
                </div>
              </Link>

              {/* Right side — Scan count */}
              <div className="text-center">
                <h2 className="mb-0 text-primary">{model.scan_count || 0}</h2>
                <button className="btn btn-success btn-sm">Scans + AI</button>
              </div>
            </div>

            {/* Footer actions */}
            <div className="card-footer d-flex justify-content-start align-items-center">
              <small className="text-muted me-4">
                <AiOutlineClockCircle className="me-1" size={16} />
                Updated: {new Date(model.updatedAt).toLocaleString()}
              </small>
              <a
                href={model?.qr_code}
                download={model?.type_name}
                className="btn btn-outline-secondary btn-sm me-2"
              >
                <AiOutlineDownload className="me-1" size={16} />
                <span className="d-none d-sm-inline">Download</span>
              </a>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteClick(model.id)}
              >
                <AiOutlineDelete className="me-1" size={16} />
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No models found.</p>
      )}

      {/* 🗑 Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this model?"
        onConfirm={handleProceed}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default DD_QRCodeCard;
