'use strict';
const mongoose = require('mongoose');
const { Schema, model } = mongoose.Schema;

const PipelineState = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  state: {
    // [0, 1, 2]对应 [off(关机), on(运行), pending(待机)]
    type: Boolean 
  },
  count: {
    // 入口计数器
    type: Number
  },
  startTime: {

  },
  endTime: {

  }
});

module.exports = model('PipelineState', PipelineState);