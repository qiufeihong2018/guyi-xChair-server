'use strict';

const mongo = require('../services/mongo');
const monitorService = require('../services/monitorService');
mongo.connect();

monitorService.dataAnalysis('5d834e6c0c8e9f276745ded0', 'counter', 'today').then((data) => {
  console.log(data);
});
