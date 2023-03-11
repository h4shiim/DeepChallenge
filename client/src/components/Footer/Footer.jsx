import React from 'react';
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__nav">
          <a href="#" className="footer__link">About</a>
          <a href="#" className="footer__link">Contact</a>
          <a href="#" className="footer__link">Privacy Policy</a>
        </nav>
        <p className="footer__text">
          &copy; Deep Challenge 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
