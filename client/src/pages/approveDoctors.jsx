import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApproveDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors/unapproved')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/approve/${id}`, { isApproved: status });
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error('Error updating doctor status:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '20px',
    paddingLeft: '20px',
  };

  const cardStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    marginBottom: '15px',
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: '1.5',
  };

  const profileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
  };

  const profileImageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #007bff',
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    border: 'none',
    width: '48%',
    marginLeft: '10px',
  };

  const approveButton = { ...buttonStyle, backgroundColor: '#28a745', color: '#fff' };
  const rejectButton = { ...buttonStyle, backgroundColor: '#dc3545', color: '#fff' };

  return (
    <div style={containerStyle}>
      <h2>Approve Doctors</h2>
      {doctors.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        doctors.map((doctor) => {
          const start = new Date(`1970-01-01T${doctor.availableStartTime}:00`);
          const end = new Date(`1970-01-01T${doctor.availableEndTime}:00`);
          const duration = (end - start) / (1000 * 60);

          return (
            <div key={doctor._id} style={cardStyle}>
              <div style={profileContainerStyle}>
                <img 
                  src={doctor.profilePic ? `http://localhost:5000/${doctor.profilePic.replace(/\\/g, '/')}` : '/default-profile.png'} 
                  alt="Doctor Profile" 
                  style={profileImageStyle} 
                />
              </div>
              <p><strong>Name:</strong> {doctor.fullName}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>License No:</strong> {doctor.licenseNumber}</p>
              <p><strong>Clinic Name:</strong> {doctor.hospitalName}</p>
              <p><strong>Clinic Address:</strong> {doctor.clinicAddress}</p>
              <p><strong>Availability:</strong> {doctor.availableStartTime} - {doctor.availableEndTime} ({duration} minutes)</p>
              <div style={buttonContainer}>
                <button style={approveButton} onClick={() => handleApproval(doctor._id, "true")}>Yes</button>
                <button style={rejectButton} onClick={() => handleApproval(doctor._id, "never")}>No</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ApproveDoctors;
