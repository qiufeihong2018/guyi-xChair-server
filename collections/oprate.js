'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Oprate = new Schema({
  details: {
    equipmentNumber: {
      type: String
    },
    acquisition: [{
      acquisitionChannel: {
        type: String
      },
      value: {
        type: String
      }
    }],
    instrument: {
      instrumentNumber: {
        type: String
      },
      value: {
        type: Array
      }
    },
    pipeline: {
      type: Schema.Types.ObjectId,
      ref: 'Pipeline'
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Oprate', Oprate);
