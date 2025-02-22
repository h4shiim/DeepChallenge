import React, { useState, useEffect } from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../Header/logo.png"
import axios from 'axios';


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

 function handleLogout() {
    const token = sessionStorage.getItem('token');
    
    // Update the online status of the user to false
    axios
      .post(
        'http://localhost:4000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        // redirect to login page
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error updating online status:', error);
        // Handle the error accordingly
      });
  }

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
            <Nav.Link href="/ChooseTrack" className="nav-link nav-log">Choose Track</Nav.Link>
          <Nav.Link href="/Challenges" className="nav-link nav-log">Challenge</Nav.Link>
          
          

            {isLoggedIn ? (
              <>
                <Nav.Link href="/Profile" className="profile-icon">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-icon">Logout</Nav.Link>
                <Nav.Link href="/ContactUs" className="nav-link nav-log">Contact Us</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/Register" className="nav-link nav-reg">Register</Nav.Link>
                <Nav.Link href="/Login" className="nav-link nav-reg">Sign in</Nav.Link>
              </>
            )}
            
            
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
