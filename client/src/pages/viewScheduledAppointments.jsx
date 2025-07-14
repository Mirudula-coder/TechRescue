import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewScheduledAppointments() {
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const mainDoctorEmail = localStorage.getItem('mainDoctorEmail');
      if (!mainDoctorEmail) {
        alert("Doctor email not found! Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${mainDoctorEmail}`);
        const { upcoming, past } = response.data;

        setScheduledAppointments(upcoming);
        setPastAppointments(past);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
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

  const appointmentInfoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2>Doctor's Scheduled Appointments</h2>

      {/* Upcoming Appointments */}
      <h3>Upcoming Appointments</h3>
      {scheduledAppointments.length > 0 ? (
        <ul style={listStyle}>
          {scheduledAppointments.map((appointment) => (
            <li key={appointment._id} style={appointmentItemStyle}>
              <div style={appointmentInfoStyle}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.patientName}</p>
                  <p style={{ margin: 0 }}>{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments.</p>
      )}

      {/* Past Appointments */}
      <h3>Past Appointments</h3>
      {pastAppointments.length > 0 ? (
        <ul style={listStyle}>
          {pastAppointments.map((appointment) => (
            <li key={appointment._id} style={appointmentItemStyle}>
              <div style={appointmentInfoStyle}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.patientName}</p>
                  <p style={{ margin: 0 }}>{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No past appointments.</p>
      )}
    </div>
  );
}

export default ViewScheduledAppointments;