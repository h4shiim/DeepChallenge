import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import UserProfileHeader from './UserProfileHeader';
import './Profile.css';
import { Link as RouterLink } from 'react-router-dom';
import Html from "../Learnings/Html.jsx"
const HtmlLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/tracks" {...props} />
));
const PlansLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/Payment" {...props} />
));

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

export default function UserProfile(props) {
  const classes = useStyles();
  const [userData, setuserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(props.points);
  const [enrolledCourse, setEnrolledCourse] = useState('');
  const [showAdvancedCourses, setShowAdvancedCourses] = useState(false);


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
      setPoints(props.points);
      setEnrolledCourse(response.data?.enrolledCourse);
      setShowAdvancedCourses(response.data?.showAdvancedCourses);
    })
    .catch(error => console.log(error));
    
    
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLogout() {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    // redirect to login page
    window.location.href = '/login';
  }

  function handleEdit() {
    setIsEditing(true);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:4000/api/user', {
        username,
        email,
        bio,
      });
      setuserData({
        ...userData,
        username,
        email,
        bio,
        online: userData.online,
      });
      setMessage('Your information has been updated!');
      setIsEditing(false);
    } catch (err) {
      console.error(err.response.data);
      setMessage(err.response.data);
    }
  };
  

  function handleCancel() {
    setUsername(userData?.username);
    setEmail(userData?.email);
    setBio(userData?.bio);
    setIsEditing(false);
  }
  

  return (
    
    <div className="p-bg">
    <div className={classes.root}>
      <UserProfileHeader
        username={userData?.username}
        onlineStatus={userData?.online}
        points={userData?.points}
        handleLogout={handleLogout}
      />
      <div class="profile-container">
  <div class="avatar-container">
    <img src={userData?.avatar} alt={userData?.username} class="avatar" />
  </div>
  <div class="profile-info">
    <h2 class="username">{userData?.username}</h2>
    
    <p class="email">{userData?.email}</p>
    <div>
            <h5 className='points'>Your Points: {points}</h5>
          </div>
    {isEditing ? (
      <form className='p-form'>
        <label for="username">Username:</label>
        
        <input type="text" id="username" name="username" value={username} onChange={event => setUsername(event.target.value)} />
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={event => setEmail(event.target.value)} />
        <label for="bio">Bio:</label>
        <textarea id="bio" name="bio" value={bio} onChange={event => setBio(event.target.value)}></textarea>
        <div class="button-container">
          <button type="button" class="p-save-button" onClick={handleSave}>Save</button>
          <button type="button" class="p-cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    ) : (
      <>
        <p class="bio">{userData?.bio}</p>
        <button type="button" class="p-edit-button" onClick={handleEdit}>
          <i class="fas fa-edit"></i>
          Edit Profile
        </button>
      </>
    )}
  </div>
</div>



<div class="boxes-container">
  <div class="p-box">
    <h3 class="p-box-title">Enrolled in: {enrolledCourse}</h3>
    <a href="/tracks" class="p-box-btn">Web Development Course</a>
  </div>
  <div class="p-box">
    <h3 class="p-box-title">Looking for advanced courses?</h3>
    <a href="/Payment" class="p-box-btn">Go to Plans Page</a>
  </div>
</div>




    </div>
    </div>
  );
}
