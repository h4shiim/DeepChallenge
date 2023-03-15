import React from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateChallenges() {
  const navigate = useNavigate();

  const handleChallengeClick = () => {
    // Navigate to the challenge page
    navigate('/challenges');
  };

  return (
    <div>
      <h1>Private Challenges</h1>
      <p>This is a private challenges page.</p>
      <button onClick={handleChallengeClick}>Go to Challenges</button>
    </div>
  );
}

export default PrivateChallenges;
