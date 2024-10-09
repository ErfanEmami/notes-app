import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// Get all notes for the logged-in user
router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.session.userId });
  res.json(notes);
});

// Create a new note
router.post('/', async (req, res) => {
  const note = new Note({
    userId: req.session.userId,
    content: req.body.content,
  });
  await note.save();
  res.status(201).json(note);
});

export default router;
