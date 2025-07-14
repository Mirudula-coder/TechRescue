import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const mainDoctorEmail = localStorage.getItem('mainDoctorEmail');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/records/${mainDoctorEmail}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, [mainDoctorEmail]);

  const handleViewRecord = (patientEmail) => {
    localStorage.setItem('patientEmail', patientEmail);
    navigate('/display-record');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Patients with EHR Access</h2>
      {records.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {records.map((record) => (
            <li
              key={record._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{record.username}</span>
              <button
                onClick={() => handleViewRecord(record.email)}
                style={{
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                View Record
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients have granted access.</p>
      )}
    </div>
  );
};

export default ViewRecords;
