import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EHR() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) {
      fetchRecords(email);
    } else {
      console.error('No email found in localStorage');
      setLoading(false);
    }
  }, []);

  const fetchRecords = async (email) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/records/${email}`);
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      alert('Record deleted successfully!');
      fetchRecords(email);
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div style={styles.container}>
      {/* Buttons Section */}
      <div style={styles.header}>
        <h2 style={styles.recordsTitle}>Records</h2>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate('/upload')}>Upload</button>
          <button style={styles.button} onClick={() => navigate('/search')}>Grant Access</button>
          <button style={styles.button} onClick={() => navigate('/revoke')}>Revoke Access</button>
        </div>
      </div>

      {/* Records Section */}
      <div style={styles.recordsContainer}>
        {loading ? (
          <p style={styles.loadingText}>Loading records...</p>
        ) : records.length === 0 ? (
          <p style={styles.noRecords}>No records available</p>
        ) : (
          records.map((record) => (
            <div key={record._id} style={styles.recordBox}>
              <div>
                <h3>{record.certificateName}</h3>
                {record.message && <p><strong>Message:</strong> {record.message}</p>}
                <p><strong>Date & Time:</strong> {formatDate(record.uploadDate)}</p>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  style={styles.viewButton}
                  onClick={() => window.open(`http://localhost:5000/uploads/${record.filePath.split('\\').pop()}`, '_blank')}
                >
                  View
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(record._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  recordsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  },
  recordsContainer: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    paddingLeft: '20px',
    paddingRight: '20px', // Ensuring 20px padding on both sides
  },
  recordBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noRecords: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
  loadingText: {
    fontSize: '18px',
    color: '#555',
  },
};

export default EHR;
