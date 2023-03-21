import React, { useState } from 'react';
import BackgroundVideo from '../Home/backgroundVideo';
import './ContactUs.css';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server or handle submission as needed
  };

  return (
    <div className="contact-us-container">
      <BackgroundVideo />
      <h1 className="contact-us-heading">Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <label className="contact-us-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="contact-us-input" />
        </label>
        <label className="contact-us-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="contact-us-input" />
        </label>
        <label className="contact-us-label">
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="contact-us-textarea" />
        </label>
        <button type="submit" className="contact-us-submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
