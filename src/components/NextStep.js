// src/components/NextStep.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './next-step.css'; // Import the CSS file for styles and animations

const NextStep = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle click and navigate to Career Information page
  const goToCareerInformation = () => {
    navigate('/career-information'); // Navigate to the route for Career Information
  };
  const goToCompetitiveExams = () => navigate('/competitive-exams');


  return (
    <section id="next-step" style={styles.section}>
      <div style={styles.overlay}>
        <h1>Next Step After 12th Grade</h1>
        <p>Explore various degrees and career paths</p>
        <div style={styles.featureGrid}>
          <div className="feature-item" onClick={() => navigate('/bachelor-degrees')}>
            Higher education
          </div>
          <div className="feature-item" onClick={goToCareerInformation}>
            Career Information
          </div>
          <div className="feature-item" onClick={goToCompetitiveExams}>Competitive Exams</div>
        </div>
      </div>
      <div className="animated-background"></div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'relative',
    zIndex: '1',
    color: 'white',
    textAlign: 'center',
    padding: '50px 20px',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
};

export default NextStep;
