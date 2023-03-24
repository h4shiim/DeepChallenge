const express = require('express');
const router = express.Router();
const Point = require('../models/points');
const User = require('../models/user')

// Get points for a specific user
router.get('/:userId', async (req, res) => {
    try {
      const points = await Point.find({ userId: req.params.userId });
      res.status(200).json(points[0].value);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Add points for a specific user
router.post('/:userId', async (req, res) => {
  try {
    const point = new Point({ userId: req.params.userId, value: req.body.value });
    await point.save();
    res.status(201).json({ message: 'Point added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
