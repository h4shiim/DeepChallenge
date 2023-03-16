import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pointCounter: {
    backgroundColor: '#000',
    color: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching profile data');
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  

  if (loading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Name: {user.name}
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Email: {user.email}
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Points: {user.points}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2" gutterBottom>
            Progress
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Course Progress: {user.courseProgress}%
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Achievements:
          </Typography>
          <ul>
            {user.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.pointCounter}>
          <Typography variant="h6" component="p" gutterBottom>
            Points: {user.points}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
