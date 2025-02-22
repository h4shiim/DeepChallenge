import React, { useState } from 'react';
import BackgroundVideo from '../Home/backgroundVideo';
import axios from 'axios';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    if (token) {
      // Redirect the user to the profile page if already logged in
      window.location.href = '/profile';
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:4000/api/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      window.location.href = '/profile';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg'>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', marginLeft: '25%', minHeight: '100vh', padding: '16px' }}>
      <form style={{ backgroundImage: 'rgb(255, 255, 255)', borderRadius: '20px', padding: '32px', boxShadow: '0px 0px 20px 7px rgb(102 102 102 / 71%)' }} onSubmit={handleSubmit} >
        <div container spacing={2}>
          <div item xs={12}>
          <BackgroundVideo />
          </div>
          <div item xs={12}>
            <input
              className="login-input"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{width: '100%'}}
            />
          </div>
          <div item xs={12}>
            <input
              className="login-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width: '100%'}}
            />
          </div>
          <div item xs={12}>
            <button style={{marginTop: '16px', borderRadius: '25px', textTransform: 'none', padding: '8px 24px', background: '#3f51b5', color: '#fff', cursor: 'pointer'}} type="submit">
              Sign In
            </button>
          </div>
          <div item xs={12}>
            <div variant="body2">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div item xs={12}>
            <div style={{marginTop: '16px', textAlign: 'center'}}>
              <div container justifyContent="center">
</div>
</div>
</div>
</div>
</form>
</div>
</div>
);
};

export default Login;