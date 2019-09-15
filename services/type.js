/* eslint-disable prefer-const */
'use strict';
const Company = require('../collections/company');
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
*/
function getEnergy(data) {
  // eslint-disable-next-line max-len
  let energy = (65536 * (256 * data.slice(0, 2) + data.slice(2, 4)) + (256 * (data.slice(4, 5) * 16 + parseInt(data.slice(5, 6), 16)) + (data.slice(6, 7) * 16 + data.slice(7, 8)))) / 100;
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
第三个8位出品数量（真实的产量））
test:'AA02CC0100006B060001AD97000E65E8'
*/
function parseCounterDigit(data) {
  let obj = {
    repeatedCounting: '',
    defectiveNumber: '',
    productionQuantity: ''
  };
  obj.repeatedCounting = data.slice(0, 8);
  obj.defectiveNumber = data.slice(8, 16);
  obj.productionQuantity = data.slice(16, 24);
  return obj;
}

/* 解析power(耗电量(千瓦·时)数字信号 CD**
test:'AA04CD0101014E2201014E22'
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
*/
function parseElectricityDigit(data) {

}

// 解析product(产品编号)数字信号 CF
function parseProductDigit(data) {

  let str = '';

  if (data.slice(-6) === STRING.OK) {

    for (let i = 0; i < data.length; i += 6) {
      str += CFMap.get(data.slice(i, i + 6));
    }
  }
  return str;
}


// 解析仪表盘的数字信号
function parseDigitalData(dataType, data) {
  const promise = {
    [TYPE.DD]: parseSwitchDigit(data),
    [TYPE.CC]: parseCounterDigit(data),
    [TYPE.CD]: parsePowerDigit(data),
    [TYPE.CE]: parseElectricityDigit(data),
    [TYPE.CF]: parseProductDigit(data),
  };

  return promise[dataType];
}

// 获取解析数据的主函数
exports.getData = (doc) => {
  let obj = {
    companyId: '',
    probeNo: '',
    dataType: '',
    value: ''
  };

  for (let key in doc) {
    var companyName = key;
  }

  let monitor = doc[companyName];

  Company.find({
    companyName: companyName
  }).exec((err, doc) => {
    obj.companyId = doc.companyId;
  });

  obj.probeNo = monitor.slice(0, 4);

  obj.dataType = typeMap.get(monitor.slice(4, 6));

  obj.value = parseDigitalData(monitor.slice(4, 6), monitor.slice(8));
  return obj;
};
