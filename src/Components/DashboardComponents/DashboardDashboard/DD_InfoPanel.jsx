import React from 'react';
import { Link } from 'react-router-dom';

function DD_InfoPanel() {
  return (
    <div className="bg-white shadow-sm mb-4 p-3 text-center rounded">
      <p className="mb-3">
        The AR Text feature allows users to create personalized augmented reality experiences by converting text into 3D models, offering customization options like text color and font selection.
      </p>
      <Link to="/user" className="btn btn-success">More info...</Link>
    </div>
  );
}

export default DD_InfoPanel;
