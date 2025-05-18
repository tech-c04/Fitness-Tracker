const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  steps: {
    type: Number,
    default: 0
  },
  nightSleep: {
    type: Number,
    default: 0
  },
  noonNap: {
    type: Number,
    default: 0
  },
  calories: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);