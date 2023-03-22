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
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/user')
      .then(response => {
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setBio(response.data.bio);
      })
      .catch(error => console.error(error));
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
    axios.put('/api/user', { name, email, bio })
      .then(response => {
        setUserData(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  }

  function handleCancel() {
    setName(userData.name);
    setEmail(userData.email);
    setBio(userData.bio);
    setIsEditing(false);
  }

  return (
    <div className={classes.root}>
      <UserProfileHeader
        userName={userData.name}
        onlineStatus={userData.online}
        points={userData.points}
        handleLogout={handleLogout}
      />
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <Avatar alt={userData.name} src={userData.avatar} className={classes.avatar} />
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h1">{userData.name}</Typography>
          <Typography variant="subtitle1">{userData.email}</Typography>
          {isEditing ? (
            <>
              <TextField label="Name" value={name} onChange={event => setName(event.target.value)} />
              <TextField label="Email" value={email} onChange={event => setEmail(event.target.value)} />
              <TextField label="Bio" value={bio} onChange={event => setBio(event.target.value)} />
              <Button color="primary" variant="contained" className={classes.saveButton} onClick={handleSave}>Save</Button>
              <Button color="secondary" variant="contained" onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography variant="subtitle1">{userData.bio}</Typography>
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
