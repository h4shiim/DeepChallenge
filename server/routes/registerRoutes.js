const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Handle registration request
router.post('/', registerController.register);

module.exports = router;
