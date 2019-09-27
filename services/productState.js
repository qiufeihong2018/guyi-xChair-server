'use strict';
const ProductCol = require('../collections/product');
const ProductState = require('../collections/productState');

const log = require('./logger').createLogger('monitor');

exports.createProState = (res, probe) => {
  const proState = {
    productId: '',
    pipelineId: '',
    state: true,
    startTime: new Date(),
    endTime: ''
  };
  ProductState.find({}).exec((err, doc) => {
    if (doc.length <= 0) {
      log.info('Create ProductState success');
      ProductState.create(proState);
    }
  });
  // 将之前的开的状态关闭，结束时间为当前时间
  ProductState.findOneAndUpdate({
    $and: [{
      pipelineId: probe.pipelineId
    },
           {
             state: true
           }
    ]
  }, {
    $set: {
      state: false,
      endTime: proState.startTime
    }
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
    log.info('Update ProductState success');
    // 创建新的state数据
    ProductCol.find({
      no: res
    }).sort({
      createdAt: -1
    }).limit(1).exec((err, prev) => {
      if (prev.length > 0) {
        proState.productId = prev[0]._id;
        proState.pipelineId = probe.pipelineId;
        proState.state = true;
        ProductState.create(proState);
      }
    });
  });
};
