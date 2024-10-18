import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// Get all notes for the logged-in user
router.get('/', async (req, res) => {
  const notes = await Note.find({ userId: req.session.userId });
  res.status(200).json(notes);
});

// Create a new note
router.post('/', async (req, res) => {
  const note = new Note({
    userId: req.session.userId,
    content: req.body.content,
  });
  await note.save();
  const notes = await Note.find({ userId: req.session.userId });
  res.status(200).json(notes);
});

router.delete('/:id', async (req, res) => {
  try {
    const note_id = req.params.id;

    const deleted_note = await Note.findByIdAndDelete(note_id);

    if (!deleted_note) {
      return res.status(400).json({ message: 'Note not found' });
    }

    const notes = await Note.find({ userId: req.session.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});

router.put('/complete', async (req, res) => {
  try {
    const { id } = req.body;

    const updated_note = await Note.findByIdAndUpdate(
      id, 
      { complete: true },  // Set "complete" to true
      { new: true }        // Return the updated document
    );

    if (!updated_note) {
      return res.status(400).json({ message: 'Note not found' });
    }

    const notes = await Note.find({ userId: req.session.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Server error while updating note' });
  }
});

export default router;
