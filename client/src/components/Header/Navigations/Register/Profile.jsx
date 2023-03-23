import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Button, Grid, TextField } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import axios from 'axios';
import UserProfileHeader from './UserProfileHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  saveButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [userData, setuserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [onlineStatus, setOnlineStatus] = useState('false');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:4000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setuserData(response.data);
      setUsername(response.data?.username);
      setEmail(response.data?.email);
      setBio(response.data?.bio);
    })
    .catch(error => console.log(error));
    
    
  }, []);

  function handleLogout() {
    axios.delete('/api/logout')
      .then(response => window.location.reload())
      .catch(error => console.error(error));
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    axios.put('http://localhost:4000/api/user', { username, email, bio })
      .then(response => {
        setuserData(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  }

  function handleCancel() {
    setUsername(userData?.username);
    setEmail(userData?.email);
    setBio(userData?.bio);
    setIsEditing(false);
  }
  

  return (
    <div className={classes.root}>
      <UserProfileHeader
        username={userData?.username}
        onlineStatus={userData?.online}
        points={userData?.points}
        handleLogout={handleLogout}
      />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Avatar alt={userData?.username} src={userData?.avatar} className={classes.avatar} />
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h1">{userData?.username}</Typography>
          <Typography variant="subtitle1">{userData?.email}</Typography>
          {isEditing ? (
            <>
              <TextField label="Username" value={username} onChange={event => setUsername(event.target.value)} />
              <TextField label="Email" value={email} onChange={event => setEmail(event.target.value)} />
              <TextField label="Bio" value={bio} onChange={event => setBio(event.target.value)} />
              <Button color="primary" variant="contained" className={classes.saveButton} onClick={handleSave}>Save</Button>
              <Button color="secondary" variant="contained" onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography variant="subtitle1">{userData?.bio}</Typography>
              <Button color="primary" variant="contained" className={classes.editButton} onClick={handleEdit}>
                <Edit />
               

                Edit Profile
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
