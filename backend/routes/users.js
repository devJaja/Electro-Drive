const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    //
    // WARNING: Storing passwords in plain text is a major security risk.
    // In a real-world application, you should always hash and salt passwords.
    //
    user = new User({
      email,
      password,
    });

    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    //
    // WARNING: Comparing passwords in plain text is a major security risk.
    //
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.json({ msg: 'User logged in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
