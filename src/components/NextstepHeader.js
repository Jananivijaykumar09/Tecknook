import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import './NextstepHeader.css';
import './Navbar.css';

const NextStepHeader = () => {
  return (
    <div className="next-fixed-header">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand className="next-navbar-brand-custom">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              height="30"
              className="d-inline-block align-top"
              alt="TechNook Logo"
            />
            {' '}
            TechNook
          </Navbar.Brand>
          <ScrollLink
            to="next-step"
            smooth={true}
            duration={500}
            className="btn btn-primary back-to-home-button"
          >
            Back to Next Step
          </ScrollLink>
        </Container>
      </Navbar>
    </div>
  );
};

export default NextStepHeader;
