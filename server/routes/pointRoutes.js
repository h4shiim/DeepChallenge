const express = require('express');
const router = express.Router();
const Points = require('../models/points');
const User = require('../models/user');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get points for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
try {
console.log(req.user); // check if req.user object exists
if (!req.user) throw new Error('User not authenticated');
const points = await Points.find({ userId: req.user.id });
console.log(points); // check if points are being fetched correctly
if (!points[0]) throw new Error('No points found for user');
res.status(200).json(points[0].value);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});

router.post('/', authenticateToken, async (req, res) => {
try {
if (!req.user) throw new Error('User not authenticated');
const user = await User.findById(req.user.id);
if (!user) throw new Error('User not authenticated');
const points = await Points.findOne({ userId: user.id });
if (!points) {
  // If there are no points for the user yet, create a new document
  console.log(req.body);
  if (!req.body.value) throw new Error('No value provided');
  const newPoints = new Points({
    userId: user.id,
    value: req.body.value,
  });
  await newPoints.save();
  return res.status(200).json(newPoints.value);
}

// If there are already points for the user, update the existing document
if (!req.body.value) throw new Error('No value provided');
points.value += req.body.value;
await points.save();
res.status(200).json(points.value);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
  }
  });
  
  module.exports = router;