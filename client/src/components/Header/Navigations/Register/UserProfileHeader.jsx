import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function UserProfileHeader({ username, onlineStatus, points, handleLogout }) {
  const classes = useStyles();
  console.log("UserName:", username);
  console.log("OnlineStatus:", onlineStatus);
  console.log("Points:", points);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {username}'s Profile
          </Typography>
          <Badge badgeContent={points} color="primary">
            <Person />
          </Badge>
          <IconButton color="inherit" className={classes.iconButton} onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h6" align="center">{username} is {onlineStatus ? 'online' : 'offline'}</Typography>
    </div>
  );
}
