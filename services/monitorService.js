/* eslint-disable max-len */
'use strict';
const MonitorCol = require('../collections/monitor');
const CompanyCol = require('../collections/company');
const PipelineCol = require('../collections/pipeline');

async function dataAnalysis(pipelineId, dataType, date) {
  // eslint-disable-next-line indent
  const timePeriod = getTimePeriod(date);
  const hour = 60 * 60 * 1000;
  const res = [];

  let pre = await MonitorCol
    .find({ 'pipelineId': pipelineId,
            'dataType': dataType,
            'createdAt': { $gte: timePeriod.start, $lt: timePeriod.end } })
     .sort({ 'createdAt': 1 })
    .limit(1);

  res.push(pre);

  let start = timePeriod.start;
  let end = start + hour;
  if (end > timePeriod.end) end = timePeriod.end + 1;


  while (start < timePeriod.end) {
    let result = await MonitorCol
    .find({ 'pipelineId': pipelineId,
            'dataType': dataType,
            'createdAt': { $gte: start, $lt: end } })
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

  return finalResult;
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
  const today = {
    start: dayStart,
    end: currDate
  };
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

async function pipelineCount(pipelineId, dataType, start, end) {
  const max = await MonitorCol
    .find({ 'pipelineId': pipelineId,
            'dataType': dataType,
            'createdAt': { $gte: start, $lt: end } })
     .sort({ 'createdAt': -1 })
    .limit(1);
  const min = await MonitorCol
  .find({ 'pipelineId': pipelineId,
          'dataType': dataType,
          'createdAt': { $gte: start, $lt: end } })
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
exports.dataAnalysis = dataAnalysis;
exports.getTimePeriod = getTimePeriod;
exports.companyAnalysis = companyAnalysis;
