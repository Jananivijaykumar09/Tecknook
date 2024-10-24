import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpDesk = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showMentorPopup, setShowMentorPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false); // State for About Popup

  const handleSupportClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowMentorPopup(false);
    setShowAboutPopup(false); // Close About Popup
  };

  const handleMailUsClick = () => {
    window.location.href = "mailto:firebase410@gmail.com";
  };

  const handleMentorAccessClick = () => {
    setShowMentorPopup(true);
  };

  const handleAboutClick = () => {
    setShowAboutPopup(true); // Open About Popup
  };

  return (
    <section id="help-desk" style={{ ...styles.section, backgroundImage: `url('/help-desk.gif') ` }}>
      <div style={styles.overlay}>
        <h1>Help Desk</h1>
        <p>Welcome to our Help Desk! Here are some of the services we offer:</p>
        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.button,
              ...(hoveredButton === 'support' ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton('support')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={handleSupportClick}
          >
            Support
          </button>

          <Link
            to="/loan-scholarship-details"
            style={{
              ...styles.button,
              ...(hoveredButton === 'loan' ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton('loan')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Loan/Scholarship Details
          </Link>

          <button
            style={{
              ...styles.button,
              ...(hoveredButton === 'mentor' ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton('mentor')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={handleMentorAccessClick}
          >
            Mentor Access
          </button>

          {/* About Button */}
          <button
            style={{
              ...styles.button,
              ...(hoveredButton === 'about' ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton('about')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={handleAboutClick}
          >
            About
          </button>
        </div>

        {/* Support Popup */}
        {showPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h2 style={styles.popupTitle}>Support & TechNook Info</h2>
              <p style={styles.popupText}>
                Welcome to the *TechNook* support desk. We are here to assist you with inquiries about
                our platform, which empowers middle and high school education by providing mentorship,
                educational resources, career information, and more.
              </p>
              <button style={styles.mailButton} onClick={handleMailUsClick}>
                Mail Us
              </button>
              <button style={styles.closeButton} onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mentor Access Popup */}
        {showMentorPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h2 style={styles.popupTitle}>Mentor Access - TechNook</h2>
              <p style={styles.popupText}>
                To access mentor features, you need to log in. Please log in or register to continue.
              </p>
              <Link to="/login" style={styles.mailButton}>Go to Login/Register</Link>
              <button style={styles.closeButton} onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* About Popup */}
        {showAboutPopup && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h2 style={styles.popupTitle}>About TechNook Services</h2>
              <p style={styles.popupText}>
Introducing TechNook: Empowering Education for Middle and High School Students
</p>

<p style={styles.popupText}>
Our mission is to bridge the educational gap, especially in rural areas. We offer:
</p>

<ul style={styles.popupText}>
<li><strong>Mentorship Matters</strong>: Guidance from industry experts</li>
<li><strong>Learn Anywhere</strong>: Access to educational resources and materials</li>
<li><strong>Financial Aid</strong>: Loan and scholarship guidance</li>
<li><strong>Career Insights</strong>: Information on career opportunities and higher education</li>
<li><strong>Support Hub</strong>: Help desk for loans, scholarship and mentorship inquiries</li>
</ul>
              <button style={styles.closeButton} onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// CSS-in-JS styles
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    position: 'relative',
    zIndex: '1',
    color: 'white',
    textAlign: 'center',
    padding: '100px 20px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    width: '250px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '50px',
    backdropFilter: 'blur(10px)',
    transition: 'background-color 0.3s, border-color 0.3s, transform 0.3s',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.05)',
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    zIndex: '1000',
    width: '400px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
  },
  popupContent: {
    color: 'white',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  popupTitle: {
    marginBottom: '15px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  popupText: {
    fontSize: '16px',
    marginBottom: '15px',
    textAlign: 'left', // Align text to the left for readability
  },
  mailButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s',
    textDecoration: 'none',
  },
  closeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease, transform 0.3s',
  },
};

export default HelpDesk;
