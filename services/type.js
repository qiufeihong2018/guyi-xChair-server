/* eslint-disable prefer-const */
'use strict';
const Company = require('../collections/company');
const PipelineState = require('../collections/pipelineState');
const Monitor = require('../collections/monitor');
const log = require('../services/logger').createLogger('monitor');


// 生产线，针对采集器传来的信息(仪表盘信息))，进行处理
/**
 * 分为五类(目前electricity暂时不用)
 * switch(开关)   DD**
 * counter(计数器)  CC**
 * power(耗电量(千瓦·时) CD**
 * electricity(电压、电流...) CE**
 * product(产品编号) CF
 */
const TYPE = require('../constant/system').TYPE;
const VALUE = require('../constant/system').VALUE;
const STRING = require('../constant/system').STRING;
const NUMBER = require('../constant/system').NUMBER;

let typeMap = new Map([
  [TYPE.DD, VALUE.DD],
  [TYPE.CC, VALUE.CC],
  [TYPE.CD, VALUE.CD],
  [TYPE.CE, VALUE.CE],
  [TYPE.CF, VALUE.CF]
]);
let CFMap = new Map([
  [STRING.CF1, NUMBER.CF1],
  [STRING.CF2, NUMBER.CF2],
  [STRING.CF3, NUMBER.CF3],
  [STRING.CF4, NUMBER.CF4],
  [STRING.CF5, NUMBER.CF5],
  [STRING.CF6, NUMBER.CF6],
  [STRING.CF7, NUMBER.CF7],
  [STRING.CF8, NUMBER.CF8],
  [STRING.CF9, NUMBER.CF9],
  [STRING.CF0, NUMBER.CF0],
  [STRING.CANCLE, NUMBER.CANCLE],
  [STRING.OK, NUMBER.OK],
]);

/*
如CD01：485通信仪表1（电表：用电量  kwh）；
注：CD标签的数据为4个字节，需要进行计算才能得到实际值。
如收到数据CD0101014E22（16进制），计算公式为（65536*（256*1+ 1）+（256*（4*16+14）+（2*16+2）））/100
第1个8位是「正向电能」，计算公式上面，就是
第2个8位是「反向电能」，也如上
这两个，其中一个代表真正的电能

Uinit32位，看看前面是否带符号（小数点）
test:'AA04CD0101014E2201014E22'
*/
function getEnergy(data) {
  // 转化为字符串
  data = data + '';
  // eslint-disable-next-line max-len
  let energy = (65536 * (256 * parseInt(data.slice(0, 2), 16) + parseInt(data.slice(2, 4), 16)) + (256 * (parseInt(data.slice(4, 5), 16) * 16 + parseInt(data.slice(5, 6), 16)) + (parseInt(data.slice(6, 7), 16) * 16 + parseInt(data.slice(7, 8), 16)))) / 100;
  return energy;
}

/* 解析switch(开关)数字信号   DD**
如DD01：数字量采集通道1 （开和关；交给PD约定）01 00 2位
test:'AA04DD0101'
*/
function parseSwitchDigit(data) {
  return data;
}

/*
解析counter(计数器)数字信号   CC**
第一个8位入口数量（重复计次品次数），
第二个8位次品次数，
第三个8位出品数量（真实的产量）
test:'AA02CC0100006B060001AD97000E65E8'
*/
function parseCounterDigit(data) {
  let obj = {
    repeatedCounting: '',
    defectiveNumber: '',
    productionQuantity: '',
    createdAt: new Date()
  };
  obj.repeatedCounting = parseInt(data.slice(0, 8), 16);
  obj.defectiveNumber = parseInt(data.slice(8, 16), 16);
  obj.productionQuantity = parseInt(data.slice(16, 24), 16);
  let prevVal = {};
  let difVal = '';
  let difTime = '';
  let plState = {
    state: '',
    startTime: '',
    endTime: '',
    difTime: ''
  };
  // 运行状态业务
  Monitor.find({
    monitorNo: 'CC01'
  }).sort({
    createdAt: -1
  }).limit(1).exec((err, doc) => {
    prevVal = doc[0];

    difVal = obj.repeatedCounting - prevVal.value.repeatedCounting;
    difTime = obj.createdAt - prevVal.createdAt;

    if (Math.abs(difVal) > 0) {
      plState.state = 'on';
    }
    if (Math.abs(difVal) === 0) {
      if (Math.abs(difTime) > 300000) {
        plState.state = 'off';
      } else {
        plState.state = 'pending';
      }
    }
    plState.startTime = prevVal.createdAt;
    plState.endTime = obj.createdAt;
    plState.difTime = plState.endTime - plState.startTime;


    PipelineState.create(plState, function(err) {
      if (err) {
        console.log(err);
      }
      log.info('Add status success');
    });

    // 数据纠错业务
    let difRepeated = obj.repeatedCounting - prevVal.value.repeatedCounting;
    let difDefective = obj.defectiveNumber - prevVal.value.defectiveNumber;
    let difProduction = obj.productionQuantity - prevVal.value.productionQuantity;

    if (difRepeated < 0 || difDefective < 0 || difProduction < 0) {
      Monitor.findByIdAndRemove({
        _id: prevVal._id
      }).exec((err, data) => {
        if (err) {
          console.log(err);
        }
        log.info(`${prevVal._id} is deleted`);
      });
    }
  });
  return obj;

}

