const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET user profile data
router.get('/api/user', async (req, res) => {
  try {
    // Get user data from the database
    const user = await User.findById(req.user.id);

    // Return user data
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
