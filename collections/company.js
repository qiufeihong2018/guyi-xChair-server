'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({
  companyName: {
    type: String
  },
  pipelineList: [{
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  }]
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Company', Company);