/* 解析power(耗电量(千瓦·时)数字信号 CD**
test:'AA03CD010000006800004042'
 */
function parsePowerDigit(data) {
  let obj = {
    positiveEnergy: '',
    negativeEnergy: ''
  };
  obj.positiveEnergy = getEnergy(data.slice(0, 8));
  obj.negativeEnergy = getEnergy(data.slice(8, 16));
  return obj;
}

/* 解析product(产品编号)数字信号 CE
如CE01：485通信仪表1（电表：电压、电流）；
注：CE标签的数据为2个字节，需要进行计算才能得到实际值。
计算公式需具体情况而定
test：AA03CE0108B5035F025C07100772013C
*/
function parseElectricityDigit(data) {
  let obj = {
    voltage: '',
    electric: '',
    activePower: '',
    reactivePower: '',
    apparentPower: '',
    powerFactor: ''
  };

  obj.voltage = (256 * parseInt(data.slice(0, 2), 16) + parseInt(data.slice(2, 4), 16)) / 10;
  obj.electric = (256 * parseInt(data.slice(4, 6), 16) + parseInt(data.slice(6, 8), 16)) / 100;
  obj.activePower = 256 * parseInt(data.slice(8, 10), 16) + parseInt(data.slice(10, 12), 16);
  // eslint-disable-next-line max-len
  obj.reactivePower = 256 * parseInt(data.slice(12, 14), 16) + parseInt(data.slice(14, 16), 16);
  // eslint-disable-next-line max-len
  obj.apparentPower = 256 * parseInt(data.slice(16, 18), 16) + parseInt(data.slice(18, 20), 16);
  // eslint-disable-next-line max-len
  obj.powerFactor = (256 * parseInt(data.slice(20, 22), 16) + parseInt(data.slice(22, 24), 16)) / 1000;

  return obj;
}

/*
解析product(产品编号)数字信号 CF
test:'AA04CF0146F04645F0455AF05A' 90确定
*/
function parseProductDigit(data) {

  let str = '';

  if (data.slice(-6) === STRING.OK) {

    for (let i = 0; i < data.length - 6; i += 6) {
      str += CFMap.get(data.slice(i, i + 6));
    }
  }
  return str;
}


// 解析仪表盘的数字信号
function parseDigitalData(dataType, data) {
  let res = '';
  switch (dataType) {
    case 'DD':
      res = parseSwitchDigit(data);
      break;
    case 'CC':
      res = parseCounterDigit(data);
      break;
    case 'CD':
      res = parsePowerDigit(data);
      break;
    case 'CE':
      res = parseElectricityDigit(data);
      break;
    default:
      res = parseProductDigit(data);
  }
  return res;
}

// 获取解析数据的主函数
exports.getData = (doc) => {
  for (let key in doc) {
    var companyName = key;
    if (companyName) {
      return new Promise(function(resolve, reject) {
        Company.find({
          aliasName: companyName
        }).exec((err, data) => {
          if (err) {
            console.log(err);
          }
          let obj = {
            companyId: '',
            probeNo: '',
            dataType: '',
            value: '',
            monitorNo: ''
          };
          let monitor = doc[companyName];
          obj.companyId = data[0]._id;
          obj.monitorNo = monitor.slice(4, 8);

          obj.probeNo = monitor.slice(0, 4);

          obj.dataType = typeMap.get(monitor.slice(4, 6));

          obj.value = parseDigitalData(monitor.slice(4, 6), monitor.slice(8));
          resolve(obj);
        });
      });

    }

  }

};
