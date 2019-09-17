'use strict';

const router = require('express').Router();
const CompanyModel = require('../collections/company');

const log = require('../services/logger').createLogger('userAuthentication');

router.get('/all', async (req, res, next) => {
  const doc = await CompanyModel.find({});
  res.status(200).json(doc);
});

router.post('/', function (req, res, next) {
  const data = req.body;
  CompanyModel.find({
    aliasName: data.aliasName
  }).exec((err, doc) => {
    if (doc.length > 0) {
      res.status(500).json({
        data: 'Data is exist'
      });
    } else {
      CompanyModel.create(data, function (err, res) {
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
 * @api {get} /v1/company detail GET
 * @apiName CompanyGet
 * @apiGroup company
 *
 * @apiSuccess {string} pipelineList  The Id list of pipeline(流水线的id列表).
 * @apiSuccess {object} companyName  The name of company(公司名称).
 * @apiSuccess {array} _id  The id of company（公司id值）.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "pipelineList": [],
 *        "_id": "5d7e63c1ba35562fe1084626",
 *        "companyName": "中源家居股份有限公司",
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
 *      "message": "Company register failure!"
 *    }
 */
router.get('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  const doc = await CompanyModel.findById(id);
  res.status(200).json(doc);
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  await CompanyModel.findByIdAndRemove(id);
  res.status(200).json({
    data: 'delete success'
  });
});


/**
 * @api {get} /v1/company/:id/pipeline/all pipelineList GET 
 * @apiName PipelineListGet
 * @apiGroup company
 *
 * @apiParam {string} id  The id of company(公司的id).
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
 *        "_id": "5d7e7cc03af4bf6838e0addc",
 *        "pipelineName": "AA01",
 *        "companyId": "5d7e6459201b65318803e3a2"],
 *        "probeList": [ "5d7e6459201b65318803e3a2", "5d7e6459201b65318803e3a2"],
 *        "createdAt": "2019-09-15T18:02:40.759Z",
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
router.get('/:id/pipeline/all', async (req, res, next) => {
  const { id: companyId } = req.params;
  if (companyId) {
    const doc = await Pipeline.find({ companyId: companyId });
    res.status(200).json(doc);
  }
});

module.exports = router;
