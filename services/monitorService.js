/* eslint-disable max-len */
'use strict';
const MonitorCol = require('../collections/monitor');

async function dataAnalysis(pipelineId, dataType, date) {
  // eslint-disable-next-line indent
  const timePeriod = getTimePeriod(date);
  const hour = 60 * 60 * 1000;
  const res = [];

  let pre = await MonitorCol
    .find({ 'pipelineId': pipelineId,
            'dataType': dataType,
            'createdAt': { $gte: timePeriod.start - 24 * 60 * 60 * 1000, $lt: timePeriod.start } })
     .sort({ 'createdAt': -1 })
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
    finalResult.push(obj[0]);
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

function timeHander(date) {
  return date.substr(0, 11) + '00:00:00.000Z';
}
exports.dataAnalysis = dataAnalysis;
exports.getTimePeriod = getTimePeriod;
