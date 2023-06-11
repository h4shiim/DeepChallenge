const express = require('express');
const challengeController = require('../controllers/challengeController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/task', challengeController.getTask);
router.get('/users', authenticateToken, challengeController.getUsers);
router.post('/submit', challengeController.submitAnswer); // Add authenticateToken middleware to secure the endpoint

module.exports = router;
