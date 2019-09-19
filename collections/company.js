'use strict';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  companyName: {
    // 公司全称(中文)
    type: String
  },
  companyAlias: {
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

module.exports = model('Company', CompanySchema);
