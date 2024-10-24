import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { FaUserCircle } from 'react-icons/fa';
import ProfileModal from './ProfileModal';
import { doc, getDoc } from 'firebase/firestore';
import './MentorDashboardHeader.css';

const MentorDashboardHeader = () => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState(null); // Initial state set to null

  // Function to fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
          } else {
            console.log('No such user document found!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <Navbar className="mentor-navbar mentor-dashboard-header" expand="lg" fixed="top">
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

          {/* Center the username or show nothing until loaded */}
          <Navbar.Text className="mx-auto username-text">
            {username === null ? '' : `Welcome, ${username}`}
          </Navbar.Text>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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

      {/* Profile modal component */}
      <ProfileModal show={showProfileModal} handleClose={() => setShowProfileModal(false)} />
    </>
  );
};

export default MentorDashboardHeader;
