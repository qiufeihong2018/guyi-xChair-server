'use strict';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RawDataSchema = new Schema({
  data: {
    type: String
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
  }
});

module.exports = model('RawData', RawDataSchema);
