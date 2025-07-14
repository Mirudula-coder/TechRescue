import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DoctorRegister() {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialization: '',
    qualification: '',
    experience: '',
    licenseNumber: '',
    phoneNumber: '',
    hospitalName: '',
    clinicAddress: '',
    availableStartTime: '',
    availableEndTime: '',
  });

  // State for profile picture
  const [profilePic, setProfilePic] = useState(null);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append('profilePic', profilePic);

    try {
      const response = await axios.post('http://localhost:5000/api/doctors/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
      if (response.status === 201 || response.data.message === 'You are already approved. Please login') {
        navigate('/doctor-login');
      }
    } catch (err) {
      console.error('Axios Error:', err);
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
    width: '400px',
    textAlign: 'center',
    overflowY: 'auto',
    maxHeight: '90vh',
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
        <h2>Doctor Registration</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="experience" placeholder="Years of Experience" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="hospitalName" placeholder="Clinic/Hospital Name" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="clinicAddress" placeholder="Clinic Address" onChange={handleChange} style={inputStyle} required />
          
          <label>Available Start Time:</label>
          <input type="time" name="availableStartTime" onChange={handleChange} style={inputStyle} required />
          
          <label>Available End Time:</label>
          <input type="time" name="availableEndTime" onChange={handleChange} style={inputStyle} required />

          <label>Profile Picture:</label>
          <input type="file" name="profilePic" onChange={handleFileChange} style={inputStyle} required />

          <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default DoctorRegister;
