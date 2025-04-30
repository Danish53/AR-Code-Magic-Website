import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineClockCircle, AiOutlineDownload, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import qrCodeImage from '../../../assets/dashboardIMG/ar-code.png'; // Replace with the actual QR code image path
import { Link } from 'react-router-dom';
function DD_QRCodeCard() {

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProceed = () => {
    // Add your delete functionality here
    console.log("Item deleted");
    setShowModal(false);
  };
  return (
    <div className="container-fluid bg-white p-3 mt-3 rounded shadow-sm">
      {/* Search bar and dropdown */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="input-group" style={{ width: "300px" }}>
            <input type="text" className="form-control" placeholder="Search" />
            <button className="btn btn-outline-secondary" type="button">
                <AiOutlineSearch size={20} /> {/* React icon for search */}
            </button>
            </div>
            <div>
            <select className="form-select" style={{ width: "150px" }}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="Popular">Popular</option>
            </select>
            </div>
        </div>

      {/* QR Code card */}
      <div className="card mb-3">
        {/* <div className="card-body d-flex justify-content-between align-items-center">
        
          <div className="d-flex align-items-center">
            <img
              src={qrCodeImage} 
              alt="QR Code"
              style={{ width: "100px", height: "100px" }}
              className="me-3"
            />
            <div>
              <h5 className="mb-0">Rankup Magic</h5>
              <small className="text-muted">12/18/2024</small>
            </div>
          </div>

         
          <div className="text-center">
            <h2 className="mb-0">3</h2>
            <button className="btn btn-success btn-sm">Scans + AI</button>
          </div>
        </div> */}
        <div className="card-body d-flex justify-content-between align-items-center">
  {/* QR Code Section */}
  <Link
    to="/qr-code" // Replace with the actual link for the QR code
    className="d-flex align-items-center text-decoration-none"
  >
    <img
      src={qrCodeImage} // Replace with actual QR code image path
      alt="QR Code"
      style={{ width: "100px", height: "100px" }}
      className="me-3"
    />
    <div>
      <h5 className="mb-0 text-primary">Rankup Magic</h5>
      <small className="text-muted">12/18/2024</small>
    </div>
  </Link>

  {/* Scan count */}
  <Link
    to="/user" // Replace with the actual link for the scan count
    className="text-center text-decoration-none"
  >
    <h2 className="mb-0 text-primary">3</h2>
    <button className="btn btn-success btn-sm">Scans + AI</button>
  </Link>
</div>


        {/* Action buttons */}
        <div className="card-footer d-flex justify-content-start align-items-center">
          <small className="text-muted me-4">
            <AiOutlineClockCircle className="me-1" size={16} /> 12/18/2024
          </small>
          <Link to="/user" className="btn btn-outline-secondary btn-sm me-2">
            <AiOutlineDownload className="me-1" size={16} />
            <span className="d-none d-sm-inline">Download</span> 
          </Link>
          <Link to="/user/edit" className="btn btn-outline-secondary btn-sm me-2">
            <AiOutlineEdit className="me-1" size={16} />
            <span className="d-none d-sm-inline">Edit</span> 
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteClick}>
            <AiOutlineDelete className="me-1" size={16} />
            <span className="d-none d-sm-inline">Delete</span>  
          </button>
        </div>
      </div>


       {/* Modal */}
       {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure you want to proceed?</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>
                  Note that this action is permanent. Once you click proceed, you <strong>may not undo this</strong>. Click anywhere outside this modal or click close to close this.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleProceed}>
                  Proceed
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DD_QRCodeCard;
