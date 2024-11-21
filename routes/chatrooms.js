const express = require('express');
const jwt = require('jsonwebtoken');
const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate users
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Create a new private chat room
router.post('/create', authenticateToken, async (req, res) => {
  const { name } = req.body;

  try {
    const chatRoom = new ChatRoom({ name, users: [req.user.id] });
    await chatRoom.save();
    res.json({ message: 'Chatroom created', chatRoom });
  } catch (err) {
    res.status(400).json({ error: 'Error creating chatroom' });
  }
});

// Join a chat room
router.post('/join', authenticateToken, async (req, res) => {
  const { roomId } = req.body;

  try {
    const chatRoom = await ChatRoom.findById(roomId);
    chatRoom.users.push(req.user.id);
    await chatRoom.save();
    res.json({ message: 'Joined chatroom', chatRoom });
  } catch (err) {
    res.status(400).json({ error: 'Error joining chatroom' });
  }
});

module.exports = router;
