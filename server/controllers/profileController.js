const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    // Find the user based on the ID stored in the JWT token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // If user is found, send back their details as a JSON response
    res.json({
      id: user._id,
      name: user.name,
      onine: user.online,
      bio: user.bio,
      username: user.username,
      email: user.email,
      points: user.points, // add points to the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
