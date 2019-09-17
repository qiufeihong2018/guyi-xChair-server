'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String
  },
  aliasName: {
    type: String
  },
  chineseName: {
    type: String
  },
  pipelineList: [{
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Company', CompanySchema);
