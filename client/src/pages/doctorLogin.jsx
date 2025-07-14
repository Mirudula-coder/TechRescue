import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctors/login', { email, licenseNumber });

      alert(response.data.message);

      if (response.status === 200) {
        localStorage.setItem('mainDoctorEmail', email); // ✅ Store doctor email in localStorage
        navigate('/doctor-dashboard'); // Redirect to doctor dashboard
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
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

  const linkContainer = {
    textAlign: 'left',
    margin: '10px 0',
  };

  const linkStyle = {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Doctor Login</h2>
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="License Number"
          style={inputStyle}
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
        <div style={linkContainer}>
          Are you a new user? <span style={linkStyle} onClick={() => navigate('/doctor-register')}>Register</span>
        </div>
        <button style={buttonStyle} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default DoctorLogin;
