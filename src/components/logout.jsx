// src/components/Logout.jsx
import React from 'react';
import './Logout.css';

function Logout() {
  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button>Logout</button>
    </div>
  );
}

export default Logout;