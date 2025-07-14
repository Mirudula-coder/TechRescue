import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (passcode === 'hms') {
      navigate('/admin-home'); // Navigate to adminHome.jsx
    } else {
      alert('Passcode is incorrect');
    }
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

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Admin Login</h2>
        <input 
          type="password" 
          placeholder="Passcode" 
          style={inputStyle} 
          value={passcode} 
          onChange={(e) => setPasscode(e.target.value)} 
        />
        <button style={buttonStyle} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
