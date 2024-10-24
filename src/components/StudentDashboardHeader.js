import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import ProfileModal from './ProfileModal';
import './StudentDashboardHeader.css'; // Ensure you have the appropriate styles
import { auth } from '../firebase';

const StudentDashboardHeader = ({ username }) => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileModal(true); // Open the profile modal
  };

  return (
    <>
      <Navbar className="student-navbar student-dashboard-header" expand="lg" fixed="top">
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

          {/* Centered Username */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
            <div className="mx-auto text-center">
              {username && <span className="navbar-username">Welcome, {username}</span>}
            </div>
            <Nav className="ms-auto">
              <NavDropdown
                title={<FaUserCircle className="profile-icon" />}
                id="profile-dropdown"
                className="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={handleProfileClick}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Profile modal for both Mentor and Student */}
      <ProfileModal show={showProfileModal} handleClose={() => setShowProfileModal(false)} />
    </>
  );
};

export default StudentDashboardHeader;
