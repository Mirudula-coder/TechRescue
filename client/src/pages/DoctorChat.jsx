import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorChat = () => {
  const [patients, setPatients] = useState([]);
  const doctorEmail = localStorage.getItem('mainDoctorEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chat/getDoctorChats/${doctorEmail}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };

    fetchPatients();
  }, [doctorEmail]);

  const handleSelectPatient = (patientEmail) => {
    localStorage.setItem('selectedPatientEmail', patientEmail);
    navigate('/chat-with-patient'); // Navigate to chat page
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Chats</h2>
      </div>

      {/* Chat List */}
      <div style={styles.chatList}>
        {patients.length === 0 ? (
          <p style={styles.noChats}>No chats yet!</p>
        ) : (
          patients.map((patient) => (
            <div
              key={patient.email}
              style={styles.chatItem}
              onClick={() => handleSelectPatient(patient.email)}
            >
              {/* Avatar */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Avatar"
                style={styles.avatar}
              />

              {/* Chat Info */}
              <div style={styles.chatInfo}>
                <h4 style={styles.username}>{patient.username}</h4>
                <p style={styles.lastMessage}>Tap to chat</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    padding: '20px',
    backgroundColor: '#075e54',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  chatList: {
    flex: 1,
    overflowY: 'auto',
    margin: '10px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  chatItemHover: {
    backgroundColor: '#f1f1f1',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
  },
  chatInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    margin: '0',
    fontSize: '18px',
    color: '#333',
  },
  lastMessage: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#888',
  },
  noChats: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#888',
  },
};

export default DoctorChat;
