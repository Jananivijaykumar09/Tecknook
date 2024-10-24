import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ResourcesHeader.css'; // Reuse the same CSS file for styling

const StudentResourcesHeader = () => {
  
  return (
    <div className="fixed-header">
      <Navbar className="custom-resources-header" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              height="30"
              className="d-inline-block align-top"
              alt="TechNook Logo"
            />
            {' '}
            TechNook
          </Navbar.Brand>
          <Button
            as={Link}
            to="/student-dashboard"
            className="back-to-dashboard-button"
          >
            Back to Dashboard
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default StudentResourcesHeader;
