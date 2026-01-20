import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamMembers,
  inviteMember,
  removeMember,
  updateMemberPermissions,
} from "../../../redux/teamWorkSlice";
import ConfirmModal from "../../ConfirmModal";

function DashboardTeamWorkTab() {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.teamWork);
  const [email, setEmail] = useState("");

  // New state for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  const handleInvite = () => {
    if (!email.trim()) return;
    dispatch(inviteMember(email));
    setEmail("");
  };

  const togglePermission = (member, key) => {
    const newPermissions = {
      ...member.permissions,
      [key]: !member.permissions[key],
    };
    dispatch(
      updateMemberPermissions({
        member_id: member.member_id,
        permissions: newPermissions,
      })
    );
  };

  const handleRemoveClick = (member_id) => {
    setSelectedMemberId(member_id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    dispatch(removeMember(selectedMemberId));
    setShowModal(false);
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold mb-0">Team Management</h4>
      </div>

      {/* Invite section */}
      <div className="mb-4">
        <div className="input-group" style={{ maxWidth: "400px" }}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter team member email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleInvite}
          >
            {loading ? "Invite..." : "Invite"}
          </button>
        </div>
      </div>

      {/* Members Table */}
      {loading ? (
        <div className="text-center py-3">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : members.length === 0 ? (
        <div className="alert alert-info text-center">
          No team members found. Invite someone to get started.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Permissions</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.member_id}>
                  <td>{m.member_email}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-3">
                      {Object.keys(m.permissions || {}).map((key) => (
                        <div key={key} className="form-check form-switch d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${m.member_id}-${key}`}
                            checked={m.permissions[key]}
                            onChange={() => togglePermission(m, key)}
                          />
                          <label htmlFor={`${m.member_id}-${key}`} className="form-check-label text-capitalize">
                            {key.replace("ar", "AR ")}
                          </label>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveClick(m.member_id)}
                    >
                      <i className="bi bi-trash"></i> Remove
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
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmRemove}
        title="Confirm Delete"
        message="Are you sure you want to remove this member?"
      />
    </div>
  );
}

export default DashboardTeamWorkTab;