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

// @route   GET api/users
// @desc    Get all users
// @access  Private (implement auth later)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get a single user by ID
// @access  Private (implement auth later)
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Private (implement auth later)
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Private (implement auth later)
router.put('/:id', getUser, async (req, res) => {
    if (req.body.email != null) res.user.email = req.body.email;
    // Add other fields to update as needed, e.g., roles
    // if (req.body.role != null) res.user.role = req.body.role;
  
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).select('-password');
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
