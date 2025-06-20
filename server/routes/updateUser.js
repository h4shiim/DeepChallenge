const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const User = require('../models/user');
// @route   PUT api/user
// @desc    Update user information
// @access  Private
router.put('/', authenticateToken, async (req, res) => {
    try {
      // Get user information from request body
      const { username, email, bio } = req.body;
  
      // Find user in the database by ID
      const user = await User.findById(req.user.id);
  
      // Update user information
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;

  
      // Save updated user information to the database
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;
