const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email is already registered
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Create a new user object
  const newUser = new User({ username, email, password });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Send an error response
    res.status(500).json({ message: 'Internal server error' });
  }
};
