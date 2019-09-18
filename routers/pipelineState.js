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
 *        "difTime": 69212,
 *        "count": 2212,
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
  // Simulate off state before next upload of pipelineState
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
 * @api {post} /v1/pipelineState/search PipelineState search
 * @apiName PipelineStateSearch
 * @apiGroup pipelineState
 *
 * @apiParam {String} start  The startTime of pipelineState.
 * @apiParam {String} end  The endTime of pipelineState.
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
 *        "difTime": 69212,
 *        "count": 2212,
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

// Analysis of Greenwich Time
function localDate(v) {
  v = Number(v);
  const d = new Date(v || Date.now());
  // d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
}
router.post('/search', function(req, res) {

  const start = localDate(req.body.start);
  const end = localDate(req.body.end);
  PipelineState.find({
    'createdAt': {
      '$gte': start,
      '$lte': end
    }
  }).then((doc) => {

    log.info('Search PipelineState');
    res.status(200).json(doc);
  });
});

module.exports = router;
