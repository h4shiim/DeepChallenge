import React from 'react';
import Challenge from './Challenge';

const ChallengeList = ({ challenges }) => {
  return (
    <div>
      <h2>Challenges</h2>
      {challenges.map(challenge => (
        <Challenge 
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          startDate={challenge.startDate}
          endDate={challenge.endDate}
          participants={challenge.participants}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
