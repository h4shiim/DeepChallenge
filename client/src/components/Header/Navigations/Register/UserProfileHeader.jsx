import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';
import "./UserProfileHeader.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'green',
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    marginLeft: theme.spacing(2),
  },
  AppBar: {
    backgroundColor: 'gray',
    boxShadow: '0px 0px 20px 7px rgb(102 102 102 / 71%)',
    marginTop: '8px',  
  }
}));

export default function UserProfileHeader({ username, onlineStatus, points, handleLogout }) {
  const classes = useStyles();
  console.log("UserName:", username);
  console.log("OnlineStatus:", onlineStatus);
  console.log("Points:", points);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {username}'s Profile 
            
          </Typography>
          <Typography variant="h6" className={classes.title}>
          
          </Typography>
          <IconButton color="inherit" className={classes.iconButton} onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" className='online-st' align="center">{onlineStatus ? 'online' : 'offline'}</Typography>
    </div>
  );
}
