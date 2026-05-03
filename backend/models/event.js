const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer: { 
    type: String, 
    required: [true, 'Organizer name is required'],
    trim: true
  },
  title: { 
    type: String, 
    required: [true, 'Event title is required'],
    trim: true
  },
  type: { 
    type: String, 
    required: [true, 'Event type is required'],
    enum: ['concert', 'exhibition', 'seminar', 'workshop', 'conference'],
    lowercase: true
  },
  date: { 
    type: Date, 
    required: [true, 'Event date is required'] 
  },
  floor: { 
    type: String, 
    required: [true, 'Floor is required'],
    enum: ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  image: {
    type: String,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  attendees: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    name: String,
    email: String,
    registeredAt: { type: Date, default: Date.now }
  }],
  capacity: { type: Number, default: 100 }, // Optional: add event capacity
  status: { // New field for event status
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

// Indexes for better query performance
eventSchema.index({ title: 'text', description: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ type: 1 });

module.exports = mongoose.model('Event', eventSchema);
