/* eslint-disable max-len */
'use strict';
const MonitorCol = require('../collections/monitor');
const CompanyCol = require('../collections/company');
const PipelineCol = require('../collections/pipeline');
const ProductState = require('../collections/productState');
const ProductCol = require('../collections/product');
const logger = require('../services/logger').createLogger();
async function dataAnalysis(pipelineId, dataType, date) {
  // eslint-disable-next-line indent
  const timePeriod = getTimePeriod(date);
  const hour = 60 * 60 * 1000;
  const res = [];

  let pre = await MonitorCol
    .find({
      'pipelineId': pipelineId,
      'dataType': dataType,
      'createdAt': { $gte: timePeriod.start, $lt: timePeriod.end }
    })
    .sort({ 'createdAt': 1 })
    .limit(1);

  res.push(pre);

  let start = timePeriod.start;
  let end = start + hour;
  if (end > timePeriod.end) end = timePeriod.end + 1;


  while (start < timePeriod.end) {
    let result = await MonitorCol
      .find({
        'pipelineId': pipelineId,
        'dataType': dataType,
        'createdAt': { $gte: start, $lt: end }
      })
      .sort({ 'createdAt': -1 })
      .limit(1);

    if (result.length === 0) result = pre;
    else pre = result;
    res.push(result);
    start = end;
    end = start + hour;
    if (end > timePeriod.end) end = timePeriod.end + 1;
  }

  const finalResult = [];
  for (const obj of res) {
    if (obj.length > 0)
      finalResult.push(obj[0]);
    else finalResult.push(null);
  }

  let result;
  if (dataType === 'power') {
    result = processDataOfPower(finalResult);
  } else {
    // counter
    result = processDataOfCounter(finalResult);
  }


  return result;
}

async function dataAnalysisByTimePeriod(pipelineId, dataType, timeStart, timeEnd) {
  // eslint-disable-next-line indent
  const hour = 60 * 60 * 1000;
  const res = [];

  let pre = await MonitorCol
    .find({
      'pipelineId': pipelineId,
      'dataType': dataType,
      'createdAt': { $gte: timeStart, $lt: timeEnd }
    })
    .sort({ 'createdAt': 1 })
    .limit(1);

  res.push(pre);

  let start = timeStart;
  let end = nextHour(start);
  if (end > timeEnd) end = timeEnd + 1;


  while (start < end) {
    let result = await MonitorCol
      .find({
        'pipelineId': pipelineId,
        'dataType': dataType,
        'createdAt': { $gte: start, $lt: end }
      })
      .sort({ 'createdAt': -1 })
      .limit(1);

    if (result.length === 0) result = pre;
    else pre = result;
    res.push(result);
    start = end;
    end = start + hour;
    if (end > timeEnd) end = timeEnd + 1;
  }

  const finalResult = [];
  for (const obj of res) {
    if (obj.length > 0)
      finalResult.push(obj[0]);
    else finalResult.push(null);
  }

  let result;
  if (dataType === 'power') {
    result = processDataOfPower(finalResult);
  } else {
    // counter
    result = processDataOfCounter(finalResult);
  }


  return result;
}

function getTimePeriod(date) {
  const timezoneOffset = new Date().getTimezoneOffset();
  const currDate = new Date().getTime();
  let dayStart = currDate - 1000 * 60 * timezoneOffset;
  dayStart = new Date(dayStart).toISOString();
  // console.log(dayStart);
  dayStart = timeHander(dayStart);
  // console.log(dayStart);
  dayStart = new Date(dayStart).getTime() + 1000 * 60 * timezoneOffset;
  // console.log(dayStart);

  const today = {
    start: dayStart,
    end: currDate
  };
  // console.log(today);

  if (date === 'today') {
    return today;
  } else {
    return {
      start: dayStart - 24 * 60 * 60 * 1000,
      end: dayStart
    };
  }
}

async function companyAnalysis(companyId, dataType, start, end) {
  const company = await CompanyCol.findById(companyId);
  if (!company || company.pipelineList.length === 0) return null;

  const res = [];
  for (const pipeline of company.pipelineList) {
    const count = await pipelineCount(pipeline, dataType, start, end);

    const pipelineCol = await PipelineCol.findById(pipeline);
    const pipelineName = pipelineCol.pipelineName;
    res.push({
      pipelineId: pipeline,
      pipelineName: pipelineName,
      dataType: dataType,
      value: count
    });
  }
  return res;
}

// event data structure
// { pipelineId: 5d834e6c0c8e9f276745ded0,
//   companyId: 5d8041e4de1685795bc379b2,
//   probeNo: 'AA02',
//   monitorNo: 'CF01',
//   dataType: 'product',
//   value: '8801' }
async function productChange(event) {
  if (!event || event.dataType !== 'product') return;
  console.log(event);
  const lastProductState = await ProductState.findOne({ pipelineId: event.pipelineId, state: true });
  const counterCurr = await MonitorCol.find({ pipelineId: event.pipelineId, dataType: 'counter' }).sort({ _id: -1 }).limit(1);
  const powerCurr = await MonitorCol.find({ pipelineId: event.pipelineId, dataType: 'power' }).sort({ _id: -1 }).limit(1);
  let power, counter;
  const currentDate = new Date();
  counter = counterCurr[0];
  power = powerCurr[0];

  if (counterCurr.length === 0) {
    logger.error(`pipelineId ${event.pipelineId} has no counter monitor record`);
    counter = {
      dataType: 'counter',
      value: { repeatedCounting: 0, defectiveNumber: 0, productionQuantity: 0 }
    };
  }


  if (powerCurr.length === 0) {
    logger.error(`pipelineId ${event.pipelineId} has no power monitor record`);
    power = {
      dataType: power, value: { positiveEnergy: 0, negativeEnergy: 0 }
    };
  }

  const productNew = await ProductCol.findOne({ no: event.value });
  
  if (!productNew) return;
  console.log(lastProductState);
  if (lastProductState) {
    await ProductState.updateOne({ pipelineId: event.pipelineId, state: true },
                                 { state: false, counterEnd: counter.value, powerEnd: power.value, endTime: currentDate });
  }
  await ProductState.create({ productId: productNew._id,
                              productModel: productNew.model,
                              productNo: productNew.no,
                              productType: productNew.type,
                              pipelineId: event.pipelineId,
                              state: true, startTime: currentDate,
                              counterBegin: counter.value,
                              powerBegin: power.value
  });

}

