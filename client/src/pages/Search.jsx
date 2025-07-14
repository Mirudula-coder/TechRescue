import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    hospitalName: '',
    availableTime: '',
  });

  // Fetch all doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors/find');
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initially display all doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle input change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  const applyFilters = () => {
    const { name, hospitalName, availableTime } = filters;

    const filtered = doctors.filter((doctor) => {
      const nameMatch = name ? doctor.fullName.toLowerCase().includes(name.toLowerCase()) : true;
      const hospitalMatch = hospitalName ? doctor.hospitalName.toLowerCase().includes(hospitalName.toLowerCase()) : true;
      const timeMatch = availableTime
        ? doctor.availableStartTime <= availableTime && doctor.availableEndTime >= availableTime
        : true;

      return nameMatch && hospitalMatch && timeMatch;
    });

    setFilteredDoctors(filtered);
  };

  // Store selected doctor's email and navigate to View.jsx
  const handleViewDoctor = (email) => {
    localStorage.setItem('selectedDoctorEmail', email);
    navigate('/view');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centering the filter part
    padding: '20px',
};

const filterContainerStyle = {
    width: '400px', // Small fixed width
    textAlign: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
    width: '90%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const recordsContainerStyle = {
    width: '100%', // Full width
    maxWidth: '95vw',
};

const doctorBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    width: '100%',  // Ensuring full width
};

const profilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
};

return (
    <div style={containerStyle}>
      {/* Filter Section - Small & Centered */}
      <div style={filterContainerStyle}>
        <h2>Search Doctors</h2>
        <input type="text" name="name" placeholder="Doctor Name" style={inputStyle} onChange={handleFilterChange} />
        <input type="text" name="hospitalName" placeholder="Hospital Name" style={inputStyle} onChange={handleFilterChange} />
        <input type="time" name="availableTime" placeholder="Available Time" style={inputStyle} onChange={handleFilterChange} />
        <button onClick={applyFilters} style={{ ...buttonStyle, width: '100%', marginBottom: '10px' }}>Apply Filters</button>
      </div>
  
      {/* Doctor Records Section - Full Width */}
      <div style={recordsContainerStyle}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.email} style={doctorBoxStyle}>
              <img src={`http://localhost:5000/${doctor.profilePic}`} alt="Profile" style={profilePicStyle} />
              <span>{doctor.fullName}</span>
              <button style={buttonStyle} onClick={() => handleViewDoctor(doctor.email)}>View</button>
            </div>
          ))
        ) : (
          <p>No doctors found</p>
        )}
      </div>
    </div>
  );
  
}

export default Search;
