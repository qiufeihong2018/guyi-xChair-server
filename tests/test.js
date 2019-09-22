'use strict';

const mongo = require('../services/mongo');
const monitorService = require('../services/monitorService');
mongo.connect();

// monitorService.dataAnalysis('5d834e6c0c8e9f276745ded0', 'counter', 'today').then((data) => {
//   console.log(data);
// });

// eslint-disable-next-line max-len
monitorService.companyAnalysis('5d8041e4de1685795bc379b2', 'power', 1568982809155, 1569155609155).then((data) => {
  console.log(data);
});
