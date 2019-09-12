'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pipeline = new Schema({
  lineId: {
    type: Number,
    required: true
  },
  lineName: {
    type: String
  },
  factoryName: {
    type: String
  },
  companyName: {
    type: String
  },
  equipmentList: [{
    type: Schema.Types.ObjectId,
    ref: 'Oprate'
  }],
  timestamp: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Pipeline', Pipeline);
