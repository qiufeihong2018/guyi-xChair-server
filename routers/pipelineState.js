'use strict';

const router = require('express').Router();
const PipelineState = require('../collections/pipelineState');

const log = require('../services/logger').createLogger('userAuthentication');

// Analysis of Greenwich Time
function localDate(v) {
  v = Number(v);
  const d = new Date(v || Date.now());
  // d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
}
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
function getState() {
  // Simulate off state before next upload of pipelineState
  let prevVal = {};
  const plState = {
    state: '',
    startTime: '',
    endTime: '',
    difTime: '',
    count: ''
  };
  let currentTime = '';
  let lastTime = '';
  let differentTime = '';
  let difTime = '';
  PipelineState.find({}).sort({
    createdAt: -1
  }).limit(1).exec((err, data) => {
    // 运行状态业务
    prevVal = data[0];
    // 当前时间
    currentTime = new Date();
    // 上一个pipelineState的结束时间
    lastTime = prevVal.endTime;
    // 两者的差值
    differentTime = currentTime - lastTime;
    // 关闭判断
    if (Math.abs(differentTime) > 300000) {
      plState.state = 'off';
      plState.startTime = lastTime;
      plState.endTime = currentTime;
      plState.difTime = differentTime;
      plState.count = prevVal.count;
      // 当前时间-上一个pipelineState的开始时间
      difTime = currentTime - prevVal.startTime;
      // 1. 与上一个pipelineState同一个state更新数据
      if (prevVal.state === plState.state) {
        PipelineState.findByIdAndUpdate({
          _id: prevVal._id
        }, {
          $set: {
            endTime: currentTime,
            difTime: difTime,
            count: prevVal.count
          }
        }, {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
          setOnInsert: true
        }, function(err, doc) {
          if (err) {
            log.error(err);
          }
          log.info(`Update PipelineState ${prevVal._id} - ${prevVal.state} success`);
        });
      } else {
        // 1. 与上一个pipelineState的state不相同创建数据
        PipelineState.create(plState, function(err) {
          if (err) {
            console.log(err);
          }
          log.info('Add pipelineState success');
        });
      }
    }
  });

}

router.get('/pipeline/:pipelineId', function(req, res, next) {
  const pipelineId = req.params.pipelineId;
  PipelineState.find({
    pipelineId: pipelineId
  }).then((doc) => {
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
 * @apiParam {String} pipelineId  The pipelineId of pipelineState.
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
 *        "pipelineId": "5d7f03636278515386017dc7",
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

router.post('/search', function(req, res) {
  getState();
  const start = localDate(req.body.start);
  const end = localDate(req.body.end);
  const pipelineId = req.body.pipelineId;
  PipelineState.find({
    $and: [{
      'createdAt': {
        '$gte': start,
        '$lte': end
      }
    }, {
      'pipelineId': pipelineId
    }]
  }).then((doc) => {
    log.info('Search PipelineState');
    res.status(200).json(doc);
  });
});

/**
 * @api {post} /v1/pipelineState/time PipelineState time
 * @apiName PipelineStateTime
 * @apiGroup pipelineState
 *
 * @apiParam {String} start  The startTime of pipelineState.
 * @apiParam {String} end  The endTime of pipelineState.
 *
 * @apiSuccess {Number} offTime  The time of off(关闭的时间).
 * @apiSuccess {Number} onTime  The time of on(运行的时间).
 * @apiSuccess {Number} pendingTime  The time of pending(空转的时间).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "offTime": 3163746,
 *    "onTime": 787098,
 *    "pendingTime": 706623
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
// 获取时间（排除无difTime属性）
function getTime(doc) {
  return new Promise(function(resolve, reject) {
    const time = {
      offTime: 0,
      onTime: 0,
      pendingTime: 0
    };

    for (let i = 0; i < doc.length; i++) {
      if (doc[i].difTime !== undefined) {
        const docDifTime = doc[i].difTime;
        if (doc[i].state === 'off') {
          time.offTime += docDifTime;
        }
        if (doc[i].state === 'on') {
          time.onTime += docDifTime;
        }
        if (doc[i].state === 'pending') {
          time.pendingTime += docDifTime;
        }
      }
    }
    resolve(time);
  });
}
router.post('/time', function(req, res) {

  const start = localDate(req.body.start);
  const end = localDate(req.body.end);


  PipelineState.find({
    'createdAt': {
      '$gte': start,
      '$lte': end
    }
  }).then((doc) => {
    getTime(doc).then((data) => {
      log.info('Search time');
      res.status(200).json(data);
    });
  });
});

module.exports = router;
