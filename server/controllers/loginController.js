const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // If the password is correct, generate a JWT token and return it to the client
    // If the password is correct, generate a JWT token and return it to the client
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '24h' });
    localStorage.setItem('token', token); // Store the token in localStorage
    res.status(200).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
