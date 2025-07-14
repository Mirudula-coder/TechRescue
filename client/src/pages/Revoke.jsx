import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Revoke = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const userEmail = localStorage.getItem('userEmail'); // Patient's email

    useEffect(() => {
        const fetchGrantedDoctors = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ehr/getGrantedDoctors/${userEmail}`);
                if (!response.ok) throw new Error('Failed to fetch granted doctors');

                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching granted doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) fetchGrantedDoctors();
    }, [userEmail]);

    const handleRevokeAccess = async (doctorEmail) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ehr/revokeAccess`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientEmail: userEmail, doctorEmail })
            });

            if (!response.ok) throw new Error('Failed to revoke access');

            alert('Access revoked successfully!');
            navigate('/ehr');
            setDoctors(prevDoctors => prevDoctors.filter(doc => doc.email !== doctorEmail));
        } catch (error) {
            console.error('Error revoking access:', error);
            alert('Failed to revoke access.');
        }
    };

    if (loading) return <p>Loading granted doctors...</p>;
    if (doctors.length === 0) return <p>No doctors have been granted access.</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Granted Doctors</h1>
            {doctors.map((doctor) => (
                <div key={doctor.email} style={styles.doctorRow}>
                    <img src={`http://localhost:5000/${doctor.profilePic}`} alt="Doctor" style={styles.profilePic} />
                    <p style={styles.name}>{doctor.fullName}</p>
                    <button style={styles.revokeButton} onClick={() => handleRevokeAccess(doctor.email)}>
                        Revoke
                    </button>
                </div>
            ))}
        </div>
    );
};

// Styles
const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    doctorRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
        maxWidth: '1200px',
        width:'100%',
        margin: 'auto',
    },
    profilePic: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    name: {
        flex: 1,
        textAlign: 'left',
        marginLeft: '15px',
    },
    revokeButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default Revoke;
