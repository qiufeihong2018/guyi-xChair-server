'use strict';
const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const PipelineState = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  pipelineName: {
    type: String
  },
  state: {
    //  off(关机), on(运行), pending(待机)
    type: String
  },
  startTime: {
    // 某个状态的开始区间
    type: Date
  },
  endTime: {
    // 某个状态的结束区间
    type: Date
  },
  difTime: {
    type: Number
  },
  // 当前的入口量
  count: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = model('PipelineState', PipelineState);
