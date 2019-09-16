// 生产线上产品(椅子)类型
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  companyId: {
    type: String
  },
  // 生产线ID
  prodlineId: {
    type: String
  },
  // 产品型号代号(生产线上采集器设置的)(纯数字)
  productNo: {
    type: String
  },
  // 产品类型(沙发椅，办公椅，酒吧椅)
  productType: {
    type: String
  },
  // 产品注册代码(记录在册)
  productModel: {
    type: String
  },
  // 产品工艺
  productCraft: {
    type: String
  },
  // 产品净重
  suttleWeight: {
    type: String
  },
  // 产品总重
  totalWeight: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

module.exports = mongoose.model('Product', Product);
