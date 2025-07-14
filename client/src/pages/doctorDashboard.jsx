import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url('img/ecg5.gif')`, // Path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
    padding: '50px',
    width: '500px',
    textAlign: 'center',
  };

  const buttonContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
    width: '80%',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Doctor Home</h2>
        <div style={buttonContainer}>
          <button style={buttonStyle} onClick={() => navigate('/view-scheduled-appointments')}>View Appointments</button>
          <button style={buttonStyle} onClick={() => navigate('/cancel-appointments')}>Cancel Appointments</button>
          <button style={buttonStyle} onClick={() => navigate('/view-records')}>View Patient Records</button>
          <button style={buttonStyle} onClick={() => navigate('/doctor-chat')}>Chat with patients</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
