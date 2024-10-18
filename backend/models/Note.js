import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  complete: { type: Boolean, default: false },
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
