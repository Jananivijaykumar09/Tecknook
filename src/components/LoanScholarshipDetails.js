import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './loan-scholarship-details.css'; // Import the CSS file for styling

const LoanScholarshipDetails = () => {
  const [activeSection, setActiveSection] = useState(''); // State for active section
  const [showAnnouncement, setShowAnnouncement] = useState(false); // State for announcement visibility
  const navigate = useNavigate(); // Initialize useNavigate

  // Updated announcement message and URL
  const announcementMessage = (
    <span>
      🚨 Important: Visit the{' '}
      <a href="https://scholarships.gov.in/All-Scholarships" target="_blank" rel="noopener noreferrer">
        Scholarship Portal
      </a>{' '}
      for details on available scholarships!
    </span>
  );

  // Function to show loan details
  const handleLoanDetailsClick = () => {
    setActiveSection('loan'); // Set active section to loan
    setShowAnnouncement(false); // Hide announcement when viewing loan details
  };

  // Function to show scholarship details
  const handleScholarshipDetailsClick = () => {
    setActiveSection('scholarship'); // Set active section to scholarship
    setShowAnnouncement(true); // Show announcement when viewing scholarship details
  };

  return (
    <section className="loan-scholarship-container">
      <h1 className="page-title">Loan & Scholarship Details</h1>

      {/* Marquee Announcement Section */}
      {showAnnouncement && (
        <div className="announcement-marquee">
          <marquee behavior="scroll" direction="left" scrollamount="15"> {/* Increased scrollamount for faster speed */}
            {announcementMessage}
          </marquee>
        </div>
      )}

      <div className="cards-container">
        {/* Card for Loan Details */}
        <div className="card loan-card">
          <h2>Loan Details</h2>
          <p>
            Explore various loan options for your higher education journey, whether after 10th or 12th grade.
          </p>
          <button className="card-button" onClick={handleLoanDetailsClick}>
            View Loan Details
          </button>
        </div>

        {/* Card for Scholarship Details */}
        <div className="card scholarship-card">
          <h2>Scholarship</h2>
          <p>Find scholarships available for students pursuing higher education in different streams.</p>
          <button className="card-button" onClick={handleScholarshipDetailsClick}>
            View Scholarship Details
          </button>
        </div>
      </div>

      <div className="details-container">
        {/* Loan Details Section */}
        {activeSection === 'loan' && (
          <div className="loan-details">
 <div
              style={{
                border: '2px solid #c5c6c7', // Light border
                borderRadius: '10px', // Rounded corners
                padding: '15px', // Padding inside the card
                backgroundColor: '#f0f0f5', // Light background color
                color: '#333', // Dark text color for contrast
                marginTop: '20px', // Spacing from the top
                textAlign: 'center', // Center-align the text
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for card effect
              }}
            >
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                <strong>Disclaimer:</strong> TechNook only provides information regarding loans and scholarships and redirects users to the official websites for further details. For complete and accurate information, please refer to the official websites.   <a href="https://www.india.gov.in/spotlight/pradhan-mantri-vidya-lakshmi-karyakram-towards-bright-future" target="_blank" rel="noopener noreferrer">Official Website</a>
              </p>
            </div>            <p>
              A fully IT-based Student Financial Aid Authority has been proposed through the <strong>Pradhan Mantri Vidya Lakshmi Karyakram</strong>, to administer and monitor scholarship and educational loan schemes, enabling all poor and middle-class students to pursue higher education without financial constraints.
            </p>
            <h3 className="details-title">Key Features</h3>
            <ul className="details-list">
              <li>Access to various Educational Loan Schemes from different banks.</li>
              <li>Common Educational Loan Application Form (CELAF) for students.</li>
              <li>Application submission to multiple banks using a single form.</li>
              <li>Facilities for banks to manage loan applications and statuses.</li>
              <li>Grievance support for students regarding educational loans.</li>
              <li>Link to the National Scholarship Portal for government scholarships.</li>
            </ul>
            <p>
              Currently, <strong>39 banks</strong> have registered <strong>70 educational loan schemes</strong> on the Vidya Lakshmi Portal.
            </p>

            <h3 className="details-title">How to Apply for a Loan</h3>
            <ol className="application-steps">
              <li>Register on the <strong>Vidya Lakshmi Portal</strong> and fill the Common Education Loan Application Form (CELAF).</li>
              <li>Search and apply for Educational Loans to a maximum of three banks.</li>
            </ol>

            <h3 className="details-title">Guidelines for Registration</h3>
            <ul className="registration-guidelines">
              <li><strong>Name</strong>: Enter as per your 10th standard mark sheet.</li>
              <li><strong>Mobile Number</strong>: Provide a valid mobile number (parent/guardian's number is acceptable).</li>
              <li><strong>Email ID</strong>: Use a valid email ID, as it cannot be changed later.</li>
            </ul>

            <h3 className="details-title">Related Links</h3>
            <ul className="related-links">
              <li><a href="https://www.vidyalakshmi.co.in" target="_blank" rel="noopener noreferrer">Vidya Lakshmi Portal</a></li>
              <li><a href="https://www.iba.org.in" target="_blank" rel="noopener noreferrer">Indian Banks Association</a></li>
           
              
              <li><a href="https://gian.iitkgp.ac.in/" target="_blank" rel="noopener noreferrer">Global Initiative of Academic Network (GIAN)</a></li>
              <li><a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer">SWAYAM</a></li>
              <li><a href="https://www.ndl.iitkgp.ac.in" target="_blank" rel="noopener noreferrer">National e-Library</a></li>
            </ul>
          </div>
        )}

        {/* Scholarship Details Section */}
        {activeSection === 'scholarship' && (
          <div className="scholarship-details">
            <h3 className="details-title">Scholarship Opportunities</h3>
            <p>Information about various scholarships for students based on different criteria.</p>
            <h3 className="details-title">Key Scholarships Available</h3>
            <ul className="details-list">
              <li>
                National Fellowship And Scholarship For Higher Education Of ST Students - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
              <li>
                Aicte - Swanath Scholarship Scheme (Technical Diploma) - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
              <li>
                Aicte - Pragati Scholarship Scheme For Girl Students (Technical Degree) - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
              <li>
                Aicte - Saksham Scholarship Scheme For Specially Abled Student (Technical Degree) - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
              <li>
                National Scholarship For Post Graduate Studies - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
              <li>
                Ishan Uday Special Scholarship Scheme For Ner - 
                <strong>Open till: 31-10-2024</strong> 
                <span> | Defective Application Verification Open till: 15-11-2024</span>
              </li>
            </ul>

            <h3 className="details-title">Departments and Ministries</h3>
            <ul className="department-links">
              <li>
                <a href="https://www.education.gov.in" target="_blank" rel="noopener noreferrer">Department of Higher Education</a>
              </li>
              <li>
                <a href="https://dte.tn.gov.in/" target="_blank" rel="noopener noreferrer">Department of Higher Technical Education</a>
              </li>
              <li>
                <a href="https://www.financialservices.gov.in" target="_blank" rel="noopener noreferrer">Department of Financial Services</a>
              </li>
              <li>
                <a href="https://www.nabard.org" target="_blank" rel="noopener noreferrer">National Bank for Agriculture and Rural Development</a>
              </li>
              <li>
                <a href="https://www.ugc.ac.in" target="_blank" rel="noopener noreferrer">University Grants Commission</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoanScholarshipDetails;