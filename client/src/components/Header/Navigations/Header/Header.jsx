import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../Header/logo.png"



const Header = () => {
  return (
      <Navbar  expand="lg">
      <Container fluid>
        <img src={logo} alt="Logo" width="60px"/>
        <Navbar.Brand href="#" style={{color: "#bcb9b9"}} className="logoName">Deep Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navItems"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Nav.Link href="/Home" style={{color: "#bcb9b9"}}>Home</Nav.Link>
            <Nav.Link href="/Register" style={{color: "#bcb9b9"}}>Register</Nav.Link>
            <Nav.Link href="/PrivateChallenges" style={{color: "#bcb9b9"}}>Choose your track</Nav.Link>
            <Nav.Link href="/Challenges" style={{color: "#bcb9b9"}}>Challenges</Nav.Link>
            <Nav.Link href="/Login" style={{color: "#bcb9b9"}}>Sign in</Nav.Link>
            <Nav.Link href="/Profile" style={{color: "#bcb9b9"}}>Profile</Nav.Link>
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Looking for something?"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" style={{color: "#bcb9b9"}}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
