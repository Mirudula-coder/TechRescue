import React, { useEffect, useState } from 'react';

const Delete = () => {
    const [appointments, setAppointments] = useState([]);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${userEmail}`);
            const data = await response.json();
            if (response.ok) {
                const currentTime = new Date(); // Get current time
                const filteredAppointments = data.filter(appointment => {
                    const appointmentDateTime = new Date(`${appointment.date} ${appointment.startTime}`);
                    return (appointmentDateTime - currentTime) >= 24 * 60 * 60 * 1000; // Only future appointments beyond 24 hours
                });
                setAppointments(filteredAppointments);
            } else {
                alert(data.message || 'Failed to fetch appointments.');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Appointment cancelled successfully.');
                    fetchAppointments(); // Refresh list after deletion
                } else {
                    alert(data.message || 'Failed to cancel appointment.');
                }
            } catch (error) {
                console.error('Error cancelling appointment:', error);
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Your Appointments</h2>
            {appointments.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {appointments.map((appointment) => (
                        <li
                            key={appointment._id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={`http://localhost:5000/${appointment.doctorProfilePic}`} 
                                    alt={appointment.doctorName}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.doctorName}</p>
                                    <p style={{ margin: 0 }}>{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => cancelAppointment(appointment._id)}
                                style={{
                                    background: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available</p>
            )}
        </div>
    );
};

export default Delete;
