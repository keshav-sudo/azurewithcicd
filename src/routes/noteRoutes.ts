import { Router, Request, Response } from 'express';
import Note from '../models/Note';

const router = Router();

// Get all notes
router.get('/', async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// Get single note
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// Create note
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const note = await Note.create({ title, content });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// Update note
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// Delete note
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

export default router;
