'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Monitor = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  // companyId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Company'
  // },
  monitorNo: {
    type: String
  },
  probeId: [{
    type: Schema.Types.ObjectId,
    ref: 'Probe'
  }],
  probeNo: {
    type: String
  },
  dataType: {
    type: String
  },
  value: {}
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

module.exports = mongoose.model('Monitor', Monitor);
