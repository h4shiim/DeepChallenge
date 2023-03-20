import React, { useState } from 'react';
import { TextField, Button, Grid, Link, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Facebook, GitHub, Google } from '@material-ui/icons';
import BackgroundVideo from '../Home/backgroundVideo';
import axios from 'axios';
import "./Login.css"

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: '25%',
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
  formContainer: {
    background: '#ffffffa8',
    // opacity: '0.6',
    borderRadius: '20px',
    padding: theme.spacing(4),
    boxShadow: '1px 8px 171px rgb(180 184 185 / 70%)',
  },
  submitButton: {
    marginTop: theme.spacing(2),
    borderRadius: '25px',
    textTransform: 'none',
    padding: theme.spacing(1, 3),
    background: '#3f51b5',
    color: '#fff',
    '&:hover': {
      background: '#3f51b5',
      opacity: '0.8',
    },
  },
  socialIconsContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  socialIcon: {
    margin: theme.spacing(0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem('token');
  
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
    <div className={classes.container}>
      <BackgroundVideo />
      <form className={classes.formContainer} onSubmit={handleSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <BackgroundVideo />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="login-input"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="login-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.submitButton} variant="contained" color="primary" type="submit">
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <Link href="#">Forgot password?</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.socialIconsContainer}>
              <Grid container justifyContent="center">
<Grid item>
<IconButton className={classes.socialIcon}>
{/* <Google /> */}
</IconButton>
</Grid>
<Grid item>
<IconButton className={classes.socialIcon}>
<GitHub />
</IconButton>
</Grid>
<Grid item>
<IconButton className={classes.socialIcon}>
<Facebook />
</IconButton>
</Grid>
</Grid>
</div>
</Grid>
</Grid>
</form>
</div>
);
};

export default Login;