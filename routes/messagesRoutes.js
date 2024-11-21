const express = require('express');
const { sendMessage, getMessagesByGroup } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');  // Ensure JWT authentication is required

const router = express.Router();

// Route to send a message
router.post('/send', sendMessage);

// Route to get messages for a group
router.get('/:groupId',  getMessagesByGroup);

module.exports = router;
