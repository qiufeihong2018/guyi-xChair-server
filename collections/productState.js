/**
 * 产品状态
 * 用于记录生产什么产品，在哪里生产，是否还在生产，在什么时间段里生产
 * 分别是 what(产品ID)、where(生产线ID)、if(state)、when(start|end)
 * */
'use strict';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductState = new Schema({
  productId: {  // 产品ID
    type: String
  },
  pipelineId: {  // 生产线ID
    type: String
  },
  state: {  // 是否在生产
    type: Boolean
  },
  startTime: { // 开始生产的时间
    type: Date
  },
  endTime: {  // 结束生产的时间
    type: Date
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = model('ProductState', ProductState);
