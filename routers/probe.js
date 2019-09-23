'use strict';

const router = require('express').Router();
const Probe = require('../collections/probe');
const PipelineModel = require('../models/pipeline');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/probe Probe post
 * @apiName ProbePost
 * @apiGroup probe
 *
 * @apiParam {string} pipelineId  The id of pipeline(流水线的id).
 * @apiParam {string} companyId  The id of probe(公司id).
 * @apiParam {string} probeNo  The number of probe（采集器的型号）.
 * @apiParam {string} companyAlias  The alias of company（公司别名）.
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
 *      "message": "Probe register failure!"
 *    }
 */
// 新增probe，并添加到指定的pipeline
// 传入 pipelineId, pipelineName, probeNo
// 返回更新的结果
router.post('/', async (req, res, next) => {
  const doc = req.body;
  const { pipelineId, probeNo } = doc;
  // 查找如果找到就更新，没找到就新增
  await Probe.findOneAndUpdate({
    pipelineId,
    probeNo
  }, doc, { upsert: true, setDefaultsOnInsert: true }
  );


  // 更新指定的pipeline
  const pipelineObj = new PipelineModel(pipelineId);
  const probeList = await pipelineObj.updateProbeList();

  res.status(200).json({ probeList });
});

/**
 * @api {delete} /v1/probe Probe delete
 * @apiName ProbeDelete
 * @apiGroup probe
 *
 * @apiParam {string} id  The id of probe(采集器的id).
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
 *      "message": "Probe register failure!"
 *    }
 */
// 删除
router.delete('/', async (req, res, next) => {
  const { pipelineId, probeNo } = req.body;

  await Probe.findOneAndRemove({
    pipelineId,
    probeNo
  });

  // 更新指定的pipeline
  const pipelineObj = new PipelineModel(pipelineId);
  const probeList = await pipelineObj.updateProbeList();

  res.status(200).json({ probeList });

});
/**
 * @api {put} /v1/probe Probe put
 * @apiName ProbePut
 * @apiGroup probe
 *
 * @apiParam {string} id  The id of probe(采集器的id)
 * @apiParam {string} pipelineId  The id of pipeline(流水线的id).
 * @apiParam {object} companyId  The id of probe(公司id).
 * @apiParam {array} probeNo  The number of probe（采集器的型号）.
 * @apiParam {date} monitorList  The name of monitor（添加采集器列表）.
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
 *      "message": "Probe register failure!"
 *    }
 */
router.put('/', function(req, res, next) {
  const data = req.body;

  Probe.findByIdAndUpdate({
    _id: data.id
  }, {
    $set: data
  }, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    setOnInsert: true
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
    res.status(200).json({
      data: 'Update success',
      status: 200
    });
  });
});

/**
 * @api {get} /v1/probe Probe get
 * @apiName ProbeGet
 * @apiGroup probe
 *
 * @apiSuccess {string} pipelineId  The Id list of pipeline(流水线的id).
 * @apiSuccess {string} companyId  The id of company（公司id值）.
 * @apiSuccess {array} monitorList  The name of probe(采集器名称).
 * @apiSuccess {string} _id  The id of probe（采集器的id值）.
 * @apiSuccess {string} probeNo  The number of probe（采集器的型号）.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "_id": "5d8383487e1dc518ae20bbde",
 *        "pipelineId": "5d7f03636278515386017dc7",
 *        "companyId": "5d8041511ba0c859fb1a5897",
 *        "probeNo": "AA02",
 *        "createdAt": "2019-09-19T13:31:52.196Z",
 *        "updatedAt": "2019-09-19T13:31:52.196Z",
 *        "__v": 0
 *    }
 *]
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Probe register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  Probe.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});


/**
 * @api {get} /v1/probe/:companyId Probe companyIdGet
 * @apiName CompanyIdGet
 * @apiGroup probe
 *
 * @apiParam {string} companyId  The id of company(公司的id).
 *
 * @apiSuccess {string} pipelineList  The Id list of pipeline(流水线的id列表).
 * @apiSuccess {object} probeName  The name of probe(采集器名称).
 * @apiSuccess {array} _id  The id of probe（公司id值）.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "monitorList": [
 *            "DD01"
 *        ],
 *        "_id": "5d7e68ae00f0693b353895ab",
 *        "probeNo": "AA02",
 *        "createdAt": "2019-09-15T16:37:02.515Z",
 *        "updatedAt": "2019-09-15T16:37:02.515Z",
 *        "__v": 0
 *    }
 *]
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Probe register failure!"
 *    }
 */
router.get('/:companyId', function(req, res, next) {
  const companyId = req.params.companyId;
  if (companyId) {
    Probe.find({
      companyId: companyId
    }).then((doc) => {
      res.status(200).json(doc);
    });
  }
});

module.exports = router;
