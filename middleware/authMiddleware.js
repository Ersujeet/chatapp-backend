// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TokenKey);
    req.user = decoded; // Save user data (userId and role) to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', err });
  }
};
