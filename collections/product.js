// 生产线上产品(椅子)类型
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  companyId: {
    type: String
  },
  // 生产线ID
  pipelineId: {
    type: String
  },
  // 生产线名
  pipelineName: {
    type: String
  },
  // 产品型号(公司记录在册)
  model: {
    type: String
  },
  // 产品数字代号(生产线上采集器设置的)(纯数字)
  no: {
    type: String
  },
  // 产品类型(沙发椅，办公椅，酒吧椅)
  type: {
    type: String
  },
  // 产品净重(kg)
  suttleWeight: {
    type: Number
  },
  // 产品总重(kg)
  totalWeight: {
    type: Number
  },
  // 长宽高
  length: {
    type: Number,
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Product', Product);

