import React, { useState, useEffect } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../Header/logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faContactCard, faFileContract, faContactBook, faExclamationTriangle, faAddressBook, faAddressCard } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to not logged in

  useEffect(() => {
    // check if user is logged in
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // remove token from session storage and set isLoggedIn to false
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    // redirect to login page
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/home" className="navbar-brand">
          <img className='logoImg' src={logo} alt="Logo" width="60px" />
          <span className="logoName">Deep Challenge</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            
          <Nav.Link href="/Challenges" className="nav-link">Challenges</Nav.Link>
          

            {isLoggedIn ? (
              <>
                <Nav.Link href="/ChooseTrack" className="nav-link">Choose your track</Nav.Link>
                <Nav.Link href="/Profile" className="profile-icon"><FontAwesomeIcon icon={faUser} /></Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-icon"><FontAwesomeIcon icon={faSignOutAlt} /></Nav.Link>
                
              </>
            ) : (
              <>
                <Nav.Link href="/Register" className="nav-link">Register</Nav.Link>
                <Nav.Link href="/Login" className="nav-link">Sign in</Nav.Link>
              </>
            )}
            <Nav.Link href="/ContactUs" className="nav-link">Contact Us</Nav.Link>
            
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control type="search" placeholder="Looking for something?" className="form-control me-2" aria-label="Search" />
            <Button variant="outline-secondary" className="btn-search">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
