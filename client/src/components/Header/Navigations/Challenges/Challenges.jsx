import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Challenges.css';

const socket = io('http://localhost:4000'); // Update the server URL if necessary

function Challenges() {
  const [username, setUsername] = useState('');
  const [task, setTask] = useState('');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [usersOnChallengePage, setUsersOnChallengePage] = useState([]);
  const [winnerName, setWinnerName] = useState('');

  useEffect(() => {
    fetchUsername();
    fetchTaskFromServer();
    fetchUsersOnChallengePage();
    socket.on('challenge:update', handleChallengeUpdate);
    socket.on('challenge:winner', handleChallengeWinner);

    return () => {
      socket.off('challenge:update', handleChallengeUpdate);
      socket.off('challenge:winner', handleChallengeWinner);
    };
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log('Response data:', data); // Add this line to check the response data
      if (data.users && data.users.length > 0) {
        setUsername(data.users[0].username); // Set the username from the response data
        console.log('Fetched username:', data.users[0].username);
      } else {
        console.error('No username found in the response');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };
  
  

  const fetchTaskFromServer = () => {
    fetch('http://localhost:4000/api/task')
      .then((response) => response.json())
      .then((data) => {
        setTask(data.task);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
  };

  const fetchUsersOnChallengePage = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      console.log('Token:', sessionStorage.getItem('token'));

      const data = await response.json();
      if (data.users) {
        setUsersOnChallengePage(data.users);
        console.log('Fetched users:', data.users);
      } else {
        console.error('No users found in the response');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const submitAnswer = (answer) => {
    fetch('http://localhost:4000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        if (data.result === 'Winner!') {
          socket.emit('challenge:submit', { answer }); // Pass the answer to the server
        }
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
      });
  };

  const handleChallengeUpdate = (data) => {
    setResult(data.result);
  
    if (data.startChallenge) {
      // Replace '/challenges' with the actual path you want to redirect to
      window.location.href = '/challenges';
    } else if (data.result === 'Winner!') {
      const winner = data.winner; // Use the winner from the data object
      setResult(`Congrats to ${winner} for winning!`);
      setWinnerName(winner);
    } else {
      // Update the usersOnChallengePage state with the latest data
      setUsersOnChallengePage(data.users);
      const loser = data.users.find((user) => user !== username);
      if (loser) {
        setResult(`${loser} has lost and ${username} won the round.`);
      }
    }
  };
  

  const handleChallengeWinner = () => {
    const winner = username; // Assuming the current user is the winner
    const loser = usersOnChallengePage.find((user) => user !== winner);
  
    if (loser) {
      setResult(`${loser} has lost and ${winner} won the round.`);
      setWinnerName(winner);
    } else {
      setWinnerName(''); // Reset the winner name if there is no loser
    }
  };
  
  

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    submitAnswer(userInput);
  };

  return (
    <div className="challenge-container">
      <h2>Participation Page</h2>
      {usersOnChallengePage.length === 2 ? (
        <>
          <p>Users ready for a challenge:</p>
          <ul>
            {usersOnChallengePage.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
          <p>Opponents: {usersOnChallengePage.join(' vs. ')}</p>
          <p>Task: {task}</p>
          <input type="text" value={userInput} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Submit</button>
          {result && (
            <div className="result-box">
              <p>{result}</p>
              {winnerName && <p>Congratulations to {winnerName} for winning!</p>}
            </div>
          )}
        </>
      ) : (
        <p>Searching for a challenge member...</p>
      )}
      {winnerName && (
        <div className="winner-message">
          <p>
            Congratulations to <strong>{winnerName}</strong> for winning the challenge!
          </p>
        </div>
      )}
    </div>
  );
}

export default Challenges;
