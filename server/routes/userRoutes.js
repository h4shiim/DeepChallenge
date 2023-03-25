const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, userController.getUser);
router.get('/user/progress/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const progress = user.progress;
      const points = user.points;
      res.send({ progress, points });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Server error' });
    }
  });
  

module.exports = router;
