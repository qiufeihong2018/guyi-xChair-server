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
    updatedAt: 'updatedAt'
  }
});

module.exports = model('RawData', RawDataSchema);
