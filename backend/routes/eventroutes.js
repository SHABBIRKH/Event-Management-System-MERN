const express = require('express');
const Event = require('../models/event');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const nodemailer = require('nodemailer');

router.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Improved storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
// Configure multer with limits and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Improved POST endpoint with better error handling
router.post('/post', upload.single('image'), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['organizer', 'title', 'type', 'date', 'floor', 'description', 'email'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missing: missingFields
      });
    }

    // Prepare event data
    const eventData = {
      ...req.body,
      type: req.body.type.toLowerCase(), // Ensure type is in lowercase
      date: new Date(req.body.date)
    };

    // Handle image if uploaded
    if (req.file) {
      eventData.image = `/images/${req.file.filename}`;
    }

    // Create and save event
    const newEvent = new Event(eventData);
    await newEvent.save();

    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent
    });

  } catch (error) {
    // Clean up uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }

    console.error('Error creating event:', error);
    
    res.status(400).json({
      error: error.message,
      details: error.errors ? Object.keys(error.errors) : undefined
    });
  }
});

// Approve or Reject an event
router.post('/:eventId/:action', async (req, res) => {
  try {
    const { action } = req.params; // action can be 'approve' or 'reject'
    const eventId = req.params.eventId;

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Fix the type casing to match enum values
    if (event.type) {
      event.type = event.type.toLowerCase(); // ✅ Ensure lowercase
    }

    // Update the event status
    event.status = action === 'approve' ? 'approved' : 'rejected';

    // Save the event
    await event.save();

    res.json({ message: `Event ${action}d successfully!`, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Improved GET endpoint with pagination and filtering
router.get('/get', async (req, res) => {
  try {
    const { page = 1, limit = 20, type, upcoming } = req.query;
    const query = {};

    if (type) {
      query.type = type;
    }

    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    const options = {
      sort: { date: 1 },
      skip: (page - 1) * limit,
      limit: parseInt(limit)
    };

    const events = await Event.find(query, null, options);
    const total = await Event.countDocuments(query);

    res.json({
      events,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getapproved', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, upcoming } = req.query;
    const query = { status: 'approved' }; // Only fetch approved events

    if (type) {
      query.type = type;
    }

    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    const options = {
      sort: { date: 1 },
      skip: (page - 1) * limit,
      limit: parseInt(limit)
    };

    const events = await Event.find(query, null, options);
    const total = await Event.countDocuments(query);

    res.json({
      events,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register for an event
router.post('/:eventId/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $addToSet: { attendees: { name, email } },
       new: true }
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Registration successful!', event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Create reusable transporter object (use your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // example: Gmail
  auth: {
    user: 'eprojectsem@gmail.com',     // Your email
    pass: 'fzfl uwsc irti vrne'  // Your email password or app password
  }
});

router.post('/:eventId/:action', async (req, res) => {
  try {
    const { action } = req.params; // approve or reject
    const eventId = req.params.eventId;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.type) {
      event.type = event.type.toLowerCase();
    }
    event.status = action === 'approve' ? 'approved' : 'rejected';
    await event.save();

    // Prepare email details
    let subject, text;
    if (action === 'approve') {
      subject = `Congratulations! Your event "${event.title}" is approved`;
      text = `Dear ${event.organizer},\n\nYour event titled "${event.title}" has been approved.\nWe look forward to a great event!\n\nBest regards,\nExhibit Team`;
    } else {
      subject = `Update on your event "${event.title}"`;
      text = `Dear ${event.organizer},\n\nWe regret to inform you that your event titled "${event.title}" has been rejected.\nFor more information, please contact support.\n\nBest regards,\nExhibit Team`;
    }

    // Send email
    await transporter.sendMail({
      from: '"Exhibit Team" <eprojectsem@gmail.com>',
      to: event.email,
      subject,
      text
    });

    res.json({ message: `Event ${action}d successfully and email sent!`, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;