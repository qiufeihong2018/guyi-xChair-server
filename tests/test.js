'use strict';

const mongo = require('../services/mongo');
const monitorService = require('../services/monitorService');
mongo.connect();

// monitorService.dataAnalysis('5d834e6c0c8e9f276745ded0', 'counter', 'today').then((data) => {
//   console.log(data);
// });

// monitorService.dataAnalysisByTimePeriod('5d834e6c0c8e9f276745ded0', 'counter',
//                                         1568982809155, 1569155609155).then((data) => {
//   console.log(data);
// });

// eslint-disable-next-line max-len
// monitorService.companyAnalysis('5d8041e4de1685795bc379b2', 'power', 1568982809155, 1569155609155).then((data) => {
//   console.log(data);
// });
// event data structure


// monitorService.productChange({ pipelineId: '5d834e6c0c8e9f276745ded0',
//                                companyId: '5d8041e4de1685795bc379b2',
//                                probeNo: 'AA02',
//                                monitorNo: 'CF01',
//                                dataType: 'product',
//                                value: '880101' }).then(console.log).catch((err) => {
//   console.log(err);
// });

const no = ['8816', '881601', '8817', '881701', '88103', '8810'];
let res = [];
const obj = {
  '16F016': 1,
  "1": '16F016',
  '1EF01E': 2,
  "2": '1EF01E',
  '26F026': 3,
  "3": '26F026',
  '25F025': 4,
  "4": '25F025',
  '2EF02E': 5,
  "5": '2EF02E',
  '36F036': 6,
  "6": '36F036',
  '3DF03D': 7,
  "7": '3DF03D',
  '3EF03E': 8,
  "8": '3EF03E',
  '46F046': 9,
  "9": '46F046',
  '45F045': 0,
  "0": '45F045',
};

res = no.map((item) => {
  
  return 'AA02CF01' + item.split('').map((item) => obj[item]).join('') + '5AF05A'
});

console.log(res);

[ 'AA02CF013EF03E3EF03E16F01636F0365AF05A',
  'AA02CF013EF03E3EF03E16F01636F03645F04516F0165AF05A',
  'AA02CF013EF03E3EF03E16F0163DF03D5AF05A',
  'AA02CF013EF03E3EF03E16F0163DF03D45F04516F0165AF05A',
  'AA02CF013EF03E3EF03E16F01645F04526F0265AF05A',
  'AA02CF013EF03E3EF03E16F01645F0455AF05A' ]