const socketio = require('socket.io');
const mongoose = require('mongoose');

let socketServer;
const connectedSockets = []; // Array to store connected sockets

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

const initSocketServer = (server) => {
  socketServer = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  connectDB();

  socketServer.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // Add the socket to the connectedSockets array
    connectedSockets.push(socket);

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
      // Remove the socket from the connectedSockets array when disconnected
      const index = connectedSockets.indexOf(socket);
      if (index !== -1) {
        connectedSockets.splice(index, 1);
      }
    });

    socket.on('challenge:submit', ({ answer }) => {
      // Emit challenge:update event to all connected sockets
      connectedSockets.forEach((connectedSocket) => {
        connectedSocket.emit('challenge:update', { result: 'Winner!', answer });
      });
    });
    
  });

  return socketServer;
};

const getSocketServer = () => {
  return socketServer;
};

module.exports = {
  initSocketServer,
  getSocketServer,
};
