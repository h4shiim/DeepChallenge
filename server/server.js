const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const user = require('./models/user');
const jwt = require('jsonwebtoken');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const registerRoutes = require('./routes/registerRoutes');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey123';

app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT || 4000;
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/logindb', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB');
});


// Handle registration requests
app.use('/api/login', loginRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/register', registerRoutes);


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

/****************************************************************************************************************************** */

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


const tasks = [
  {
    task:
      "Find the largest of three given integers. Example: max_of_three(1,0,1) should return 1.",
    answer: "function max_of_three(x, y, z) { max_val = 0; if (x > y) { max_val = x; } else { max_val = y; } if (z > max_val) { max_val = z; } return max_val; } console.log(max_of_three(1,0,1)); console.log(max_of_three(0,-10,-20)); console.log(max_of_three(1000,510,440));",
  },
  // Add more tasks here
];

let users = [];

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  if (users.length === 2) {
    socket.emit("full");
    return;
  }

  users.push(socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    users = users.filter((user) => user !== socket.id);
  });

  socket.emit("task", {
    task: tasks[0].task,
    timer: 180, // Set timer in seconds
  });

  socket.on("answer", ({ answer }) => {
    const userIndex = users.indexOf(socket.id);
    const otherUserIndex = userIndex === 0 ? 1 : 0;
    const otherUserSocketId = users[otherUserIndex];

    if (answer === tasks[0].answer) {
      io.to(socket.id).emit("result", { result: "win" });
      io.to(otherUserSocketId).emit("result", { result: "lose" });
    } else {
      io.to(socket.id).emit("result", { result: "lose" });
      io.to(otherUserSocketId).emit("result", { result: "win" });
    }
  });
});
