const socketio = require('socket.io');
const mongoose = require('mongoose');

const io = socketio();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/logindb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

connectDB();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('challenge:submit', (data) => {
    io.emit('challenge:update', { result: 'Winner!' });
  });
});

module.exports = io;
