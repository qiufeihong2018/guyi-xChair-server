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
  monitorNo: {
    type: String
  },
  probeNo: {
    type: String
  },
  dataType: {
    type: String
  },
  value: {}
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Monitor', Monitor);
