'use strict';

const router = require('express').Router();
const Monitor = require('../collections/monitor');

const log = require('../services/logger').createLogger('monitor');
const getData = require('../services/type').getData;

/**
 * @api {post} /v1/monitor Monitor Post
 * @apiName MonitorPost
 * @apiGroup monitor
 *
 * @apiParam {String} monitor  The info of monitor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "status": 200,
 *    "data": "Post success！"
 *}
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Monitor register failure!"
 *    }
 */

router.post('/', function (req, res, next) {
  const doc = req.body;
  console.log(doc);
  const obj = getData(doc);
  console.log(obj);
  if (obj) {
    Monitor.create(obj, function (err, data) {
      if (err) {
        log.error(err);
      }
      res.status(200).json({
        status: 200,
        data: 'Post success！'
      });
    });
  }
});

/**
 * @api {get} /v1/monitor Monitor get
 * @apiName MonitorGet
 * @apiGroup monitor
 *
 * @apiSuccess {array} probeId  The id of probe.
 * @apiSuccess {array} repeatedCounting  入口数量（重复计次品次数）.
 * @apiSuccess {array} defectiveNumber  次品次数.
 * @apiSuccess {array} productionQuantity  出品数量（真实的产量）.
 * @apiSuccess {array} positiveEnergy  「正向电能」.
 * @apiSuccess {array} negativeEnergy  「反向电能」.
 * @apiSuccess {array} value 产品型号代号.
 * @apiSuccess {date} timestamp  Time to add data（添加数据的时间）.
 * @apiSuccess {date} createdAt  Time to get doc（从集合中获取数据的时间）.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *        "probeId": [],
 *        "value": [
 *            {
 *                "repeatedCounting": "00006B06",
 *                "defectiveNumber": "0001AD97",
 *                "productionQuantity": "000E65E8"
 *            }
 *        ],
 *        "timestamp": "2019-09-16T00:00:13.693Z",
 *        "_id": "5d7ed20118564770825d06df",
 *        "probeNo": "AA02",
 *        "dataType": "counter",
 *        "createdAt": "2019-09-16T00:06:25.170Z",
 *        "updatedAt": "2019-09-16T00:06:25.170Z",
 *        "__v": 0
 *    },
 *    {
 *        "probeId": [],
 *        "value": [
 *            {
 *                "positiveEnergy": 1677787136199683.2,
 *                "negativeEnergy": 1677787136199683.2
 *            }
 *        ],
 *        "timestamp": "2019-09-16T00:00:13.693Z",
 *        "_id": "5d7ed20618564770825d06e0",
 *        "probeNo": "AA04",
 *        "dataType": "power",
 *        "createdAt": "2019-09-16T00:06:30.985Z",
 *        "updatedAt": "2019-09-16T00:06:30.985Z",
 *        "__v": 0
 *    },
 *    {
 *        "probeId": [],
 *        "value": [
 *            "90"
 *        ],
 *        "timestamp": "2019-09-16T00:00:13.693Z",
 *        "_id": "5d7ed27618564770825d06e1",
 *        "probeNo": "AA04",
 *        "dataType": "product",
 *        "createdAt": "2019-09-16T00:08:22.690Z",
 *        "updatedAt": "2019-09-16T00:08:22.690Z",
 *        "__v": 0
 *    }
 *
 * @apiError REGISTER_FAILURE The register failure.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *    {
 *      "err": "REGISTER_FAILURE",
 *      "message": "Monitor register failure!"
 *    }
 */
router.get('/:start/:end', function (req, res, next) {
  let start = req.params.start;
  let end = req.params.end;
  Monitor.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});
module.exports = router;
