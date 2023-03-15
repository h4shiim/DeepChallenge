import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css';
import BackgroundVideo from '../Home/backgroundVideo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    // Redirect the user to the login page
    window.location.href = '/profile';
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className='login-container'>
      <BackgroundVideo />
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          className="login-input"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          className="login-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
