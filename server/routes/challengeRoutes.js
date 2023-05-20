const express = require('express');
const challengeController = require('../controllers/challengeController');

const router = express.Router();

// Route for fetching the task
router.get('/task', challengeController.getTask);

// Route for submitting the answer
router.post('/submit', challengeController.submitAnswer);

module.exports = router;
