'use strict';

const router = require('express').Router();
const CompanyModel = require('../collections/company');
const PipelineCol = require('../collections/pipeline');

const log = require('../services/logger').createLogger('userAuthentication');


/**
 * @api {get} /v1/company/all 公司列表(GET)
 * @apiDescription 获取公司列表
 * @apiName CompanyGet
 * @apiGroup company
 *
 * @apiSuccess {string} _id 公司ID
 * @apiSuccess {string} companyName 公司名
 * @apiSuccess {array} pipelineList 该公司的所有流水线(元素为流水线ID)
 * @apiSuccess {date} createdAt  Time to insert db（数据添加的时间）.
 * @apiSuccess {date} updatedAt  Time to update db（数据更新的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  [
 *    {
 *        "_id": "5d7e63c1ba35562fe1084626",
 *        "companyName": "中源家居股份有限公司",
 *        "pipelineList": [],
 *        "created_at": "2019-09-15T16:16:01.907Z",
 *        "updatedAt": "2019-09-15T16:16:01.907Z",
 *        "__v": 0
 *    },
 *  ]
 */
router.get('/all', async (req, res, next) => {
  const doc = await CompanyModel.find({});
  res.status(200).json(doc);
});

/**
 * @api {POST} /v1/company 新增公司(POST)
 * @apiDescription 新增公司
 * @apiName AddCompany
 * @apiGroup company
 */
router.post('/', function(req, res, next) {
  const data = req.body;
  CompanyModel.find({
    aliasName: data.aliasName
  }).exec((err, doc) => {
    if (doc.length > 0) {
      res.status(500).json({
        data: 'Data is exist'
      });
    } else {
      CompanyModel.create(data, function(err, res) {
        if (err) {
          log.error(err);
        }
      });
      res.status(200).json({
        data: 'Add company success'
      });
    }
  });
});

/**
 * @api {get} /v1/company/:id 公司详情(GET)
 * @apiDescription 获取公司详情
 * @apiName GetCompanyDetail
 * @apiGroup company
 * 
 * @apiParam {string} id  The id of company(公司的id).
 *
 * @apiSuccess {string} _id  The id of company（公司id值）.
 * @apiSuccess {string} companyName  The name of company(公司名称).
 * @apiSuccess {array} pipelineList  The Id list of pipeline(流水线的id列表).
 * @apiSuccess {date} createdAt  Time to insert db（数据添加的时间）.
 * @apiSuccess {date} updatedAt  Time to update db（数据更新的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *        "_id": "5d7e63c1ba35562fe1084626",
 *        "companyName": "中源家居股份有限公司",
 *        "pipelineList": [],
 *        "created_at": "2019-09-15T16:16:01.907Z",
 *        "updatedAt": "2019-09-15T16:16:01.907Z",
 *        "__v": 0
 *    },
 */
router.get('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  const doc = await CompanyModel.findById(id);
  res.status(200).json(doc);
});


/**
 * @api {delete} /v1/company/:id 删除公司(DELETE)
 * @apiDescription 删除公司
 * @apiName DeleteCompany
 * @apiGroup company
 * 
 * @apiParam {string} id  The id of company(公司的id).
 */
router.delete('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  await CompanyModel.findByIdAndRemove(id);
  res.status(200).json({
    data: 'delete success'
  });
});

// 获取某公司的所有pipeline
router.get('/:id/pipeline/all', async (req, res, next) => {
  const { id: companyId } = req.params;
  if (companyId) {
    const doc = await PipelineCol.find({ companyId });
    res.status(200).json(doc);
  }
  res.status(200).json({msg: "ID错误"});
});

module.exports = router;
