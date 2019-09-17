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
  chineseName: {
    type: String
  },
  pipelineList: [{
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  }]
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

module.exports = model('Company', CompanySchema);
