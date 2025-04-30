import React from 'react';
import { Link } from 'react-router-dom';
import qrCodeImage from '../../../assets/dashboardIMG/ar-code.png'; // Replace with the actual QR code image path
function DD_RecentARCodes() {
  // Example data for recent AR Code Magics (Replace this with dynamic data in future)
  const recentCodes = [
    {
      name: 'Rankup Magic',
      scans: 3,
      date: '12/18/2024',
    },
    // Add more items if necessary
  ];

  return (
    <div className="bg-white shadow-sm p-3 mb-4 rounded">
      <h5 className="fw-bold mb-3">Top AR Code Magics</h5>
      {recentCodes.map((code, index) => (
        <div className="d-flex align-items-center mb-2 gap-2" key={index}>
          {/* Icon Section */}
          <div className="me-2">
            <img
              src={qrCodeImage} // Replace with actual QR code icon
              alt="QR Code Icon"
              style={{ width: '24px', height: '24px' }}
            />
          </div>

          {/* Details Section */}
          <div className='d-flex gap-2'>
            <Link to="/user" className="text-decoration-none fw-bold">
              {code.name}
            </Link>{' '}
            - {code.scans} Scans
            {/* <br /> */}
            <small className="text-muted">{code.date}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DD_RecentARCodes;
