'use strict';

const router = require('express').Router();
const Product = require('../collections/product');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/product Product post
 * @apiName ProductPost
 * @apiGroup product
 *
 * @apiParam {string} pipelineId  The id of product(流水线的id).
 * @apiParam {string} companyId  The id of product(公司id).
 * @apiParam {array} productNo  The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.
 * @apiParam {array} productType  The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.
 * @apiParam {array} productModel  The model of product（产品注册代码(记录在册)）.
 * @apiParam {array} productCraft  The craft of product（产品工艺）.
 * @apiParam {array} suttleWeight  The weight of product（产品净重）.
 * @apiParam {array} totalWeight  The totalweight of product（产品总重）.
 * @apiParam {array} createdAt  The createtime of product（创建时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Add success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Product register failure!"
 *    }
 */
router.post('/', function(req, res, next) {
  const doc = req.body;
  // console.log('doc', doc)
  Product.create(doc, function(err, doc) {
    if (err) {
      log.error(err);
    }
    res.status(200).json({
      data: 'Add success',
      status: 200
    });
  });
});
/**
 * @api {delete} /v1/product/:id Product delete
 * @apiName ProductDelete
 * @apiGroup product
 *
 * @apiParam {string} id  The id of product(产品的id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Delete success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Product register failure!"
 *    }
 */
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  await Product.findByIdAndRemove({
    _id: id
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
  });

  res.status(200).json({
    data: 'Delete success',
    status: 200
  });
});
/**
 * @api {put} /v1/product Product put
 * @apiName ProductPut
 * @apiGroup product
 *
 * @apiParam {string} pipelineId  The id of product(流水线的id).
 * @apiParam {string} companyId  The id of product(公司id).
 * @apiParam {array} productNo  The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.
 * @apiParam {array} productType  The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.
 * @apiParam {array} productModel  The model of product（产品注册代码(记录在册)）.
 * @apiParam {array} productCraft  The craft of product（产品工艺）.
 * @apiParam {array} suttleWeight  The weight of product（产品净重）.
 * @apiParam {array} totalWeight  The totalweight of product（产品总重）.
 * @apiParam {array} createdAt  The createtime of product（创建时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": "Update success",
 *    "status": 200
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Product register failure!"
 *    }
 */
// 基础产品ID修改
/**
{
  "id": "",
  "pipelineId":  "5d834e6c0c8e9f276745ded0",
  "pipelineName":  "ALT01",
  "model":  "8810",
  "no": "8810",
  "type":  "办公转椅",
  "suttleWeight":  8,
  "totalWeight": 10,
  "length": 100,
  "width": 80,
  "height": 120
}
*/
router.put('', async (req, res, next) => {
  const data = req.body;

  const product = await Product.findByIdAndUpdate({
    _id: data.id
  }, {
    $set: data
  }, {
    new: true,
  });

  res.status(200).json(product)
});

/**
 * @api {get} /v1/product Product get
 * @apiName ProductGet
 * @apiGroup product
 *
 * @apiParam {string} pipelineId  The id of product(流水线的id).
 * @apiParam {string} companyId  The id of product(公司id).
 * @apiParam {array} productNo  The number of product（产品型号代号(生产线上采集器设置的)(纯数字)）.
 * @apiParam {array} productType  The type of product（产品类型(沙发椅，办公椅，酒吧椅)）.
 * @apiParam {array} productModel  The model of product（产品注册代码(记录在册)）.
 * @apiParam {array} productCraft  The craft of product（产品工艺）.
 * @apiParam {array} suttleWeight  The weight of product（产品净重）.
 * @apiParam {array} totalWeight  The totalweight of product（产品总重）.
 * @apiParam {array} createdAt  The createtime of product（创建时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [],
 *        "probeList": [],
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "productName": "product",
 *        "created_at": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15TproductName18:02:40.759Z",
 *        "__v": 0
 *    },
 *  ]
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Product register failure!"
 *    }
 */
// 基于产品ID查询
router.get('/:id', function(req, res, next) {
  Product.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
