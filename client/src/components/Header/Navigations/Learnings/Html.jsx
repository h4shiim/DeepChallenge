import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Html.css';
import jwt_decode from 'jwt-decode';
import HTMLContent from "./HTMLContent.jsx"


    const Html = () => {
      const [currentPage, setCurrentPage] = useState(0);
      const [completedTask, setCompletedTask] = useState(false); // new state variable to track whether the user has completed the task
      const [points, setPoints] = useState('0');
    
      const handlePageClick = (page) => {
        setCurrentPage(page);
      };

      const handleTaskComplete = () => {
        setCompletedTask(true); // update the state variable to indicate that the user has completed the task
      };

      useEffect(() => {
        const token = sessionStorage.getItem('token');
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
      }, []);


      
    
    const Page = ({ currentPage }) => {
      return (
        <div className="html-content">
          <h2>{HTMLContent[currentPage].title}</h2>
          <p>{HTMLContent[currentPage].content}</p>
          <h3>Task:</h3>
          <p className="task">{HTMLContent[currentPage].task}</p>
          <p className='w3link'>For more information about {HTMLContent[currentPage].title}, please visit the <a href={HTMLContent[currentPage].link} target="_blank" rel="noreferrer">W3Schools page</a> for this topic.</p>
        </div>
      );
    };
    
   
    const handlePoints = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          // Handle the case where the user is not logged in
          return;
        }
        const decodedToken = jwt_decode(token);
        const response = await fetch(`http://localhost:4000/api/points/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: 10 }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        axios.get('http://localhost:4000/api/points', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(pointsResponse => {
          if (pointsResponse.data) {
            setPoints(pointsResponse.data);
          }
        })
        .catch(error => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    
      
    
      return (
        <div className="html-container">
          <Page currentPage={currentPage} />
    
          <div className="points-bar-container">
            <div className="points-bar">
              <div className="points-earned">
                <span className="points-count">Total points: {points}</span>
              </div>
            </div>
            <button className="add-point-button" onClick={handlePoints}>
              Submit
            </button>
          </div>
    
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={currentPage === 0 ? 'disabled' : ''}>
                <a href="#" onClick={(e) => {e.preventDefault(); handlePageClick(currentPage - 1);}} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {[...Array(HTMLContent.length)].map((_, i) => {
                const isActive = currentPage === i ? 'active' : '';
                return (
                  <li className={isActive} key={i}>
                    <a href="#" onClick={(e) => {e.preventDefault(); handlePageClick(i);}}>
                      {i + 1}
                    </a>
                  </li>
                );
              })}
              <li className={currentPage === HTMLContent.length - 1 ? 'disabled' : ''}>
                <a href="#" onClick={(e) => {e.preventDefault(); handlePageClick(currentPage + 1);}} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );
    };
    
    export default Html;
    