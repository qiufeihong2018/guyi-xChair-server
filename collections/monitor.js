'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Monitor = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  probeId: {
    type: Schema.Types.ObjectId,
    ref: 'Probe'
  },
  probeNo: {
    type: String
  },
  dataType: {
    type: String
  },
  value: {
    type: Array
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

module.exports = mongoose.model('Monitor', Monitor);
