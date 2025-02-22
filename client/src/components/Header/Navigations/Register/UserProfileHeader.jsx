import React from 'react';
import "./UserProfileHeader.css"

export default function UserProfileHeader({ username, onlineStatus, points, handleLogout }) {
  console.log("UserName:", username);
  console.log("OnlineStatus:", onlineStatus);
  console.log("Points:", points);
  return (
    <div >
      <div style={{backgroundColor: 'gray', boxShadow: '0px 0px 20px 7px rgb(102 102 102 / 71%)', marginTop: '8px'}}>
        <div>
          <div style={{flexGrow: 1}}>
            {username}'s Profile 
            
          </div>
          <div style={{flexGrow: 1}}>
          
          </div>
          <button onClick={handleLogout} style={{marginLeft: '16px'}}>
            Logout
          </button>
        </div>
      </div>
      <div className='online-st' style={{textAlign: 'center'}}>{onlineStatus ? 'online' : 'offline'}</div>
    </div>
  );
}
