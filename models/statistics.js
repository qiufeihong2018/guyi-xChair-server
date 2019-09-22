'use strict';
const schedule = require('node-schedule');

const Statistics = require('../collections/statistics');
const Monitor = require('../collections/monitor');

// 每整点时触发方法

// 每小时执行统计函数
// eslint-disable-next-line no-unused-vars
const hourSchedule = schedule.scheduleJob('0 * * * *', statistics('hour'));

// 每天执行统计函数
// eslint-disable-next-line no-unused-vars
const daySchedule = schedule.scheduleJob({
  hour: 23,
  minute: 59,
  second: 59
}, statistics('day'));


const model = {
  // 开始时间
  startTime: '',
  // 结束时间
  endTime: '',
  // 日期类型
  dateType: '',
  // 入口数量
  repeatedCounting: '',
  //   次品次数
  defectiveNumber: '',
  //   出品数量
  productionQuantity: '',
  // 正向电能
  positiveEnergy: '',
  // 反向电能
  negativeEnergy: '',
  // 电压
  voltage: '',
  // 电流
  electric: '',
  // 有功功率
  activePower: '',
  // 无功功率
  reactivePower: '',
  // 视在功率
  apparentPower: '',
  // 功率因数
  powerFactor: ''
};

async function dataTypeMonitor(dataType, time) {
  // 当前函数执行的时间
  model.endTime = new Date();
  // 执行时间前1天
  if (time === 'day') {
    model.dateType = 'day';

    model.startTime = model.endTime - 1000 * 60 * 60 * 24;
  }
  if (time === 'hour') {
    model.dateType = 'hour';

    model.startTime = model.endTime - 1000 * 60 * 60;
  }

  const toData = await Monitor.find({
    dataType: dataType
  }).sort({
    createdAt: -1
  }).limit(1);

  const yesData = await Monitor.find({
    $and: [{
      dataType: dataType
    }, {
      createdAt: {
        '$lte': model.startTime
      }
    }]
  }).sort({
    createdAt: -1
  }).limit(1);
  return {
    toData,
    yesData
  };
}

function statistics(time) {
  const {
    elecMonitorToData,
    elecMonitorYesData
  } = dataTypeMonitor('electricity', time);

  const {
    countMonitorToData,
    countMonitorYesData
  } = dataTypeMonitor('counter', time);
  const {
    powerMonitorToData,
    powerMonitorYesData
  } = dataTypeMonitor('power', time);


  model.voltage = elecMonitorToData.value.voltage - elecMonitorYesData.value.voltage;
  model.electric = elecMonitorToData.value.electric - elecMonitorYesData.value.electric;
  model.activePower = elecMonitorToData.value.activePower - elecMonitorYesData.value.activePower;
  // eslint-disable-next-line max-len
  model.reactivePower = elecMonitorToData.value.reactivePower - elecMonitorYesData.value.reactivePower;
  // eslint-disable-next-line max-len
  model.apparentPower = elecMonitorToData.value.apparentPower - elecMonitorYesData.value.apparentPower;
  // eslint-disable-next-line max-len
  model.powerFactor = elecMonitorToData.value.powerFactor - elecMonitorYesData.value.powerFactor;
  model.voltage = elecMonitorToData.value.voltage - elecMonitorYesData.value.voltage;
  // eslint-disable-next-line max-len
  model.repeatedCounting = countMonitorToData.value.repeatedCounting - countMonitorYesData.value.repeatedCounting;
  // eslint-disable-next-line max-len
  model.defectiveNumber = countMonitorToData.value.defectiveNumber - countMonitorYesData.value.defectiveNumber;
  // eslint-disable-next-line max-len
  model.productionQuantity = countMonitorToData.value.productionQuantity - countMonitorYesData.value.productionQuantity;
  // eslint-disable-next-line max-len
  model.positiveEnergy = powerMonitorToData.value.positiveEnergy - powerMonitorYesData.value.positiveEnergy;
  // eslint-disable-next-line max-len
  model.negativeEnergy = powerMonitorToData.value.negativeEnergy - powerMonitorYesData.value.negativeEnergy;
  Statistics.create(model);
}
