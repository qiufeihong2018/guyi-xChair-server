'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Time = new Schema({
  time: {
    type: Number
  },
  event: {
    type: Object
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Time', Time);
