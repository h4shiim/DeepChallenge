const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Set online status of the user
    user.online = true;
    await user.save();

    // Set req.user to the authenticated user
    req.user = { id: user._id, ...user._doc };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken,
};
