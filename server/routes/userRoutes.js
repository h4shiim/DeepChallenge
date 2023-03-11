import express from 'express';
const router = express.Router();

import { User, findOne } from '../models/User.js';


// Route for user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists in the database
    let user = await findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Create new user and save to the database
    user = new User({ name, email, password });
    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    let user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // Return JWT token if authentication is successful
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
