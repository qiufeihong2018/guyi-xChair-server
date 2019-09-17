'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pipeline = new Schema({
  pipelineName: {
    type: String
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  probeList: {
    type: Array
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

module.exports = mongoose.model('Pipeline', Pipeline);
