import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Removed useNavigate
import './CommentsHeader.css'; // Import the CSS file for styling

const CommentsHeader = () => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    setIsLoading(false); // Loading is done immediately
  }, []);

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

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Empty space for left alignment */}
            </Nav>
            <Nav>
              <Button
                as={Link}
                to="/mentor-dashboard"
                className="back-to-dashboard-button mx-2"
              >
                Back to Dashboard
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CommentsHeader;
