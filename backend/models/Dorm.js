// dorm.model.js

const mongoose = require('mongoose');

const DormSchema = new mongoose.Schema({
  dorm_id: {
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
  room_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  }
}, {
  collection : 'dorm_list'
});

module.exports = mongoose.model('Dorm', DormSchema);
