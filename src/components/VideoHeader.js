import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './VideoHeader.css'; // Import the new CSS file
import './Navbar.css';

const VideoHeader = () => {
  return (
    <Navbar className="custom-header" bg="dark" variant="dark" expand="lg" fixed="top">
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
          to="/"
          className="back-to-home-button"
        >
          Back to Home
        </Button>
      </Container>
    </Navbar>
  );
};

export default VideoHeader;
