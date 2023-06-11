const User = require('../models/user');
const { initSocketServer, getSocketServer } = require('../socket');

let socketServer; // Declare the socketServer variable

const getTask = (req, res) => {
  const task = 'What is the sum of 1 + 1?'; // Replace with your actual logic to fetch the task
  res.json({ task });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ online: true }).select('username');
    console.log('Fetched users:', users);

    const usernames = users.map((user) => user.username);
    console.log('Fetched usernames:', usernames);

    res.json({ users: usernames });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const submitAnswer = (req, res) => {
  const { answer } = req.body;
  const result = answer === '2' ? 'Winner!' : 'Try again';

  // Emit challenge:update event to all connected clients
  const io = getSocketServer();
  io.emit('challenge:update', { result });

  if (result === 'Winner!') {
    // Emit challenge:winner event to all connected clients and pass the result
    io.emit('challenge:winner', { result });
  }

  res.json({ result });
};


// Initialize the socketServer object
const initializeSocketServer = (server) => {
  socketServer = initSocketServer(server);
};

module.exports = {
  getTask,
  getUsers,
  submitAnswer,
  initializeSocketServer, // Export the function to initialize the socketServer object
};
