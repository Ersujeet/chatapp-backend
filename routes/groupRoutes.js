// routes/groupRoutes.js
const express = require('express');
const { createGroup, getGroups } = require('../controllers/groupController');
const { authMiddleware } = require('../middleware/authMiddleware'); // authentication middleware
const router = express.Router();

router.post('/create', authMiddleware, createGroup); // Requires JWT authentication authMiddleware,
router.get('/list', authMiddleware, getGroups); // Requires JWT authentication

module.exports = router;
