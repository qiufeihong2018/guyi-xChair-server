'use strict';

const router = require('express').Router();
const Company = require('../collections/company');

const log = require('../services/logger').createLogger('userAuthentication');

router.post('/', function(req, res, next) {
  const doc = req.body;
  console.log(doc);
  Company.create(doc, function(err, res) {
    if (err) {
      log.error(err);
    }
  });
});

/**
 * @api {get} /v1/company Company get
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
router.get('/', function(req, res, next) {
  Company.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
