const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;


  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate Token (Optional for future use)
    const token = jwt.sign({ id: user._id }, 'your_secret_key', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }); // Replace with your DB query
  if (user) {
    res.json({ name: user.username });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
module.exports = router;
