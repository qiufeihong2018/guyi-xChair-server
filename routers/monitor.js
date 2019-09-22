'use strict';

const router = require('express').Router();
const Monitor = require('../collections/monitor');
const RawDataCol = require('../collections/rawData');

const log = require('../services/logger').createLogger('monitor');
const getData = require('../services/type').getData;
const localDate = require('../utils/time').localDate;
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

router.post('/', async (req, res) => {
  const doc = req.body;
  // 报错原始数据
  const dataValue = Object.values(doc)[0];
  const dateType = dataValue.slice(4, 6);
  await RawDataCol.create({
    data: JSON.stringify(doc),
    value: dataValue,
    type: dateType
  });
  // 数据处理
  const monitorData = await getData(doc);
  if (monitorData) {
    console.log(monitorData);
    Monitor.create(monitorData, function(err) {
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
 * @apiSuccess {string} probeId  The id of probe.
 * @apiSuccess {number} repeatedCounting  入口数量（重复计次品次数）.
 * @apiSuccess {number} defectiveNumber  次品次数.
 * @apiSuccess {number} productionQuantity  出品数量（真实的产量）.
 * @apiSuccess {number} positiveEnergy  「正向电能」.
 * @apiSuccess {number} negativeEnergy  「反向电能」.
 * @apiSuccess {number} value 产品型号代号.
 * @apiSuccess {number} voltage 电压.
 * @apiSuccess {number} electric 电流.
 * @apiSuccess {number} activePower 有功功率.
 * @apiSuccess {number} reactivePower 无功功率.
 * @apiSuccess {number} apparentPower 视在功率.
 * @apiSuccess {number} powerFactor 功率因数.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
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
router.get('/', function(req, res) {
  // const opts = {
  //   path: 'company',
  //   select: {
  //     companyName: 1
  //   },
  //   model: 'Company',
  //   options: {
  //     sort: {
  //       companyName: -1
  //     }
  //   }
  // };
  // Monitor.find({}).populate(opts).then((doc) => {
  Monitor.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

/**
 * @api {post} /v1/monitor/search Monitor search
 * @apiName MonitorSearch
 * @apiGroup monitor
 *
 * @apiParam {String} companyId  The id of company(公司的id).
 * @apiParam {String} start  The startTime of monitor.
 * @apiParam {String} end  The endTime of monitor.
 *
 * @apiSuccess {String} probeId  The id of probe.
 * @apiSuccess {number} repeatedCounting  入口数量（重复计次品次数）.
 * @apiSuccess {number} defectiveNumber  次品次数.
 * @apiSuccess {number} productionQuantity  出品数量（真实的产量）.
 * @apiSuccess {number} positiveEnergy  「正向电能」.
 * @apiSuccess {number} negativeEnergy  「反向电能」.
 * @apiSuccess {number} voltage 电压.
 * @apiSuccess {number} electric 电流.
 * @apiSuccess {number} activePower 有功功率.
 * @apiSuccess {number} reactivePower 无功功率.
 * @apiSuccess {number} apparentPower 视在功率.
 * @apiSuccess {number} powerFactor 功率因数.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
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
 *        "_id": "5d7ed20118564770825d06df",
 *        "probeNo": "AA02",
 *        "dataType": "counter",
 *        "createdAt": "2019-09-16T00:06:25.170Z",
 *        "updatedAt": "2019-09-16T00:06:25.170Z",
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


router.post('/search', function(req, res) {
  const start = localDate(req.body.start);
  const end = localDate(req.body.end);
  const companyId = req.body.companyId;
  const pipelineId = req.body.pipelineId;

  Monitor.find({
    'createdAt': {
      '$gte': start,
      '$lte': end
    },
    '$or': [{
      'pipelineId': pipelineId
    }, {
      'companyId': companyId
    }]
  }).then((doc) => {
    log.info('Search monitor');
    res.status(200).json(doc);
  });
});

/**
 * @api {get} /v1/monitor:company Monitor companyIdGet
 * @apiName CompanyIdGet
 * @apiGroup monitor
 *
 * @apiParam {string} companyId  The id of company(公司的id).
 *
 * @apiSuccess {string} probeId  The id of probe.
 * @apiSuccess {number} repeatedCounting  入口数量（重复计次品次数）.
 * @apiSuccess {number} defectiveNumber  次品次数.
 * @apiSuccess {number} productionQuantity  出品数量（真实的产量）.
 * @apiSuccess {number} positiveEnergy  「正向电能」.
 * @apiSuccess {number} negativeEnergy  「反向电能」.
 * @apiSuccess {number} value 产品型号代号.
 * @apiSuccess {number} voltage 电压.
 * @apiSuccess {number} electric 电流.
 * @apiSuccess {number} activePower 有功功率.
 * @apiSuccess {number} reactivePower 无功功率.
 * @apiSuccess {number} apparentPower 视在功率.
 * @apiSuccess {number} powerFactor 功率因数.
 * @apiSuccess {date} createdAt  Time to get doc（添加数据的时间）.
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
router.get('/:companyId', function(req, res) {
  const companyId = req.params.companyId;
  if (companyId) {
    Monitor.find({
      companyId: companyId
    }).then((doc) => {
      res.status(200).json(doc);
    });
  }
});

module.exports = router;
