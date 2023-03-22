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
    <div className='c-body'>
      <h3 className='contact-heading'>Want to reach us?</h3>
    <div class="contact-us-container">
    <form class="form-container">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="first-name">First name</label>
          <input type="text" class="form-control" id="first-name" required />
        </div>
        <div class="form-group col-md-6">
          <label for="last-name">Last name</label>
          <input type="text" class="form-control" id="last-name" required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" class="form-control" id="phone" required /> 
      </div>
      <div class="form-group">
        <label for="additional-info">Additional information</label>
        <textarea class="form-control" id="additional-info" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Send</button>
    </form>
  </div>
    </div>
  );
}

export default ContactUs;
