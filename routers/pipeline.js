'use strict';

const router = require('express').Router();
const Pipeline = require('../collections/pipeline');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {post} /v1/pipeline Pipeline post
 * @apiName PipelinePost
 * @apiGroup pipeline
 *
 * @apiParam {string} pipelineName  The name of pipeline(流水线的名字).
 * @apiParam {string} companyId  The id of pipeline(公司id).
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.post('/', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  Pipeline.create(doc, function(err, doc) {
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
 * @api {delete} /v1/pipeline/:id Pipeline delete
 * @apiName PipelineDelete
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of pipeline(流水线的id).
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  Pipeline.findByIdAndRemove({
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
 * @api {put} /v1/pipeline Pipeline put
 * @apiName PipelinePut
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of pipeline(流水线的id)
 * @apiParam {string} pipelineName  The id of pipeline(流水线的名称).
 * @apiParam {string} companyId  The id of pipeline(公司id).
 * @apiParam {array} probeList  The id list of probe（采集器的id列表）.
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.put('/', function(req, res, next) {
  const data = req.body;

  console.log(data);
  Pipeline.findByIdAndUpdate({
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
 * @api {get} /v1/pipeline/:companyId Pipeline companyIdGet
 * @apiName CompanyIdGet
 * @apiGroup pipeline
 *
 * @apiParam {object} companyId  The id of pipeline(公司id).
 *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [ "5d7e6459201b65318803e3a2"],
 *        "probeList": [ "5d7e6459201b65318803e3a2",
 *            "5d7e6459201b65318803e3a2"],
 *        "timestamp": "2019-09-15T17:54:46.571Z",
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "pipeline",
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.get('/:companyId', function(req, res, next) {
  const companyId = req.params.companyId;
  if (companyId) {
    Pipeline.find({
      companyId: companyId
    }).then((doc) => {
      res.status(200).json(doc);
    });
  } else {
    Pipeline.find({}).then((doc) => {
      res.status(200).json(doc);
    });
  }

});
/**
 * @api {get} /v1/pipeline Pipeline get
 * @apiName PipelineGet
 * @apiGroup pipeline
 *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [],
 *        "probeList": [],
 *        "timestamp": "2019-09-15T17:54:46.571Z",
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "pipeline",
 *        "created_at": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15TpipelineName18:02:40.759Z",
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.get('/', function(req, res, next) {
  Pipeline.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});
module.exports = router;