// event data structure
// { pipelineId: 5d834e6c0c8e9f276745ded0,
//   companyId: 5d8041e4de1685795bc379b2,
//   probeNo: 'AA02',
//   monitorNo: 'CF01',
//   dataType: 'product',
//   value: '8801' }
async function currentProductState(pipelineId) {

  const lastProductState = await ProductState.findOne({ pipelineId: pipelineId, state: true });
  if (!lastProductState) return null;

  const counterCurr = await MonitorCol.find({ pipelineId: pipelineId, dataType: 'counter' }).sort({ _id: -1 }).limit(1);
  const powerCurr = await MonitorCol.find({ pipelineId: pipelineId, dataType: 'power' }).sort({ _id: -1 }).limit(1);
  let power, counter;
  counter = counterCurr[0];
  power = powerCurr[0];

  if (counterCurr.length === 0) {
    logger.error(`pipelineId ${pipelineId} has no counter monitor record`);
    counter = {
      dataType: 'counter',
      value: { repeatedCounting: 0, defectiveNumber: 0, productionQuantity: 0 }
    };
  }


  if (powerCurr.length === 0) {
    logger.error(`pipelineId ${pipelineId} has no power monitor record`);
    power = {
      dataType: power, value: { positiveEnergy: 0, negativeEnergy: 0 }
    };
  }

  return {
    productModel: lastProductState.productModel,
    productNo: lastProductState.productNo,
    productType: lastProductState.productType,
    startTime: new Date(lastProductState.startTime).getTime(),
    endTime: null,
    positiveEnergy: power.value.positiveEnergy - lastProductState.powerBegin.positiveEnergy,
    negativeEnergy: power.value.negativeEnergy - lastProductState.powerBegin.negativeEnergy,
    in: counter.value.repeatedCounting - lastProductState.counterBegin.repeatedCounting,
    failed: counter.value.defectiveNumber - lastProductState.counterBegin.defectiveNumber,
    out: counter.value.productionQuantity - lastProductState.counterBegin.productionQuantity

  };

}
async function pipelineCount(pipelineId, dataType, start, end) {
  const max = await MonitorCol
    .find({
      'pipelineId': pipelineId,
      'dataType': dataType,
      'createdAt': { $gte: start, $lt: end }
    })
    .sort({ 'createdAt': -1 })
    .limit(1);
  const min = await MonitorCol
    .find({
      'pipelineId': pipelineId,
      'dataType': dataType,
      'createdAt': { $gte: start, $lt: end }
    })
    .sort({ 'createdAt': 1 })
    .limit(1);

  if (max.length === 0 || min.length === 0)
    return null;

  if (dataType === 'counter') {
    // console.log(max[0].value.productionQuantity, min[0].value.productionQuantity);
    const repeatedCounting = max[0].value.repeatedCounting - min[0].value.repeatedCounting;
    const defectiveNumber = max[0].value.defectiveNumber - min[0].value.defectiveNumber;
    const productionQuantity = max[0].value.productionQuantity - min[0].value.productionQuantity;

    return {
      repeatedCounting,
      defectiveNumber,
      productionQuantity
    };
  } else {
    const positiveEnergy = max[0].value.positiveEnergy - min[0].value.positiveEnergy;
    const negativeEnergy = max[0].value.negativeEnergy - min[0].value.negativeEnergy;

    return {
      positiveEnergy,
      negativeEnergy
    };
  }
}

function timeHander(date) {
  return date.substr(0, 11) + '00:00:00.000Z';
}

function nextHour(timestamp) {
  const res = timestamp - timestamp % 3600000 + 3600000;
  return res;
}

function processDataOfPower(rawData) {
  return rawData.map((item) => {
    if (item && item.value) {
      return {
        positive: item.value.positiveEnergy,
        negative: item.value.negativeEnergy,
        time: item.createdAt
      };
    }
    return {
      positive: 0,
      negative: 0,
      time: ''
    };
  });
}

// 解析counter的数据
function processDataOfCounter(rawData) {
  return rawData.map((item) => {
    if (item && item.value) {
      return {
        in: item.value.repeatedCounting, // 入口数
        failed: item.value.defectiveNumber, // 次品数
        out: item.value.productionQuantity, // 出口数
        time: item.createdAt
      };
    }
    return {
      in: 0, // 入口数
      failed: 0, // 次品数
      out: 0, // 出口数
      time: ''
    };
  });
}
exports.dataAnalysis = dataAnalysis;
exports.getTimePeriod = getTimePeriod;
exports.companyAnalysis = companyAnalysis;
exports.dataAnalysisByTimePeriod = dataAnalysisByTimePeriod;
exports.productChange = productChange;
exports.currentProductState = currentProductState;
