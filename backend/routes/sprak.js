const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/speaker');
;
// Multer configurationsn
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists in your root
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original name
  }
});

const upload = multer({ storage: storage });
router.post('/', upload.single('photo'), async (req, res) => {
    try {
      const { name, email, bio } = req.body;
      const photo = req.file.path;
  
      const newUser = new User({ name, email, bio, imageurl: photo });
      await newUser.save();
  
      return res.status(201).json({ message: 'Speaker registered successfully', user: newUser });
  
    } catch (err) {
      console.error('Registration Error:', err);
      return res.status(500).json({ error: 'Server error during registration' });
    }
  });
router.get('/', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
      const { name, email, bio } = req.body;
  
      const updateData = {
        name,
        email,
        bio
      };
  
      if (req.file) {
        updateData.imageurl = req.file.path;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Speaker not found' });
      }
  
      res.status(200).json({ message: 'Speaker updated successfully', user: updatedUser });
    } catch (err) {
      console.error('Update Error:', err);
      res.status(500).json({ error: 'Server error during update' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;