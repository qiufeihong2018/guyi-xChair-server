'use strict';
/**
 * // 最近每个小时的计数
 * // 保存每天的计数
 * 
 */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CounterSchema = new Schema({

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = model('Counter', CounterSchema);
