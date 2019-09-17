'use strict';

const router = require('express').Router();
const Probe = require('../collections/probe');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/probe Probe post
 * @apiName ProbePost
 * @apiGroup probe
 *
 * @apiParam {string} pipelineId  The id of pipeline(流水线的id).
 * @apiParam {string} companyId  The id of probe(公司id).
 * @apiParam {string} probeNo  The number of probe（采集器的型号）.
 * @apiParam {array} monitorList  The name of monitor（添加采集器列表）.
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
router.post('/', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  Probe.create(doc, function(err, doc) {
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
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  Probe.findByIdAndRemove({
    _id: id
  }, function(err, doc) {
    if (err) {
      log.error(err);
    }
    res.status(200).json({
      data: 'Delete success',
      status: 200
    });
  });
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

  console.log(data);
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
 *  {
 *        "pipelineId": "5d7eda1aa88b42050147b6ce",
 *        "companyId": "5d7e6459201b65318803e3a2",
 *        "monitorList": [
 *            "DD01"
 *        ],
 *        "_id": "5d7ee0a84152b1118bee06b6",
 *        "probeNo": "AA02",
 *        "createdAt": "2019-09-16T01:08:56.613Z",
 *        "updatedAt": "2019-09-16T01:08:56.613Z",
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
