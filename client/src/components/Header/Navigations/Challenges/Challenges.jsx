  // client/src/components/Challenge.js

  import React, { useState, useEffect } from 'react';
  import io from 'socket.io-client';
  import './Challenges.css'; 

  const socket = io();

  function Challenge() {
    const [task, setTask] = useState('');
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
      fetchTaskFromServer();
    }, []);

    const fetchTaskFromServer = () => {
      fetch('http://localhost:4000/api/challenge/task')
        .then((response) => response.json())
        .then((data) => {
          setTask(data.task);
        })
        .catch((error) => {
          console.error('Error fetching task:', error);
        });
    };

    const submitAnswer = () => {
      fetch('http://localhost:4000/api/challenge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: userInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          setResult(data.result);
        })
        .catch((error) => {
          console.error('Error submitting answer:', error);
        });
    };

    useEffect(() => {
      socket.on('challenge:update', handleChallengeUpdate);

      return () => {
        socket.off('challenge:update', handleChallengeUpdate);
      };
    }, []);

    const handleChallengeUpdate = (data) => {
      setResult(data.result);
    };

    const handleInputChange = (event) => {
      setUserInput(event.target.value);
    };

    const handleSubmit = () => {
      submitAnswer();
    };

    return (
      <div className="challenge-container">
        <h2>Challenge Task: {task}</h2>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <p className="result-text">Result: {result}</p>
      </div>
    );
  }

  export default Challenge;
