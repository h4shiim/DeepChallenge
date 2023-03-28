import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import BackgroundVideo from '../Home/backgroundVideo';
import './Register.css'; // import the Register.css file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.text();

      if (response.ok) {
        alert('Registration successful! Please login to continue.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        window.location.href = '/login';
      } else {
        alert(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handlePasswordChange = (e) => {
    if (!passwordRegex.test(e.target.value)) {
      e.target.setCustomValidity(
        'Password must contain at least 8 characters including at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
      );
    } else {
      e.target.setCustomValidity('');
    }
    setPassword(e.target.value);
  };

  return (
    <div className='register-container register-popup-container'>
      {/* <BackgroundVideo /> */}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-input-group">
          <TextField
            className="register-input"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="register-input-group">
          <TextField
            className="register-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="register-input-group">
          <TextField
            className="register-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            fullWidth
          />
        </div>
        <div className="register-input-group">
          <TextField
            className="register-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="register-input-group">
          <Button
            className="register-button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </div>
        <div className="register-social-login">
          <p>Or sign up with:</p>
          <div className="register-social-icons">
            <FaFacebook className="register-social-icon" />
            <FaGithub className="register-social-icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
