import React from 'react';
import { Link } from 'react-router-dom';

function HomeTest() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1E1E1E', 
      color: '#FFFFFF', 
      textAlign: 'center' 
    }}>
      <div>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        Website is on working...
        </h1>
         <Link 
          to="/user" 
          style={{ 
            fontSize: '1.5rem', 
            textDecoration: 'none', 
            color: '#00BFFF', 
            border: '2px solid #00BFFF', 
            padding: '0.5rem 1rem', 
            borderRadius: '8px', 
            transition: 'all 0.3s ease' 
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#00BFFF';
            e.target.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#00BFFF';
          }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HomeTest;
