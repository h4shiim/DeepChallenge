exports.getTask = (req, res) => {
  // Generate a task for the challenge
  const task = 'What is the sum of 1 + 1?';

  // Return the task as a response
  res.json({ task });
};

exports.submitAnswer = (req, res) => {
  // Get the user's answer from the request body
  const { answer } = req.body;

  // Compare the answer to the correct solution
  if (answer === '2') {
    // The answer is correct
    const result = 'Correct Answer! You won!';
    res.json({ result });
  } else {
    // The answer is incorrect
    const result = 'Failed! Incorrect answer.';
    res.json({ result });
  }
};
