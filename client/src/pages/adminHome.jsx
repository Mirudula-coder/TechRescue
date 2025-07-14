import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  const handleApproveDoctors = () => {
    navigate('/approve-doctors'); // Navigate to approveDoctors.jsx
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url('/img/ecg5.gif')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
    padding: '30px',
    width: '300px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Admin Home</h2>
        <button style={buttonStyle} onClick={handleApproveDoctors}>
          Approve Doctors
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
