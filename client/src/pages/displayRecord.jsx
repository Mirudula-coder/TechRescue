import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const patientEmail = localStorage.getItem('patientEmail');

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/records/${patientEmail}`);
        setRecords(res.data);
      } catch (err) {
        console.error('Error fetching records:', err);
      } finally {
        setLoading(false);
      }
    };

    if (patientEmail) {
      fetchRecords();
    } else {
      console.error('No patient email found in localStorage');
      setLoading(false);
    }
  }, [patientEmail]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.recordsTitle}>Patient Records</h2>
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
              <button
                style={styles.viewButton}
                onClick={() => window.open(`http://localhost:5000/uploads/${record.filePath.split('\\').pop()}`, '_blank')}
              >
                View
              </button>
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
  recordsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  recordsContainer: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    paddingLeft: '20px',
    paddingRight: '20px',
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
  viewButton: {
    backgroundColor: '#28a745',
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

export default DisplayRecord;
