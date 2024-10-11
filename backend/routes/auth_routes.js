import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    // Create a session for the new user
    req.session.userId = newUser._id;
    res.status(200).json({ success: true, error: null });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid username or password' });

    // Check if the password is valid
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ success: false, error: 'Invalid username or password' });

    // Create a session for the user
    req.session.userId = user._id;
    res.status(200).json({ success: true, error: null });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error logging in' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, error: 'Error logging out' });
    res.clearCookie('connect.sid');  // Clear the session cookie
    res.status(200).json({ success: true, error: null });
  });
});

// Check if the user is authenticated
router.get('/check-auth', (req, res) => {
  if (req.session && req.session.userId) {
    // User is authenticated
    res.status(200).json({ authenticated: true, userId: req.session.userId });
  } else {
    // User is not authenticated
    res.status(200).json({ authenticated: false });
  }
});

export default router;
