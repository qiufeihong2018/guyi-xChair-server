'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistics = new Schema({
  // 开始时间
  startTime: {
    type: Date
  },
  // 结束时间
  endTime: {
    type: Date
  },
  // 日期类型
  dateType: {
    type: String
  },
  // 入口数量
  repeatedCounting: {
    type: Number
  },
  //   次品次数
  defectiveNumber: {
    type: Number
  },
  //   出品数量
  productionQuantity: {
    type: Number
  },
  // 正向电能
  positiveEnergy: {
    type: Number
  },
  // 反向电能
  negativeEnergy: {
    type: Number
  },
  // 电压
  voltage: {
    type: Number
  },
  // 电流
  electric: {
    type: Number
  },
  // 有功功率
  activePower: {
    type: Number
  },
  // 无功功率
  reactivePower: {
    type: Number
  },
  // 视在功率
  apparentPower: {
    type: Number
  },
  // 功率因数
  powerFactor: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Statistics', Statistics);
