import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Initialize socket connection
const socket = io('http://localhost:5000');

export default function ChatWithPatient() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [patientName, setPatientName] = useState('Patient');

  // Fetch emails from localStorage
  const doctorEmail = localStorage.getItem('mainDoctorEmail');
  const patientEmail = localStorage.getItem('selectedPatientEmail');

  useEffect(() => {
    if (doctorEmail && patientEmail) {
      // Join chat room
      socket.emit('joinRoom', { doctorEmail, patientEmail });

      // Fetch patient name
      axios
        .get(`http://localhost:5000/api/users/${patientEmail}`)
        .then((response) => setPatientName(response.data.name))
        .catch((error) => console.error('Error fetching patient name:', error));

      // Fetch messages
      axios
        .get(`http://localhost:5000/api/chat/${doctorEmail}/${patientEmail}`)
        .then((response) => setMessages(response.data.messages))
        .catch((error) => console.error('Error fetching messages:', error));

      // Listen for new messages
      socket.on('receiveMessage', (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      return () => socket.off('receiveMessage');
    }
  }, [doctorEmail, patientEmail]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
  
    const messageData = {
      doctorEmail,
      patientEmail,
      sender: 'doctor',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
  
    // Emit the message but do NOT update the UI here
    socket.emit('sendMessage', messageData);
    axios.post(`http://localhost:5000/api/chat/${doctorEmail}/${patientEmail}`, messageData);
  
    setNewMessage('');
  };
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Patient" style={styles.avatar} />
        <h3 style={styles.chatTitle}>{patientName}</h3>
      </div>

      {/* Messages */}
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === 'doctor' ? styles.userMessageContainer : styles.doctorMessageContainer}
          >
            <div style={msg.sender === 'doctor' ? styles.userMessage : styles.doctorMessage}>
              {msg.content}
              <div style={styles.timestamp}>
  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</div>

            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button style={styles.sendButton} onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

// Styles (Same as previous)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    margin: '0',
    backgroundColor: '#e5ddd5',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#075e54',
    color: 'white',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  chatTitle: {
    margin: 0,
    fontSize: '20px',
  },
  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflowY: 'scroll',
    backgroundColor: '#d3f8d3',
  },
  userMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '8px',
  },
  doctorMessageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '8px',
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
    padding: '10px 15px',
    borderRadius: '10px',
    maxWidth: '60%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  },
  doctorMessage: {
    backgroundColor: '#ffffff',
    padding: '10px 15px',
    borderRadius: '10px',
    maxWidth: '60%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  },
  timestamp: {
    fontSize: '10px',
    color: '#555',
    marginTop: '5px',
    textAlign: 'right',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    marginRight: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    backgroundColor: '#128c7e',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
