'use strict';

const router = require('express').Router();
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');

/**
 * @api {get} /v1/pipelineState PipelineState get
 * @apiName PipelineStateGet
 * @apiGroup pipelineState
 *
 * @apiSuccess {String} state  The state of PipelineState(流水线状态:off(关机), on(运行), pending(待机)).
 * @apiSuccess {date} startTime  The startTime of PipelineState(流水线状态开始时间).
 * @apiSuccess {date} endTime  The endTime of PipelineState(流水线状态结束时间).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 *    {
 *        "_id": "5d80b45533495b71f34654a3",
 *        "state": "pending",
 *        "startTime": "2019-09-17T10:23:40.011Z",
 *        "endTime": "2019-09-17T10:24:21.378Z",
 *        "createdAt": "2019-09-17T10:24:21.388Z",
 *        "updatedAt": "2019-09-17T10:24:21.388Z",
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
function getState(doc) {
  // Simulate off state before next upload of monitor
  const currentTime = new Date();
  const lastTime = doc[doc.length - 1].endTime;
  const differentTime = currentTime - lastTime;
  const plState = {
    state: '',
    startTime: '',
    endTime: '',
    difTime: ''
  };
  if (Math.abs(differentTime) > 300000) {
    plState.state = 'off';
    plState.startTime = lastTime;
    plState.endTime = currentTime;
    plState.difTime = differentTime;
    PipelineState.create(plState, function(err) {
      if (err) {
        console.log(err);
      }
      log.info('Add pipelineState success');
    });
  }
}

router.get('/', function(req, res, next) {
  PipelineState.find({}).then((doc) => {
    getState(doc);
    log.info('Get data success');
    res.status(200).json(doc);
  });
});

/**
 * @api {post} /v1/monitor/search PipelineState search
 * @apiName PipelineStateSearch
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
 *      "message": "PipelineState register failure!"
 *    }
 */

function localDate(v) {
  const d = new Date(v || Date.now());
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
}
router.post('/search', function(req, res) {

  const start = localDate(req.body.start);
  const end = localDate(req.body.end);
  const companyId = req.body.companyId;

  PipelineState.find({
    $and: [{
      'createdAt': {
        '$gte': start,
        '$lte': end
      }
    }, {
      'companyId': companyId
    }]
  }).then((doc) => {
    log.info('Search monitor');
    res.status(200).json(doc);
  });
});
module.exports = router;
