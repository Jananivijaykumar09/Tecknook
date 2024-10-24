// StudentAssessmentHeader.js
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StudentAssesmentHeader.css'; // CSS file for StudentAssessmentHeader
import './Navbar.css';

const StudentAssessmentHeader = () => {
  return (
    <div className="fixed-header">
      <Navbar className="custom-resources-header" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`} // Use correct template literal for dynamic image source
              height="30"
              className="d-inline-block align-top"
              alt="TechNook Logo"
            />
            {' '}
            TechNook
          </Navbar.Brand>
          <Button
            as={Link}
            to="/student-dashboard" // Link to the student dashboard
            className="back-to-dashboard-button"
          >
            Back to Dashboard
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default StudentAssessmentHeader;