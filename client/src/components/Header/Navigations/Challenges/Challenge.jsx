import React, { useState } from 'react';
import './Challenge.css';

const Challenge = ({ participant1, participant2 }) => {
  const [problem, setProblem] = useState({
    prompt: 'Solve the following math problem: 2 + 2 = ?',
    answer: 4
  });

  const [p1Answer, setP1Answer] = useState(null);
  const [p2Answer, setP2Answer] = useState(null);
  const [winner, setWinner] = useState(null);

  const checkAnswers = () => {
    if (p1Answer === problem.answer && p2Answer === problem.answer) {
      setWinner('tie');
    } else if (p1Answer === problem.answer) {
      setWinner(participant1);
    } else if (p2Answer === problem.answer) {
      setWinner(participant2);
    }
  };

  return (
    <div className="challenge-container">
      <h2>Challenge</h2>
      <div className="problem">
        <h3>{problem.prompt}</h3>
        <div className="answer-inputs">
          <label htmlFor="p1-answer">{participant1} Answer:</label>
          <input id="p1-answer" type="number" value={p1Answer} onChange={(e) => setP1Answer(parseInt(e.target.value))} />

          <label htmlFor="p2-answer">{participant2} Answer:</label>
          <input id="p2-answer" type="number" value={p2Answer} onChange={(e) => setP2Answer(parseInt(e.target.value))} />
        </div>
        <button onClick={checkAnswers}>Submit</button>
      </div>
      {winner && (
        <div className="winner">
          {winner === 'tie' ? (
            <p>It's a tie!</p>
          ) : (
            <p>{winner} wins!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Challenge;
