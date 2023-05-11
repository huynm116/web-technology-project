// dorm.model.js

const mongoose = require('mongoose');

const DormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  action: {
    type: String,
    required: true,
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
});

module.exports = mongoose.model('Dorm', DormSchema);
