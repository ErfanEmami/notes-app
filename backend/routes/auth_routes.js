import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Check if the user already exists
    const existing_user = await User.findOne({ username });
    if (existing_user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash the password and save the new user
    const hashed_password = await bcrypt.hash(password, 10);
    const new_user = new User({ username, password: hashed_password });
    await new_user.save();
    
    // Create a session for the new user
    req.session.user = new_user;
    res.status(200).json({ success: true, user: req.session.user, error: null });
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
    req.session.user = user;
    res.status(200).json({ success: true, user: req.session.user, error: null });
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
    res.status(200).json({ user: req.session?.user });
});

export default router;
