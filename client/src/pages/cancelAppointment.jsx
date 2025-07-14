import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CancelAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const mainDoctorEmail = localStorage.getItem('mainDoctorEmail');
      if (!mainDoctorEmail) {
        alert('Doctor email not found! Please log in again.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${mainDoctorEmail}`);
        console.log('Fetched Appointments:', response.data.upcoming);
        setAppointments(response.data.upcoming);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    console.log('Cancelling appointment with ID:', appointmentId);
    
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/appointmentsActions/${appointmentId}`);
      console.log('Cancellation Response:', response.data);

      alert('Appointment cancelled successfully.');
      setAppointments(appointments.filter(a => a._id !== appointmentId));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment.');
    }
  };

  const appointmentItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    margin: '10px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.1)',
  };

  const cancelButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Cancel Appointments</h2>
      {appointments.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li key={appointment._id} style={appointmentItemStyle}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.patientName}</p>
                <p style={{ margin: 0 }}>{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
              </div>
              <button style={cancelButtonStyle} onClick={() => handleCancel(appointment._id)}>Cancel</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments to cancel.</p>
      )}
    </div>
  );
}

export default CancelAppointments;
