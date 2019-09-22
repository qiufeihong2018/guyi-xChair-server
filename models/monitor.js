'use strict';
const RawDataCol = require('../collections/rawData');

class Monitor {
  // eslint-disable-next-line no-useless-constructor
  constructor() {

  }
  // 保存monitor采集过来的原始数据
  static async saveRawData(rawData) {
    RawDataCol.create({
      data: JSON.stringify(rawData)
    });
  }
}

module.exports = Monitor;
