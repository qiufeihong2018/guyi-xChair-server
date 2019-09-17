'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Probe = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  probeNo: {
    type: String
  },
  monitorList: {
    type: Array
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Probe', Probe);
