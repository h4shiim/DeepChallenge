import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import UserProfileHeader from './UserProfileHeader';
import './Profile.css';
import { Link as RouterLink } from 'react-router-dom';

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

export default function UserProfile() {
  
  const classNamees = useStyles();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState('0');
  const [enrolledCourse, setEnrolledCourse] = useState('');
  const [showAdvancedCourses, setShowAdvancedCourses] = useState(false);



  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:4000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setUserData(response.data);
      setUsername(response.data?.username);
      setEmail(response.data?.email);
      setBio(response.data?.bio);
      setEnrolledCourse(response.data?.enrolledCourse);
      setShowAdvancedCourses(response.data?.showAdvancedCourses);
  
      // fetch the user points from the server
      axios.get('http://localhost:4000/api/points', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(pointsResponse => {
        if (pointsResponse.data) {
          console.log(pointsResponse);
          
          setPoints(pointsResponse.data);
          console.log(points);
        }
      })
      .catch(error => console.log(error));
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
      setUserData({
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
      
    <div className={classNamees.root}>
      <UserProfileHeader
        username={userData?.username}
        onlineStatus={userData?.online}
        points={points}
        handleLogout={handleLogout}
      />
      <div className="profile-container">
  <div className="avatar-container">
    <img src={userData?.avatar} alt={userData?.username} className="avatar" />
  </div>
  <div className="profile-info">
    <h2 className="username">{userData?.username}</h2>
    
    <p className="email">{userData?.email}</p>
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
        <div className="button-container">
          <button type="button" className="p-save-button" onClick={handleSave}>Save</button>
          <button type="button" className="p-cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    ) : (
      <>
        <p className="bio">{userData?.bio}</p>
        <button type="button" className="p-edit-button" onClick={handleEdit}>
          <i className="fas fa-edit"></i>
          Edit Profile
        </button>
        
      </>
    )}
  </div>
</div>



<div className="boxes-container">
  <div className="p-box">
    <h3 className="p-box-title">Enrolled in: {enrolledCourse}</h3>
    <a href="/tracks" className="p-box-btn">Web Development Course</a>
  </div>
  <div className="p-box">
    <h3 className="p-box-title">Looking for advanced courses?</h3>
    <a href="/Payment" className="p-box-btn">Go to Plans Page</a>
  </div>
</div>




    </div>
    </div>
  );
}
