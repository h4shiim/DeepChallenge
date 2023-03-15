import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import BackgroundVideo from '../Home/backgroundVideo';
import './Register.css'; // import the Register.css file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.text();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='register-container'>
      <BackgroundVideo />
      <form className="register-form" onSubmit={handleSubmit}>
        <TextField
          className="register-input"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          className="register-input"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          className="register-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          className="register-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
