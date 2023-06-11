const User = require('../models/user');

const getProfile = async (req, res) => {
  const userId = req.user.username;
  try {
    // Find the user based on the ID stored in the JWT token
    const user = await User.findById(userId);
     // If user is found, send back their details as a JSON response
    res.json({
      id: user._id,
      name: user.name,
      online: user.online,
      bio: user.bio,
      username: user.username,
      email: user.email,
      points: user.points, // add points to the response
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
   
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logout = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.user.id;

    // Update the user's online status to false
    await User.findByIdAndUpdate(userId, { online: false });

    // Respond with a success message
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Logout error:', error);
    res.status(500).json({ error: 'An error occurred during logout' });
  }
};

module.exports = {
  logout,
  getProfile,
};

