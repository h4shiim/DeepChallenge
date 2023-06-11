const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const challengeController = require('./controllers/challengeController');

const app = express();

const user = require('./models/user');
const jwt = require('jsonwebtoken');
const profileRoutes = require('./routes/profileRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const userRoutes = require('./routes/userRoutes');
const pointRoutes = require('./routes/pointRoutes');
const updateUser = require('./routes/updateUser');
const challengeRoutes = require('./routes/challengeRoutes');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey123';

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
console.log('JWT_SECRET:', process.env.JWT_SECRET);

mongoose.connect('mongodb://127.0.0.1:27017/logindb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/points', pointRoutes);
app.use('/api/useredit', updateUser);
app.use('/api', challengeRoutes);
app.use('/api/logout', profileRoutes);

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

challengeController.initializeSocketServer(server);

module.exports = app;
