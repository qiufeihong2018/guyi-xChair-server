'use strict';
const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const CompanySchema = new Schema({
  companyName: {
    type: String
  },
  aliasName: {
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

module.exports = model('Company', CompanySchema);
