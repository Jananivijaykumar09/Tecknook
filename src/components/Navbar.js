import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const CustomNavbar = () => {
  const location = useLocation();
  // Do not render the navbar on the login page
  if (location.pathname === '/login' || location.pathname === '/video' || location.pathname === '/mentor-assessment' || location.pathname === '/mentor-dashboard' ||location.pathname ==='/student-assessment-page' || location.pathname === '/student-dashboard'  || location.pathname === '/student-assessment-selection' || location.pathname === '/student-comments' || location.pathname === '/mentor-comments' || location.pathname === '/mentor-resources' || location.pathname === '/student-resources' || location.pathname === '/bachelor-degrees' || location.pathname==='/career-information' || location.pathname==='/competitive-exams') {
    return null;
  }
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto">
            <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('resources')}>Resources</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('help-desk')}>Help Desk</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('next-step')}>Next Step</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login?action=login">
              <Button variant="outline-info">Login</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

