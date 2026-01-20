import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomPages, deleteCustomPage } from "../../../redux/customPagesSlice";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete, AiFillEye } from "react-icons/ai";
import toast from "react-hot-toast";
import ConfirmModal from "../../ConfirmModal";

function DC_Custom() {
  const dispatch = useDispatch();
  const { pages, loading } = useSelector((state) => state.customPages);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomPages());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedPageId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteCustomPage(selectedPageId)).unwrap();
      toast.success("Page deleted successfully!");
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setSelectedPageId(null);
    }
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold d-flex align-items-center">
          <AiOutlineEdit className="me-2" size={24} />
          Custom Pages
        </h4>
        <Link to="/user/custom-create" className="btn btn-success btn-sm">Add new</Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : pages.length === 0 ? (
        <p className="text-center text-muted">You don't have any active Custom Pages.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Reference Name</th>
                <th>Website URL</th>
                <th>Title</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, idx) => (
                <tr key={page.id}>
                  <td>{idx + 1}</td>
                  <td>{page.reference_name}</td>
                  <td>{page.website_url}</td>
                  <td>{page.custom_title}</td>
                  <td>{page.custom_message}</td>
                  <td className="d-flex">
                    {/* <Link to={`/user/page/${page.id}`} className="btn btn-sm btn-primary me-1">
                      <AiFillEye className="text-light" />
                    </Link> */}
                    <Link to={`/user/scan-logs/${page.id}`} className="btn btn-sm btn-primary me-1">
                      <AiFillEye className="text-light" />
                    </Link>
                    <Link to={`/user/custom-edit/${page.id}`} className="btn btn-sm btn-primary me-1">
                      <AiOutlineEdit className="text-light" />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteClick(page.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this page?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}

export default DC_Custom;
