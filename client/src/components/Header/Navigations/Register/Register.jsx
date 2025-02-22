import React, { useState } from 'react';
import './Register.css';

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
          <input
            className="register-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{width: '90%'}}
          />
        </div>
        <div className="register-input-group">
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{width: '90%'}}
          />
        </div>
        <div className="register-input-group">
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{width: '90%'}}
          />
        </div>
        <div className="register-input-group">
          <input
            className="register-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{width: '90%'}}
          />
        </div>
        <div className="register-input-group">
          <button
            className="register-button"
            type="submit"
            style={{backgroundColor: '#007bff', color: 'white', padding: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
          >
            Register
          </button>
        </div>

      </form>
    </div>
  );
};

export default Register;
