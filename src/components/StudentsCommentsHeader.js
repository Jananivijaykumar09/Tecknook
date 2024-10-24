import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CommentsHeader.css'; // Reuse the same CSS file

const StudentCommentsHeader = () => {
  return (
    <div className="fixed-header">
      <Navbar className="custom-comments-header" bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
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

export default StudentCommentsHeader;
