'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    // 公司全称(中文)
    type: String
  },
  aliasName: {
    // 英文简称
    type: String
  },
  chineseName: {
    // 中文简称
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
