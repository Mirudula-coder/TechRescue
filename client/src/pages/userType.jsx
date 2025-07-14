import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserType() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url('img/ecg5.gif')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Ensures the background remains static
    overflowY: 'auto',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
};


  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0b3d91',
    padding: '15px 30px',
    color: '#fff',
    fontSize: '18px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const navItems = {
    display: 'flex',
    gap: '20px',
  };

  const navItemStyle = {
    cursor: 'pointer',
    padding: '10px 5px',
    fontWeight: 'normal',
    transition: 'color 0.3s',
    position: 'relative',
    whiteSpace: 'nowrap',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white',
    overflow: 'hidden',
  };
  const hoverEffect = {
    position: 'absolute',
    content: '""',
    bottom: 0,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: 'white',
    transition: 'width 0.5s ease',
  };
  const heroSection = {
    marginTop: '120px',
    textAlign: 'center',
    padding: '100px 20px',
    width: '80%',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '15px 30px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: '0.3s',
    margin: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const sectionStyle = {
    padding: '40px',
    marginTop: '40px',
    width: '80%',
    textAlign: 'center',
  };

  const aboutBoxStyle = {
    backgroundColor: 'rgba(17, 0, 41, 0.9)', // Transparent box
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(178, 163, 252, 0.8)',
    maxWidth: '900px',  // Made the box smaller
    margin: 'auto',
  };

  const footerStyle = {
    width: '100%',
    backgroundColor: '#0b3d91',
    color: 'white',
    textAlign: 'center',
    padding: '15px 0',
    marginTop: '40px',
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <div style={navbarStyle}>
        <h2>EHealth</h2>
        <div style={navItems}>
          <span 
            style={navItemStyle} 
            onMouseEnter={(e) => e.target.querySelector('span').style.width = '100%'}
            onMouseLeave={(e) => e.target.querySelector('span').style.width = '0'}
            onClick={() => navigate('/')}
          >
            Home
            <span style={{ ...hoverEffect }} />
          </span>

          <span 
            style={navItemStyle}
            onMouseEnter={(e) => e.target.querySelector('span').style.width = '100%'}
            onMouseLeave={(e) => e.target.querySelector('span').style.width = '0'}
            onClick={() => navigate('/doctor-login')}
          >
            Doctor
            <span style={{ ...hoverEffect }} />
          </span>

          <span 
            style={navItemStyle}
            onMouseEnter={(e) => e.target.querySelector('span').style.width = '100%'}
            onMouseLeave={(e) => e.target.querySelector('span').style.width = '0'}
            onClick={() => navigate('/user-login')}
          >
            Patient
            <span style={{ ...hoverEffect }} />
          </span>

          <span 
            style={navItemStyle}
            onMouseEnter={(e) => e.target.querySelector('span').style.width = '100%'}
            onMouseLeave={(e) => e.target.querySelector('span').style.width = '0'}
            onClick={() => scrollToSection('about-section')}
          >
            About Us
            <span style={{ ...hoverEffect }} />
          </span>

          <span 
            style={{ ...navItemStyle, paddingRight: '5px' }}  // Reduced padding to avoid hiding
            onMouseEnter={(e) => e.target.querySelector('span').style.width = '100%'}
            onMouseLeave={(e) => e.target.querySelector('span').style.width = '0'}
            onClick={() => scrollToSection('contact-section')}
          >
            Contact Us ere
            <span style={{ ...hoverEffect }} />
          </span>
        </div>
      </div>


      {/* Hero Section */}
      <div style={heroSection}>
        <h1 style={{ fontSize: '50px', fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)' }}>
          Welcome to Our EHealth Platform
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '1500px', margin: '0 auto' }}>
        Our healthcare platform revolutionizes the way you access medical services by providing seamless connectivity to trusted resources, expert consultations, and personalized wellness plans, ensuring top-notch care anytime, anywhere. With AI-driven diagnostics, secure patient data management, and real-time appointment scheduling, we empower individuals to take control of their health conveniently and confidently. Bridging the gap between patients and healthcare professionals, our platform offers telemedicine, digital prescriptions, and continuous health monitoring, making quality medical services more accessible than ever. Prioritizing patient well-being, we integrate cutting-edge technology, preventive care strategies, and user-friendly interfaces to enhance medical experiences and promote healthier lifestyles globally.
        </p>
        <p> <br></br></p>
        <button style={buttonStyle} onClick={() => navigate('/user-login')}>Find a Doctor</button>
        <button style={buttonStyle} onClick={() => navigate('/doctor-login')}>Find Patients</button>
      </div>

      {/* About Us Section with Transparent Box */}
      <div id="about-section" style={sectionStyle}>
        <div style={aboutBoxStyle}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: '#ffff' }}>About Us</h2>

          <h3 style={{ fontSize: '25px'}}>📅 Appointment Scheduling</h3>
          <p style={{ fontSize: '20px'}}>
            Our appointment scheduling module simplifies the process of booking and managing healthcare appointments. 
            Patients can easily view available slots, choose their preferred date and time, and confirm appointments online. 
            Automated reminders reduce the chances of missed appointments. 
            Doctors can manage their schedules efficiently and minimize overbooking. 
            Patients also receive appointment confirmations and updates in real time. 
            This feature reduces waiting times and ensures smooth clinical operations. 
            The scheduling system integrates with the hospital's EHR for seamless record management. 
            Rescheduling and cancellations are easily handled with just a few clicks. 
            Notifications via SMS and email keep patients informed. 
            The system offers a user-friendly interface for hassle-free booking.
          </p>
          <p> <br></br></p>
          <h3 style={{ fontSize: '25px'}}>🩺 Electronic Health Records (EHR)</h3>
          <p style={{ fontSize: '20px'}}>
            Our EHR module offers a digital solution for maintaining patient records securely. 
            It stores information such as medical history, lab results, prescriptions, and treatment plans. 
            Doctors can quickly access patient data during consultations, improving diagnosis accuracy. 
            The EHR ensures data privacy with encryption and strict access controls. 
            Patients can review their medical history anytime through a secure portal. 
            Real-time updates allow doctors to make informed decisions. 
            The system supports data sharing among healthcare providers for coordinated care. 
            It also tracks medication history, preventing drug interactions. 
            Data analytics helps identify trends and patterns in patient health. 
            The EHR streamlines administrative processes and improves patient care quality.
          </p>
          <p> <br></br></p>
          <h3 style={{ fontSize: '25px'}}>💡 Healthcare Scheme Matching</h3>
          <p style={{ fontSize: '20px'}}>
            The healthcare scheme matching module helps patients find relevant insurance plans. 
            It analyzes individual medical profiles and suggests appropriate schemes. 
            Patients can compare benefits, coverage, and costs. 
            The system simplifies the application process by automating form submissions. 
            Eligibility checks are performed based on predefined criteria. 
            Patients receive real-time notifications about new or updated schemes. 
            This module enhances accessibility to affordable healthcare. 
            Government and private insurance plans are included. 
            The system offers filters to sort plans by coverage and cost. 
            Patients can easily track the status of their applications.
          </p>
          <p> <br></br></p>
          <h3 style={{ fontSize: '25px'}}>💬 Chat with Doctors</h3>
          <p style={{ fontSize: '20px'}}>
            Our live chat feature enables instant communication with healthcare professionals. 
            Patients can discuss symptoms, seek medical advice, and receive prescription recommendations. 
            Doctors can offer preliminary consultations through chat. 
            The chat history is saved securely for future reference. 
            This feature reduces unnecessary hospital visits. 
            Real-time chat allows prompt medical assistance. 
            Patients can share images or reports for better diagnosis. 
            The chat system supports multilingual communication. 
            Notifications alert doctors of new messages. 
            This feature enhances accessibility and continuity of care.
          </p>
          <p> <br></br></p>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact-section" style={sectionStyle}>
        <h2>Contact</h2>
        <p>Email: support@ehealth.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 EHealth St, City, Country</p>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} EHealth. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default UserType;
