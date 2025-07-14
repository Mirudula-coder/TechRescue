import React, { useEffect, useState } from 'react';

const Display = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem('doctorEmail');  // Doctor's email
    console.log("Retrieved doctorEmail from localStorage:", email);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            if (!email) {
                console.error("No doctorEmail found in localStorage");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching doctor details for email:", email);
                const response = await fetch(`http://localhost:5000/api/doctors/findEmail/${email}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch doctor details. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched doctor details:", data);
                setDoctor(data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [email]);

    if (loading) {
        console.log("Loading doctor details...");
        return <p>Loading doctor details...</p>;
    }

    if (!doctor) {
        console.warn("No doctor found for email:", email);
        return <p>No doctor found.</p>;
    }

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.heading}>Doctor Details</h1>
            <div style={{ height: '30px' }}></div>  

            <div style={styles.container}>
                <img 
                    src={doctor.profilePic ? `http://localhost:5000/${doctor.profilePic}` : 'default-profile.png'}
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
    }
};

export default Display;
