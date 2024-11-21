const express = require('express');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const jwtKey ='chat-app' 

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne( {username} )
    console.log(user);
    
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    console.log(jwtKey);
if (user){
  const token = Jwt.sign({user }, jwtKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        res.send({ err:"Error in Token" });
      }
      res.send(user,{ auth :token });
    });
    res.json({ token });
}else{
  res.send({ err:" User not found" });
}
    
    
    // const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    // res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Error logging in' });
  }
});

module.exports = router;
