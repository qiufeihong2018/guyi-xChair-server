'use strict';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PipelineState = new Schema({
  pipelineId: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline'
  },
  state: {
    //  off(关机), on(运行), pending(待机)
    type: String
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  difTime: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = model('PipelineState', PipelineState);
