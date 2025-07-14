import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const View = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessGranted, setAccessGranted] = useState(false);

    const email = localStorage.getItem('selectedDoctorEmail');  // Doctor's email
    const userEmail = localStorage.getItem('userEmail');  // Patient's email

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/doctors/findEmail/${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor details');
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            } finally {
                setLoading(false);
            }
        };

        const checkAccess = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ehr/checkAccess/${userEmail}/${email}`);
                const data = await response.json();
                setAccessGranted(data.accessGranted);
            } catch (error) {
                console.error("Error checking access:", error);
            }
        };

        if (email) {
            fetchDoctorDetails();
            checkAccess();
        } else {
            setLoading(false);
        }
    }, [email, userEmail]);

    const handleGrantAccess = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ehr/grantAccess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientEmail: userEmail, doctorEmail: email })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Access granted successfully!");
                setAccessGranted(true);  // Update state to hide the button
                navigate('/ehr');
            } else {
                alert(data.error || "Failed to grant access");
            }
        } catch (error) {
            console.error("Error granting access:", error);
            alert("Server error. Try again later.");
        }
    };
    const handleBookAppointment = () => {
        navigate('/book');
    };
    const handleChat = () => {
        navigate('/chat');
    };


    if (loading) return <p>Loading doctor details...</p>;
    if (!doctor) return <p>No doctor found.</p>;

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.heading}>Doctor Details</h1>
            <div style={{ height: '30px' }}></div>  

            <div style={styles.container}>
                <img 
                    src={`http://localhost:5000/${doctor.profilePic}`} 
                    alt="Doctor Profile" 
                    style={styles.profilePic}
                />
                <h2 style={styles.name}>{doctor.fullName}</h2>

                <div style={styles.detailsContainer}>
                    <div style={styles.labelColumn}>
                        <p><strong>Email:</strong></p>
                        <p><strong>Specialization:</strong></p>
                        <p><strong>Qualification:</strong></p>
                        <p><strong>Experience:</strong></p>
                        <p><strong>Hospital Name:</strong></p>
                        <p><strong>Clinic Address:</strong></p>
                        <p><strong>Available Time:</strong></p>
                    </div>
                    <div style={styles.valueColumn}>
                        <p>{doctor.email}</p>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.qualification}</p>
                        <p>{doctor.experience} years</p>
                        <p>{doctor.hospitalName}</p>
                        <p>{doctor.clinicAddress}</p>
                        <p>{doctor.availableStartTime} - {doctor.availableEndTime}</p>
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button style={styles.bookButton} onClick={handleBookAppointment}> Book Appointment</button>
                    {!accessGranted && (
                        <button style={styles.grantButton} onClick={handleGrantAccess}>Grant Access</button>
                    )}
                    <button style={styles.chatButton} onClick={handleChat}> Chat</button>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    pageContainer: {
        textAlign: 'center',
        padding: '20px',
    },
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        textAlign: 'center',
        padding: '20px',
        maxWidth: '500px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    profilePic: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    name: {
        marginBottom: '20px',
        color: '#333',
    },
    detailsContainer: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'left',
        gap: '20px',
        marginBottom: '20px',
    },
    labelColumn: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    valueColumn: {
        textAlign: 'left',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    bookButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    chatButton: {
        padding: '10px',
        backgroundColor: '#008000',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    grantButton: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default View;
