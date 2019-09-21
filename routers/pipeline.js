'use strict';

const router = require('express').Router();
const PipelineCol = require('../collections/pipeline');
const PipelineModel = require('../models/pipeline');
const ProductCol = require('../collections/product');

const log = require('../services/logger').createLogger('userAuthentication');


/**
 * @api {get} /v1/pipeline/company/:companyId companyPipeline Get
 * @apiDescription 获取该公司所有生产线
 * @apiName GetPipelineList
 * @apiGroup pipeline
 *
 * @apiParam {string} id  The id of company(公司的id).
 *
 * @apiSuccess {String} _id  The id of pipeline(生产线id值). *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to insert db（数据添加的时间）.
 * @apiSuccess {date} updatedAt  Time to update db（数据更新的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "AA01",
 *        "companyId": "5d7e6459201b65318803e3a2"],
 *        "probeList": [ "5d7e6459201b65318803e3a2", "5d7e6459201b65318803e3a2"],
 *        "createdAt": "2019-09-15T18:02:40.759Z",
 *        "updatedAt": "2019-09-15T18:02:40.759Z",
 *        "__v": 0
 *    },
 *  ]
 */
router.get('/company/:companyId', async (req, res, next) => {
  const {
    companyId: companyId
  } = req.params;
  if (companyId) {
    const doc = await PipelineCol.find({
      companyId: companyId
    });
    res.status(200).json(doc);
  }
});

/**
 * @api {post} /v1/pipeline Pipeline post (新增pipeline)
 * @apiName PipelinePost
 * @apiGroup pipeline
 *
 * @apiParam {string} companyId  The id of pipeline(公司id).
 * @apiParam {string} pipelineName  The name of pipeline(流水线的名字).
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
 * @api {delete} /v1/pipeline/:id Pipeline delete (删除指定pipeline)
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

  PipelineCol.findByIdAndRemove({
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
 *      "message": "Pipeline register failure!"
 *    }
 */
router.put('/', function(req, res, next) {
  const data = req.body;

  PipelineCol.findByIdAndUpdate({
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
 * @api {get} /v1/pipeline Pipeline get
 * @apiName PipelineGet
 * @apiGroup pipeline
 *
 * @apiSuccess {String} pipelineName  The name of pipeline(流水线名称).
 * @apiSuccess {String} companyId  The id of company(公司id值).
 * @apiSuccess {Array} probeList  The id of pipeline(采集器的id值列表).
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *     {
 *        "companyId": [],
 *        "probeList": [],
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
router.get('/', function(req, res, next) {
  PipelineCol.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

// 获取生产线详情
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const doc = await PipelineCol.findById(id);
  const pipeline = new PipelineModel(id)
  const state = await pipeline.getCurrentState()
  console.log('state', state)
  res.status(200).json(state);
});

// 某个pipeline的当前的(开机、关机、空转)状态
// 基于pipeline的ID查询
router.get('/:id/state', async (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    id: id
  });
  // throw new global.errs.NotFound();
});

// 多个pipeline的当前的(开机、关机、空转)状态
// 基于ids这个数组，元素为pipeline的ID
router.post('/list/state', (req, res, next) => {
  const ids = req.body.ids;
  res.status(200).json({
    ids: ids
  });
});

router.get('/:id/state/duration', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({});
});


// 获取该生产线的所有产品

router.get('/:id/product', function(req, res, next) {
  const { id } = req.params;
  if (id) {
    ProductCol.find({
      pipelineId: id
    }).then((doc) => {
      res.status(200).json(doc);
    });
  }
});

module.exports = router;
