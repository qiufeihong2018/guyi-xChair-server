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
 * @apiParam {object} companyId  The id of probe(公司id).
 * @apiParam {array} probeNo  The number of probe（采集器的型号）.
 * @apiParam {date} monitorList  The name of monitor（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "pipelineList": [],
 *        "timestamp": "2019-09-15T16:15:15.318Z",
 *        "_id": "5d7e63c1ba35562fe1084626",
 *        "probeName": "中源家居股份有限公司",
 *        "created_at": "2019-09-15T16:16:01.907Z",
 *        "updatedAt": "2019-09-15T16:16:01.907Z",
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
 * {
 *    "monitorList": [
 *        "DD01"
 *    ],
 *    "timestamp": "2019-09-15T16:37:01.051Z",
 *    "_id": "5d7e68ae00f0693b353895ab",
 *    "probeNo": "AA01",
 *    "createdAt": "2019-09-15T16:37:02.515Z",
 *    "updatedAt": "2019-09-15T16:48:35.738Z",
 *    "__v": 0
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
 * @api {post} /v1/probe Probe post
 * @apiName ProbePost
 * @apiGroup probe
 *
 * @apiParam {string} id  The id of probe(采集器的id)
 * @apiParam {string} pipelineId  The id of pipeline(流水线的id).
 * @apiParam {object} companyId  The id of probe(公司id).
 * @apiParam {array} probeNo  The number of probe（采集器的型号）.
 * @apiParam {date} monitorList  The name of monitor（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "monitorList": [
 *        "DD01"
 *    ],
 *    "timestamp": "2019-09-15T16:37:01.051Z",
 *    "_id": "5d7e68ae00f0693b353895ab",
 *    "probeNo": "AA01",
 *    "createdAt": "2019-09-15T16:37:02.515Z",
 *    "updatedAt": "2019-09-15T16:48:35.738Z",
 *    "__v": 0
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
 * @apiSuccess {string} pipelineList  The Id list of pipeline(流水线的id列表).
 * @apiSuccess {object} probeName  The name of probe(公司名称).
 * @apiSuccess {array} _id  The id of probe（公司id值）.
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "monitorList": [
 *            "DD01"
 *        ],
 *        "timestamp": "2019-09-15T16:37:01.051Z",
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
router.get('/', function(req, res, next) {
  Probe.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
