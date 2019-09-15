'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pipeline = new Schema({
  pipelineName: {
    type: String
  },
  // companyId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Company'
  // },
  oprateList: [{
    type: Schema.Types.ObjectId,
    ref: 'Oprate'
  }],
  timestamp: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Pipeline', Pipeline);
