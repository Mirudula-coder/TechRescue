import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const navigate = useNavigate();
  const [certificateName, setCertificateName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const email = localStorage.getItem('userEmail'); // Get email from localStorage

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
    width: '350px',
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!certificateName || !file) {
      alert('Please enter certificate name and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('certificateName', certificateName);
    formData.append('file', file);  // Ensure this is correct
    formData.append('message', message.trim());

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 201) {
        alert('Upload successful!');
        navigate('/ehr');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed.');
    }
};


  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Upload Medical Certificate</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Certificate Name"
            style={inputStyle}
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            required
          />
          <input
            type="file"
            style={inputStyle}
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
          <textarea
            placeholder="Message (Optional)"
            style={{ ...inputStyle, height: '60px' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
