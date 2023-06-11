const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, profileController.getProfile);   //it might cause error so CTRL + Z to undo the previous fix
router.post('/', authenticateToken, profileController.logout);

module.exports = router;
