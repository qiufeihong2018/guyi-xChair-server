'use strict';

const router = require('express').Router();
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/pipelineState PipelineState post
 * @apiName PipelineStatePost
 * @apiGroup pipelineState
 *
 * @apiParam {string} pipelineStateName  The name of pipelineState(流水线的名字).
 * @apiParam {string} companyId  The id of pipelineState(公司id).
 * @apiParam {array} probeList  The list of probe（流水线的id列表）.
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
 *      "message": "PipelineState register failure!"
 *    }
 */
router.post('/', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  PipelineState.create(doc, function(err, doc) {
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
 * @api {delete} /v1/pipelineState/:id PipelineState delete
 * @apiName PipelineStateDelete
 * @apiGroup pipelineState
 *
 * @apiParam {string} id  The id of pipelineState(流水线的id).
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
 *      "message": "PipelineState register failure!"
 *    }
 */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  PipelineState.findByIdAndRemove({
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
 * @api {put} /v1/pipelineState PipelineState put
 * @apiName PipelineStatePut
 * @apiGroup pipelineState
 *
 * @apiParam {string} id  The id of pipelineState(流水线的id)
 * @apiParam {string} pipelineStateName  The id of pipelineState(流水线的名称).
 * @apiParam {string} companyId  The id of pipelineState(公司id).
 * @apiParam {array} probeList  The id list of probe（采集器的id列表）.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
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
 *      "message": "PipelineState register failure!"
 *    }
 */
router.put('/', function(req, res, next) {
  const data = req.body;

  console.log(data);
  PipelineState.findByIdAndUpdate({
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
 * @api {get} /v1/pipelineState/:companyId PipelineState companyIdGet
 * @apiName CompanyIdGet
 * @apiGroup pipelineState
 *
 * @apiParam {string} companyId  The id of pipelineState(公司的id).
 *
 * @apiSuccess {String} pipelineStateName  The name of pipelineState(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipelineState(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [ "5d7e6459201b65318803e3a2"],
 *        "probeList": [ "5d7e6459201b65318803e3a2",
 *            "5d7e6459201b65318803e3a2"],
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineStateName": "pipelineState",
 *        "created_at": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15T18:02:40.759Z",
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
 *      "message": "PipelineState register failure!"
 *    }
 */
router.get('/:companyId', function(req, res, next) {
  const companyId = req.params.companyId;
  if (companyId) {
    PipelineState.find({
      companyId: companyId
    }).then((doc) => {
      res.status(200).json(doc);
    });
  }
});
/**
 * @api {get} /v1/pipelineState PipelineState get
 * @apiName PipelineStateGet
 * @apiGroup pipelineState
 *
 * @apiSuccess {String} pipelineStateName  The name of pipelineState(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipelineState(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [],
 *        "probeList": [],
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineStateName": "pipelineState",
 *        "created_at": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15TpipelineStateName18:02:40.759Z",
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
 *      "message": "PipelineState register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  PipelineState.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
