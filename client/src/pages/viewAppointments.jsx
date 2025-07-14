import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        if (!userEmail) {
            console.error("No userEmail found in localStorage.");
            return;
        }

        try {
            console.log("Fetching appointments for user:", userEmail);
            const response = await fetch(`http://localhost:5000/api/appointments/${userEmail}`);
            const data = await response.json();
            
            if (response.ok) {
                console.log("Fetched appointments:", data);
                setAppointments(data); 
            } else {
                console.error("Failed to fetch appointments:", data.message);
                alert(data.message || 'Failed to fetch appointments.');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleViewDoctor = (doctorEmail) => {
        if (!doctorEmail) {
            console.error("Doctor email is missing!");
            return;
        }

        console.log("Storing doctorEmail in localStorage:", doctorEmail);
        localStorage.setItem('doctorEmail', doctorEmail); // Store doctor email in localStorage
        navigate('/display'); // Navigate to Display.jsx
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
                                    src={appointment.doctorProfilePic ? `http://localhost:5000/${appointment.doctorProfilePic}` : 'default-profile.png'}
                                    alt={appointment.doctorName}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>{appointment.doctorName}</p>
                                    <p style={{ margin: 0 }}>{appointment.date} | {appointment.startTime} - {appointment.endTime}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleViewDoctor(appointment.doctorEmail)}
                                style={{
                                    background: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default ViewAppointments;
